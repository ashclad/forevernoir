document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
<<<<<<< HEAD
document.getElementById("slideshow").addEventListener("touchmove", slider);
// document.getElementById("slideshow").addEventListener("touchstart", grabTouchPosition);
=======
document.documentElement.addEventListener("touchstart", grabTouchPosition);
document.documentElement.addEventListener("touchmove", slider, {passive: false});
>>>>>>> swipedetection
