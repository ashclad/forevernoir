/* global variables */
var cook = document.cookie;
var parser = new DOMParser();
console.log("Preparing elements and related variables for input.");
var HTMLTargets = new function() {
  this.home = document.getElementsByClassName("home")[0];
  this.inventory = document.getElementsByClassName("inventory")[0];
  this.logo = document.getElementById("mainlogo");
  this.panels = document.getElementsByClassName("slide");
  this.comicstrip = document.getElementsByClassName("comicstrip");
  this.primarynav = document.getElementsByClassName("primarynav")[0];
  this.primarylinks = this.primarynav.children;
  this.patmenu = document.getElementsByClassName("menu patterns")[0];
  if (this.patmenu != null) {
    this.patlinks = this.patmenu.children;
  }
  this.storefrontmens = document.getElementsByClassName("storefront mens");
  this.storefrontwomens = document.getElementsByClassName("storefront womens");
  this.storefrontaccess = document.getElementsByClassName("storefront access");
  this.aisle = document.getElementsByClassName("aisle");
  this.selectmens = document.getElementsByClassName("dropdown mens");
  this.selectwomens = document.getElementsByClassName("dropdown womens");
  this.selectaccess = document.getElementsByClassName("dropdown access");
  this.select = {};
  if (this.selectmens != null) {
    this.select.mens = {
      price: this.selectmens[0],
      size: this.selectmens[1],
      piece: this.selectmens[2]
    }
  }
  if (this.selectwomens != null) {
    this.select.womens = {
      price: this.selectwomens[0],
      size: this.selectwomens[1],
      piece: this.selectwomens[2]
    }
  }
  if (this.selectaccess != null) {
    this.select.access = {
      price: this.selectaccess[0],
      size: this.selectaccess[1],
      piece: this.selectaccess[2]
    }
  }
  this.piecelist = document.getElementsByClassName("piecelist");
}


if (HTMLTargets.inventory != null) {
  var selectprice = [HTMLTargets.select.mens.price, HTMLTargets.select.womens.price, HTMLTargets.select.access.price];
  var selectsize = [HTMLTargets.select.mens.size, HTMLTargets.select.womens.size, HTMLTargets.select.access.size];
  var selectpiece = [HTMLTargets.select.mens.piece, HTMLTargets.select.womens.piece, HTMLTargets.select.access.piece];
}

if (HTMLTargets.primarylinks != null && HTMLTargets.patlinks != null) {
  var navs = {primary: HTMLTargets.primarylinks, tertiary: HTMLTargets.patlinks};
}

if (HTMLTargets.panels[1] != null) {
  var queuef = queueSeq(HTMLTargets.panels, "focus", "f");
  var next = queuef["next"][0];
}
if (HTMLTargets.patlinks != null) {
  var patchildlen = HTMLTargets.patlinks.length - 1;
  var patchild = HTMLTargets.patlinks[patchildlen];
}

/* checking if things have loaded */
if (HTMLTargets.panels[next] != null) {
  HTMLTargets.panels[next].addEventListener("load", function() {
    var classofslide = HTMLTargets.panels[next].className.indexOf("slide");
    classofslide = HTMLTargets.panels[next].className.slice(classofslide, 5);
    TrackedStatus.slides.status = "loaded";
    console.info(classofslide.charAt(0).toUpperCase() + classofslide.slice(1) + "s have loaded.");
    offsetChangeX(HTMLTargets.comicstrip, HTMLTargets.logo);
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

/* initial scripts */
if (HTMLTargets.inventory != null) {
  TrackedStatus.querystring = "?cat=mens";
  fetch("shoplist.php" + TrackedStatus.querystring)
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    text = parser.parseFromString(text, 'text/html');
    return text;
  })
  .then((doc) => {
    doc = doc.getElementById("target");
    doc.removeAttribute("ID");
    return doc;})
    .then((elem) => {
      addElem(elem, HTMLTargets.aisle[0]);
  });

  TrackedStatus.querystring = "?cat=womens";
  fetch("shoplist.php" + TrackedStatus.querystring)
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    text = parser.parseFromString(text, 'text/html');
    return text;
  })
  .then((doc) => {
    doc = doc.getElementById("target");
    doc.removeAttribute("ID");
    return doc;})
    .then((elem) => {
      addElem(elem, HTMLTargets.aisle[1]);
  });

  TrackedStatus.querystring = "?cat=access";
  fetch("shoplist.php" + TrackedStatus.querystring)
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    text = parser.parseFromString(text, 'text/html');
    return text;
  })
  .then((doc) => {
    doc = doc.getElementById("target");
    doc.removeAttribute("ID");
    return doc;})
    .then((elem) => {
      addElem(elem, HTMLTargets.aisle[2]);
    });
} else {
  console.info("Not on inventiry page. No need to append list of shop items.");
}

