<?php

/* info on authenticating shopify: https://weeklyhow.com/how-to-build-shopify-apps-with-php-2/ */

$openingid = "\"target\"";
if ($_GET["cat"] == "unisex") {
  echo "<h1 id=" . $openingid . ">Unisex Clothing</h1>";
} /* else if ($_GET["cat"] == "womens") {
  echo "<h1 id=" . $openingid . ">Women's Clothing</h1>";
} */ else if ($_GET["cat"] == "access") {
  echo "<h1 id=" . $openingid . ">Accessories</h1>";
}

?>
