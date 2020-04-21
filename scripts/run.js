document.documentElement.addEventListener("touchstart", grabTouchPosition);
document.documentElement.addEventListener("touchmove", slider, {passive: false});
document.documentElement.addEventListener("wheel", scrollVertoHoriz, {passive: false});
document.documentElement.addEventListener("keydown", arrowNav);
