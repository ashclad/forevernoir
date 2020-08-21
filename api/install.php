<?php

// Set variables for our request
$shop = $_GET['shop'];
$api_key = "7e1a33f3bae8b0212bf6db1ac9ab2241";
$scopes = "read_orders,read_all_orders,write_orders,read_checkouts,write_checkouts,read_discounts,write_discounts,read_shipping,write_shipping,read_products,write_procuts,read_content,write_content,read_translations,write_translations,read_inventory,write_inventory,read_product_listings,read_product_listings";
$redirect_uri = "http://98.7.1.198:40/forevernoir/api/generate_token.php";

// Build install/approval URL to redirect to
$install_url = "https://" . $shop . ".myshopify.com/admin/oauth/authorize?client_id=" . $api_key . "&scope=" . $scopes . "&redirect_uri=" . urlencode($redirect_uri);

// Redirect
header("Location: " . $install_url);
die();
