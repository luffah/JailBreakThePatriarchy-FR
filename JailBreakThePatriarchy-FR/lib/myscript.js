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
var bracket_sw=["o_jailbreak_begin/jailbreak_old/o","o/end_jailbreak_o","o/jailbreak_new/o"];
var bracket_nosw=["jailbreak_nochange/","/nochange_jailbreak"];
var re_expr_sw =new RegExp( bracket_sw[0] + "([ " + wcharset + wbindset + "]+)" +  bracket_sw[2] + "([ " + wcharset + wbindset + "]+)" +  bracket_sw[1] ,'ig');
var re_expr_nosw =new RegExp( bracket_nosw[0] + "([ " + wcharset + wbindset + "]+)" + bracket_nosw[1] ,'ig');
function post_processing_innerHTML(body,options){
  //~ if (body == undefined) return ;
  //~ if (body.innerHTML == undefined) return ;
  body.innerHTML = body.innerHTML.replace(re_expr_sw,options.BaliseMotChange);
  body.innerHTML = body.innerHTML.replace(re_expr_nosw,options.BaliseMotInchange);
}

// Normalise les caractères
function pre_processing_text(text){
  return text.split('’').join('\'');
}

var reBindSet=new RegExp('['+wbindset+']','ig');
var reLowerCase=new RegExp('['+wcharset.toLowerCase()+']$','');
var reUpperCase=new RegExp('['+wcharset.toUpperCase()+']$','');

//Fonction qui gere la casse des mots dans un n-gramme
function matchCase(old_word, replacement) {
  if (replacement.toLowerCase() == old_word.toLowerCase()) return old_word;
  
  var ret;//Variable resultat
  var t_bindset =replacement.getCharIndexes(wbindset);//Récupère les caractères de liaisons pour les ignorer
  replacement=replacement.replace(reBindSet,' ');// Suppression des caractères de liaisons
  old_word=old_word.replace(reBindSet,' ');// Suppression des caractères de liaisons

  //~ console.log("=matchCase="+old_word+"->"+replacement);

  //On met tous les mots dans un tableau
  var t_old_word = old_word.split(' ');
  var t_replacement= replacement.split(' ');
  if (t_old_word.length != t_replacement.length){
    //place autant de mots pour les deux groupes (on suppose que le dernier mot est suceptible d'etre en lettre capitale, donc on ajoute des mots fantomes avant les autres)
    while (t_old_word.lengh > t_replacement.length) t_replacement.unshift(mot_fantom);
    while (t_old_word.lengh < t_replacement.length) t_old_word.unshift(mot_fantom);

    //~ return "!"+t_replacement.join(' ')+"!";// uncomment this to debug
  }
  for(var i=0; i<t_old_word.length; i++){
    if (t_replacement[i].toLowerCase() == t_old_word[i].toLowerCase()){
        t_replacement[i]=t_old_word[i];
    } else {
      if (reLowerCase.test( t_old_word[i].charAt(0) )){
          t_replacement[i]=t_replacement[i].toLowerCase();
      } else {
        if (reUpperCase.test( t_old_word[i].charAt(1) )) ret=t_replacement[i].toUpperCase();
        else t_replacement[i]=t_replacement[i].charAt(0).toUpperCase() + t_replacement[i].slice(1).toLowerCase();;
      }
    }
  }
  // Reconstuction de la chaine de charactères
  ret=t_replacement.join(' ');
  for(var i=0; i<t_bindset.length; i++){// remet les caractères de liaisons
      ret=ret.setCharAt(t_bindset[i][0],t_bindset[i][1]);
  }
  return bracket_sw[0] + old_word +  bracket_sw[2] + ret.replace(' ' + mot_fantom +' ',' ')  + bracket_sw[1]  ;
}

//~ A faire ? -> var dernier_genre; // détection du genre changé pour déterminer la substitution suivante dans la phrase

// Définition des critères de modification des mots -> si le mot est connu du dictionnaire
var reDico = new RegExp('^('+ concatString(map) + ')$', 'i');
var reDicoSingulier = new RegExp('^('+ concatString(map_singulier) + ')$', 'i');
var reDicoPluriel = new RegExp('^('+ concatString(map_pluriel) + ')$', 'i');
var reLastcharNotInWord=new RegExp('[^'+wcharset+']$','i');
var reFirstcharNotInWord=new RegExp('^[^'+wcharset+']','i');
var reModAvoir=new RegExp('^('+verb_avoir.join('|')+')$','');
var rePronoms=new RegExp('^('+pronoms_singulier.join('|')+pronoms_pluriel.join('|')+')$','i');
var rePronomsSingulier=new RegExp('^('+pronoms_singulier.join('|')+')$','i');
var rePronomsPluriel=new RegExp('^('+pronoms_pluriel.join('|')+')$','i');
var rePrepositions= new RegExp('^('+prepositions.join('|')+')$','i');

