console.log("ROOT PROCESS");

if (window.jQuery) {
  console.log("> jQuery initialized.");
} else {
  console.warn("JQuery not initialized.");
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

function grabTouchPosition(e) {
  pokecX = e.touches[0].clientX;
  pokecY = e.touches[0].clientY;
  pokeXY = pokecX/pokecY;
  poke = [pokecX, pokecY, pokeXY];
}

function slider(e) {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    var cX = e.touches[0].clientX;
    var cY = e.touches[0].clientY;
    console.info("Touch deviation detected in viewport: " + (cX/cY))
    console.log("Executing slideR().");
    var slide = document.getElementsByClassName("slide");
    var shown = new Array();
    var notshown = new Array();

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
      console.log("Iteratively altering element visibility for current and next element.");
      slide[shownnum].className = "slide";
      slide[nextnum].className = "slide show";
      console.info("Now, last element visible was number " + String(shownnum + 1) + ", while current visible element is number " + String(nextnum + 1));
    } else {
      var shownnum = shown[0];
      var prevnum = shown[0] - 1;
      console.info("Last element visible is number " + String(prevnum + 1) + ", while current visible element is number " + String(shownnum + 1));
      console.info("No more elements available to alter visibility of.");
    }
    e.preventDefault();
  } else {
    console.warn("Only mouse or stylus events available; slider() cannot be run.");
  }
}
