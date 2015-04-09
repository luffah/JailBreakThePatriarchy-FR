#
JailBreakThePatriarchy-FR est une extension pour les navigateurs web <i>Chrome</i> et <i>Firefox</i>.
Il s'agit à l'origine de la version française de <strong>JailBreak The Patriarchy</strong> à laquelle
des options y ont été ajoutées, le code restructuré, et le dictionnaire revu pour traiter la langue française et ses spécificités.

Les extensions <strong>Jail Break The Patriarchy</strong> et équivalentes, ont vocation à apporter une réflexion sur la place du genre féminin/masculin, dans notre langue et dans notre société. Ces extensions doivent donc être considérés comme des oeuvres d'art moderne. Même si les auteurs ont essayé de pousser le code selon leurs compétences respectives, ces extensions ne sont pas des utilitaires exploitant les règles du language de manière infaillible.

Cependant le code est librement accessible aux personnes désirant l'améliorer ou l'exploiter à titre pédagogique (auto-didactes, étudiant-e-s, chercheur-euse-s,...).

Installation (Français)
--------------------------------------------------------------------------------------------------------------
**Pour Firefox (<38):**<br>
Télécharger 'jailbreakthepatriarchy-fr.xpi' et ouvrez-le avec Firefox (double-clic).<br>
<br>
**Pour Firefox (<38) en mode développeur:**<br>
Récuperer le répertoire source en zip ou  via avec SVN ou GIT.<br>
Récupérer le kit de developpement pour Firefox (version en cours d'obsolescence) :
https://developer.mozilla.org/en-US/Add-ons/SDK <br>
Puis en ligne de commande (linux):
```
cd <chemin-vers-le-sdk>/addon-sdk-1.17/
source bin/activate
cd <chemin-vers-le-code-source>/JailBreakThePatriarchy-FR
cfx run
```

**Pour Chromium ou Chrome :**<br>
Télécharger 'JailBreakThePatriarchy-FR.crx'.<br>
Aller dans l'onglet 'chrome://extensions/'.<br>
Glisser-déposer le fichier dans l'onglet.<br>

**Pour Chromium ou Chrome en mode développeur:** <br>
Récuperer le répertoire source en zip ou  via avec SVN ou GIT.<br>
Aller dans l'onglet 'chrome://extensions/', cocher "Mode développeur".<br>
Avec "Charger l'extension non empactée..." charger le sous-répertoire "JailBreakThePatriarchy-FR".<br>

Installation (English)
--------------------------------------------------------------------------------------------------------------
**For Firefox (<38):** <br>
Download 'jailbreakthepatriarchy-fr.xpi' and open it with Firefox (double-click). <br>
<br>
**For Chromium or Chrome** <br>
Download 'JailBreakThePatriarchy-FR.crx'.<br>
Go to the tab 'chrome://extensions/'.<br>
Drag and drop the file in the tab. <br>

**For Chromium or Chrome in developer mode:** <br>
Recover the source directory in zip or via SVN or GIT with. <br>
Go to the tab 'chrome://extensions/", check "developer mode"<br>.
With "Load non-packaged extension..."  load JailBreakThePatriarchy-FR subdirectory.<br>

Fichiers / Files
--------------------------------------------------------------------------------------------------------------
|Fichiers | Description |
| :---| :---|
|./background.html | La page de background qui permet de réaliser des opérations en arrière plan, indépendammant des pages ouvertes. Contient des listeners pour les options avancées. |
|./options.html | La page offrant une interface utilisateur avec les options. |
|./data| Dossier contenant les images |
|./lib| Dossier contenant les scripts de traitement |
|./lib/myscript.js| Script principal contenant la fonction JailBreak(node=document.body,options=voir option.js) |
|./lib/options.js| Script de chargement des options, permet aussi de modifier options si il est chargé par options.html |
|./lib/ressources.js| Définition des lexiques utilisés par myscript.js |

|Fichiers pour Firefox | Description |
| :---| :---|
|./lib/main.js| Script d'intégration de l'extension |
|./package.json| Fichier de définition de l'extension (utilisé par l'outil cfx) |

|Fichiers pour Chromium (ou Chrome) | Description |
| :---| :---|
|./chromium/button.js| Script d'intégration de l'extension |
|./chromium/background.js| Script pour les opérations à réaliser au chargement du navigateur ou en arrière-plan (avec des _listeners_)|
|./manifest.json| Fichier de définition de l'extension (utilisé au moment de charger l'extension) |

Note
--------------------------------------------------------------------------------------------------------------
Aknowledging this program is a fork (even if i found the code was not the best), here the original README.

Informations about English language does not apply.

Original README
--------------------------------------------------------------------------------------------------------------
Chrome extension to swap gendered pronouns and other terms throughout web browsing.

It also adds a "toggle patriarchy" browser action button that reloads the current tab and pauses/unpauses the extension.

Thanks to rictic for adding in the option of setting Jailbreak to randomly turn on and off each day! This option is off by default, but can be turned on by going into chrome://extensions/ and hitting the Options link under Jailbreak the Patriarchy.

***

Known issues:

- Since "her" can be a possessive or objective pronoun, sometimes “her” should translate to “him”, and sometimes it should translate to “his”. Rather than run every node update through some sort of natural language parser, I set up regular expressions with a set of rules that recognize the most common cases where “her” always or usually should translate to “him”, and then one that translates all remaining instances of “her” to “his” instead. What this ultimately means is that sometimes you’re going to see “his” where you really ought to see “him” instead, or vice-versa. If anyone has suggestions on improving this, I'd love to hear them!

- It doesn't include words like "mum", "fellow", "mister", &c, that are often used in entirely non-gendered ways (e.g. "mum's the word", "my fellow americans", "perfume mister"). I haven't thought up a good way around that [yet].

- Some folks say it doesn't work on reddit, others say that it does. It works on reddit for me. More testing and possibly tweaking here.

- Ported by others to Safari (http://code.lardcave.net/entries/2011/12/22/182251/) and Firefox (http://userscripts.org/scripts/show/125685) and as gender-neutral version (https://chrome.google.com/webstore/detail/mmdlclbfhplmbjfefngjbicmelpbbdnh) already, hooray!

- If anyone else wants to create anything else that plays off this, please feel free. I'd appreciate a nod of credit, but that's about it.

***

If you'd just like to use the extension, you can install it automatically:
https://chrome.google.com/webstore/detail/fiidcfoaaciclafodoficaofidfencgd

More information:
http://www.daniellesucher.com/2011/11/jailbreak-the-patriarchy-my-first-chrome-extension/

-------------------------------------------------------------------------------------------------------------------------

