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

/* function definitions */
function grabTouchPosition(e) {
  console.info("Screen has been touched.");
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
          console.log("Scroll position changed to: " + horizontalscroll[i].scrollLeft);
      }
    }
    e.preventDefault();
  }
}

function arrowNav(e) {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    console.warn("No physical keyboard likely to be in use; arrowNav() cannot be run.");
  } else {
    var horizontalscroll = document.getElementsByClassName("horizontalscroll");

    for (var i = 0; i < horizontalscroll.length; i++) {
      console.info("The width that can be scrolled for .horizontallscroll: " + horizontalscroll[i].scrollWidth);
      var childnum = horizontalscroll[i].children.length;
      console.info("Number of .horizontallscroll child elements: " + childnum);
      var widthperchild = horizontalscroll[i].scrollWidth / childnum;
      console.info("Scroll width per child: " + widthperchild);
      var step = widthperchild / 4;
      console.info("Ideal scroll steps: " + step);

      if (e.key == "ArrowRight" && horizontalscroll[i].scrollLeft >= 0 && horizontalscroll[i].scrollLeft < horizontalscroll[i].scrollWidth) {
        console.info("Right arrow key press detected while rightward movement has not been exhausted.");
        console.log("Initiating rightward scroll.");
        horizontalscroll[i].scrollTo(horizontalscroll[i].scrollLeft + step, horizontalscroll[i].scrollTop);
      } else if (e.key == "ArrowLeft" && horizontalscroll[i].scrollLeft != 0) {
        console.info("Left arrow key press detected while leftward movement has not been exhausted.");
        console.log("Initiating leftward scroll.");
        horizontalscroll[i].scrollTo(horizontalscroll[i].scrollLeft + (step * -1), horizontalscroll[i].scrollTop);
      } else if (e.key == "ArrowRight" && horizontalscroll[i].scrollLeft == horizontalscroll[i].scrollWidth) {
        console.info("Right arrow key press detected while rightward movement has been exhausted.");
        console.info("Cannot scroll further right.");
      } else if (e.key == "ArrowLeft" && horizontalscroll[i].scrollLeft == 0) {
        console.info("Left arrow key press detected while leftward movement has been exhausted.");
        console.info("Cannot scroll further left.");
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

    var xDiff = pokecX - cX;
    var yDiff = pokecY - cY;

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

      var shownnum = shown[0];
      var nextnum = shown[1];

      if (typeof slide[nextnum] !== "undefined") {
        console.log("> Iteratively altering element visibility for current and next element.");
        slide[shownnum].className = "slide";
        slide[nextnum].className = "slide show";
        console.info("Now, last element visible was number " + String(shownnum + 1) + ", while current visible element is number " + String(nextnum + 1));
      } else {
        var prevnum = shownnum;
        var newshownnum = prevnum + 1;
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

      var prevnum = shown[0];
      var shownnum = shown[1];

      if (typeof slide[prevnum] !== "undefined") {
        console.log("> Iteratively altering element visibility for current and next element.");
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
    console.info("Screen not yet touched.");
  } else {
    console.warn("Only mouse or stylus events available; slider() cannot be run.");
  }

  pokecX = null;
  pokecY = null;
  pokeXY = null;
  poke = null;
}
