//Default options values
var def={ BaliseMotChangeO: '<STRONG>',
          BaliseMotChangeF: '</STRONG>',
          BaliseMotInchangeO: "*",
          BaliseMotInchangeF: '*' ,
          checkDaily : false};

//Stored options values
var startingOptions = JSON.parse(localStorage.getItem("options"));

function set_default_HTML(){
    document.getElementById("checkDaily").checked = startingOptions.checkDaily ;
    document.getElementById("BaliseMotChangeO").value = startingOptions.BaliseMotChangeO;
    document.getElementById("BaliseMotChangeF").value = startingOptions.BaliseMotChangeF;
    document.getElementById("BaliseMotInchangeO").value = startingOptions.BaliseMotInchangeO;
    document.getElementById("BaliseMotInchangeF").value = startingOptions.BaliseMotInchangeF;
}

function setOptions() {
    var options = {
        'checkDaily' : document.getElementById("checkDaily").checked ,
        'BaliseMotChangeO' : document.getElementById("BaliseMotChangeO").value ,
        'BaliseMotChangeF' : document.getElementById("BaliseMotChangeF").value ,
        'BaliseMotInchangeO' : document.getElementById("BaliseMotInchangeO").value ,
        'BaliseMotInchangeF' : document.getElementById("BaliseMotInchangeF").value
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
    if ( startingOptions.BaliseMotChangeO == undefined ) startingOptions.BaliseMotChangeO = def.BaliseMotChangeO;
    if (startingOptions.BaliseMotChangeF == undefined ) startingOptions.BaliseMotChangeF = def.BaliseMotChangeF;
    if (startingOptions.BaliseMotInchangeO == undefined ) startingOptions.BaliseMotInchangeO = def.BaliseMotInchangeO;
    if (startingOptions.BaliseMotInchangeF == undefined ) startingOptions.BaliseMotInchangeF = def.BaliseMotInchangeF;
    if (startingOptions.checkDaily == undefined ) startingOptions.checkDaily = def.checkDaily;
}

// Show the options value
if (document.body.id == "Options"){
    set_default_HTML();
    document.getElementById("Reset").onclick = set_default;
    document.getElementById("checkDaily").onclick = setOptions;
    document.getElementById("BaliseMotChangeO").onchange = setOptions;
    document.getElementById("BaliseMotChangeF").onchange = setOptions;
    document.getElementById("BaliseMotInchangeO").onchange = setOptions;
    document.getElementById("BaliseMotInchangeF").onchange = setOptions;
}

// Stor options for others scripts
localStorage.setItem('options', JSON.stringify(startingOptions));
