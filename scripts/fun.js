console.info("ROOT PROCESS initialized.");
console.log("Checking for jQuery...");

/* global variables */
var W = window;

var QueryShop = {}

/* object definitions */
var TrackedStatus = {
  jquery: false,
  doOffsetX: {status: false, focus: {index: 0}},
  keying: {press: null},
  resize: {status: false, size: 0},
  poke: {x: 0, y: 0, z: 0},
  wheeling: {x: 0, y: 0, z: 0},
  slides: {status: ""},
  addElem: {},
  removeElem: {},
  clicked: false,
  querystring: "?"
}

var EventStagger = {
  postresize: 0
}

var Media = {
  tablet: window.matchMedia("(hover: none) and (pointer: coarse)")
}

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
  console.info(grabTouchPosition.name + "() initiated.");
  console.info("Screen has been touched.");
  TrackedStatus.poke.x = e.touches[0].clientX;
  TrackedStatus.poke.y = e.touches[0].clientY;
  TrackedStatus.poke.z = TrackedStatus.poke.x/TrackedStatus.poke.y;
  console.info(grabTouchPosition.name + "() terminated.");
}

function grabElemPosition(elem, index) {
  console.info(grabElemPosition.name + "() initiated.");

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
  } else if (elem.length == 1) {
    elem = elem[0];

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
  if (new Date() - TrackedStatus.resize.began < EventStagger.postresize) {
    console.info("Resize not yet finished.");
    setTimeout(resizestatus, EventStagger.postresize);
  } else {
    console.info("Resize finished.");
    console.log("Logging that resize has finished.");
    console.log("Done. Logging new window size.");
    console.log("Done.");
    func;
  }
}

function readCookie(cookie) {
  var pairs = cookie.split("; ");
  var obj = {};
  for (var i = 0; i < pairs.length; i++) {
    var keyvalues = pairs[i].split("=");
    obj[keyvalues[0]] = keyvalues[1];
  }
  return obj;
}

function updateCookie(cookie, key, value) {
  var obj = readCookie(cookie);
  obj[key] = value;
  var keyarr = Object.keys(obj);
  var ceiling = keyarr.length - 1;
  var floor = ceiling - ceiling;
  var str;
  for (var i = 0; i < keyarr.length; i++) {
    var keyvalue = obj[keyarr[i]];
    document.cookie += keyarr[i] + "=" + keyvalue + "; ";
    str += keyarr[i] + "=" + keyvalue + "; ";
  }
}

function resolveQuery(string, appendname, value=null) {
  if (string.indexOf("?") <= -1 && string.indexOf("&") <= -1) {
    (value != null) ? (string = "?" + appendname + "=" + value) : (string = "?" + appendname + "=");
  } else if (string.indexOf("?") > -1) {
    if (string.indexOf(appendname) > -1) {
      string = string.slice(1, string.length);
      string = string.split("&");
      for (var i = 0; i < string.length; i++) {
        if (string[i].indexOf(appendname) > -1) {
          var keyvalue = string[i].split("=");
          keyvalue[0] = appendname;
          (value != null) ? (keyvalue[1] = value) : (keyvalue[1] = "");
          keyvalue = keyvalue.join("=");
          string[i] = keyvalue;
        }
      }
      string = "?" + string.join("&");
    } else {
      (value != null) ? (string += "&" + appendname + "=" + value) : (string += "&" + appendname + "=");
    }
  }
  return string;
}

function queryFromSelect(elem={}, qparam="", url="") {
  if (elem != null) {
    elem.addEventListener("change", function(e) {
      console.log("Option for " + elem.className.split(" ")[0] + " has been changed to " + e.target.value + ".");
      TrackedStatus.querystring = resolveQuery(TrackedStatus.querystring, qparam, e.target.value);
      console.log(TrackedStatus.querystring);
    });
  }
}

function queryFromRadio(elem={}, qparam="", url="") {
  if (elem != null) {
    elem.addEventListener("click", function() {
      console.log("Radio option has been changed to " + elem.value + ".");
      TrackedStatus.querystring = resolveQuery(TrackedStatus.querystring, qparam, elem.value);
      console.log(TrackedStatus.querystring);
      /*console.log(e); */
    });
  }
}

