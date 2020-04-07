console.log("ROOT PROCESS");

var doc = document;
var win = window;
var root = doc.documentElement;

if (window.jQuery) {
    console.log("> jQuery initialized.");
} else {
    console.log("> W: JQuery not initialized.");
}

function scrollportion(elem = window, mode = "deci", direction = "v") {
    console.log("Executing scrollportion().");
    var docheight = root.scrollHeight;
    var winheight = win.innerHeight;
    const scrollable = docheight - winheight;
    var scrolldeci;
    var scrollperc;
    var scrolled;
    
    if (direction == "h" || direction == "horizontal") {
        scrolled = win.scroll;
        console.log("> Window has been horizontally scrolled..." + scrolled + " amount.");
        scrolldeci = scrolled / scrollable;
        console.log("> As a portion, this is " + scrolldeci + " of full capacity...");
        scrollperc = scrolldeci * 100;
        console.log("> or, " + scrollperc + "% of scroll capacity.");
    } else if (direction == "v" || direction == "vertical") {
        scrolled = win.scrollY;
        console.log("> Window has been horizontally scrolled..." + scrolled + " amount.");
        scrolldeci = scrolled / scrollable;
        console.log("> As a portion, this is " + scrolldeci + " of full capacity...");
        scrollperc = scrolldeci * 100;
        console.log("> or, " + scrollperc + "% of scroll capacity.");
    } else {
        console.log("Error: Unargued parameter. Please specify scroll direction.");
    }
    
    if (mode == "decimal" || mode == "deci" || mode == "." || mode == ",") {
        return scrolldeci;
    } else if (mode == "percentage" || mode == "perc" || mode == "%") {
        return scrollperc;
    } else {
        console.log("> E: Unargued parameter. Please specify if you want a decimal or percentage output.");
    }
}

function scrollVertoHoriz(scrollorig, elem) {
    $(scrollorig).mousewheel(function (event, delta) {
        $(elem).scrollLeft -= (delta * 60);
        event.preventDefault();
        });
}