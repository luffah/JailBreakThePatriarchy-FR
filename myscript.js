// see ressources.js for the hash tables
//  -> map : any words or n-gram which can be directly remplaced 
//  -> map_singulier : any words (singular - after 'le', 'la', 'un'..) which are particular cases
//  -> map_pluriel : any words (pluriel - after 'les', 'des'..) which are particular cases

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

// Définition des critères de modification des mots -> si le mot est connu du dictionnaire
var searchFor = new RegExp('^('+ concatString(map) + ')$', 'ig');
var searchForSingulier = new RegExp('^('+ concatString(map_singulier) + ')$', 'ig');
var searchForPluriel = new RegExp('^('+ concatString(map_pluriel) + ')$', 'ig');

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

//Fonction qui remplace un mot par un autre en utilisant la fonction matchCase
function swapWord(word) {
  //~ return '^'+word+'$'; // uncomment this to debug the regex in genderswap 
  var suf="";

  if (/[^0-9_a-zâêîôûäëïöüéèà]$/ig.test(word)){
      suf=word.substring(word.length - 1,word.length);
      word=word.substring(0,word.length - 1);
  }
  var t=word.split(' ');
  if (/^(a|ont|eu|ai|as|avez|avons|avait|avaient|avais)$/.test(t[0])){
    return bracket_nosw[0] + word + bracket_nosw[1] + suf;
  }
  if (t.length == 2){ //gère les mots inscrits comme cas particuliers
    if (/^(un|une|le|la|son|sa|votre|leur)$/i.test(t[0])){
      if (searchForSingulier.test(t[1])){
          return matchCase(word,
                          t[0].toLowerCase().replace(searchFor, findMatch) +
                          ' ' + t[1].toLowerCase().replace(searchForSingulier, findMatchSingulier)) + suf;
      } else if (searchFor.test(t[1])) {
          return matchCase(word,
                          t[0].toLowerCase().replace(searchFor, findMatch) +
                          ' ' + t[1].toLowerCase().replace(searchFor, findMatch)) + suf;
      }
    } else if (/^(des|les|ses|vos|leurs)$/i.test(t[0])){
      if (searchForPluriel.test(t[1])){
          return matchCase(word,
                          t[0] + ' '
                          + t[1].toLowerCase().replace(searchForPluriel, findMatchPluriel)) + suf;
      } else if (searchFor.test(t[1])) {
          return matchCase(word,
                          t[0].toLowerCase().replace(searchFor, findMatch) +
                          ' ' + t[1].toLowerCase().replace(searchFor, findMatch)) + suf;
      }
    }
  }
  return matchCase(word, word.toLowerCase().replace(searchFor, findMatch))+ suf;
}

function genderswap(text) {
  return text
     .replace(/\b((a|ont|eu|ai|as|avez|avons|avait|avaient|avais)[ ](pas[ ])?[a-zâêîôûäëïöüéèà][a-zâêîôûäëïöüéèà]+|(le|la|les|un|une|des|sa|son|ses|vos|votre)[ ]+[a-zâêîôûäëïöüéèà][a-zâêîôûäëïöüéèà]+|[a-zâêîôûäëïöüéèà][a-zâêîôûäëïöüéèà\']+)[^0-9_a-zâêîôûäëïöüéèà]?/gi, swapWord)
}

// Fonction de recherche des mots pour les traduire (= genderswap();)
function jailbreak(node,options_hash){
  var treeWalker = document.createTreeWalker(
     node,
     NodeFilter.SHOW_TEXT,
     null,
     false
  );
  while(treeWalker.nextNode()) {
   var current = treeWalker.currentNode;
   current.textContent = genderswap(current.textContent);
  }
  post_processing_innerHTML(node,options_hash);
}
