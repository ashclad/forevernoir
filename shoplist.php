<?php

require 'fun.php';
use fun\apiQuery as queryapi;

#$_GET["cat"] = "unisex";
$API = parse_ini_file('api/api.ini',true)['API'];
$shopify = new queryapi();
$shopify->set_api($API['scheme'],$API['hostname'],$API['endpoint'],$API['username'],$API['password']);
$shopify->query('products.json');
$products = $shopify->get();
#print_r($products['products']);
$products = $products['products'];

$productimgs = [];
for ($i = 0; $i < count($products); $i++) {
  $productimgs[$i] = $products[$i]['image'];
}

#print_r($productimgs[0]['src']);
#echo "<img src=\"" . $productimgs[0]['src'] . "\" />";

if ($_GET["cat"] == "unisex") {
  echo "<h1>Unisex Clothing</h1>\n";
  echo "<div class=\"stock\">\n";
  foreach ($products as $product) {
    $newwidth = (int)$product['image']['width'] / 3;
    $newheight = (int)$product['image']['height'] / 3;
    echo "\t<div id=\"" . $product['id'] . "\" class=\"product " . $product['handle'] . " " . $product['product_type'] . "\">\n";
    echo "\t\t<span class=\"productit\">" . $product['title'] . "</span>\n";
    // echo "\t\t<img width=\"" . $newwidth . "px\" height=\"" . $newheight . "px\" src=\"" . $product['image']['src'] . "\" alt=\"" . $product['image']['alt'] . "\" />\n";
    echo "\t\t<img src=\"" . $product['image']['src'] . "\" alt=\"" . $product['image']['alt'] . "\" />\n";
    $pricearr = [];
    for ($x=0; $x < count($product['variants']); $x++) {
      foreach ($product['variants'] as $variant) {
        $pricearr[$x] = $variant['price'];
      }
    }
    print_r($pricearr);
    if ((float)$pricearr[0] == (float)$pricearr[count($pricearr) - 1]) {
      echo "\t\t<span class=\"productprice\">$" . $pricearr[0] . "</span>\n";
    } else {
      echo "\t\t<span class=\"productprice\">Range: $" . $pricearr[count($pricearr) - 1] . "-" . $pricearr[0] . "</span>\n";
    }
    echo "\t\t<button></button>\n";
    echo "\t</div>\n";
  }
  echo "</div>";
} else if ($_GET["cat"] == "access") {
  echo "<h1>Accessories</h1>";
}

?>