function togglePieceList(elemcollection, value, forelem, exception=undefined) {
  if (TrackedStatus.selection.value == value) {
    for (var i = 0; i < elemcollection.length; i++) {
      var haveparent = elemcollection[i].parentElement.className.indexOf(forelem);
      var havechild = elemcollection[i].children[0].className.indexOf(value);
      var piecelistdisplay = window.getComputedStyle(elemcollection[i]).getPropertyValue("display");
      if (piecelistdisplay != "none") {
        elemcollection[i].style.display = "none";
      }
      if (haveparent > -1 && havechild > -1 && value != exception) {
        elemcollection[i].style.display = "block";
      }
    }
  }
}

function displayFromSelect(arr, forelem, exceptionfromarr=null) {
  HTMLTargets.select[forelem].piece.addEventListener("change", function(e) {
    TrackedStatus.selection = {};
    TrackedStatus.selection.value = e.target.value;

    if (forelem.indexOf(" ") <= -1 || forelem.indexOf(" ") > 1) {
      forelem = " " + forelem;
    }

    for (var i = 0; i < arr.length; i++) {
      if (exceptionfromarr != null) {
        togglePieceList(HTMLTargets.piecelist, arr[i], forelem, exceptionfromarr);
      } else {
        togglePieceList(HTMLTargets.piecelist, arr[i], forelem, arr[0]);
      }
    }
  });
}

function removeElem(elem, animate=false, animation=undefined) {
  console.info(removeElem.name + "() initiated.");
  if (animate == false) {
    if (elem.length == null) {
      console.log("Removing " + elem.id + " element.");
      elem.remove();
    } else if (elem.length == 1) {
      elem = elem[0];
      console.log("Removing " + elem.className.split(" ")[0] + " element.");
      elem.remove();
    } else {
      console.log("Removing " + elem.className.split(" ")[0] + " element.");

      for (var i = 0; i < elem.length; i++) {
        elem[i].remove();
      }
    }
  }
  console.info(removeElem.name + "() terminated.");
}

function addElem(elem, where=document.documentElement, animate=false, animation=undefined) {
  console.info(addElem.name + "() initiated.");
  if (animate == false) {
    if (elem.length == null) {
      if (elem.id != null) {
        console.log("Adding " + elem.id + " element.");
      } else {
        console.log("Adding " + elem.className.split(" ")[0] + "element.");
      }
      where.appendChild(elem);
    } else if (elem.length == 1) {
      elem = elem[0];
      console.log("Adding " + elem.className.split(" ")[0] + " element.");
      where.appendChild(elem);
    } else {
      console.log("Adding " + elem.className.split(" ")[0] + " element.");
      for (var i = 0; i < elem.length; i++) {
        where.appendChild(elem[i]);
      }
    }
  }
  console.info(addElem.name + "() terminated.");
}

