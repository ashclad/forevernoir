<?php
namespace fun;

// classes
class apiQuery {
  public $host;
  public $end;
  public $key;
  public $pwd;
  public $pair;
  public $sch;
  public $authurl;
  public $url;
  public $q;
  public $subdir;
  public $req;

  function set_api($scheme="https://",$hostname,$endpoint,$user,$password) {
    $this->sch = $scheme;
    $this->host = (string)$hostname;
    $this->end = (string)$endpoint;
    $this->key = (string)$user;
    $this->pwd = (string)$password;
    $this->pair = (string)$user . ":" . (string)$password;
    if (strpos(substr($endpoint, -1), "/") == false) {
      $endpoint .= "/";
    }
    if (strpos(substr($hostname, -1), "/") == false and strpos(substr($endpoint, 0), "/") == false) {
      $randarr = [$hostname,$endpoint];
      $randval = rand(0,1);
      if ($randval == 0) {
        $hostname = $randarr[$randval] . "/";
      } else {
        $endpoint = "/" . $randarr[$randval];
      }
    } elseif (strpos(substr($hostname, -1), "/") == true and strpos(substr($endpoint, 0), "/") == true) {
      $randarr = [$hostname,$endpoint];
      $randval = rand(0,1);
      if ($randval == 0) {
        $hostarr = explode($randarr[$randval]);
        $lastcharh = sizeof($hostarr) - 1;
        $hostname = substr($randarr[$randval], $lastcharh - 1);
      } else {
        $endarr = explode($randarr[$randval]);
        $lastchare = -1 * sizeof($endarr);
        $endpoint = substr($randarr[$randval], $lastchare + 1);
      }
    }
    $this->authurl = $this->sch . (string)$user . ":" . (string)$password . "@" . (string)$hostname . (string)$endpoint . "/";
    $this->url = $this->sch . (string)$hostname . (string)$endpoint . "/";
  }

  function get_api() {
    return ["API" => ["hostname" => $this->host, "endpoint" => $this->end, "username" => $this->key, "password" => $this->pwd]];
  }

  function query($q,$subdir=null) {
    $this->q = (string)$q;
    if ($subdir != null) {
      $this->subdir = (string)$subdir;
    }
  }

  function get($header=true,$parse=true,$use="json") {
    $curl = curl_init();

    if ($header == true) {
      if ($this->subdir != null) {
        if (strpos(substr($this->subdir, 0), "/") == true) {
          $subarr = explode($this->subdir);
          $lastchars = -1 * sizeof($subarr);
          $subdir = substr($this->subdir, $lastchars + 1);
        } else {
          $subdir = $this->subdir;
        }

        if (strpos(substr($subdir, -1), "/") == false) {
          $subdir .= "/";
        }

        $queryurl = $this->url . $subdir . $this->q;
        $this->req = $queryurl;
      } else {
        $queryurl = $this->url . $this->q;
        $this->req = $queryurl;
      }

      curl_setopt_array($curl, [
        CURLOPT_USERPWD => $this->pair,
        CURLOPT_HEADER => "Authorization: Basic " . base64_encode($this->pair),
        CURLOPT_URL => $queryurl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET"
      ]);
    } else {
      if ($this->subdir != null) {
        if (strpos(substr($this->subdir, 0), "/") == true) {
          $subarr = explode($this->subdir);
          $lastchars = -1 * sizeof($subarr);
          $subdir = substr($this->subdir, $lastchars + 1);
        } else {
          $subdir = $this->subdir;
        }

        if (strpos(substr($subdir, -1), "/") == false) {
          $subdir .= "/";
        }

        $queryurl = $this->authurl . $subdir . $this->q;
        $this->req = $queryurl;
      } else {
        $queryurl = $this->authurl . $this->q;
        $this->req = $queryurl;
      }

      curl_setopt_array($curl, [
        CURLOPT_USERPWD => $this->pair,
        CURLOPT_URL => $queryurl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET"
      ]);
    }

    $output = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    $output = utf8_encode($output);

    if ($parse == true) {
      if (preg_match("/\.?json/i", $use) == 1) {
        $output = json_decode($output,true);
      }
    }

    if ($err != null) {
      return $err;
    } else {
      return $output;
    }
  }
}

$API = parse_ini_file('api/api.ini',TRUE)['API'];
$shopify = new apiQuery();
$shopify->set_api($API['scheme'],$API['hostname'],$API['endpoint'],$API['username'],$API['password']);

