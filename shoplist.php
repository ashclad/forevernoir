<?php

require 'fun.php';
use fun\apiQuery as queryapi;

$_GET["cat"] = "unisex";
$API = parse_ini_file("api/api.ini",true)['API'];
$shopify = new queryapi();
$shopify->set_api($API['scheme'],$API['hostname'],$API['endpoint'],$API['username'],$API['password']);
$shopify->query("products.json");
echo $shopify->get(true,false) . "\n";
$products = $shopify->get();
$products = $products["products"];

if ($_GET["cat"] == "unisex") {
  echo "<h1>Unisex Clothing</h1>";
  echo "<div>";
  echo "</div>";
} else if ($_GET["cat"] == "access") {
  echo "<h1>Accessories</h1>";
}

?>
