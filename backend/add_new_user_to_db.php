<?php
function countNumberOfLines($file) {
    $linecount = 0;
    $f = fopen($file, "r");

    // count until reaching EOF
    while (!feof($f)) {
        $line = fgets($f);
        $linecount++;
    }

    fclose($f);
    return $linecount;
}

function addPreselectedItemsToDB($file, $user_id) {
    $filestream = fopen($file, 'w');

    // write the header line
    $headerline = "\tuser_id\titem\n";
    fwrite($filestream, $headerline);

    // read info about all items from item.csv
    $itemlist = file('../database/item.csv');
    
    $counter = 0;
    foreach ($_POST['preselectedItems'] as $item_id) {
        $input_line = explode(',', $itemlist[(int) $item_id]);
        $brand = substr($input_line[1], 1, -1); // remove " " from brand name
        $type = $input_line[2];

        $output_line = $counter."\t".$user_id."\t".$brand.' - '.$type."\n";
        fwrite($filestream, $output_line);
        ++$counter;
    }

    fclose($filestream);
}

// add new user's info to the file user_info.csv
$f = fopen('../database/user_info.csv', 'a');

$name = "\"".$_POST['name']."\",";
$phonenumber = "\"".$_POST['phonenumber']."\",";
$city = "\"".$_POST['city']."\",";
$country = "\"".$_POST['country']."\"\n";

$data = $name.$phonenumber.$city.$country;
fwrite($f, $data);
fclose($f);

// add preselected items to user_recommendation/[id].csv
$directory = "../database/user_recommendation/";
$current_user_id = countNumberOfLines('../database/user_info.csv') - 2;  // minus first and last line

addPreselectedItemsToDB($directory.$current_user_id.".csv", $current_user_id);

echo $current_user_id;
?>