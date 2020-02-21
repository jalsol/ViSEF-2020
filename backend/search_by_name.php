<?php
error_reporting(0);
function searchid($s) {

	$a = explode(' - ', $s);
	$id = 0;
	$row = 0;

	if(($h = fopen('../database/item.csv', 'r')) !== false) {
		while(($x = fgetcsv($h, 1000, ",")) !== false) {
			if(++$row == 1) {continue;}

			if($x[1] == $a[0] && $x[2] == $a[1]) {
				$id = $x[0];
				fclose($h);
				break;
			}
		}
		fclose($h);
	}
	return $id;
}
$row = 0;
$data = array();
$s = $_POST['name'];

$a = explode(' - ', $s);

$id = 0;

if(($handle = fopen('../database/item.csv', 'r')) !== false) {
	while(($d = fgetcsv($handle, 1000, ",")) !== false) {
		if(++$row == 1) {continue;}

		if($d[1] == $a[0] && $d[2] == $a[1]) {
			$id = $d[0];
			fclose($handle);
			break;
		}
	}
	fclose($handle);
}

$counter = 0;
$x = array();

if(($handle = fopen('../database/item/'.$id.'.txt', 'r')) !== false) {
	while(($line = fgets($handle)) !== false || $counter < 5) {
		$num = (int)$line;
		if($num <= 20) {
			$x[$counter] = $num;
			$counter++;
		}
	}
	fclose($handle);
}

$res = array();
if(($handle = fopen('../database/item.csv', 'r')) !== false) {
	while(($d = fgetcsv($handle, 1000, ",")) !== false) {
		if(++$row == 1) {continue;}
		$res[$d[0]] = $d[1].' - '.$d[2];
	}
	fclose($handle);
}

$popo = array();
$i = 0;
$j = -1;
while($i < 10) {
	$j++;
	if($res[$x[$j]] == $s) continue;
	$temp = array(searchid($res[$x[$j]]), $res[$x[$j]]);
	$popo[$i] = $temp;
	$i++;
}
echo json_encode($popo);
?>