function displayToggle(elem, initial=true, displaytype="block") {
  console.info(displayToggle.name + "() initiated.");

  function createGlobalObj(name) {
    TrackedStatus.display = {};
    TrackedStatus.display[name] = {};
    TrackedStatus.display[name].status = initial;
    TrackedStatus.display[name].inittype = displaytype;
  }

  if (elem.length == null) {
    var superstyle = window.getComputedStyle(elem);
    var superdisplay = superstyle.getPropertyValue("display");
    createGlobalObj(elem.id);

    console.log("Toggling display of " + elem.id + " element.");
    if (TrackedStatus.display[elem.id].status == false || elem.style.display == "none") {
      console.warn("Element has already been made hidden.");
      console.log("Revealing element.");
      if (displaytype != null) {
        elem.style.display = displaytype;
      } else {
        elem.style.display = TrackedStatus.display[elem.id].inittype;
      }
      console.log("Done. Logging that element has been revealed.");
      TrackedStatus.display[elem.id].status = true;
    } else if (TrackedStatus.display[elem.id].status == true) {
      console.warn("Element has already been revealed.");
      console.log("Logging how the element is displayed.");
      TrackedStatus.display[elem.id].inittype = superdisplay;
      console.log("Done. Hiding element.");
      elem.style.display = "none";
      console.log("Done. Logging that element has been hidden.");
      TrackedStatus.display[elem.id].status = false;
    }
  } else if (elem.length == 1) {
    elem = elem[0];
    var superstyle = window.getComputedStyle(elem);
    var superdisplay = superstyle.getPropertyValue("display");
    var elemclass = elem.className.split(" ")[0];
    createGlobalObj(elemclass);

    console.log("Toggling display of " + elemclass + " element.");
    if (TrackedStatus.display[elemclass].status == false || elem.display.style == "none") {
      console.warn("Element has already been made hidden.");
      console.log("Revealing element.");
      if (displaytype != null) {
        elem.style.display = displaytype;
      } else {
        elem.style.display = TrackedStatus.display[elemclass].inittype;
      }
      console.log("Done. Logging that element has been revealed.");
      TrackedStatus.display[elemclass].status = true;
    } else if (TrackedStatus.display[elemclass].status == true) {
      console.warn("Element has already been revealed.");
      console.log("Logging how the element is displayed.");
      TrackedStatus.display[elemclass].inittype = superdisplay;
      console.log("Done. Hiding element.");
      elem.style.display = "none";
      console.log("Done. Logging that element has been hidden.");
      TrackedStatus.display[elemclass].status = false;
    }
  } else {
    var superstyle = new Array();
    var superdisplay = new Array();
    var elemclass = elem[0].className.split(" ")[0];
    createGlobalObj(elemclass);
    delete window.TrackedStatus.display[elemclass].inittype;
    for (var j = 0; j < elem.length; j++) {
      TrackedStatus.display["inittype-" + j] = "";
      superstyle = window.getComputedStyle(elem[j]);
      superdisplay = superstyle[j].getPropertyValue("display");
    }

    console.log("Toggling display of " + elemclass + " element.");
    for (var i = 0; i < elem.length; i++) {
      if (TrackedStatus.display[elemclass].status == false || elem[i].style.display == "none") {
        console.warn("Element has already been made hidden.");
        console.log("Revealing element.");
        if (displaytype != null) {
          elem[i].style.display = displaytype;
        } else {
          elem[i].style.display = TrackedStatus.display[elemclass].inittype;
        }
        console.log("Done. Logging that element has been revealed.");
        TrackedStatus.display[elemclass].status = true;
      } else if (TrackedStatus.display[elemclass].status == true) {
        console.warn("Element has already been revealed.");
        console.log("Logging how the element is displayed.");
        TrackedStatus.display["inittype-" + i] = superdisplay[i];
        console.log("Done. Hiding element.");
        elem[i].style.display = "none";
        console.log("Done. Logging that element has been hidden.");
        TrackedStatus.display[elemclass].status = false;
      }
    }
  }
  console.info(displayToggle.name + "() terminated.");
}

function altDisplayToggle(notdisplayed, displayed, notdisplayeddefault, displayeddefault) {
  var notdisplayedinit = window.getComputedStyle(notdisplayed).getPropertyValue("display");
  var displayedinit = window.getComputedStyle(displayed).getPropertyValue("display");
  console.log([notdisplayedinit, displayedinit]);
  if (notdisplayedinit == "none" && displayedinit != "none") {
    displayToggle(displayed, true, displayeddefault);
    displayToggle(notdisplayed, false, notdisplayeddefault);
  } else if (notdisplayedinit != "none" && displayedinit == "none") {
    displayToggle(displayed, false, displayeddefault);
    displayToggle(notdisplayed, true, notdisplayeddefault);
  } else if (notdisplayedinit != "none" && displayedinit != "none") {
    displayToggle(displayed, true, displayeddefault);
    displayToggle(notdisplayed, true, notdisplayeddefault);
  } else if (notdisplayedinit == "none" && displayedinit == "none") {
    displayToggle(displayed, false, displayeddefault);
    displayToggle(notdisplayed, false, notdisplayeddefault);
  }
}

