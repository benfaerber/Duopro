// ==UserScript==
// @name     DuolingoMods
// @version  1
// @grant    none
// @include  https://www.duolingo.com/*
// ==/UserScript==

// This uses GreaseMonkey for Firefox
// It should work on other JavaScript injection add-ons

// For English interface set this as true
// I have translated the interface into German, set to false to use my translation
var interfaceEnglish = true;

// To translate into your language just translate the array.
// I am learning German so I translated it into that
var engText = [
  "Ben's Duopro",
  "Light",
  "Dark",
  "Show Gold",
  "Hide Gold"
];

// Modify this to whatever language you want to use
var otherText = [
  "Duopro von Ben",
  "Licht",
  "Dunkel",
  "Zeige Gold",
  "Verbergen Gold"
];

var lang;

if (interfaceEnglish)
{
	lang = engText; 
}
else
{
	lang = otherText; 
}

//These variables control the 2 settings of the extention
var hideGold = false;
var darkMode = false;

//The CSS to inject for dark mode
var darkCSS = `
html, html * {
    color: #eeeeee !important;
    background-color: #222222 !important;
}

img {
    color: #fff !important;
    background-color: #fff !important;
}

img, video {
    z-index: 1
}

* {
    border-color: #666 !important
}

cite, cite * {
    color: #029833 !important
}

:link, :link * {
    color: #E4E4E4 !important
}

input, textarea {
    background-color: #333333 !important
}

a {
    background-color: rgba(255, 255, 255, 0.01) !important
}

:visited, :visited * {
    color: #E4E4E4 !important
}

html, body, input, select, button {
    background-image: none !important
}

._6t5Uh {
    background: #222222;
    background-color: #222222 !important;
}

circle._9NbGE {
    display: none;
}

path._9NbGE {
    display: none;
}
`;

var x;

// Inject custom style to hide annoying pointless features
var custom = document.createElement('style');
custom.innerHTML = `
div[class='LN_aF _1E3L7']{
    display: none !important;
}
`;
document.body.appendChild(custom);

// This injects the Duopro panel
x = document.getElementsByClassName("a5SW0");
x[0].innerHTML = `<h2>` + lang[0] + `</h2>
<div class="_1m5BS _2tSPu">
	<button id="toggleGold" class="_1V9bF _1AthD B1eV7 _1lig4 _3IS_q">` + lang[3] + `</button>
</div>
<div class="_27HOo _2tSPu">
	<button id="toggleDark" class="_1V9bF _1AthD B1eV7 _1lig4 _3IS_q">` + lang[1] + `</button>
</div></div>
`;
x[1].outerHTML = "";

// Adds a link to the 'Stories' section of Duoloingo
x = document.getElementsByClassName("zDDkq");
x[0].innerHTML += "<li class='_2rS3d'><a data-test='labs-nav' class='_2QyU5' href='https://stories.duolingo.com/'>Stories</a></li>";


//Controls toggling the gold skill on and off
goldButton=document.getElementById("toggleGold");
goldButton.addEventListener("click", ToggleGold, false);

var goldText = "a[data-test='gold skill-tree-link']{display: none !important;}div[data-test='skill-tree'] > div > button[disabled]{display: none !important;}div[class='_1H-7I _2GJb6 _1--zr']{display: none !important;}";
var gold = document.createElement("style");
gold.id = "insertStyle";

document.getElementsByTagName("head")[0].appendChild(gold);
ToggleGold();
function ToggleGold()
{
	if (!hideGold)
  {
    document.getElementById("insertStyle").innerHTML = goldText;
    goldButton.innerHTML = lang[4];
    hideGold = true;
  }
  else
  {
  	document.getElementById("insertStyle").innerHTML = "";
    goldButton.innerHTML = lang[3];
    hideGold = false;
  }
}

//Toggle dark mode
darkButton=document.getElementById("toggleDark");
darkButton.addEventListener("click", ToggleDark, false);
var dark = document.createElement('style');
document.body.appendChild(dark);

function ToggleDark()
{
  if (!darkMode)
  {
    dark.innerHTML = "";
		darkButton.innerHTML = lang[1];

    x = document.getElementsByClassName("_3Ttma");
    x[0].innerHTML = "<svg height=\"150\" version=\"1.1\" width=\"150\" xmlns=\"http:www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"overflow: hidden; position: relative; left: -0.5px;\"><desc>Created with Raphaël 2.2.0</desc><defs><linearGradient id=\"92r4160-_fcc34b:20-_fe922e\" x1=\"0\" y1=\"1\" x2=\"0.577350269189626\" y2=\"0\" gradientTransform=\"matrix(1,0,0,1,0,0)\"><stop offset=\"20%\" stop-color=\"#fcc34b\" stop-opacity=\"1\"></stop><stop offset=\"100%\" stop-color=\"#fe922e\" stop-opacity=\"1\"></stop></linearGradient></defs><circle cx=\"75\" cy=\"75\" r=\"75\" fill=\"#e2e2e2\" stroke=\"#ffffff\" style=\"\"></circle><path style=\"opacity: 1; fill-opacity: 1;\" fill=\"url('https://www.duolingo.com/#92r4160-_fcc34b:20-_fe922e')\" stroke=\"#ffffff\" d=\"M75,75L74.99999999999999,0A75,75,0,0,1,74.99999999999999,0Z\" opacity=\"1\" fill-opacity=\"1\"></path><path style=\"\" fill=\"#e2e2e2\" stroke=\"#ffffff\" d=\"M75,75L74.99999999999999,0A75,75,0,1,1,74.99999999999999,0Z\"></path><circle cx=\"75\" cy=\"75\" r=\"64\" fill=\"#ffffff\" stroke=\"#ffffff\" style=\"\"></circle></svg>";
    darkMode = true;
  }
  else
  {
    dark.innerHTML = darkCSS;
		darkButton.innerHTML = lang[2];
    
    x = document.getElementsByClassName("_3Ttma");
    x[0].innerHTML = "<svg height=\"150\" version=\"1.1\" width=\"150\" xmlns=\"http:www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"overflow: hidden; position: relative; left: -0.5px;\"><defs><linearGradient id=\"6z0np60-_fcc34b:20-_fe922e\" x1=\"0\" y1=\"1\" x2=\"0.577350269189626\" y2=\"0\" gradientTransform=\"matrix(1,0,0,1,0,0)\"><stop offset=\"20%\" stop-color=\"#fcc34b\" stop-opacity=\"1\"></stop><stop offset=\"100%\" stop-color=\"#fe922e\" stop-opacity=\"1\"></stop></linearGradient></defs></svg>";
    darkMode = false;
  }
}