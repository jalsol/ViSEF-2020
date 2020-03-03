<?php

$directory = './uploads';
exec('chmod -R 777 '.$directory);

$fi = new FilesystemIterator($directory, FilesystemIterator::SKIP_DOTS);
$counter = iterator_count($fi)+1;

$data = $_POST['encoded_img'];

list($type, $data) = explode(';', $data);
list(, $data) = explode(',', $data);
$data = base64_decode($data);

file_put_contents($directory.'/img'.$counter.'jpg', $data);
?>