<?php

require 'fun.php';
use fun as q;

// order matters--how to specify priority?
$_GET["cat"] = "unisex";
$_GET["piece"] = "top";
$_GET["type"] = "tshirt";
$_GET["size"] = "s";
$_GET["price"] = "ceiling";
$API = parse_ini_file('api/api.ini',TRUE)['API'];
$shopify = new q\apiQuery();
$shopify->set_api($API['scheme'],$API['hostname'],$API['endpoint'],$API['username'],$API['password']);

function listify($productarray) {
  // loop for decorating the data of each item of array in HTML
  foreach ($productarray as $product) {
    $newwidth = (int)$product['image']['width'] / 3;
    $newheight = (int)$product['image']['height'] / 3;
    echo "\t<div id=\"" . $product['id'] . "\" class=\"product " . $product['handle'] . " " . $product['product_type'] . "\">\n";
    echo "\t\t<span class=\"productit\">" . $product['title'] . "</span>\n";
    echo "\t\t<img src=\"" . $product['image']['src'] . "\" alt=\"" . $product['image']['alt'] . "\" />\n";
    if ($product['variants']) {
      $sum = 0;
      foreach ($product['variants'] as $variant) {
        $sum += $variant['price'];
      }
      $divisor = count($product['variants']);
      echo "\t\t<span class=\"productprice\">\$" . number_format($sum / $divisor, 2) . "</span>\n";
    } //  make sure to check for alternative (add else statement later)
    echo "\t\t<button>Purchase</button>\n";
    echo "\t\t<button>Cart</button>\n";
    echo "\t</div>\n";
  }
}

function outputtit($cat, $subcat="") {
  // check if there was input for second parameter
  // and change formatting on that basis
  if ($subcat != "") {
    echo "<h1>" . $cat . " > " . $subcat . "</h1>\n";
  } else {
    echo "<h1>" . $cat . "</h1>\n";
  }
}

if (isset($_GET['cat'])) {
  $result = q\allProducts($_GET['cat']);
}

if (isset($_GET['piece']) and !isset($_GET['type'])) {
  if (gettype($result) == "array") {
    $result = q\getPieces($_GET['piece'], $result);
  }
} else if (isset($_GET['piece']) and isset($_GET['type'])) {
  if (gettype($result) == "array") {
    $result = q\getPieces($_GET['piece'], $result);
  }

  if (gettype($result) == "array") {
    if ($_GET['piece'] == "top") {
      $result = q\getTops($_GET['type'], $result);
    } else if ($_GET['piece'] == "bottom") {
      $result = q\getBottoms($_GET['type'], $result);
    } else if ($_GET['piece'] == "head") {
      $result = q\getHeads($_GET['type'], $result);
    }
  }
}

if (isset($_GET['size'])) {
  if (gettype($result) == "array") {
    $result = q\getSizes($_GET['size'], q\allProducts($_GET['cat']), $result);
  }
}

print_r($result[0]);

if (isset($_GET['price'])) {
  if (gettype($result) == "array") {
    $result = q\getPrices($_GET['price'], $result);
  }
}

#print_r($result[0]);

?>
