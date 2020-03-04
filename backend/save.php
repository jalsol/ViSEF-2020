<?php

$directory = '../database/user_img';
if(is_writable($directory))
	echo 'ok';
else
	echo 'bad';

$fi = new FilesystemIterator($directory, FilesystemIterator::SKIP_DOTS);
$counter = iterator_count($fi)+1;

$data = $_POST['encoded_img'];

list($type, $data) = explode(';', $data);
list(, $data) = explode(',', $data);
$data = base64_decode($data);

file_put_contents($directory.'/img'.$counter.'.png', $data);
?>