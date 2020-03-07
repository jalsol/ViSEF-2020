<?php

$f = fopen('../database/user_info.csv', 'a');

$name = "\"".$_POST['name']."\",";
$phonenumber = "\"".$_POST['phonenumber']."\",";
$city = "\"".$_POST['city']."\",";
$country = "\"".$_POST['country']."\"\n";

$data = $name.$phonenumber.$city.$country;
fwrite($f, $data);
fclose($f);

$directory = "../database/user_recommendation/";
$counter = count(glob($directory."*.csv")) + 1;

file_put_contents($directory.$counter.".csv", print_r($_POST['preselectedItems'], true));

echo $counter;
?>