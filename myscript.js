// see ressources.js for the lexical variables
//  -> map : any words or n-gram which can be directly remplaced 
//  -> map_singulier : any words (singular - after 'le', 'la', 'un'..) which are particular cases
//  -> map_pluriel : any words (pluriel - after 'les', 'des'..) which are particular cases
//   > wcharset et wbinset : Définition des caractères pouvant être présent dans un mot
//   > verb_avoir : Définition des modaux qui empèche la conjugaison
//   > mot_negation : mots suivants le modal dans une négation
//   > pronoms_singulier : Définition des pronoms au singulier
//   > pronoms_pluriel : Définition des pronoms au pluriel

// Date : 2015/04/01
// This code is originaly a fork of JailBreak The Patriarchy
// Contributors :
//    Sébastien GILLOT <sebastien.gillot@runbox.com> -> grammar tricks and some words
//    Yoann LABONNE <yoann.labonne@gmail.com> -> filling the dictionnary 

// Définition pour mettre les mots en gras en post-processing
var bracket_sw=["o_tag/o","o/tag_o"];
var bracket_nosw=["o_nochange/o","o/nochange_o"];
var open_bracket_sw =new RegExp("(" + bracket_sw[0] + ")" ,'g');
var close_bracket_sw =new RegExp("(" + bracket_sw[1] + ")" ,'g');
var open_bracket_nosw =new RegExp("(" + bracket_nosw[0] + ")" ,'g');
var close_bracket_nosw =new RegExp("(" + bracket_nosw[1] + ")" ,'g');
function post_processing_innerHTML(body,options){
  //~ if (body == undefined) return ;
  //~ if (body.innerHTML == undefined) return ;
  //~ body.innerHTML = body.innerHTML.replace(open_bracket_sw,'<STRONG>').replace(close_bracket_sw,'</STRONG>');
  //~ body.innerHTML = body.innerHTML.replace(open_bracket_nosw,'*').replace(close_bracket_nosw,'*');
  body.innerHTML = body.innerHTML.replace(open_bracket_sw,options.BaliseMotChangeO).replace(close_bracket_sw,options.BaliseMotChangeF);
  body.innerHTML = body.innerHTML.replace(open_bracket_nosw,options.BaliseMotInchangeO).replace(close_bracket_nosw,options.BaliseMotInchangeF);
}

//Récupère les mots clés du dictionnaire dans le format Regex
var concatString = function(obj) {
  var parts = [];
  for (key in obj) {
    parts.push(key);
  }
  return parts.join('|');
};

//Fonction qui gere la casse des mots dans un n-gramme
function matchCase(old_word, replacement) {
  var first = new String();
  var second = new String();

  if (replacement.toLowerCase() == old_word.toLowerCase()) return old_word;
  
  var t_old_word = old_word.split(' ');
  var t_replacement= replacement.split(' ');

  for(var i=0; i<t_old_word.length; i++){
    if (t_replacement[i].toLowerCase() != t_old_word[i].toLowerCase()){
      first = t_old_word[i].charAt(0);
      second = t_old_word[i].charAt(1);
      
      if (/[a-z]/.test(first)){
          t_replacement[i]=t_replacement[i].toLowerCase();
      }
      else {
        if (/[A-Z]/.test(second)) ret=t_replacement[i].toUpperCase();
        else t_replacement[i]=t_replacement[i].charAt(0).toUpperCase() + t_replacement[i].slice(1).toLowerCase();;
      }
    }
  }
  return bracket_sw[0] + t_replacement.join(' ') + bracket_sw[1];
}

//Fonction qui recherche un mot dans notre tableau de mots
function findMatch(word) {
  return map[word];
}
function findMatchSingulier(word) {
  return map_singulier[word];
}
function findMatchPluriel(word) {
  return map_pluriel[word];
}

//~ A faire ? -> var dernier_genre; // détection du genre changé pour déterminer la substitution suivante dans la phrase

// Définition des critères de modification des mots -> si le mot est connu du dictionnaire
var searchFor = new RegExp('^('+ concatString(map) + ')$', 'ig');
var searchForSingulier = new RegExp('^('+ concatString(map_singulier) + ')$', 'ig');
var searchForPluriel = new RegExp('^('+ concatString(map_pluriel) + ')$', 'ig');

