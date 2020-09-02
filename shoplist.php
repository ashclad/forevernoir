<?php

require 'fun.php';
use fun\apiQuery as queryapi;

//$_GET["cat"] = "unisex";
$API = parse_ini_file('api/api.ini',true)['API'];
$shopify = new queryapi();
$shopify->set_api($API['scheme'],$API['hostname'],$API['endpoint'],$API['username'],$API['password']);

function listify($productarray) {
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
      echo "\t\t<span class=\"productprice\">$" . number_format($sum / $divisor, 2) . "</span>\n";
    } //  make sure to check for alternative (add else statement later)
    echo "\t\t<button>Purchase</button>\n";
    echo "\t\t<button>Cart</button>\n";
    echo "\t</div>\n";
  }
}

function outputtit($cat, $subcat="") {
  if ($subcat != "") {
    echo "<h1>" . $cat . " > " . $subcat . "</h1>\n";
  } else {
    echo "<h1>" . $cat . "</h1>\n";
  }
}

if ($_GET["cat"] == "unisex" && count($_GET) == 1) {
  # Get Products
  $shopify->query('products.json');
  $products = $shopify->get();
  $products = $products['products'];
  outputtit("Clothing");
  echo "<div class=\"stock\">\n";
  listify($products);
  echo "</div>";
} else if ($_GET["cat"] == "unisex" && $_GET["piece"] == "top" && count($_GET) == 2) {
  # Get Tops
  $shopify->query('collections/168202895457/products.json');
  $jackets = $shopify->get();
  $jackets = $jackets['products'];
  $shopify->query('collections/168202698849/products.json');
  $hoodies = $shopify->get();
  $hoodies = $hoodies['products'];
  $shopify->query('collections/168202535009/products.json');
  $shirts = $shopify->get();
  $shirts = $shirts['products'];
  $shopify->query('collections/168202666081/products.json');
  $sleeves = $shopify->get();
  $sleeves = $sleeves['products'];
  $tops = array_merge($shirts, $sleeves, $jackets, $hoodies);
  outputtit("Clothing", "Tops");
  echo "<div class=\"stock\">\n";
  listify($tops);
  echo "</div>";
} else if ($_GET["cat"] == "unisex" && $_GET["piece"] == "bottom" && count($_GET) == 2) {
  # Get Bottoms
  $shopify->query('collections/168202862689/products.json');
  $pants = $shopify->get();
  $pants = $pants['products'];
  $bottoms = $pants;
  outputtit("Clothing", "Bottoms");
  echo "<div class=\"stock\">\n";
  listify($bottoms);
  echo "</div>";
} else if ($_GET["cat"] == "unisex" && $_GET["piece"] == "head" && count($_GET) == 2) {
  # Get Heads (lol)
  $shopify->query('collections/168202469473/products.json');
  $hats = $shopify->get();
  $hats = $hats['products'];
  $headwear = $hats;
  outputtit("Clothing", "Headwear");
  echo "<div class=\"stock\">\n";
  listify($headwear);
  echo "</div>";
}

if ($_GET["cat"] == "access" && count($_GET) == 1) {
  echo "<h1>Accessories</h1>";
}

?>
