console.info("ROOT PROCESS initialized.");
console.log("Checking for jQuery...");

if (window.jQuery) {
  console.log("jQuery detected.");
} else {
  console.warn("No jQuery detected.");
}

/* global variables */

/* object definitions */
let Poke = {
  pokeX: null,
  pokeY: null,
  pokeXY: null
};

let TrackedStatus = {
  offset: {status: false, degree: null},
  seqfocus: {index: null}
}

/* class definitions */

/* function definitions */
function grabTouchPosition(e) {
  console.info("grabTouchPosition() execution initialized.");
  console.info("Screen has been touched.");
  Poke.pokeX = e.touches[0].clientX;
  Poke.pokeY = e.touches[0].clientY;
  Poke.pokeXY = Poke.pokeX/Poke.pokeY;
}

function grabElemPosition(elem) {
  console.info("grabElemPosition() execution initiated.");
  var location = elem.getBoundingClientRect();
  positionX = location.left;
  positionY = location.top;
  if (elem.id) {
    var name = elem.id;
    var info = "Location for " + name + " is " + positionX + " pixels from the left and " + positionY + " pixels from the top.";
  } else {
    var name = elem.className;
    var info = "Location for " + name + " is " + positionX + " pixels from the left and " + positionY + " pixels from the top.";
  }
  console.info(info);
  var located = {name: name, x: positionX, y: positionY};
  console.log("Array for element coordinates relative to top-left has been produced: ");
  console.log(located);
  return located;
}

function resizestatus() {
  if (new Date() - starttime < timeoutnum) {
    setTimeout(resizestatus, timeoutnum);
  } else {
    resizing = false;
    offsetChange();
  }
}

// remember to use onload anonymous function in next two functions for elements whose dimension and position info is needed
function queueSeq(elemcollection, exceptionid, direction="forward") {
  console.info("queueSeq() execution initiated.");
  var log;
  if (direction == "back" || direction == "b" || direction == "backward" || direction == "B") {
    var output = queueSeqBackward(elemcollection, exceptionid);
    log = "Array for tracking a queue of elements in reverse sequential order has been produced: ";
  } else if (direction == "forward" || direction == "f" || direction == "F") {
    var output = queueSeqForward(elemcollection, exceptionid);
    log = "Array for tracking a queue of elements in sequential order has been produced: ";
  } else {
    console.warn("Unargued necessary parameter; using default value.");
    var output = queueSeqForward(elemcollection, exceptionid);
    log = "Array for tracking a queue of elements in sequential order has been produced: ";
  }
  console.log(log);
  console.log(output);
  return output;
}

function queueSeqForward(elemcollection, exceptionid) {
  console.info("queueSeqForward() execution initiated.");
  var upperbound = elemcollection.length - 1;
  var lowerbound = 0;
  var focused_num = new Array(1);
  var after_num = new Array(1);
  var unfocused_num = new Array();

  for (var i = 0; i < elemcollection.length; i++) {
    if (elemcollection[i].id == exceptionid) {
      focused_num[0] = i;
      if (i < upperbound) {
        after_num[0] = i + 1;
      } else {
        after_num[0] = i;
      }
    } else {
      unfocused_num.push(i);
    }
  }
  var afterindex = unfocused_num.indexOf(after_num[0]);
  unfocused_num.splice(afterindex, 1);

  var output = new Array();
  output["focused"] = focused_num;
  output["next"] = after_num;
  output["unfocused"] = unfocused_num;

  //console.log("Array for tracking a queue of elements has been produced: ");
  //console.log(output);
  return output;
}

function queueSeqBackward(elemcollection, exceptionid) {
  console.info("queueSeqBackward() execution initiated.");
  var upperbound = elemcollection.length - 1;
  var lowerbound = 0;
  var focused_num = new Array(1);
  var after_num = new Array(1);
  var unfocused_num = new Array();

  for (var i = 0; i < elemcollection.length; i++) {
    var reversecount = upperbound - i;
    if (elemcollection[reversecount].id == exceptionid) {
      focused_num[0] = reversecount;
      if (reversecount < upperbound && reversecount > 0) {
        after_num[0] = reversecount - 1;
      } else {
        after_num[0] = reversecount;
      }
    } else {
      unfocused_num.push(reversecount);
    }
  }
  var afterindex = unfocused_num.indexOf(after_num[0]);
  unfocused_num.splice(afterindex, 1);

  var output = new Array();
  output["focused"] = focused_num;
  output["prev"] = after_num;
  output["unfocused"] = unfocused_num;

  //console.log("Array for tracking a queue of elements has been produced: ");
  //console.log(output);
  return output;
}

