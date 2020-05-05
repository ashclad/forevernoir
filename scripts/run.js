initialOffset();
var resizing = false;
var timeoutnum = 100;
var starttime;

window.addEventListener("resize", function() {
  offsetstatus = null;
  starttime = new Date();

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
