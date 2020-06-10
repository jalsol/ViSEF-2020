<?php

$directory = '../ML/face-recognition/images/'.$_POST['id'];
if (!file_exists($directory)) {
    mkdir($directory, 0777, true);
}

$counter = count(glob($directory."/*.png")) + 1;
$data = $_POST['encoded_img'];

list($type, $data) = explode(';', $data);
list(, $data) = explode(',', $data);
$data = base64_decode($data);
file_put_contents($directory.'/img'.$counter.'.png', $data);
chmod($directory.'/img'.$counter.'.png', 0777);

?>