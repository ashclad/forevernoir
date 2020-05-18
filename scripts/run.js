/* global variables */
console.log("Preparing elements and related variables for input.");
var panels = document.getElementsByClassName("slide");
var logo = document.getElementById("mainlogo");
var queuef = queueSeq(panels, "focus", "f");
var focus = queuef["focused"][0];
var comicstrip = document.getElementsByClassName("comicstrip");
var home = document.getElementsByClassName("home");

/* logging data of relevant events */
document.documentElement.addEventListener("wheel", function(e) {
  if (Media.tablet.matches) {
    console.warn("Only touch events available; cannot grab wheel scroll information.");
  } else {
    console.info("Acquiring wheelscroll event information.");
    TrackedStatus.wheeling.x = e.deltaX;
    TrackedStatus.wheeling.y = e.deltaY;
    TrackedStatus.wheeling.z = e.deltaX/e.deltaY;

    switchSlide(panels, "focus", logo);
  }
}, {passive: false});

window.addEventListener("keydown", function(e) {
  if (Media.tablet.matches) {
    console.warn("Only touch events available; cannot grab physical keyboard information.");
  } else {
    console.info("Acquiring keypress event information.");
    TrackedStatus.keying.press = e.key;

    arrowSlide(panels, "focus", logo);
  }
}, {passive: false})

window.addEventListener("scroll", function(e) {
  if (home != null) {
    window.scrollTo(0, 0);
    e.preventDefault();
  }
}, {passive: false})

/* scripts */
console.log("Done. Inserting prepared elements or related variables into function.");
panels[focus].onload = function() {
  console.info(panels[focus].id + " has loaded.");
  offsetChangeX(comicstrip, logo);
};

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
    setTimeout(function() { resizestatus(offsetChangeX(comicstrip, logo)); }, EventStagger.postresize);
  }
});
console.log("Done.");
//document.documentElement.addEventListener("wheel", goLeftoRight, {passive: false});

/* Older Functions */
// document.documentElement.addEventListener("touchstart", grabTouchPosition);
// document.documentElement.addEventListener("touchmove", slider, {passive: false});
// document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
// document.documentElement.addEventListener("keydown", arrowNav);
