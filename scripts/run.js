/* logging data of relevant events */
document.documentElement.addEventListener("wheel", grabWheelDirection, {passive: false});

/* scripts */
console.log("Preparing elements and related variables for input.");
var comicstrip = document.getElementsByClassName("comicstrip");
var logo = document.getElementById("mainlogo");
var panels = document.getElementsByClassName("slide");
var queuef = queueSeq(panels, "focus", "f");
var focus = queuef["focused"][0];
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