function queueSeq(elemcollection, exceptionid, direction="forward") {
  console.info(queueSeq.name + "() initiated.");
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
  console.info(queueSeqForward.name + "() initiated.");
  if (elemcollection.length == null || elemcollection.length == 1) {
    console.error("Insufficient elements to create a queue. Selected element must be more than one.");
    console.info(queueSeqForward.name + "() terminated.");
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
  console.info(queueSeqBackward.name + "() initiated.");
  if (elemcollection.length == null || elemcollection.length == 1) {
    console.error("Insufficient elements to create a queue. Selected element must be more than one.");
    console.info(queueSeqBackward.name + "() terminated.");
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

function doOffsetX(parentofslides, refpoint) {
  console.info(doOffsetX.name + "() initiated.");
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

  if (slideshow.length == null && TrackedStatus.doOffsetX.status == false) {
    TrackedStatus.resize.size = window.innerWidth;
    TrackedStatus.doOffsetX.parent = slideshow;
    var queuef = queueSeq(slide, "focus", "f");
    console.log("Identifying currently active element in queue.");
    var focus = queuef["focused"][0];
    console.log("Done. Logging the active element and its position in queue sequence.");
    TrackedStatus.doOffsetX.focus.index = focus;

    console.log("Done. Acquiring information relevant to calculating change in parent element's position from the left.");
    var refleft = grabElemPosition(ref).x;
    var refwidth = ref.clientWidth;
    var refhalf = refwidth/2;
    var focusleft = grabElemPosition(slide[focus]).x;
    var focuswidth = slide[focus].clientWidth;
    var focushalf = focuswidth/2;

    console.log("Done. Subtracting " + slide[focus].id + "'s center's position from the left, from " + ref.id + "'s center's position from the left.");
    var refdist = refleft + refhalf;
    TrackedStatus.doOffsetX.refdist = refdist;
    var focusdist = focusleft + focushalf;
    var refslidediff = refdist - focusdist;
    var leftfactor = (focusleft + focuswidth >= window.innerWidth) ? refslidediff : refslidediff;

    console.log("Done. Initiating change of parent element's position.");
    slideshow.style.left = leftfactor + "px";
    console.log("Done. Logging pixel amount from left that the element has moved.");
    TrackedStatus.doOffsetX.degree = slideshow.style.left;
    console.log("Done. Logging that this function has been run.");
    TrackedStatus.doOffsetX.status = true;
    console.info(doOffsetX.name + "() terminated.");
  } else if (slideshow.length == null && TrackedStatus.doOffsetX.status == true) {
    /* without this case of the conditional, on window resize, left offset of slideshow is
    maintained */
    console.warn("Element has already been moved.");

    var focus = TrackedStatus.doOffsetX.focus.index;

    console.log("Acquiring relevant information of reference element.");
    var refleft = grabElemPosition(ref).x;
    var refwidth = ref.clientWidth;
    var refhalf = refwidth/2;
    var refdist = refleft + refhalf;
    console.log("Done. Finding difference between this reference element's and old reference element's positioning.");
    var oldrefdist = TrackedStatus.doOffsetX.refdist;
    var refdiff = refdist - oldrefdist;
    console.log("Acquiring relevant information of element to be repositioned.");
    var focusleft = grabElemPosition(slide[focus]).x;
    var focuswidth = slide[focus].clientWidth;
    var focushalf = focuswidth/2;
    console.log("Done. Finding old repositioning distance of to-be-repositioned element.");
    var slideshowleft = TrackedStatus.doOffsetX.degree;
    slideshowleft = parseFloat(slideshowleft);

    console.log("Done. Performing relevant calculations.");
    var refdist = refleft + refhalf;
    var focusdist = focusleft + focushalf;
    var refslidediff = refdist - focusdist;
    var leftfactor = (focusleft + focuswidth >= window.innerWidth) ? refslidediff : refslidediff;
    console.log("Done. Moving element in alignment with reference element.");
    slideshow.style.left = leftfactor + slideshowleft + "px";
    console.log("Done. Logging new positioning of element and current positioning of reference element.");
    TrackedStatus.doOffsetX.degree = slideshow.style.left;
    TrackedStatus.doOffsetX.refdist = refdist;
    console.info(doOffsetX.name + "() terminated.");
  }
}

function offsetChangeX(parentofslides, refpoint) {
  if (Media.tablet.matches) {
      console.warn("Only touch events available; " + offsetChangeX.name + "() cannot be run.");
    } else {
      console.info(offsetChangeX.name + "() initiated.");
      doOffsetX(parentofslides, refpoint);
    }
  console.info(offsetChangeX.name + "() terminated.");
}

function switchSlide(elemcollection, exceptionid, refpoint) {
  console.info(switchSlide.name + "() initiated.");
  var slides = elemcollection;
  var excpt = exceptionid;
  var ref = refpoint;
  var ceiling = slides.length - 1;
  var verticalwheel = TrackedStatus.wheeling.y;
  if (verticalwheel != 0) {
    var direction = Math.sign(verticalwheel);
    if (direction == 1) {
      console.info("Downward direction detected.");
      var queue = queueSeq(slides, excpt);
      var focus = queue["focused"][0];
      var next = queue["next"][0];

      console.log("Change id of next element so it may be focused.");
      slides[focus].removeAttribute("id");
      slides[next].setAttribute("id", "focus");
      console.log("Done. Logging newly to-be-focused element and feigning that element was already moved.");
      TrackedStatus.doOffsetX.focus.index = next;
      TrackedStatus.doOffsetX.status = true;
      console.log("Done. Now focusing the element.");
      doOffsetX(slides[0].parentElement, ref);
    } else {
      console.info("Upward direction detected.");
      var queue = queueSeq(slides, excpt, "b");
      var focus = queue["focused"][0];
      var next = queue["prev"][0];
      if (next == ceiling) {
        next = next - 1;
      }

      console.log("Change id of previous element so it may be focused.");
      slides[focus].removeAttribute("id");
      slides[next].setAttribute("id", "focus");
      console.log("Done. Logging newly to-be-focused element and feigning that element was already moved.");
      TrackedStatus.doOffsetX.focus.index = next;
      TrackedStatus.doOffsetX.status = true;
      console.log("Done. Now focusing the element.");
      doOffsetX(slides[0].parentElement, ref);
    }
  }
  console.info(switchSlide.name + "() terminated.");
}

function arrowSlide(elemcollection, exceptionid, refpoint) {
  console.info(arrowSlide.name + "() initiated.");
  var slides = elemcollection;
  var excpt = exceptionid;
  var ref = refpoint;
  var ceiling = slides.length - 1;
  var press = TrackedStatus.keying.press;
  console.log(press);
  if (press == "ArrowRight") {
    console.info("Right arrow key has been pressed.");
    var queue = queueSeq(slides, excpt);
    var focus = queue["focused"][0];
    var next = queue["next"][0];

    console.log("Change id of next element so it may be focused.");
    slides[focus].removeAttribute("id");
    slides[next].setAttribute("id", "focus");
    console.log("Done. Logging newly to-be-focused element and feigning that element was already moved.");
    TrackedStatus.doOffsetX.focus.index = next;
    TrackedStatus.doOffsetX.status = true;
    console.log("Done. Now focusing the element.");
    doOffsetX(slides[0].parentElement, ref);
  } else if (press == "ArrowLeft") {
    console.info("Left arrow key has been pressed.");
    var queue = queueSeq(slides, excpt, "b");
    var focus = queue["focused"][0];
    var next = queue["prev"][0];
    if (next == ceiling) {
      next = next - 1;
    }

    console.log("Change id of previous element so it may be focused.");
    slides[focus].removeAttribute("id");
    slides[next].setAttribute("id", "focus");
    console.log("Done. Logging newly to-be-focused element and feigning that element was already moved.");
    TrackedStatus.doOffsetX.focus.index = next;
    TrackedStatus.doOffsetX.status = true;
    console.log("Done. Now focusing the element.");
    doOffsetX(slides[0].parentElement, ref);
  }
  console.info(arrowSlide.name + "() terminated.");
}

/*function slider(e) {
  if (Media.tablet.matches && TrackedStatus.poke.z !== null) {
    var cX = e.touches[0].clientX;
    var cY = e.touches[0].clientY;
    console.info("Touch deviation detected in viewport: " + (cX/cY))
    console.log("Executing slideR().");
    var slide = document.getElementsByClassName("slide");
    var shown = new Array();
    var notshown = new Array();

    var xDiff = TrackedStatus.poke.x - cX;
    var yDiff = TrackedStatus.poke.y - cY;

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
  } else if (Media.tablet.matches && TrackedStatus.poke.z === null) {
    console.info("Screen not yet touched.");
  } else {
    console.warn("Only mouse or stylus events available; slider() cannot be run.");
  }

  TrackedStatus.poke.x = null;
  TrackedStatus.clientpoke.y = null;
  TrackedStatus.clientpoke.z = null;
}*/
