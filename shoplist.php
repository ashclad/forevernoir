<?php

require 'fun.php';
use fun\apiQuery as queryapi;

// order matters--how to specify priority?
#$_GET["cat"] = "unisex";
#$_GET["size"] = "xxl";
#$_GET["price"] = "floor";
$API = parse_ini_file('api/api.ini',TRUE)['API'];
$shopify = new queryapi();
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
      echo "\t\t<span class=\"productprice\">$" . number_format($sum / $divisor, 2) . "</span>\n";
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

// determine stock array items by looping through GET request parameters
// and testing for certain values for any of the given keys
// depending on test outcome, redeclare stock variable
foreach ($_GET as $key => $value) {
  if ($value == "all") {
    unset($_GET[$key]);
  }

  if ($key == "cat" and isset($stock) == FALSE and count($_GET) == 1) {
    if ($_GET[$key] == "unisex") {
      $shopify->query("products.json");
      $stock = $shopify->get();
      $stock = $stock["products"];
    }
  }

  if ($key == "piece") {
    # All categories related to tops
    $shopify->query("collections/168202535009.json");
    $shirts = $shopify->get();
    $shirts = $shirts['products'];
    $shopify->query("collections/168202895457.json");
    $jackets = $shopify->get();
    $jackets = $jackets['products'];
    $shopify->query("collections/168202666081.json");
    $sleeves = $shopify->get();
    $sleeves = $sleeves['products'];
    $shopify->query("collections/168202698849.json");
    $hoodies = $shopify->get();
    $hoodies = $hoodies['products'];
    $topstock = array_merge($shirts,$jackets,$sleeves,$hoodies);
    # All categories related to bottoms
    $shopify->query("collections/170436165729.json");
    $shorts = $shopify->get();
    $shorts = $shorts['products'];
    $shopify->query("collections/168202862689.json");
    $pants = $shopify->get();
    $pants = $pants['products'];
    $bottomstock = array_merge($shorts,$pants);
    # All categories related to headware
    $shopify->query("collections/168202469473.json");
    $hats = $shopify->get();
    $hats = $hats['products'];
    $shopify->query("collections/168202731617.json");
    $beanies = $shopify->get();
    $beanies = $beanies['products'];
    $headstock = array_merge($hats,$beanies);

    if (isset($stock) == FALSE) {
      if ($_GET["cat"] == "unisex") {
        $shopify->query("products.json");
        $stock = $shopify->get();
        $stock = $stock["products"];
      }
    }

    if ($_GET['piece'] == "top") {
      if (isset($_GET['type']) == FALSE) {
        $stock = $topstock;
      } else {
        $stock = [];
        for ($b=0; $b < count($topstock); $b++) {
          if ($_GET['type'] != "drop" and stripos($topstock[$b]['product_type'],$_GET['type']) == TRUE) {
            $stock[$b] = $topstock[$b];
          } elseif ($_GET['type'] == "drop") {
              $stock = $sleeves;
            }
        }
      }
    } elseif ($_GET['piece'] == "bottom") {
      if (isset($_GET['type']) == FALSE) {
        $stock = $bottomstock;
      } else {
        $stock = [];
        for ($c=0; $c < count($bottomstock); $c++) {
          if (stripos($bottomstock[$c]['product_type'],$_GET['type']) == TRUE) {
            $stock[$c] = $bottomstock[$c];
          }
        }
      }
    } elseif ($_GET['piece'] == "head") {
      if (isset($_GET['type']) == FALSE) {
        $stock = $headstock;
      } else {
        $stock = [];
        for ($d=0; $d < count($headstock); $d++) {
          if (stripos($headstock[$d]['product_type'],$_GET['type']) == TRUE) {
            $stock[$d] = $headstock[$d];
          }
        }
      }
    }
  }

  if ($key == "size") {
    if (isset($stock) == FALSE) {
      if ($_GET["cat"] == "unisex") {
        $shopify->query("products.json");
        $stock = $shopify->get();
        $stock = $stock["products"];
      }
    }

    $newstock = [];
    for ($e=0; $e < count($stock); $e++) {
      $variant = $stock[$e]['variants'];
      for ($y=0; $y < count($variant); $y++) {
        if ($variant[$y]['option1'] == $value) {
          $newstock[$e] = [
            "id" => $stock[$e]['id'],
            "title" => $stock[$e]['title'],
            "product_type" => $stock[$e]['product_type'],
            "handle" => $stock[$e]['handle'],
            "vendor" => $stock[$e]['vendor'],
            "tags" => $stock[$e]['tags']
          ];

          $newstock[$e]['variants'][$y] = [
            "id" => $variant[$y]['id'],
            "title" => $variant[$y]['title'],
            "product_id" => $variant[$y]['product_id'],
            "price" => $variant[$y]['price'],
            "sku" => $variant[$y]['sku'],
            "inventory_quantity" => $variant[$y]['inventory_quantity'],
            "old_inventory_quantity" => $variant[$y]['old_inventory_quantity'],
            "fulfillment_service" => $variant[$y]['fulfillment_service'],
            "requires_shipping" => $variant[$y]['requires_shipping'],
            "option1" => $variant[$y]['option1']
          ];
        } else {
          unset($newstock[$e]);
        }
        // reset keys for newstock['variants']
      }
    }
    $setkey = [];
    for ($x=0; $x < count($newstock); $x++) {
      if (isset($newstock[$x])) {
        array_push($setkey, $newstock[$x]);
      }
    }

    if (isset($_GET[$key])) {
      $stock = $setkey;
    }
  }

  if ($key == "price") {
    if (isset($stock) == FALSE) {
      if ($_GET["cat"] == "unisex") {
        $shopify->query("products.json");
        $stock = $shopify->get();
        $stock = $stock["products"];
      }
    }

    $totalprice = 0;
    $numprices = 0;
    $pricearr = [];
    for ($i=0; $i < count($stock); $i++) {
      $items = $stock[$i]['variants'];
      for ($q=0; $q < count($items); $q++) {
        $newarr[$q] = $items[$q]['price'];
      }
      $pricearr = array_merge($pricearr, $newarr);
    }
    sort($pricearr);
    foreach ($pricearr as $price) {
      $totalprice += $price;
    }
    $numprices = count($pricearr);
    #print($totalprice . "\n");
    #print($numprices . "\n");
    $avgprice = $totalprice / $numprices;
    $avgprice = number_format($avgprice, 2);
    #print($avgprice . "\n");
    #print_r($pricearr);
    $maxprice = max($pricearr);
    #print($maxprice . "\n");
    $minprice = min($pricearr);
    #print($minprice . "\n");
    $lowerbound = $avgprice - (($avgprice-$minprice)/2);
    #print($lowerbound . "\n");
    $upperbound = $avgprice + (($maxprice-$avgprice)/2);
    #print($upperbound . "\n");

    $newstock = [];
    if ($value == "floor") {
      for ($f=0; $f < count($stock); $f++) {
        # copy and paste the following to equivalent code in other GET request conditionals
        $variant = $stock[$f]['variants'];
        for ($z=0; $z < count($variant); $z++) {
          if ($variant[$z]['price'] < $lowerbound and $variant[$z]['price'] >= $minprice) {
            $newstock[$f] = [
              "id" => $stock[$f]['id'],
              "title" => $stock[$f]['title'],
              "product_type" => $stock[$f]['product_type'],
              "handle" => $stock[$f]['handle'],
              "vendor" => $stock[$f]['vendor'],
              "tags" => $stock[$f]['tags']
            ];

            $newstock[$f]['variants'][$z] = [
              "id" => $variant[$z]['id'],
              "title" => $variant[$z]['title'],
              "product_id" => $variant[$z]['product_id'],
              "price" => $variant[$z]['price'],
              "sku" => $variant[$z]['sku'],
              "inventory_quantity" => $variant[$z]['inventory_quantity'],
              "old_inventory_quantity" => $variant[$z]['old_inventory_quantity'],
              "fulfillment_service" => $variant[$z]['fulfillment_service'],
              "requires_shipping" => $variant[$z]['requires_shipping'],
              "option1" => $variant[$z]['option1']
            ];
          } else {
            unset($newstock[$f]);
          }
          // reset keys for newstock['variants']
        }
      }
      $setkey = [];
      for ($x=0; $x < count($newstock); $x++) {
        if (isset($newstock[$x])) {
          array_push($setkey, $newstock[$x]);
        }
      }
    } elseif ($value == "median") {
      for ($f=0; $f < count($stock); $f++) {
        # copy and paste the following to equivalent code in other GET request conditionals
        $variant = $stock[$f]['variants'];
        for ($z=0; $z < count($variant); $z++) {
          if ($variant[$z]['price'] > $lowerbound and $variant[$z]['price'] < $upperbound) {
            $newstock[$f] = [
              "id" => $stock[$f]['id'],
              "title" => $stock[$f]['title'],
              "product_type" => $stock[$f]['product_type'],
              "handle" => $stock[$f]['handle'],
              "vendor" => $stock[$f]['vendor'],
              "tags" => $stock[$f]['tags']
            ];

            $newstock[$f]['variants'][$z] = [
              "id" => $variant[$z]['id'],
              "title" => $variant[$z]['title'],
              "product_id" => $variant[$z]['product_id'],
              "price" => $variant[$z]['price'],
              "sku" => $variant[$z]['sku'],
              "inventory_quantity" => $variant[$z]['inventory_quantity'],
              "old_inventory_quantity" => $variant[$z]['old_inventory_quantity'],
              "fulfillment_service" => $variant[$z]['fulfillment_service'],
              "requires_shipping" => $variant[$z]['requires_shipping'],
              "option1" => $variant[$z]['option1']
            ];
          } else {
            unset($newstock[$f]);
          }
          // reset keys for newstock['variants']
        }
      }
      $setkey = [];
      for ($x=0; $x < count($newstock); $x++) {
        if (isset($newstock[$x])) {
          array_push($setkey, $newstock[$x]);
        }
      }
    } elseif ($value == "ceiling") {
      for ($f=0; $f < count($stock); $f++) {
        # copy and paste the following to equivalent code in other GET request conditionals
        $variant = $stock[$f]['variants'];
        for ($z=0; $z < count($variant); $z++) {
          if ($variant[$z]['price'] > $upperbound and $variant[$z]['price'] <= $maxprice) {
            $newstock[$f] = [
              "id" => $stock[$f]['id'],
              "title" => $stock[$f]['title'],
              "product_type" => $stock[$f]['product_type'],
              "handle" => $stock[$f]['handle'],
              "vendor" => $stock[$f]['vendor'],
              "tags" => $stock[$f]['tags']
            ];

            $newstock[$f]['variants'][$z] = [
              "id" => $variant[$z]['id'],
              "title" => $variant[$z]['title'],
              "product_id" => $variant[$z]['product_id'],
              "price" => $variant[$z]['price'],
              "sku" => $variant[$z]['sku'],
              "inventory_quantity" => $variant[$z]['inventory_quantity'],
              "old_inventory_quantity" => $variant[$z]['old_inventory_quantity'],
              "fulfillment_service" => $variant[$z]['fulfillment_service'],
              "requires_shipping" => $variant[$z]['requires_shipping'],
              "option1" => $variant[$z]['option1']
            ];
          } else {
            unset($newstock[$f]);
          }
          // reset keys for newstock['variants']
        }
      }
      $setkey = [];
      for ($x=0; $x < count($newstock); $x++) {
        if (isset($newstock[$x])) {
          array_push($setkey, $newstock[$x]);
        }
      }
    }

    if (isset($_GET[$key])) {
      $stock = $setkey;
    }
  }
}

#print_r($stock);

?>
