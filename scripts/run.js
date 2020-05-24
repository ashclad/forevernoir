/* global variables */
var cook = document.cookie;
var parser = new DOMParser();
var querystring = "?";
console.log("Preparing elements and related variables for input.");
var HTMLTargets = {
  home: document.getElementsByClassName("home")[0],
  inventory: document.getElementsByClassName("inventory")[0],
  logo: document.getElementById("mainlogo"),
  panels: document.getElementsByClassName("slide"),
  comicstrip: document.getElementsByClassName("comicstrip"),
  primarynav: document.getElementsByClassName("primarynav")[0],
  patmenu: document.getElementsByClassName("menu patterns")[0],
  storefrontmens: document.getElementsByClassName("storefront mens"),
  storefrontwomens: document.getElementsByClassName("storefront womens"),
  storefrontaccess: document.getElementsByClassName("storefront access"),
  selectprice: document.getElementsByClassName("pricechoice"),
  aisle: document.getElementsByClassName("aisle")
}

if (HTMLTargets.panels[1] != null) {
  var queuef = queueSeq(HTMLTargets.panels, "focus", "f");
  var next = queuef["next"][0];
}
if (HTMLTargets.patmenu != null) {
  var patchildlen = HTMLTargets.patmenu.children.length - 1;
  var patchild = HTMLTargets.patmenu.children[patchildlen];
}

var menslnk = document.getElementById("menslnk");
var womenslnk = document.getElementById("womenslnk");
var accesslnk = document.getElementById("accesslnk");
var menslnksecond = document.getElementById("menslnksecond");
var womenslnksecond = document.getElementById("womenslnksecond");
var accesslnksecond = document.getElementById("accesslnksecond");
var navs = [[menslnk, womenslnk, accesslnk], [menslnksecond, womenslnksecond, accesslnksecond]];
var selectsize = document.getElementsByClassName("sizechoice");

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
  querystring = "?cat=mens";
  fetch("shoplist.php" + querystring)
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

  querystring = "?cat=womens";
  fetch("shoplist.php" + querystring)
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

  querystring = "?cat=access";
  fetch("shoplist.php" + querystring)
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

window.addEventListener("scroll", function(e) {
  console.log("Acquiring scroll event information.");
  if (HTMLTargets.home != null) {
    window.scrollTo(0, 0);
    e.preventDefault();
  }
}, {passive: false});

if (HTMLTargets.inventory != null) {
  navs[0][0].addEventListener("click", function() {
    altDisplayToggle(HTMLTargets.storefrontmens[0], HTMLTargets.patmenu, "block", "flex");
    querystring = "?cat=mens";
    //displayToggle(navs[0][1], true);
    //displayToggle(navs[0][2], true);
  }, {passive: false});

  navs[1][0].addEventListener("click", function() {
    altDisplayToggle(HTMLTargets.storefrontmens[0], HTMLTargets.primarynav, "block", "flex");
    querystring = "?cat=mens";
  }, {passive: false});

  navs[0][1].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontwomens[0], HTMLTargets.patmenu, "block", "flex");
    querystring = "?cat=womens";
    //displayToggle(navs[0][0], true);
    //displayToggle(navs[0][2], true);
  }, {passive: false});

  navs[1][1].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontwomens[0], HTMLTargets.primarynav, "block", "flex");
    querystring = "?cat=womens";
  }, {passive: false});

  navs[0][2].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontaccess[0], HTMLTargets.patmenu, "block", "flex");
    querystring = "?cat=access";
    //displayToggle(navs[0][0], true);
    //displayToggle(navs[0][1], true);
  }, {passive: false});

  navs[1][2].addEventListener("click", function(e) {
    altDisplayToggle(HTMLTargets.storefrontaccess[0], HTMLTargets.primarynav, "block", "flex");
    querystring = "?cat=access";
  }, {passive: false});
}

for (var pricechoice = 0; pricechoice < HTMLTargets.selectprice.length; pricechoice++) {
  var selectpriceof = HTMLTargets.selectprice[pricechoice].parentElement.parentElement.className.indexOf("sidebar");
  if (selectpriceof > -1) {
    HTMLTargets.selectprice[pricechoice].addEventListener("change", function(e) {
      console.log("Option has been changed to " + e.target.value + ".");
      querystring = resolveQuery(querystring, "price", e.target.value);
      console.log(querystring);
    });
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
