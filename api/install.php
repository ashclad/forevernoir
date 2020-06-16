<?php

// Set variables for our request
$shop = $_GET['shop'];
$api_key = "91a4d2ee2e1e0f672a0670cfed6f3973";
$scopes = "read_orders,write_products";
$redirect_uri = "http://98.7.1.198:40/api/generate_token.php";

// Build install/approval URL to redirect to
$install_url = "https://" . $shop . ".myshopify.com/admin/oauth/authorize?client_id=" . $api_key . "&scope=" . $scopes . "&redirect_uri=" . urlencode($redirect_uri);

// Redirect
header("Location: " . $install_url);
die();
