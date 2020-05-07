console.info("ROOT PROCESS initialized.");
console.log("Checking for jQuery...");

/* object definitions */
let TrackedStatus = {
  jquery: false,
  slideshowoffset: {status: false, degree: null},
  seqfocus: {index: null, elem: null},
  winhasresized: {status: false, began: null},
  clientpoke: {x: null, y: null, z: null}
}

let EventStagger = {
  postresize: 0
}

let Media = {
  tablet: window.matchMedia("(hover: none) and (pointer: coarse)")
}

/* global variables */

/* class definitions */

/* initial scripts */
if (window.jQuery) {
  console.log("jQuery detected.");
  TrackedStatus.jquery = true;
} else {
  console.warn("No jQuery detected.");
  TrackedStatus.jquery = false;
}

/* function definitions */

function grabTouchPosition(e) {
  console.info("grabTouchPosition() execution initialized.");
  console.info("Screen has been touched.");
  TrackedStatus.clientpoke.x = e.touches[0].clientX;
  TrackedStatus.clientpoke.y = e.touches[0].clientY;
  TrackedStatus.clientpoke.z = TrackedStatus.clientpoke.x/TrackedStatus.clientpoke.y;
}

function grabElemPosition(elem, index) {
  console.info("grabElemPosition() execution initiated.");

  if (index != null) {
    elem = elem[index];
  }

  if (elem.length == null) {
    if (elem.id) {
      var name = elem.id;
    } else if (elem.className) {
      var name = elem.className;
    } else {
      var name = elem.tagName;
    }
    var elem = elem.getBoundingClientRect();
    var positionX = elem.left;
    var positionY = elem.top;
    var info = "Location for " + name + " is " + positionX + " pixels from the left and " + positionY + " pixels from the top.";
    console.info(info);
    var located = {name: name, x: positionX, y: positionY};
    console.log("Object for element coordinates relative to top-left has been produced: ");
    console.log(located);
  } else {
    var name = new Array();
    for (var g = 0; g < elem.length; g++) {
      if (elem[g].className) {
        name.push(elem[g].className);
      } else {
        name.push(elem[g].tagName);
      }
    }
    var elemgroup = new Array();
    var located = new Object();
    var positionX = new Object();
    var positionY = new Object();
    for (var i = 0; i < elem.length; i++) {
      elemgroup.push(elem[i].getBoundingClientRect());
      located["name"]["name" + i] = name[i];
      positionX["x" + i] = elemgroup[i].left;
      positionY["y" + i] = elemgroup[i].top;
    }
    var info = "Various locations found for " + name + ".";
    console.info(info);
    located["x"] = positionX;
    located["y"] = positionY;
    console.log("Object for element coordinates relative to top-left has been produced: ");
    console.log(located);
  }
  return located;
}

function resizestatus(func) {
  if (new Date() - TrackedStatus.winhasresized.began < EventStagger.postresize) {
    console.info("Resize not yet finished.");
    setTimeout(resizestatus, EventStagger.postresize);
  } else {
    console.info("Resize finished.");
    console.log("Logging that resize has finished.");
    TrackedStatus.winhasresized.status = false;
    func;
  }
}

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
  if (elemcollection.length == null || elemcollection.length == 1) {
    console.error("Insufficient elements to create a queue. Selected element must be more than one.");
    console.info("queueSeqForward() terminated.");
  } else {
    console.log("Queue currently under production.");
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

    return output;
  }
}

function queueSeqBackward(elemcollection, exceptionid) {
  console.info("queueSeqBackward() execution initiated.");
  if (elemcollection.length == null || elemcollection.length == 1) {
    console.error("Insufficient elements to create a queue. Selected element must be more than one.");
    console.info("queueSeqBackward() terminated.");
  } else {
    console.log("Queue currently under production.");
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

    return output;
  }
}

function doOffset(parentofslides, refpoint) {
  if (parentofslides.length == null) {
    var slideshow = parentofslides;
    var slide = slideshow.children;
  } else if (parentofslides.length == 1) {
    var slideshow = parentofslides[0];
    var slide = slideshow.children;
  } else {
    var slideshow = new Array();
    var slide = new Array();
    for (var i = 0; i < parentofslides.length; i++) {
      slideshow.push(parentofslides[i]);
      slide.push(slideshow[i].children);
    }
  }
  var ref = refpoint;

  if (slideshow.length == null && TrackedStatus.slideshowoffset.status == false) {
    var queuef = queueSeq(slide, "focus", "f");
    console.log("Done. Identifying currently active element in queue.");
    var focus = queuef["focused"][0];
    console.log("Logging the active element and its position in queue sequence.");
    TrackedStatus.seqfocus.index = focus;
    TrackedStatus.seqfocus.elem = slide[focus];

    console.log("Done. Acquiring information relevant to calculating change in parent element's position from the left.");
    var refleft = grabElemPosition(ref).x;
    var refwidth = ref.clientWidth;
    var refhalf = refwidth/2;
    var slideshowwidth = slideshow.clientWidth;
    var focuswidth = slide[focus].clientWidth;
    var focushalf = focuswidth/2;
    var focusleft = grabElemPosition(slide[focus]).x;
    if (focusleft + focuswidth >= window.innerWidth) {
      var leftover = ((focusleft + focushalf) * -1);
      var leftfactor = (refleft + refhalf) + leftover;
    } else {
      var leftfactor = (refleft + refhalf) - (focusleft + focushalf);
    }

    console.log("Done. Initiating change of parent element's position.");
    slideshow.style.left = leftfactor + "px";
    console.log("Logging pixel amount from left that the element has moved.");
    TrackedStatus.slideshowoffset.degree = slideshow.style.left;
    console.log("Done");
  } else if (slideshow.length == null && TrackedStatus.slideshowoffset.status == true) {
    console.warn("Element has already been moved.");
  }

  console.log("Logging that this function has been run.");
  TrackedStatus.slideshowoffset.status = true;
  console.log("Done.");
}

function offsetChange(parentofslides, refpoint) {
  if (Media.tablet.matches) {
      console.warn("Only touch events available; offsetChange() cannot be run.");
    } else {
      console.info("offsetChange() execution initiated.");
      doOffset(parentofslides, refpoint);
    }
  console.info("offsetChange() terminated.");
}

/*function scrollVertoHoriz(e) {
  if (Media.tablet.matches) {
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
  if (Media.tablet.matches) {
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
  if (Media.tablet.matches && TrackedStatus.clientpoke.z !== null) {
    var cX = e.touches[0].clientX;
    var cY = e.touches[0].clientY;
    console.info("Touch deviation detected in viewport: " + (cX/cY))
    console.log("Executing slideR().");
    var slide = document.getElementsByClassName("slide");
    var shown = new Array();
    var notshown = new Array();

    var xDiff = TrackedStatus.clientpoke.x - cX;
    var yDiff = TrackedStatus.clientpoke.y - cY;

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
  } else if (Media.tablet.matches && TrackedStatus.clientpoke.z === null) {
    console.info("Screen not yet touched.");
  } else {
    console.warn("Only mouse or stylus events available; slider() cannot be run.");
  }

  TrackedStatus.clientpoke.x = null;
  TrackedStatus.clientpoke.y = null;
  TrackedStatus.clientpoke.z = null;
}*/
