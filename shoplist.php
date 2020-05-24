<?php

$openingid = "\"target\"";
if ($_GET["cat"] == "mens") {
  echo "<h1 id=" . $openingid . ">Men's Clothing</h1>";
} else if ($_GET["cat"] == "womens") {
  echo "<h1 id=" . $openingid . ">Women's Clothing</h1>";
} else if ($_GET["cat"] == "access") {
  echo "<h1 id=" . $openingid . ">Accessories</h1>";
}

?>