// functions
function rekey($arr) {
  if (gettype($arr) == "array") {
    $newarr = [];
    foreach ($arr as $value) {
      array_push($newarr, $value);
    }

    $arr = $newarr;
  } else {
    die();
  }

  return $arr;
}

function doQueryValues($field, $options, $query) {
  if (gettype($field) == "string" and gettype($query) == "string") {
    foreach ($options as $opt) {
      if ($query == $opt[0]) {
        if (is_callable($opt[1]) == true) {
          $output = $opt[1]();
          return $output;
        } else if (gettype($opt[1]) == "array") {
          $output = $opt[1];
          return $output;
        } else {
          die();
        }
      }
    }
  } else {
    die();
  }
}

/* QUERY FUNCTIONS */
function allProducts($majorcat) {
  global $shopify;

  $output = ["run" => "started"];
  $output["status"] = null;
  if ($majorcat == "unisex") {
    $shopify->query("products.json");
    $output = $shopify->get();
    $output = $output['products'];
  } else if ($majorcat == "access") {
    $output['status'] = "unresponsive";
    $output['run'] = "stopped";
  } else {
    die();
  }

  $stock = $output;
  return $stock;
}

function getPieces($what, $pre=allProducts) {
  if (is_callable($pre)) {
    $pre = $pre();
  }
  $output = ["run" => "started"];
  $output["status"] = null;

  function top() {
    global $shopify;
    $output = [];
    $shopify->query("collections/168202535009/products.json");
    $shirts = $shopify->get();
    $shirts = $shirts['products'];
    foreach ($shirts as $shirt) {
      array_push($output, $shirt);
    }
    $shopify->query("collections/168202895457/products.json");
    $jackets = $shopify->get();
    $jackets = $jackets['products'];
    foreach ($jackets as $jacket) {
      array_push($output, $jacket);
    }
    $shopify->query("collections/168202698849/products.json");
    $hoodies = $shopify->get();
    $hoodies = $hoodies['products'];
    foreach ($hoodies as $hoodie) {
      array_push($output, $hoodie);
    }
    $shopify->query("collections/168202666081/products.json");
    $sleeves = $shopify->get();
    $sleeves = $sleeves['products'];
    foreach ($sleeves as $sleeve) {
      array_push($output, $sleeve);
    }

    return $output;
  }

  function bottom() {
    global $shopify;
    $output = [];
    if (!isset($_GET['type'])) {
      $shopify->query("collections/170436165729/products.json");
      $shorts = $shopify->get();
      $shorts = $shorts['products'];
      foreach ($shorts as $short) {
        array_push($output, $short);
      }
      $shopify->query("collections/168202862689/products.json");
      $pants = $shopify->get();
      $pants = $pants['products'];
      foreach ($pants as $pant) {
        array_push($output, $pant);
      }
    }
    return $output;
  }

  function head() {
    global $shopify;
    $output = [];
    if (!isset($_GET['type'])) {
      $shopify->query("collections/168202731617/products.json");
      $skullies = $shopify->get();
      $skullies = $skullies['products'];
      foreach ($skullies as $skull) {
        array_push($output, $skull);
      }
      $shopify->query("collections/168202469473/products.json");
      $hats = $shopify->get();
      $hats = $hats['products'];
      foreach ($hats as $hat) {
        array_push($output, $hat);
      }
    }
    return $output;
  }

  function pieceall() {
    global $shopify;
    $output = [];
    $top = top();
    foreach ($top as $ontop) {
      array_push($output, $ontop);
    }
    $bottom = bottom();
    foreach ($bottom as $onbottom) {
      array_push($output, $onbottom);
    }
    $head = head();
    foreach ($head as $onhead) {
      array_push($output, $onhead);
    }
    return $output;
  }

  $optmatrix = [["top",top()],
  ["bottom",bottom()],
  ["head",head()],
  ["all",pieceall()]];

  if (gettype($pre) == "array" and $output['run'] == "started") {
    if (count($pre) > 0) {
      $output = doQueryValues('piece', $optmatrix, $what);
    } else {
      $output['status'] = "unresponsive";
      $output['run'] = "stopped";
    }
  } else {
    die();
  }

  if (isset($_GET['piece']) and $_GET['piece'] == "all") {
    unset($_GET['piece']);
  }

  $stock = $output;
  return $stock;
}

