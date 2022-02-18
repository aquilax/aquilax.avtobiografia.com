<?php

$username = 'aquilax';
$hostname = 'example.com';

function getWebFinger($username, $hostname) {
    return [
        "subject" => "acct:$username@$hostname",
        "aliases" => ["https://$hostname/users/$username"],
        "links" => [[
          "rel" => "self",
          "type" => "application/activity+json",
          "href" => "https://$hostname/users/$username"
        ], [
          "rel" => "http://ostatus.org/schema/1.0/subscribe",
          "template" => "https://$hostname/authorize_interaction?uri={uri}"
        ]]
    ]
}