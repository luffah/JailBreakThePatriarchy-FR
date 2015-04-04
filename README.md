#
JailBreakThePatriarchy-FR est un fourchette (version) française de JailBreak The Patriarchy.

Installation (Français)
--------------------------------------------------------------------------------------------------------------
**Pour Firefox (<38):**<br>
Télécharger 'jailbreakthepatriarchy-fr.xpi' et ouvrez-le avec Firefox (double-clic).<br>
<br>
**Pour Chromium ou Chrome :**<br>
Télécharger 'JailBreakThePatriarchy-FR.crx'.<br>
Aller dans l'onglet 'chrome://extensions/'.<br>
Glisser-déposer le fichier dans l'onglet.<br>

**Pour Chromium ou Chrome en mode développeur:** <br>
Récuperer le répertoire source en zip ou  via avec SVN ou GIT.<br>
Aller dans l'onglet 'chrome://extensions/', cocher "Mode développeur".<br>
Avec "Charger l'extension non empactée..." charger le sous-répertoire JailBreakThePatriarchy-FR.<br>

Installation (English)
--------------------------------------------------------------------------------------------------------------
** For Firefox (<38): ** <br>
Download 'jailbreakthepatriarchy-fr.xpi' and open it with Firefox (double-click). <br>
<br>
** For Chromium or Chrome ** <br>
Download 'JailBreakThePatriarchy-FR.crx'.<br>
Go to the tab 'chrome://extensions/'.<br>
Drag and drop the file in the tab. <br>

** For Chromium or Chrome in developer mode: ** <br>
Recover the source directory in zip or via SVN or GIT with. <br>
Go to the tab 'chrome://extensions/", check "developer mode"<br>.
With "Load non-packaged extension..."  load JailBreakThePatriarchy-FR subdirectory.<br>

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

