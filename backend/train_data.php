<?php
    if (!isset($_POST['type'])) {
        echo 'Seems like you lost your way.';
    }
    else {
        if ($_POST['type'] === "New_Users") {
            // exec new users 
            // echo shell_exec('cd ../ML/face-recognition; pwd; /usr/bin/python3 -m training.train -d \"./images\"');
            echo shell_exec('./test.sh 2>&1');
        }
        else if ($_POST['type'] === "Recommendation") {
            // exec recommendation command
            echo shell_exec('./test2.sh');
        }
        else {
            echo 'Seems like you lost your way.';
        }
    }
?>