document.documentElement.addEventListener("wheel", function(e) {
  if (Media.tablet.matches) {
    console.warn("Only touch events available; cannot grab wheel scroll information.");
  } else {
    console.info("Acquiring wheelscroll event information.");
    TrackedStatus.wheeling.x = e.deltaX;
    TrackedStatus.wheeling.y = e.deltaY;
    TrackedStatus.wheeling.z = e.deltaX/e.deltaY;

    if (HTMLTargets.home != null) {
      switchSlide(HTMLTargets.panels, "focus", HTMLTargets.logo);
    }
  }
}, {passive: false});

window.addEventListener("scroll", function(e) {
  console.log("Acquiring scroll event information.");
  if (HTMLTargets.home != null) {
    window.scrollTo(0, 0);
    e.preventDefault();
  }
}, {passive: false});

window.addEventListener("keydown", function(e) {
  if (Media.tablet.matches) {
    console.warn("Only touch events available; cannot grab physical keyboard information.");
  } else {
    console.info("Acquiring keypress event information.");
    TrackedStatus.keying.press = e.key;

    if (HTMLTargets.home != null) {
      arrowSlide(HTMLTargets.panels, "focus", HTMLTargets.logo);
    }
  }
}, {passive: false});

if (HTMLTargets.inventory != null) {
  navs["primary"][0].addEventListener("click", function() {
    altDisplayToggle(HTMLTargets.storefrontmens[0], HTMLTargets.patmenu, "block", "flex");
    TrackedStatus.querystring = "?cat=mens";
    displayToggle(navs["primary"][1], true);
    displayToggle(navs["primary"][2], true);
    if (TrackedStatus.clicked == true) {
      navs["primary"][0].innerHTML = "Men's";
      for (var i = 0; i < HTMLTargets.selectmens.length; i++) {
        HTMLTargets.selectmens[i].selectedIndex = 0;
      }
      for (var j = 0; j < HTMLTargets.piecelist.length; j++) {
        HTMLTargets.piecelist[j].style.display = "none";
      }
      TrackedStatus.clicked = false;
    } else {
      navs["primary"][0].innerHTML = "Back";
      TrackedStatus.clicked = true;
    }
  }, {passive: false});

  navs["tertiary"][1].addEventListener("click", function() {
    altDisplayToggle(HTMLTargets.storefrontmens[0], HTMLTargets.primarynav, "block", "flex");
    TrackedStatus.querystring = "?cat=mens";
    displayToggle(navs["tertiary"][0], true);
    displayToggle(navs["tertiary"][2], true);
    displayToggle(navs["tertiary"][3], true);
    if (TrackedStatus.clicked == true) {
      navs["tertiary"][1].style.maxWidth = "25%";
      navs["tertiary"][1].style.margin = "0 0 0 0.5%";
      navs["tertiary"][1].parentElement.style.padding = "5% 0";
      for (var i = 0; i < HTMLTargets.selectmens.length; i++) {
        HTMLTargets.selectmens[i].selectedIndex = 0;
      }
      for (var j = 0; j < HTMLTargets.piecelist.length; j++) {
        HTMLTargets.piecelist[j].style.display = "none";
      }
      TrackedStatus.clicked = false;
    } else {
      navs["tertiary"][1].style.maxWidth = "33%";
      navs["tertiary"][1].style.margin = "0 auto";
      navs["tertiary"][1].parentElement.style.padding = "3% 0";
      TrackedStatus.clicked = true;
    }
  }, {passive: false});

  navs["primary"][1].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontwomens[0], HTMLTargets.patmenu, "block", "flex");
    TrackedStatus.querystring = "?cat=womens";
    displayToggle(navs["primary"][0], true);
    displayToggle(navs["primary"][2], true);
    if (TrackedStatus.clicked == true) {
      navs["primary"][1].innerHTML = "Women's";
      for (var i = 0; i < HTMLTargets.selectwomens.length; i++) {
        HTMLTargets.selectwomens[i].selectedIndex = 0;
      }
      for (var j = 0; j < HTMLTargets.piecelist.length; j++) {
        HTMLTargets.piecelist[j].style.display = "none";
      }
      TrackedStatus.clicked = false;
    } else {
      navs["primary"][1].innerHTML = "Back";
      TrackedStatus.clicked = true;
    }
  }, {passive: false});

  navs["tertiary"][2].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontwomens[0], HTMLTargets.primarynav, "block", "flex");
    TrackedStatus.querystring = "?cat=womens";
    displayToggle(navs["tertiary"][0], true);
    displayToggle(navs["tertiary"][1], true);
    displayToggle(navs["tertiary"][3], true);
    if (TrackedStatus.clicked == true) {
      navs["tertiary"][2].style.maxWidth = "25%";
      navs["tertiary"][2].style.margin = "0 0 0 0.5%";
      navs["tertiary"][2].parentElement.style.padding = "5% 0";
      for (var i = 0; i < HTMLTargets.selectwomens.length; i++) {
        HTMLTargets.selectwomens[i].selectedIndex = 0;
      }
      for (var j = 0; j < HTMLTargets.piecelist.length; j++) {
        HTMLTargets.piecelist[j].style.display = "none";
      }
      TrackedStatus.clicked = false;
    } else {
      navs["tertiary"][2].style.maxWidth = "33%";
      navs["tertiary"][2].style.margin = "0 auto";
      navs["tertiary"][2].parentElement.style.padding = "3% 0";
      TrackedStatus.clicked = true;
    }
  }, {passive: false});

  navs["primary"][2].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontaccess[0], HTMLTargets.patmenu, "block", "flex");
    TrackedStatus.querystring = "?cat=access";
    displayToggle(navs["primary"][0], true);
    displayToggle(navs["primary"][1], true);
    if (TrackedStatus.clicked == true) {
      navs["primary"][2].innerHTML = "Accessories";
      for (var i = 0; i < HTMLTargets.selectaccess.length; i++) {
        HTMLTargets.selectaccess[i].selectedIndex = 0;
      }
      for (var j = 0; j < HTMLTargets.piecelist.length; j++) {
        HTMLTargets.piecelist[j].style.display = "none";
      }
      TrackedStatus.clicked = false;
    } else {
      navs["primary"][2].innerHTML = "Back";
      TrackedStatus.clicked = true;
    }
  }, {passive: false});

  navs["tertiary"][3].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontaccess[0], HTMLTargets.primarynav, "block", "flex");
    TrackedStatus.querystring = "?cat=access";
    displayToggle(navs["tertiary"][0], true);
    displayToggle(navs["tertiary"][1], true);
    displayToggle(navs["tertiary"][2], true);
    if (TrackedStatus.clicked == true) {
      navs["tertiary"][3].style.maxWidth = "25%";
      navs["tertiary"][3].style.margin = "0 0 0 0.5%";
      navs["tertiary"][3].parentElement.style.padding = "5% 0";
      for (var i = 0; i < HTMLTargets.selectaccess.length; i++) {
        HTMLTargets.selectaccess[i].selectedIndex = 0;
      }
      for (var j = 0; j < HTMLTargets.piecelist.length; j++) {
        HTMLTargets.piecelist[j].style.display = "none";
      }
      TrackedStatus.clicked = false;
    } else {
      navs["tertiary"][3].style.maxWidth = "33%";
      navs["tertiary"][3].style.margin = "0 auto";
      navs["tertiary"][3].parentElement.style.padding = "3% 0";
      TrackedStatus.clicked = true;
    }
  }, {passive: false});
}

if (HTMLTargets.inventory != null) {
  var totals = new Array(3);
  for (var b = 0; b < totals.length; b++) {
    queryFromSelect(selectprice[b], "price");
    queryFromSelect(selectsize[b], "size");
    queryFromSelect(selectpiece[b], "piece");
  }
  var piecearr = ["all", "top", "one", "bottom", "under", "foot"];

  if (HTMLTargets.select != null) {
    displayFromSelect(piecearr, "mens", piecearr[0]);
    displayFromSelect(piecearr, "womens", piecearr[0]);
    displayFromSelect(piecearr, "access", piecearr[0]);
  }
}

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
    if (HTMLTargets.home != null) {
      setTimeout(function() { resizestatus(offsetChangeX(HTMLTargets.comicstrip, HTMLTargets.logo)); }, EventStagger.postresize);
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
