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

if(($handle = fopen('../database/user_recommendation/'.$_POST['userid'].'.csv', 'r')) !== false) {
	while(($d = fgetcsv($handle, 1000, "\t")) !== false) {
		if(++$row == 1) {continue;}

		$temp = array();
		$temp['id'] = searchid($d[2]);
		$temp['rank'] = $d[4];
		$temp['name'] = $d[2];
		$temp['score'] = ((string) floor((floatval($d[3])*100)*1000)/1000).'%';
		array_push($data, $temp);
	}
	fclose($handle);
	echo json_encode($data);
}
/*
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
*/
?>