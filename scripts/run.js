var panels = document.getElementsByClassName("comic panel");
var queuef = queueSeq(panels, "focus", "f");
var focus = queuef["focused"][0];
panels[focus].onload = offsetChange;

var resizing = false;
var timeoutnum = 200;
var starttime;

window.addEventListener("resize", function() {
  starttime = new Date();
  console.info("Window resize detected.");
  console.info("Window resize occured on " + starttime);
  //console.log("Resetting offsetstatus.");
  //TrackedStatus.offset.status = false;

  console.log("Logging window resize via 'resizing'.");
  if (resizing === false) {
    resizing = true;
    setTimeout(resizestatus, timeoutnum);
  }
});

//document.documentElement.addEventListener("wheel", goLeftoRight, {passive: false})

/* Older Functions */
// document.documentElement.addEventListener("touchstart", grabTouchPosition);
// document.documentElement.addEventListener("touchmove", slider, {passive: false});
// document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
// document.documentElement.addEventListener("keydown", arrowNav);
