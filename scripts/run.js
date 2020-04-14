document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
// document.getElementById("slideshow").addEventListener("touchmove", slider);
document.getElementById("slideshow").addEventListener("touchstart", grabTouchPosition);
