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
        <a id="unisexlnk" class="opt page">Clothing</a>
        <!-- <a id="womenslnk" class="opt page">Women's</a> -->
        <a id="accesslnk" class="opt page">Accessories</a>
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
          <a id="unisexlnksecond" class="opt query" ><img class="pattern" src="assets/cat_men.jpg"></a>
          <!-- <a id="womenslnksecond" class="opt query" ><img class="pattern" src="assets/cat_men.jpg"></a> -->
          <a id="accesslnksecond" class="opt query"><img class="pattern" src="assets/cat_men.jpg"></a>
        </nav>
        <div class="storefront unisex">
          <nav class="sidebar menu">
            <div class="price unisex">
              <label for="price">Price Ranges</label>
              <select class="dropdown unisex" name="pricetiers">
                <option value="all">∞</option>
                <option value="floor">$</option>
                <option value="median">$$</option>
                <option value="ceiling">$$$</option>
              </select>
            </div>
            <div class="size unisex">
              <label for="size">Sizes</label>
              <select class="dropdown unisex" name="sizetiers">
                <option value="all">All</option>
                <option value="t">Tiny</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <div class="piece unisex">
              <legend>Pieces</legend>
              <select class="dropdown unisex" name="piecetypes">
                <option name="piece" value="all">All</option>
                <option name="piece" value="top">Tops</option>
                <!-- <option name="piece" value="one">One-Pieces</option> -->
                <option name="piece" value="bottom">Bottoms</option>
                <option name="piece" value="head">Headwear</option>
                <!-- <option name="piece" value="under">Underclothes</option>
                <option name="piece" value="foot">Footwear</option> -->
              </select>
              <fieldset class="piecelist unisex">
                <legend class="toppiece">Tops</legend>
                <input type="radio" name="top" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="top" value="tshirt">
                <label for="piece">T-Shirts</label><br>
                <!-- <input type="radio" name="top" value="ashirt">
                <label for="piece">A-Shirts</label><br>
                <input type="radio" name="top" value="dshirt">
                <label for="piece">Dress Shirts</label><br> -->
                <input type="radio" name="top" value="jacket">
                <label for="piece">Jackets</label><br>
                <input type="radio" name="top" value="sweatshirt">
                <label for="piece">Sweatshirts</label><br>
                <input type="radio" name="top" value="hoodie">
                <label for="piece">Hoodies</label><br>
                <input type="radio" name="top" value="drop">
                <label for="piece">Dropsleeves</label>
                <!-- <input type="radio" name="top" value="vest">
                <label for="piece">Vests</label> -->
              </fieldset>
              <!-- <fieldset class="piecelist unisex">
                <legend class="onepiece">One-Pieces</legend>
                <input type="radio" name="one" value="all">
                <label for="piece">All</label>
                <input type="radio" name="one" value="overall">
                <label for="piece">Overalls</label>
              </fieldset> -->
              <fieldset class="piecelist unisex">
                <legend class="bottompiece">Bottoms</legend>
                <input type="radio" name="bottom" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="bottom" value="pants">
                <label for="piece">Pants</label>
                <!-- <input type="radio" name="bottom" value="ltrouser">
                <label for="piece">Long Trousers</label><br>
                <input type="radio" name="bottom" value="strouser">
                <label for="piece">Short Trousers</label><br>
                <input type="radio" name="bottom" value="dtrouser">
                <label for="piece">Dress Trousers</label> -->
              </fieldset>
              <!-- <fieldset class="piecelist unisex">
                <legend class="underpiece">Underclothes</legend>
                <input type="radio" name="under" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="under" value="boxer">
                <label for="piece">Boxer Shorts</label><br>
                <input type="radio" name="under" value="brief">
                <label for="piece">Boxer Briefs</label>
              </fieldset>
              <fieldset class="piecelist unisex">
                <legend class="footpiece">Footwear</legend>
                <input type="radio" name="foot" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="foot" value="sneaker">
                <label for="piece">Sneakers</label><br>
                <input type="radio" name="foot" value="boot">
                <label for="piece">Boots</label><br>
                <input type="radio" name="foot" value="shoe">
                <label for="piece">Dress Shoes</label><br>
                <input type="radio" name="foot" value="sock">
                <label for="piece">Socks</label>
              </fieldset> -->
              <fieldset class="piecelist unisex">
                <legend class="headpiece">Headwear</legend>
                <input type="radio" name="head" value="all">
                <label for="piece">All</label>
                <input type="radio" name="head" value="beanie">
                <label for="piece">Beanies</label>
                <input type="radio" name="head" value="hat">
                <label for="piece">Hats</label>
              </fieldset>
            </div>
          </nav>
          <div class="aisle">
            <!-- content -->
          </div>
        </div>
        <!-- <div class="storefront womens">
          <nav class="sidebar menu">
            <div class="price womens">
              <label for="price">Price Ranges</label>
              <select class="dropdown pricechoice womens" name="pricetiers">
                <option value="all">∞</option>
                <option value="floor">$</option>
                <option value="median">$$</option>
                <option value="ceiling">$$$</option>
              </select>
            </div>
            <div class="size womens">
              <label for="size">Sizes</label>
              <select class="dropdown sizechoice womens" name="sizetiers">
                <option value="all">All</option>
                <option value="t">Tiny</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <div class="piece womens">
              <legend>Pieces</legend>
              <select class="dropdown piecechoice womens" name="piecetypes">
                <option name="piece" value="all">All</option>
                <option name="piece" value="top">Tops</option>
                <option name="piece" value="one">One-Pieces</option>
                <option name="piece" value="bottom">Bottoms</option>
                <option name="piece" value="under">Underclothes</option>
                <option name="piece" value="foot">Footwear</option>
              </select>
              <fieldset class="piecelist">
                <legend class="toppiece">Tops</legend>
                <input type="radio" name="top" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="top" value="tshirt">
                <label for="piece">T-Shirt</label><br>
                <input type="radio" name="top" value="ashirt">
                <label for="piece">A-Shirt</label><br>
                <input type="radio" name="top" value="dshirt">
                <label for="piece">Dress Shirts</label><br>
                <input type="radio" name="top" value="jacket">
                <label for="piece">Jackets</label><br>
                <input type="radio" name="top" value="vest">
                <label for="piece">Vests</label>
              </fieldset>
              <fieldset class="piecelist">
                <legend class="onepiece">One-Pieces</legend>
                <input type="radio" name="one" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="one" value="jump">
                <label for="piece">Jumpers</label><br>
                <input type="radio" name="one" value="dress">
                <label for="piece">Dresses</label><br>
                <input type="radio" name="one" value="overall">
                <label for="piece">Overalls</label>
              </fieldset>
              <fieldset class="piecelist">
                <legend class="bottompiece">Bottoms</legend>
                <input type="radio" name="bottom" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="bottom" value="ltrouser">
                <label for="piece">Long Trousers</label><br>
                <input type="radio" name="bottom" value="strouser">
                <label for="piece">Short Trousers</label><br>
                <input type="radio" name="bottom" value="dtrouser">
                <label for="piece">Dress Trousers</label><br>
                <input type="radio" name="bottom" value="skirt">
                <label for="piece">Skirts</label>
              </fieldset>
              <fieldset class="piecelist">
                <legend class="underpiece">Underclothes</legend>
                <input type="radio" name="under" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="under" value="boxer">
                <label for="piece">Boxer Shorts</label><br>
                <input type="radio" name="under" value="brief">
                <label for="piece">Boxer Briefs</label><br>
                <input type="radio" name="under" value="panty">
                <label for="piece">Panties</label>
              </fieldset>
              <fieldset class="piecelist">
                <legend class="footpiece">Footwear</legend>
                <input type="radio" name="foot" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="foot" value="sneaker">
                <label for="piece">Sneakers</label><br>
                <input type="radio" name="foot" value="boot">
                <label for="piece">Boots</label><br>
                <input type="radio" name="foot" value="shoe">
                <label for="piece">Dress Shoes</label><br>
                <input type="radio" name="foot" value="sock">
                <label for="piece">Socks</label>
              </fieldset>
            </div>
          </nav>
          <div class="aisle">
            sample
          </div>
        </div> -->
        <div class="storefront access">
          <nav class="sidebar menu">
            <div class="price access">
              <label for="price">Price Ranges</label>
              <select class="dropdown access" name="pricetiers">
                <option value="all">∞</option>
                <option value="floor">$</option>
                <option value="median">$$</option>
                <option value="ceiling">$$$</option>
              </select>
            </div>
            <div class="size access">
              <label for="size">Sizes</label>
              <select class="dropdown access" name="sizetiers">
                <option value="all">∞</option>
                <option value="xxs">Tiny</option>
                <option value="xs">Tiny</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <div class="piece access">
              <legend>Pieces</legend>
              <select class="dropdown access" name="piecetypes">
                <option name="piece" value="all">All</option>
                <option name="piece" value="top">Tops</option>
                <!-- <option name="piece" value="one">One-Pieces</option> -->
                <option name="piece" value="bottom">Bottoms</option>
                <!-- <option name="piece" value="under">Underclothes</option>
                <option name="piece" value="foot">Footwear</option> -->
                <option name="piece" value="head">Headwear</option>
              </select>
              <fieldset class="piecelist access">
                <legend class="toppiece">Tops</legend>
                <input type="radio" name="top" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="top" value="tshirt">
                <label for="piece">T-Shirt</label><br>
                <!-- <input type="radio" name="top" value="ashirt">
                <label for="piece">A-Shirt</label><br>
                <input type="radio" name="top" value="dshirt">
                <label for="piece">Dress Shirts</label><br> -->
                <input type="radio" name="top" value="jacket">
                <label for="piece">Jackets</label><br>
                <input type="radio" name="top" value="hoodies">
                <label for="piece">Hoodies</label><br>
                <input type="radio" name="top" value="drop">
                <label for="piece">Dropsleeves</label>
                <!-- <input type="radio" name="top" value="vest">
                <label for="piece">Vests</label> -->
              </fieldset>
              <!-- <fieldset class="piecelist access">
                <legend class="onepiece">One-Pieces</legend>
                <input type="radio" name="one" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="one" value="jump">
                <label for="piece">Jumpers</label><br>
                <input type="radio" name="one" value="dress">
                <label for="piece">Dresses</label><br>
                <input type="radio" name="one" value="overall">
                <label for="piece">Overalls</label>
              </fieldset> -->
              <fieldset class="piecelist access">
                <legend class="bottompiece">Bottoms</legend>
                <input type="radio" name="bottom" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="bottom" value="pants">
                <label for="piece">Pants</label><br>
                <!-- <input type="radio" name="bottom" value="ltrouser">
                <label for="piece">Long Trousers</label><br>
                <input type="radio" name="bottom" value="strouser">
                <label for="piece">Short Trousers</label><br>
                <input type="radio" name="bottom" value="dtrouser">
                <label for="piece">Dress Trousers</label><br>
                <input type="radio" name="bottom" value="skirt">
                <label for="piece">Skirts</label> -->
              </fieldset>
              <!-- <fieldset class="piecelist access">
                <legend class="underpiece">Underclothes</legend>
                <input type="radio" name="under" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="under" value="boxer">
                <label for="piece">Boxer Shorts</label><br>
                <input type="radio" name="under" value="brief">
                <label for="piece">Boxer Briefs</label><br>
                <input type="radio" name="under" value="panty">
                <label for="piece">Panties</label>
              </fieldset>
              <fieldset class="piecelist access">
                <legend class="footpiece">Footwear</legend>
                <input type="radio" name="foot" value="all">
                <label for="piece">All</label><br>
                <input type="radio" name="foot" value="sneaker">
                <label for="piece">Sneakers</label><br>
                <input type="radio" name="foot" value="boot">
                <label for="piece">Boots</label><br>
                <input type="radio" name="foot" value="shoe">
                <label for="piece">Dress Shoes</label><br>
                <input type="radio" name="foot" value="sock">
                <label for="piece">Socks</label>
              </fieldset> -->
              <fieldset class="piecelist access">
                <legend class="headpiece">Headwear</legend>
                <input type="radio" name="head" value="all">
                <label for="piece">All</label>
                <input type="radio" name="head" value="beanies">
                <label for="piece">Beanies</label>
                <input type="radio" name="head" value="hats">
                <label for="piece">Hats</label>
              </fieldset>
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