function getSizes($whatsize, $pre) {
  if (is_callable($pre)) {
    $pre = $pre();
  }
  $output = ["run" => "started"];
  $output["status"] = null;
  // $available_sizes = ["s","m","l","xl","xxl"];

  /* change internals of these subfunctions to compare
  if a matching variant from all products matches id of
  a product from query-narrowed results */
  function small($input) {
    global $whatsize;
    $output = [];
    if (gettype($input) == "array") {
      foreach ($input as $product) {
        for ($i = 0; $i < count($product['variants']); $i++) {
          if ($product['variants'][$i]['option1'] == "s") {
            array_push($output, $product['variants'][$i]);
          }
        }
      }

      // foreach ($output as &$out) {
      //   $newvariants = rekey($out['variants']);
      //   $out['variants'] = $newvariants;
      // }
      // unset($out);
    } else {
      die();
    }
    return $output;
  }

  function medium($input) {
    global $whatsize;
    $output = [];
    if (gettype($input) == "array") {
      foreach ($input as $product) {
        for ($i = 0; $i < count($product['variants']); $i++) {
          if ($product['variants'][$i]['option1'] == "medium") {
            array_push($output, $product['variants'][$i]);
          }
        }
      }

      // foreach ($output as &$out) {
      //   $newvariants = rekey($out['variants']);
      //   $out['variants'] = $newvariants;
      // }
      // unset($out);
    } else {
      die();
    }
    return $output;
  }

  function big($input) {
    global $whatsize;
    if ($whatsize == "l" and gettype($input) == "array") {
      foreach ($input as $product) {
        for ($i = 0; $i < count($product['variants']); $i++) {
          if ($product['variants'][$i]['option1'] == "l") {
            array_push($output, $product['variants'][$i]);
          }
        }
      }

      // foreach ($output as &$out) {
      //   $newvariants = rekey($out['variants']);
      //   $out['variants'] = $newvariants;
      // }
      // unset($out);
    } else if ($whatsize == "xl" and gettype($input) == "array") {
      foreach ($input as $product) {
        for ($i = 0; $i < count($product['variants']); $i++) {
          if ($product['variants'][$i]['option1'] == "xl") {
            array_push($output, $product['variants'][$i]);
          }
        }
      }

      // foreach ($output as &$out) {
      //   $newvariants = rekey($out['variants']);
      //   $out['variants'] = $newvariants;
      // }
      // unset($out);
    } else if ($whatsize == "xxl" and gettype($input) == "array") {
      foreach ($input as $product) {
        for ($i = 0; $i < count($product['variants']); $i++) {
          if ($product['variants'][$i]['option1'] == "xxl") {
            array_push($output, $product);
          }
        }
      }

      // foreach ($output as &$out) {
      //   $newvariants = rekey($out['variants']);
      //   $out['variants'] = $newvariants;
      // }
      // unset($out);
    }
    return $output;
  }

  function allsizes($input) {
    $output = [];
    if (gettype($input) == "array") {
      $output = $input;
    } else {
      die();
    }
    return $output;
  }

  $optmatrix = [["s",small($pre)],
  ["m",medium($pre)],
  ["l",big($pre)],
  ["xl",big($pre)],
  ["xxl",big($pre)],
  ["all",allsizes($pre)]];

  if (gettype($pre) == "array" and $output['run'] == "started") {
    if (count($pre) > 0) {
      $output = doQueryValues('size', $optmatrix, $whatsize);
    } else {
      $output['status'] = "unresponsive";
      $output['run'] = "stopped";
    }
  } else {
    die();
  }

  if (isset($_GET['size']) and $_GET['size'] == "all") {
    unset($_GET['size']);
  }

  $stock = $output;
  return $stock;
}

