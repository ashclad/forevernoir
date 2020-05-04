var logo = document.getElementById("mainlogo");
grabElemPosition(logo);
initialOffset();
var finishedresize = false;
var timeoutnum = 500;

//window.addEventListener("resize", function() {
  //offsetstatus = null;

  //if (finishedresize === false) {
  //  setTimeout(resizedone, timeoutnum);
  //}
  //grabElemPosition(logo);
  //initialOffset();
//});
//document.documentElement.addEventListener("wheel", goLeftoRight, {passive: false})

/* Older Functions */
// document.documentElement.addEventListener("touchstart", grabTouchPosition);
// document.documentElement.addEventListener("touchmove", slider, {passive: false});
// document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
// document.documentElement.addEventListener("keydown", arrowNav);
