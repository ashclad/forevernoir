console.log("ROOT PROCESS");

if (window.jQuery) {
  console.log("> jQuery initialized.");
} else {
  console.warn("JQuery not initialized.");
}

/* global variables */
var pokecX = null;
var pokecY = null;
var pokeXY = null;
var poke = null;

/* class definitions */
class Swipe {
  constructor(xarray, yarray) {
    console.info("Please prevent default touchmove event behavior either before or after full use of Swipe object.");
    this.xchange = xarray[0] - xarray[1];
    this.ychange = yarray[0] - yarray[1];
  }

  reinitialize (pokeX, pokeY) {
    if (!pokeX && !pokeY) {
      console.log("Unargued parameters for initial touch state with touchstart event.");
    } else if (pokeX == "undefined" && pokeY == "undefined") {
      console.log("Unargued parameters for initial touch state with touchstart event.");
    } else {
      pokeX = null;
      pokeY = null;
    }
  }

  rtl(elem, visibleclass) {
    var shown = new Array();
    var notshown = new Array();

    if (Math.abs(this.xchange) > Math.abs(this.ychange) && this.xchange > 0) {
      // rtl swipe

      for (var i = 0; i < elem.length; i++) {
        var elemClasses = elem[i].className.split(" ");
        if (elemClasses.includes(visibleclass)) {
          shown.push(i);
          shown.push(i + 1);
        } else {
          notshown.push(i);
        }
        notshown.splice(0, 1);
      }

      shownnum = shown[0];
      nextnum = shown[1];

      if (typeof elem[nextnum] !== "undefined") {
        console.log("Iteratively altering element visibility for current and next element.");
        elem[shownnum].className = "slide";
        elem[nextnum].className = "slide show";
        console.info("Now, last element visible was number " + String(shownnum + 1) + ", while current visible element is number " + String(nextnum + 1));
      } else {
        prevnum = shownnum;
        newshownnum = prevnum + 1;
        console.info("Last element visible is number " + String(prevnum) + ", while current visible element is number " + String(newshownnum));
        console.info("No more elements available to alter visibility of.");
      }
    }

    xarray = null;
    yarray = null;
  }

  ltr(elem, visibleclass) {
    var shown = new Array();
    var notshown = new Array();

    if (Math.abs(this.xchange) > Math.abs(this.ychange) && this.xchange < 0) {
      // ltr swipe

      for (var i = 0; i < elem.length; i++) {
        var elemClasses = elem[i].className.split(" ");
        if (elemClasses.includes(visibleclass)) {
          shown.push(i - 1);
          shown.push(i);
        } else {
          notshown.push(i);
        }
        // notshown.splice(0, 1);
      }

      prevnum = shown[0];
      shownnum = shown[1];

      if (typeof elem[prevnum] !== "undefined") {
        console.log("Iteratively altering element visibility for current and next element.");
        elem[shownnum].className = "slide";
        elem[prevnum].className = "slide show";
        console.info("Now, last element visible was number " + String(shownnum + 1) + ", while current visible element is number " + String(prevnum + 1));
      } else {
        prevnum = shown[0] + 2;
        console.info("Current element visible is number " + String(shownnum) + ", while last element is number " + String(prevnum));
        console.info("No more elements available to alter visibility of.");
      }
    }

    xarray = null;
    yarray = null;
  }
}

/* function definitions */
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
  var err;

  if (direction == "h" || direction == "horizontal") {
    scrolled = window.scrollX;
    console.info("Window has been horizontally scrolled... " + scrolled + " amount.");
    scrolldeci = scrolled / scrollableX;
    console.info("As a portion, this is " + scrolldeci + " of full capacity...");
    scrollperc = scrolldeci * 100;
    console.info("...or, " + scrollperc + "% of scroll capacity.");
  } else if (direction == "v" || direction == "vertical") {
    scrolled = window.scrollY;
    console.info("Window has been horizontally scrolled..." + scrolled + " amount.");
    scrolldeci = scrolled / scrollableY;
    console.info("As a portion, this is " + scrolldeci + " of full capacity...");
    scrollperc = scrolldeci * 100;
    console.info("...or, " + scrollperc + "% of scroll capacity.");
  } else {
    err = new Error("Unargued parameter. Please specify scroll direction.");
    console.error(err);
  }

  if (mode == "decimal" || mode == "deci" || mode == "." || mode == ",") {
    return scrolldeci;
  } else if (mode == "percentage" || mode == "perc" || mode == "%") {
    return scrollperc;
  } else {
    var err = new Error("Unargued parameter. Please specify if you want a decimal or percentage output.")
    console.error(err);
  }
}