function offsetChange() {
  var strip = document.getElementsByClassName("comicstrip")[0];
  var panels = document.getElementsByClassName("comic panel");
  var logo = document.getElementById("mainlogo");

  if (TrackedStatus.offset.status === true) {
    //console.warn("offsetChange() has aleady been run and can only be run once.");
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      console.warn("Only touch events available; offsetChange() cannot be run.");
    } else {
      console.info("offsetChange() execution resumed based on last logged offset.");
      // do something
    }
  } else {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      console.warn("Only touch events available; offsetChange() cannot be run.");
    } else {
      console.info("offsetChange() execution initiated.");
      var logoleft = grabElemPosition(logo).x;
      var queuef = queueSeq(panels, "focus", "f");
      var focus = queuef["focused"][0];
      TrackedStatus.seqfocus.index = focus;
      console.log(panels[focus]);

      var stripwidth = strip.clientWidth;
      var focuswidth = panels[focus].clientWidth;
      var focuspad = (panels[focus].offsetWidth - focuswidth)/2;
      var focushalf = focuswidth/2;
      var focusleft = panels[focus].offsetLeft;
      var focusabsleft = grabElemPosition(panels[focus]).x;
      var stripleft = strip.offsetLeft;
      /* maybe make conditional within else-clause primary conditional with
      code of its parent conditional's first block as its else-block code? */
      if (focus == 0) {
        var leftover = stripleft + focusleft;
        var leftfactor = (logoleft - leftover) - (focushalf - leftover);
      } else {
        if (focusabsleft >= window.innerWidth) {
          var leftover = ((focusabsleft + focushalf) * -1);
          console.log(leftover);
          var leftfactor = logoleft + leftover;
        }
      }

      strip.style.left = leftfactor + "px";
      TrackedStatus.offset.degree = strip.style.left;
      TrackedStatus.offset.status = true;
    }
  }
  console.info("offsetChange() terminated.");
}

/*function scrollVertoHoriz(e) {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    console.warn("Only touch events available; scrollVertoHoriz() cannot be run.")
  } else {
    console.info("Detected mousewheel event.");
    console.log("Executing scrollVertoHoriz().");
    var horizontalscroll = document.getElementsByClassName("horizontalscroll");
    var subelem;
    var childnum;

    for (var i = 0; i < horizontalscroll.length; i++) {
      console.info("The width that can be scrolled for .horizontallscroll: " + horizontalscroll[i].scrollWidth);
      subelem = document.getElementsByClassName("comicstrip");
      for (var f = 0; f < subelem.length; f++) {
        childnum = subelem[f].children.length;
      }
      console.info("Number of .horizontallscroll child elements: " + childnum);
      var widthperchild = horizontalscroll[i].scrollWidth / childnum;
      console.info("Scroll width per child: " + widthperchild);
      var step = widthperchild / 5;
      console.info("Ideal scroll steps: " + step);

      if (e.deltaY != 0) {
        console.info("Wheeling detected to deviate from original value.");
        var direction = Math.sign(e.deltaY);
        // scrollLeft comparison to value rather than variable is temporary
        horizontalscroll[i].scrollTo(horizontalscroll[i].scrollLeft + e.deltaY + step * direction, horizontalscroll[i].scrollTop);
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
    console.log(e);
    var horizontalscroll = document.getElementsByClassName("horizontalscroll");
    var childnum;
    var subelem;

    for (var i = 0; i < horizontalscroll.length; i++) {
      console.info("The width that can be scrolled for .horizontallscroll: " + horizontalscroll[i].scrollWidth);
      subelem = document.getElementsByClassName("comicstrip");
      for (var f = 0; f < subelem.length; f++) {
        childnum = subelem[f].children.length;
      }
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
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches && Poke.pokeXY !== null) {
    var cX = e.touches[0].clientX;
    var cY = e.touches[0].clientY;
    console.info("Touch deviation detected in viewport: " + (cX/cY))
    console.log("Executing slideR().");
    var slide = document.getElementsByClassName("slide");
    var shown = new Array();
    var notshown = new Array();

    var xDiff = Poke.pokeX - cX;
    var yDiff = Poke.pokeY - cY;

    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) {
      // rtl swipe
      for (var f = 0; f < slide.length; f++) {
        var slideClasses = slide[f].className.split(" ");
        if (slideClasses.includes("show")) {
          shown.push(f);
          shown.push(f + 1);
        } else {
          notshown.push(f);
        }
        notshown.splice(0, 1);
      }

      var shownnum = shown[0];
      var nextnum = shown[1];

      if (typeof slide[nextnum] !== "undefined") {
        console.log("> Iteratively altering element visibility for current and next element.");
        slide[shownnum].className = "slide";
        slide[nextnum].className = "slide show";
        slide[nextnum].style.animation = "slidingleft 2s forwards";
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
        slide[prevnum].style.animation = "slidingright 2s forwards";
        console.info("Now, last element visible was number " + String(shownnum + 1) + ", while current visible element is number " + String(prevnum + 1));
      } else {
        prevnum = shown[0] + 2;
        console.info("Current element visible is number " + String(shownnum) + ", while last element is number " + String(prevnum));
        console.info("No more elements available to alter visibility of.");
      }
    }
    e.preventDefault();
  } else if (window.matchMedia("(hover: none) and (pointer: coarse)").matches && Poke.pokeXY === null) {
    console.info("Screen not yet touched.");
  } else {
    console.warn("Only mouse or stylus events available; slider() cannot be run.");
  }

  Poke.pokeX = null;
  Poke.pokeY = null;
  Poke.pokeXY = null;
  poke = null;
}*/
