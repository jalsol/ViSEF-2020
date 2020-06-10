<?php
$data = array();
$row = 0;
$counter = 1;
if (($handle = fopen('../database/user_info.csv', 'r')) !== false) {
	while (($d = fgetcsv($handle, 1000, ",")) !== false) {
		if (++$row == 1) continue;

		$temp = array();
		$temp['name'] = $d[0];
		$temp['phone'] = $d[1];
		$temp['city'] = $d[2];
		$temp['country'] = $d[3];
		$temp['id'] = $counter;
		array_push($data, $temp);
		++$counter;
	}
}
echo json_encode($data);
?>