var reLastcharNotInWord=new RegExp('[^'+wcharset+']$','i');
var reModAvoir=new RegExp('^('+verb_avoir.join('|')+')$','');
var rePronomsSingulier=new RegExp('^('+pronoms_singulier.join('|')+')$','i');
var rePronomsPluriel=new RegExp('^('+pronoms_pluriel.join('|')+')$','i');

// Définition du format des mots à traiter
var reMatchWord=new RegExp('\\b('+ //début de mot
      '('+verb_avoir.join('|')+')' + '[ ]+' + '(('+mot_negation.join('|')+')[ ]+)?'+'['+ wcharset + ']{2,}'+ '|' + // les mots/verbes conjugués avec avoir pour ne pas y toucher
      '('+pronoms_singulier.join('|')+pronoms_pluriel.join('|')+')' + '[ ]+' +'['+ wcharset + ']{2,}'+ '|' + // les noms précédés de pronoms
      '['+ wcharset + ']['+ wcharset + wbindset + ']+' + ')' +  // n'importe quel mot (incluant les charactères d'union)
      '[^'+ wcharset + ']?', 'ig'); //fin de mot (on détecte n'importe quel caractère qui ne doit pas appartenir aux mots) 

//Fonction qui remplace un mot par un autre en utilisant la fonction matchCase
function swapWord(word) {
  //~ return '^'+word+'$'; // uncomment this to debug the regex in genderswap (reMatchWord)
  var suf="";
  if (reLastcharNotInWord.test(word)){
      suf=word.substring(word.length - 1,word.length);
      word=word.substring(0,word.length - 1);
  }
  var t=word.split(' ');
  if (reModAvoir.test(t[0])){
    return bracket_nosw[0] + word + bracket_nosw[1] + suf;
  }
  if (t.length > 1){ //gère les mots inscrits comme cas particuliers et les pronoms sur deux mots
    var rep=[];
    var rep_ok=false;
    var rep_singulier=false;
    var rep_pluriel=false;
    var rep_alt=false;
    
    rep[0]=t[0].toLowerCase().replace(searchFor, findMatch);
    if (t.length > 2){
      rep[1]=t[1].toLowerCase().replace(searchFor, findMatch);
      if (rePronomsSingulier.test(t[0] + " " + t[1])) rep_singulier=true;
      else if (rePronomsPluriel.test(t[0] + " " + t[1])) rep_pluriel=true;
    } else {
      if (rePronomsSingulier.test(t[0])) rep_singulier=true;
      else if (rePronomsPluriel.test(t[0])) rep_pluriel=true;
    }

    if (rep_singulier){
      if (searchForSingulier.test(t[t.length-1])){
        rep[t.length-1]=t[t.length-1].toLowerCase().replace(searchForSingulier, findMatchSingulier);
        rep_ok=true;
      } else rep_alt=true;
    } else if (rep_pluriel){
      if (searchForPluriel.test(t[t.length-1])){
        rep[t.length-1]=t[t.length-1].toLowerCase().replace(searchForPluriel, findMatchPluriel);
        rep_ok=true;
      } else rep_alt=true;
    }
    if ( (rep_alt) && (searchFor.test(t[t.length-1])) ){
      rep[t.length-1]=t[t.length-1].toLowerCase().replace(searchFor, findMatch);
      rep_ok=true;
    }
    if ( rep_ok ) return matchCase(word, rep.join(' ')) + suf;
  }
  return matchCase(word, word.toLowerCase().replace(searchFor, findMatch))+ suf;
}

function genderswap(text) {
  return text.replace(reMatchWord, swapWord);
}

// Fonction de recherche et traitement des blocks de texte à transformer 
function jailbreak(node,options_hash){
  var treeWalker = document.createTreeWalker(
     node,
     NodeFilter.SHOW_TEXT,
     null,
     false
  );
  while(treeWalker.nextNode()) {
   var current = treeWalker.currentNode;
   current.textContent = genderswap(current.textContent); // appel à la fonction de transformation
  }
  post_processing_innerHTML(node,options_hash);
}
