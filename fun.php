<?php
namespace fun;

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

?>