function getPrices($whatprice, $pre=getSizes) {
  if (is_callable($pre)) {
    $pre = $pre();
  }
  $output = ["run" => "started"];
  $output["status"] = null;

  $shopify->query("products.json");
  $stock = $shopify->get();
  $stock = $stock['products'];
  $prices = [];
  $sumprice = 0;

  foreach ($stock as $item) {
    for ($i = 0; $i < count($item['variants']); $i++) {
      $sumprice += (float)$item['variants'][$i]['price'];
      array_push($prices, (float)$item['variants'][$i]['price']);
    }
  }

  sort($prices);
  $avgprice = $sumprice / count($prices);
  if (count($prices) & 1) {
    $index = (count($prices) / 2)-1;
    $medianprice = $prices[$index];
  } else {
    $flooredindex = floor((count($prices) / 2)-1);
    $medianprice = ($prices[$flooredindex-1] + $prices[$flooredindex]) / 2;
  }
  $step = abs($avgprice - $medianprice);
  $stepwise = $sumprice / abs($avgprice - $medianprice);
  if ($step == 0 or ($stepwise & 1)) {
    $step = $sumprice / 2;
  } else if ($step > 0 and !($stepwise & 1)) {
    $step = $sumprice / 3;
  }

  function pricestimate($type, $maxprice=null) {
    if (gettype($type) == "string") {
      if ($type == "floor") {
        if ($maxprice == null) {
          if ($stepwise & 1) {
            $maxprice = $step / 2;
          } else {
            $maxprice = $step;
          }
        } else if (gettype($maxprice) != "double") {
          $maxprice = (float)$maxprice;
        }
      } else if ($type == "mid") {
        if ($maxprice == null) {
          if ($stepwise & 1) {
            $maxprice = $step + ($step / 2);
          } else {
            $maxprice = $step * 2;
          }
         } else if (gettype($maxprice) != "double") {
           $maxprice = (float)$maxprice;
         }
      } else if ($type == "ceiling") {
        if ($maxprice == null) {
          if ($stepwise & 1) {
            $maxprice = $step * 2;
          } else {
            $maxprice = $step * 3;
          }
        } else if (gettype($maxprice) != "double") {
          $maxprice = (float)$maxprice;
        }
      }
    }

    $output = [];
    if (gettype($pre) == "array") {
      foreach ($pre as &$product) {
        for ($i = 0; $i < count($product['variants']); $i++) {
          if ((float)$product['variants'][$i]['price'] <= $maxprice) {
            array_push($output, $product);
          } else {
            unset($product);
          }
        }
      }
    }

    return $output;
  }

  function all() {
    $output = array_merge(pricestimate("floor"), pricestimate("mid"), pricestimate("ceiling"));
    return $output;
  }

  if (gettype($whatprice) == "string") {
    $optmatrix = [["floor",pricestimate($whatprice)],
      ["mid",pricestimate($whatprice)],
      ["ceiling",pricestimate($whatprice)],
      ["all",all]]; // 2-dimensional array
  }


  if (gettype($pre) == "array" and $output['run'] == "started") {
    if (count($pre) > 0) {
      foreach ($optmatrix as list($txt, $func)) {
        $output = doQueryValues($func, 'piece', $txt, $optmatrix);
      }
    } else {
      $output['status'] = "unresponsive";
      $output['run'] = "stopped";
    }
  } else {
    die();
  }

  if (isset($_GET['price']) and $_GET['price'] == "all") {
    unset($_GET['price']);
  }

  $stock = $output;
  return $stock;
}

function getTops($whattop, $pre=getPieces) {
  global $shopify;
  if (is_callable($pre)) {
    $pre = $pre();
  }
  $output = ["run" => "started"];
  $output["status"] = null;

  function shirts($type) {
    global $shopify;
    $output = [];
    if (gettype($type) == "string") {
      if ($type == "tshirt") {
        $shopify->query("collections/168202535009/products.json");
        $output = $shopify->get();
        $output = $output['products'];
        #print_r($output);
      } else if ($type == "drop") {
        $shopify->query("collections/168202666081/products.json");
        $output = $shopify->get();
        $output = $output['products'];
      }
    }

    return $output;
  }

  function coldies($type) {
    global $shopify;
    $output = [];
    if (gettype($type) == "string") {
      /* if ($type == "sweatshirt") {
        $shopify->query();
        $output = $shopify->get();
        $output = $output['products'];
      } else */
      if ($type == "hoodie") {
        $shopify->query("collections/168202698849/products.json");
        $output = $shopify->get();
        $output = $output['products'];
      } else if ($type == "jacket") {
        $shopify->query("collections/168202895457/products.json");
        $output = $shopify->get();
        $output = $output['products'];
      }
    }

    return $output;
  }

  function typeall() {
    global $whattop;
    $available_tops = ["tshirt","drop","sweatshirt","hoodie","jacket"];
    if (gettype($whattop) == "string") {
      $output = [];
      $result = [];
      foreach ($available_tops as $typeoftop) {
        if (gettype(coldies($typeoftop)) == "array") {
          array_push($result, coldies($typeoftop));
        } else {
          array_push($result, []);
        }
        if (gettype(shirts($typeoftop)) == "array") {
          array_push($result, shirts($typeoftop));
        } else {
          array_push($result, []);
        }
        $output = array_merge($output, $result[0], $result[1]);
      }
    }
  }

  if (gettype($whattop) == "string") {
    $optmatrix = [["tshirt",shirts($whattop)],
      ["drop",coldies($whattop)],
      ["sweatshirt",coldies($whattop)],
      ["hoodie",coldies($whattop)],
      ["jacket",coldies($whattop)],
      ["all",typeall()]];
  }

  if (gettype($pre) == "array" and $output['run'] == "started") {
    if (count($pre) > 0 and $_GET['piece'] == "top") {
      $output = doQueryValues('type', $optmatrix, $whattop);
    } else {
      $output['status'] = "unresponsive";
      $output['run'] = "stopped";
    }
  } else {
    die();
  }

  if (isset($_GET['type']) and $_GET['type'] == "all") {
    unset($_GET['type']);
  }

  $stock = $output;
  return $stock;
}