function grabTouchPosition(e) {
  pokecX = e.touches[0].clientX;
  pokecY = e.touches[0].clientY;
  pokeXY = pokecX/pokecY;
  poke = [pokecX, pokecY, pokeXY];
}

function scrollVertoHoriz(e) {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    console.warn("Only touch events available; scrollVertoHoriz() cannot be run.")
  } else {
    console.info("Detected mousewheel event.");
    console.log("Executing scrollVertoHoriz().");
    var horizontalscroll = document.getElementsByClassName("horizontalscroll");

    for (var i = 0; i < horizontalscroll.length; i++) {
      console.info("The width that can be scrolled for .horizontallscroll: " + horizontalscroll[i].scrollWidth);
      var childnum = horizontalscroll[i].children.length;
      console.info("Number of .horizontallscroll child elements: " + childnum);
      var widthperchild = horizontalscroll[i].scrollWidth / childnum;
      console.info("Scroll width per child: " + widthperchild);
      var step = widthperchild / 4;
      console.info("Ideal scroll steps: " + step);

      if (e.deltaY != 0) {
          console.info("Wheeling detected to deviate from original value.");
          horizontalscroll[i].scrollTo(horizontalscroll[i].scrollLeft + e.deltaY + step * Math.sign(e.deltaY), horizontalscroll[i].scrollTop);
          console.info("Scroll position changed to: " + horizontalscroll[i].scrollLeft);
      }
    }
    e.preventDefault();
  }
}

function slider(e) {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches && pokeXY !== null) {
    var cX = e.touches[0].clientX;
    var cY = e.touches[0].clientY;
    console.info("Touch deviation detected in viewport: " + (cX/cY))
    console.log("Executing slideR().");
    var slide = document.getElementsByClassName("slide");
    var shown = new Array();
    var notshown = new Array();
    var shownnum = null;
    var nextnum = null;
    var prevnum = null;

    var xDiff = pokecX - cX;
    var yDiff = pokecY - cY;

    /* either make a function containing this conditional, to be used here, or
    create a class-- in either case, make sure name is related to finger-swiping */
    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) {
      // rtl swipe

      for (var i = 0; i < slide.length; i++) {
        var slideClasses = slide[i].className.split(" ");
        if (slideClasses.includes("show")) {
          shown.push(i);
          shown.push(i + 1);
        } else {
          notshown.push(i);
        }
        notshown.splice(0, 1);
      }

      shownnum = shown[0];
      nextnum = shown[1];

      if (typeof slide[nextnum] !== "undefined") {
        console.log("Iteratively altering element visibility for current and next element.");
        slide[shownnum].className = "slide";
        slide[nextnum].className = "slide show";
        console.info("Now, last element visible was number " + String(shownnum + 1) + ", while current visible element is number " + String(nextnum + 1));
      } else {
        prevnum = shownnum;
        newshownnum = prevnum + 1;
        console.info("Last element visible is number " + String(prevnum) + ", while current visible element is number " + String(newshownnum));
        console.info("No more elements available to alter visibility of.");
      }

    } else if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) {
      // ltr swipe

      for (var i = 0; i < slide.length; i++) {
        var slideClasses = slide[i].className.split(" ");
        if (slideClasses.includes("show")) {
          shown.push(i - 1);
          shown.push(i);
        } else {
          notshown.push(i);
        }
        // notshown.splice(0, 1);
      }

      prevnum = shown[0];
      shownnum = shown[1];

      if (typeof slide[prevnum] !== "undefined") {
        console.log("Iteratively altering element visibility for current and next element.");
        slide[shownnum].className = "slide";
        slide[prevnum].className = "slide show";
        console.info("Now, last element visible was number " + String(shownnum + 1) + ", while current visible element is number " + String(prevnum + 1));
      } else {
        prevnum = shown[0] + 2;
        console.info("Current element visible is number " + String(shownnum) + ", while last element is number " + String(prevnum));
        console.info("No more elements available to alter visibility of.");
      }

    }
    e.preventDefault();

  } else if (window.matchMedia("(hover: none) and (pointer: coarse)").matches && pokeXY === null) {
    console.info("Waiting for screen touch.");
  } else {
    console.warn("Only mouse or stylus events available; slider() cannot be run.");
  }

  pokecX = null;
  pokecY = null;
  pokeXY = null;
  poke = null;
}
