<?php

/* info on authenticating shopify: https://weeklyhow.com/how-to-build-shopify-apps-with-php-2/ */

$api_key = "7e1a33f3bae8b0212bf6db1ac9ab2241";
$api_pwd = "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";
$hostname = "forevernoir.myshopify.com/";
$baseurl = "https://" . $api_key . ":" . $api_pwd . "@" . $hostname;
$api_endpoint = "admin/api/";
$version = "2020-07/";
$baseurl .= $api_endpoint . $version;
$alturl = "https://" . $hostname . $api_endpoint . $version;

function shopifyQuery($q,$cat="products",$parse=null) {
  if (gettype($q) == "integer") {
    $q = (string)$q . ".json";
  }
  $queryurl = $baseurl . $cat . "/" . $q;
  $curl = curl_init();
  $curl_setopt_array($curl, [
    CURLOPT_URL => $queryurl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
  ]);
  $output = curl_exec($curl);
  $err = curl_error($curl);
  curl_close($curl);
  $output = utf8_encode($output);
  if ($parse == "json") {
    $output = json_decode($output,true);
  }
  return $output;
}

$openingid = "\"target\"";
if ($_GET["cat"] == "unisex") {
  echo "<h1>Unisex Clothing</h1>";
  $colldata = shopifyQuery(168202895457,"collections","json");
  echo "<h2>" . $colldata['collection']['title'] . "</h2>";
} else if ($_GET["cat"] == "access") {
  echo "<h1>Accessories</h1>";
}

?>
