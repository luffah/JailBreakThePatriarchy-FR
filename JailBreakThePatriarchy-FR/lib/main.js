var tabs = require("sdk/tabs");
var { ToggleButton } = require("sdk/ui/button/toggle");
var { ActionButton } = require("sdk/ui/button/action");


function degenre(tab){
	tab.attach({
		contentScript: 'document.body.style.border = "5px solid red";'
	});
	tab.attach({
		contentScriptFile: ["../lib/options.js", "../lib/ressources.js", "../lib/myscript.js" ],
		contentScript : "jailbreak(document.body,startingOptions);"
	});
}

var button = ToggleButton({  id: "my-button",
	label: "Dégenrer cette page",
	icon: {
		"16": "./icon16.png",
		"19": "./icon19.png",
		"32": "./icon32.png",
		"48": "./icon48.png",
		"64": "./icon64.png",
		},
	onChange: function(state) {
			if (state.checked) {
				tabs.on('ready', degenre);
				tabs.activeTab.reload();
				degenre(tabs.activeTab);
			} else {
				tabs.removeListener('ready', degenre);
				tabs.activeTab.reload();
			}
			
		}
	})
//~ var button = ActionButton({  id: "my-button",
	//~ label: "Dégenrer cette page",
	//~ icon: {
		//~ "16": "./icon16.png",
		//~ "19": "./icon19.png",
		//~ "32": "./icon32.png",
		//~ "48": "./icon48.png",
		//~ "64": "./icon64.png",
		//~ },
	//~ onClick: function(state) { degenre(tabs.activeTab); }
//~ });
