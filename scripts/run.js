/* global variables */
console.log("Preparing elements and related variables for input.");
var panels = document.getElementsByClassName("slide");
var logo = document.getElementById("mainlogo");
if (panels[1] != null) {
  var queuef = queueSeq(panels, "focus", "f");
  var next = queuef["next"][0];
}
var comicstrip = document.getElementsByClassName("comicstrip");
var home = document.getElementsByClassName("home")[0];
var patmenu = document.getElementsByClassName("menu patterns")[0];
if (patmenu != null) {
  var patchildlen = patmenu.children.length - 1;
  var patchild = patmenu.children[patchildlen];
}
var primarynav = document.getElementsByClassName("primarynav");
var inventory = document.getElementsByClassName("inventory")[0];
var menslnkfirst = document.getElementById("menslnkfirst");
var womenslnksecond = document.getElementById("womenslnksecond");
var accesslnkthird = document.getElementById("accesslnkthird");

/* checking if things have loaded */

if (panels[next] != null) {
  panels[next].addEventListener("load", function() {
    var classofslide = panels[next].className.indexOf("slide");
    classofslide = panels[next].className.slice(classofslide, 5);
    TrackedStatus.slides.status = "loaded";
    console.info(classofslide.charAt(0).toUpperCase() + classofslide.slice(1) + "s have loaded.");
    offsetChangeX(comicstrip, logo);
  });
} else {
  console.info("There are no slides on current page.");
}

if (patchild != null) {
  patchild.addEventListener("load", function() {
    var classofslide = patchild.className.indexOf("slide");
    classofslide = patchild.className.slice(classofslide, 5);
    TrackedStatus.cats.status = "loaded";
    console.info(classofslide + "ions have loaded.");
  });
} else {
  console.info("This is not the inventory page, so corresponding menu was not acquired.");
}

/* logging data of relevant events */
document.documentElement.addEventListener("wheel", function(e) {
  if (Media.tablet.matches) {
    console.warn("Only touch events available; cannot grab wheel scroll information.");
  } else {
    console.info("Acquiring wheelscroll event information.");
    TrackedStatus.wheeling.x = e.deltaX;
    TrackedStatus.wheeling.y = e.deltaY;
    TrackedStatus.wheeling.z = e.deltaX/e.deltaY;

    if (home != null) {
      switchSlide(panels, "focus", logo);
    }
  }
}, {passive: false});

window.addEventListener("keydown", function(e) {
  if (Media.tablet.matches) {
    console.warn("Only touch events available; cannot grab physical keyboard information.");
  } else {
    console.info("Acquiring keypress event information.");
    TrackedStatus.keying.press = e.key;

    if (home != null) {
      arrowSlide(panels, "focus", logo);
    }
  }
}, {passive: false});


window.addEventListener("scroll", function(e) {
  console.log("Acquiring scroll event information.");
  if (home != null) {
    window.scrollTo(0, 0);
    e.preventDefault();
  }
}, {passive: false});

menslnkfirst.addEventListener("click", function(e) {
  removeElem(patmenu);
}, {passive: false});

womenslnksecond.addEventListener("click", function(e) {
  removeElem(patmenu);
}, {passive: false});

accesslnkthird.addEventListener("click", function(e) {
  removeElem(patmenu);
}, {passive: false});

EventStagger.postresize = 200;
window.addEventListener("resize", function() {
  TrackedStatus.resize.began = new Date();
  console.info("Window resize detected.");
  console.info("Window resize occured on " + TrackedStatus.resize.began + ".");
  console.log("Resetting resize status.");
  TrackedStatus.resize.status = false;

  console.log("Logging window resize.");
  if (TrackedStatus.resize.status === false) {
    TrackedStatus.resize.status = true;
    console.log("Done.");
    if (home != null) {
      setTimeout(function() { resizestatus(offsetChangeX(comicstrip, logo)); }, EventStagger.postresize);
    }
  }
});

console.log("Done.");
//document.documentElement.addEventListener("wheel", goLeftoRight, {passive: false});

/* Older Functions */
// document.documentElement.addEventListener("touchstart", grabTouchPosition);
// document.documentElement.addEventListener("touchmove", slider, {passive: false});
// document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
// document.documentElement.addEventListener("keydown", arrowNav);