// Définition du format des mots à traiter
var reMatchWord=new RegExp('[^'+ wcharset + wbindset + ']?' + '('+ //début de mot
      '('+verb_avoir.join('|')+')' + '[ ]+' + '(('+mot_negation.join('|')+')[ ]+)?'+'['+ wcharset + wbindset + ']{2,}'+ '|' + // les mots/verbes conjugués avec avoir pour ne pas y toucher
      '('+pronoms_singulier.join('|')+pronoms_pluriel.join('|')+')' + '[ ]+' +'['+ wcharset + wbindset + ']{2,}'+ '|' + // les noms précédés de pronoms
      '('+concatString(map_sujet)+ ')' + '|' + // sujets composé "de lui" "d'elle"...
      '('+pronoms_l_apo.join('|')+')' +'['+ wcharset + ']{2,}'+ '|' + // les noms précédés de l'
      '['+ wcharset + ']['+ wcharset + wbindset + ']+' + // n'importe quel mot (incluant les charactères d'union)
      ')' + '[^'+ wcharset + wbindset + ']?', 'ig'); //fin de mot (on détecte n'importe quel caractère qui ne doit pas appartenir aux mots) 

//Fonction qui remplace un mot par un autre en utilisant la fonction matchCase
function swapWord(word) {
  //~ return '^'+word+'$'; // uncomment this to debug the regex in genderswap (reMatchWord)
  //~ var debug=(/(une femme)/ig.test(word)); //debug au cas par cas
  var pre="";
  var suf="";
  word=word.replace(/\s+/g," ");
  if (reFirstcharNotInWord.test(word)){
      pre=word.substring(0,1);
      word=word.substring(1,word.length);
  }
  if (reLastcharNotInWord.test(word)){
      suf=word.substring(word.length - 1,word.length);
      word=word.substring(0,word.length - 1);
  }

  var word_lc=word.toLowerCase();
  if (reDico.test(word_lc)){
    return pre + matchCase(word, findMatch(word_lc)) + suf;
  }
  
  var t=word_lc.split(' ');
  if (reModAvoir.test(t[0])){
    return pre + bracket_nosw[0] + word + bracket_nosw[1] + suf;
  }

  if (t.length > 1){ //gère les mots inscrits comme cas particuliers et les pronoms sur deux mots
    var rep=[];
    var tmp_txt;
    var rep_ok=false;// substitution trouvée
    var rep_singulier=false;// test si c'est un cas particulier au singulier
    var rep_pluriel=false;// test si c'est un cas particulier au pluriel
    var rep_alt=false;// le nom ne fait pas partie des cas particulier
    //~ if (debug) console.log("-"+word+"-("+t.length+" mots) : -"+t[0]+"-"+t[1]+"-...-"+t[t.length-1]+"-");
    if (rePrepositions.test(t[0])){// cas "de ..."
        //~ if (debug)  console.log("groupe preposition : "+ word);
        if (t.length > 2){ // découpage "de - la femme"
          tmp_txt=t[1] + " " + t[2]; 
        } else {// découpage "de - l'homme"
          tmp_txt=t[1];
        }
        if (reDico.test(tmp_txt)) {
            rep[0]=t[0];
            rep[1]=findMatch(tmp_txt);
            rep_ok=true;
        }
    }
    if ( rep_ok ) return pre + matchCase(word, rep.join(' ')) + suf;  
    if (t.length > 2){// cas "de la" (groupe pronom)<-> "du" 
      tmp_txt=t[0] + " " + t[1]; 
      if (rePronomsSingulier.test(tmp_txt)) rep_singulier=true;
      else if (rePronomsPluriel.test(tmp_txt)) rep_pluriel=true;
      //~ else if (debug)  console.log("pronom seul ? "+ word + " : -"+t[0]+'-');

      if (reDico.test(tmp_txt)) {//cas " -> du"
        //~ if (debug)  console.log("pronom composé dans -" + word + "- : -"+tmp_txt+'-');
        rep[0]=findMatch(tmp_txt);
        rep[1]=mot_fantom;
      } else {//cas " de son -> de sa "
        //~ if (debug)  console.log("pronoms en groupe dans  -" + word + "- : -"+tmp_txt+'-');
        rep[0]=t[0].replace(reDico, findMatch);
        rep[1]=t[1].replace(reDico, findMatch);
      }
    } else {//cas en 2 parties " un - fils -> une - fille " 
      rep[0]=t[0].replace(reDico, findMatch);
      if (rePronomsSingulier.test(t[0])) rep_singulier=true;
      else if (rePronomsPluriel.test(t[0])) rep_pluriel=true;
    }
    if (rep_singulier){
      //~ if (debug)  console.log("groupe singulier : "+ word);
      if (reDicoSingulier.test(t[t.length-1])){
        rep[t.length-1]=findMatchSingulier(t[t.length-1]);
        rep_ok=true;
      } else rep_alt=true;
    } else if (rep_pluriel){
      //~ if (debug)  console.log("groupe pluriel : "+ word);
      if (reDicoPluriel.test(t[t.length-1])){
        rep[t.length-1]=findMatchPluriel(t[t.length-1]);
        rep_ok=true;
      } else rep_alt=true;
    }
    if ( (rep_alt) && (reDico.test(t[t.length-1])) ){// on ne change le groupe (rep_ok) que si on trouve une traduction
      rep[t.length-1]=findMatch(t[t.length-1]);
      rep_ok=true;
    }
    if ( rep_ok ) return pre + matchCase(word, rep.join(' ')) + suf;
  }
  return pre + word + suf;
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
   current.textContent = genderswap(pre_processing_text(current.textContent)); // appel à la fonction de transformation
  }
  post_processing_innerHTML(node,options_hash);
}