function getBottoms($whatbot, $pre=getPieces) {
  if (is_callable($pre)) {
    $pre = $pre();
  }
  $output = ["run" => "started"];
  $output["status"] = null;
  $available_bottoms = ["pants","shorts"];

  function bottom($type) {
    if (gettype($type) == "string") {
      if ($type == $available_bottoms[0]) {
        $shopify->query("collections/168202862689.json");
        $output = $shopify->get();
        $output = $output['products'];
      } else if ($type == $available_bottoms[1]) {
        $shopify->query("collections/170436165729.json");
        $output = $shopify->get();
        $output = $output['products'];
      }
    }

    return $output;
  }

  function all() {
    $output = [];
    $shopify->query("collections/168202862689.json");
    $pants = $shopify->get();
    $pants = $pants['products'];
    foreach ($pants as $pant) {
      array_push($output, $pant);
    }
    $shopify->query("collections/170436165729.json");
    $shorts = $shopify->get();
    $shorts = $shorts['products'];
    foreach ($shorts as $short) {
      array_push($output, $short);
    }
    return $output;
  }

  if (gettype($whatbot) == "string") {
    $optmatrix = [["pants",bottom($whatbot)],
      ["shorts",bottom($whatbot)],
      ["all",all]];
  }


  if (gettype($pre) == "array" and $output['run'] == "started") {
    if (count($pre) > 0 and $_GET['piece'] == "bottom") {
      foreach ($optmatrix as list($txt, $func)) {
        $output = doQueryValues($func, 'type', $txt, $optmatrix);
      }
    } else {
      $output['status'] = "unresponsive";
      $output['run'] = "stopped";
    }
  } else {
    die();
  }

  if (isset($_GET['type']) and $_GET['type'] == "all") {
    unset($_GET['type']);
  }

  $stock = $output;
  return $stock;
}

function getHeads($whathead, $pre=getPieces) {
  if (is_callable($pre)) {
    $pre = $pre();
  }
  $output = ["run" => "started"];
  $output["status"] = null;
  $available_heads = ["skully","hat"];

  function talkingheads($type) {
    if (gettype($type) == "string") {
      if ($type == $available_heads[0]) {
        $shopify->query("collections/168202731617.json");
        $output = $shopify->get();
        $output = $output['products'];
      } else if ($type == $available_heads[1]) {
        $shopify->query("collections/168202469473.json");
        $output = $shopify->get();
        $output = $output['products'];
      }
    }

    return output;
  }

  function all() {
    $output = array_merge(talkingheads($available_heads[0]), talkingheads($available_heads[1]));
    return output;
  }

  if (gettype($whathead) == "string") {
    $optmatrix = [["skully",bottom($whatbot)],
      ["shorts",bottom($whatbot)],
      ["all",all]];
  }

  if (gettype($pre) == "array" and $output['run'] == "started") {
    if (count($pre) > 0 and $_GET['piece'] == "head") {
      foreach ($optmatrix as list($txt, $func)) {
        $output = doQueryValues($func, 'type', $txt, $optmatrix);
      }
    } else {
      $output['status'] = "unresponsive";
      $output['run'] = "stopped";
    }
  } else {
    die();
  }

  if (isset($_GET['type']) and $_GET['type'] == "all") {
    unset($_GET['type']);
  }

  $stock = $output;
  return $stock;
}

?>
