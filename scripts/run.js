console.log("Preparing elements and related variables for input.");
var comicstrip = document.getElementsByClassName("comicstrip");
var logo = document.getElementById("mainlogo");
var panels = document.getElementsByClassName("slide");
var queuef = queueSeq(panels, "focus", "f");
var focus = queuef["focused"][0];
console.log("Done. Inserting prepared elements or related variables into function.");
panels[focus].onload = function() {
  console.info(panels[focus].id + " has loaded.");
  offsetChange(comicstrip, logo);
};
console.log("Done.");

EventStagger.postresize = 200;

window.addEventListener("resize", function() {
  TrackedStatus.winhasresized.began = new Date();
  console.info("Window resize detected.");
  console.info("Window resize occured on " + starttime + ".");
  //console.log("Resetting offsetstatus.");
  //TrackedStatus.offset.status = false;

  console.log("Logging window resize.");
  if (TrackedStatus.winhasresized.status === false) {
    TrackedStatus.winhasresized.status = true;
    console.log("Done.");
    setTimeout(function() { resizestatus(offsetChange(comicstrip, logo)); }, EventStagger.postresize);
  }
});

//document.documentElement.addEventListener("wheel", goLeftoRight, {passive: false})

/* Older Functions */
// document.documentElement.addEventListener("touchstart", grabTouchPosition);
// document.documentElement.addEventListener("touchmove", slider, {passive: false});
// document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
// document.documentElement.addEventListener("keydown", arrowNav);
