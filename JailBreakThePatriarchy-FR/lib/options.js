//Default options values
var def={ BaliseMotChange: '<STRONG title="$1">$2</STRONG>',
          BaliseMotInchange: "*$1*",
          checkDaily : false};

//Stored options values
var startingOptions = JSON.parse(localStorage.getItem("options"));

function set_default_HTML(){
    document.getElementById("checkDaily").checked = startingOptions.checkDaily ;
    document.getElementById("BaliseMotChange").value = startingOptions.BaliseMotChange;
    document.getElementById("BaliseMotInchange").value = startingOptions.BaliseMotInchange;
}

function setOptions() {
    var options = {
        'checkDaily' : document.getElementById("checkDaily").checked ,
        'BaliseMotChange' : document.getElementById("BaliseMotChange").value ,
        'BaliseMotInchange' : document.getElementById("BaliseMotInchange").value
    };
    chrome.runtime.sendMessage({name: "setOptions", options: JSON.stringify(options)});
}

function set_default(){
    console.log("Setting default options");
    startingOptions = def;
    set_default_HTML();
    setOptions();
}

// Set the default values
if (startingOptions == undefined){
    startingOptions = def;
} else {
    if ( startingOptions.BaliseMotChange == undefined ) startingOptions.BaliseMotChange = def.BaliseMotChange;
    if (startingOptions.BaliseMotInchange == undefined ) startingOptions.BaliseMotInchange = def.BaliseMotInchange;
    if (startingOptions.checkDaily == undefined ) startingOptions.checkDaily = def.checkDaily;
}

// Show the options value
if (document.body.id == "Options"){
    set_default_HTML();
    document.getElementById("Reset").onclick = set_default;
    document.getElementById("checkDaily").onclick = setOptions;
    document.getElementById("BaliseMotChange").onchange = setOptions;
    document.getElementById("BaliseMotInchange").onchange = setOptions;
}

// Stor options for others scripts
localStorage.setItem('options', JSON.stringify(startingOptions));
