console.log("ROOT PROCESS");

if (window.jQuery) {
    console.log("> jQuery initialized.");
} else {
    console.log("> W: JQuery not initialized.");
}

function scrollportion(elem, mode = "deci", direction = "v") {
    console.log("Executing scrollportion().");
    var elemheight = $(elem).scrollHeight;
    var winheight = window.innerHeight;
    const scrollable = elemheight - winheight;
    var scrolldeci;
    var scrollperc;
    var scrolled;
    
    if (direction == "h" || direction == "horizontal") {
        scrolled = window.scroll();
        console.log("> Window has been horizontally scrolled... " + scrolled + " amount.");
        scrolldeci = scrolled / scrollable;
        console.log("> As a portion, this is " + scrolldeci + " of full capacity...");
        scrollperc = scrolldeci * 100;
        console.log("> or, " + scrollperc + "% of scroll capacity.");
    } else if (direction == "v" || direction == "vertical") {
        scrolled = window.scroll();
        console.log("> Window has been horizontally scrolled..." + scrolled + " amount.");
        scrolldeci = scrolled / scrollable;
        console.log("> As a portion, this is " + scrolldeci + " of full capacity...");
        scrollperc = scrolldeci * 100;
        console.log("> or, " + scrollperc + "% of scroll capacity.");
    } else {
        console.log("> Error: Unargued parameter. Please specify scroll direction.");
    }
    
    if (mode == "decimal" || mode == "deci" || mode == "." || mode == ",") {
        return scrolldeci;
    } else if (mode == "percentage" || mode == "perc" || mode == "%") {
        return scrollperc;
    } else {
        console.log("> E: Unargued parameter. Please specify if you want a decimal or percentage output.");
    }
}

function scrollVertoHoriz(e) {
    console.log("Executing scrollVertoHoriz");
    console.log("> Detected event " + e + ".");
    console.log("> Grabbing \"." + $(".horizontalscroll").attr("class").split(" ")[1] + "\".");
    if (e.deltaY != 0) {
        $(elem).scroll($(elem).scrollX + e.deltaY * 5, $(elem).scrollY);
        e.preventDefault();
    }
    return;
}