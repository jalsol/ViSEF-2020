<?php

$f = fopen('../users/log.csv', 'a');

$name = "\"".$_POST['name']."\",";
$phonenumber = "\"".$_POST['phonenumber']."\",";
$city = "\"".$_POST['city']."\",";
$country = "\"".$_POST['country']."\"\n";

$data = $name.$phonenumber.$city.$country;
fwrite($f, $data);
fclose($f);

?>