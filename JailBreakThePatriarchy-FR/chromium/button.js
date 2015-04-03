// Fonction pour le fonctionnement du bouton d'activation de l'extension
function set_options_n_process(response) {
    jailbreak(document.body,JSON.parse(response.value));
}
chrome.runtime.sendMessage({name: "isPaused?"}, function(response) {
  if (response.value != 'true') {
   chrome.runtime.sendMessage({name: "getOptions"}, set_options_n_process);
   //Next part cause performance problems... cause of recusivity        
   //~ document.body.addEventListener('DOMNodeInserted', function(event) {
      //~ jailbreak(event.target);
   //~ });
  }
});
