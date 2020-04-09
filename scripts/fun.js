console.log("ROOT PROCESS");

if (window.jQuery) {
    console.log("> jQuery initialized.");
} else {
    console.log("> W: JQuery not initialized.");
}

function scrollportion(elem, direction = "v", mode = "deci") {
    console.log("Executing scrollportion().");
    var elemheight = elem.scrollHeight;
    var elemwidth = elem.scrollWidth;
    var winheight = window.innerHeight;
    var winwidth = window.innerWidth;
    const scrollableY = elemheight - winheight;
    const scrollableX = elemwidth - winwidth;
    var scrolldeci;
    var scrollperc;
    var scrolled;

    if (direction == "h" || direction == "horizontal") {
        scrolled = window.scrollX;
        console.log("> Window has been horizontally scrolled... " + scrolled + " amount.");
        scrolldeci = scrolled / scrollableX;
        console.log("> As a portion, this is " + scrolldeci + " of full capacity...");
        scrollperc = scrolldeci * 100;
        console.log("> or, " + scrollperc + "% of scroll capacity.");
    } else if (direction == "v" || direction == "vertical") {
        scrolled = window.scrollY;
        console.log("> Window has been horizontally scrolled..." + scrolled + " amount.");
        scrolldeci = scrolled / scrollableY;
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
    console.log("!: Detected mousewheel event.");
    console.log("Executing scrollVertoHoriz().");
    var horizontalscroll = document.getElementsByClassName("horizontalscroll")[0];
    console.log("> The width that can be scrolled for .horizontallscroll: " + horizontalscroll.scrollWidth);
    var childnum = horizontalscroll.children.length;
    console.log("> Number of .horizontallscroll child elements: " + childnum);
    var widthperchild = horizontalscroll.scrollWidth / childnum;
    console.log("> Scroll width per child: " + widthperchild);
    var step = widthperchild / 4;
    console.log("> Ideal scroll steps: " + step);
    if (e.deltaY != 0) {
        console.log("> !: Wheeling detected to deviate from original value.");
        horizontalscroll.scrollTo(horizontalscroll.scrollLeft + e.deltaY * step, horizontalscroll.scrollTop);
        console.log("> Scroll position changed to: " + horizontalscroll.scrollLeft);
    }
    e.preventDefault();
}
