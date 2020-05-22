<!DOCTYPE HTML>
<html lang="en" class="inventory">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="shop,store,clothes,clothing,fashion,art">
    <meta name="description" content="Noir clothing store.">
    <link rel="stylesheet" type="text/css" href="css/master.css" media="all">
    <!-- <link rel="stylesheet" type="text/css" href="css/resizes.css" media="screen"> -->
    <link rel="stylesheet" type="text/css" href="css/print.css" media="print">
    <script type="text/javascript" src="scripts/fun.js" defer></script>
    <script type="text/javascript" src="scripts/run.js" defer></script>
    <link rel="icon" href="assets/logo.ico">
    <title>Forever Noir &gt; Inventory</title>
  </head>
  <body>
    <header id="mainhead">
      <a class="history back page" href="index.html"><div class="decor triangle"></div></a>
      <a id="cartlnk" class="page" href="_cart.html"><img id="maincart" class="cart" src="assets/cart.png"></a>
      <a id="indexlnk" class="page" href="inventory.html"><img id="mainlogo" class="logo" src="assets/logo.png"></a>
      <nav class="primarynav">
        <a id="menslnkfirst" class="opt page">Men's</a>
        <a id="womenslnksecond" class="opt page">Women's</a>
        <a id="accesslnkthird" class="opt page">Accessories</a>
      </nav>
    </header>
    <main class="collection">
      <!-- making a gallery using flex: https://www.taniarascia.com/how-to-build-a-responsive-image-gallery-with-flexbox/ -->
      <!-- php form handling: https://www.w3schools.com/php/php_forms.asp -->
        <nav class="menu patterns">
          <nav class="menu secondarynav">
            <div id="inventorygroup" class="linkgrouping">
              <a id="affilnk" class="opt page" href="_credits.php"><span>Affiliates</span></a>
              <a id="affilnk" class="opt page" href="_credits.php"><span>Affiliates</span></a>
            </div>
            <div id="inventorygroup" class="linkgrouping">
              <a id="legalnk" class="opt page" href="_legal.html"><span>Legal</span></a>
              <a id="legalnk" class="opt page" href="_legal.html"><span>Legal</span></a>
            </div>
            <div id="inventorygroup" class="linkgrouping">
              <a id="contactlnk" class="opt page" href="_contact.html"><span>Contact Us</span></a>
              <a id="contactlnk" class="opt page" href="_contact.html"><span>Contact Us</span></a>
            </div>
          </nav>
          <a id="menslnk" class="opt query" href="category.php?s=men"><img class="pattern" src="assets/cat_men.jpg"></a>
          <a id="womenslnk" class="opt query" href="category.php?s=women"><img class="pattern" src="assets/cat_men.jpg"></a>
          <a id="accesslnk" class="opt query" href="category.php?s=children"><img class="pattern" src="assets/cat_men.jpg"></a>
        </nav>
        <div class="storefront mens">
          <nav class="sidebar menu mens">
            <div class="price mens">
              <label for="price">Price Range</label>
              <select class="pricechoice" name="pricetiers">
                <option value="floor">$</option>
                <option value="median">$$</option>
                <option value="ceiling">$$$</option>
              </select>
            </div>
            <div class="size mens">
              <label for="size">Price Range</label>
              <select class="sizechoice" name="sizetiers">
                <option value="t">Tiny</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
          </nav>
          <div class="aisle">
            <!-- content -->
          </div>
        </div>
    </main>
    <footer id="mainfooter">
      <!--<span class="gallery">
        <img class="animation hanger" src="assets/footer_gif.gif">
        <img class="animation hanger" src="assets/footer_gif1.gif">
        <img class="animation hanger" src="assets/footer_gif2.gif">
      </span>-->
      <span class="legal">&copy; 2020</span>
    </footer>
  </body>
</html>