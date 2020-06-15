<?php
    if (!isset($_POST['type'])) {
        echo 'Seems like you lost your way...';
    }
    else {
        if ($_POST['type'] === "New_Users") {
            // exec new users 
            // echo shell_exec('cd ../ML/face-recognition; pwd; /usr/bin/python3 -m training.train -d \"./images\"');
            echo shell_exec('./train.sh 2>&1');
        }
        else if ($_POST['type'] === "Recommendation") {
            // exec recommendation command
            // posix_setuid(1000);
            // echo posix_getuid()."\n"; //10000
            echo system('./test2.sh 2>&1');
            // echo shell_exec('vlc');
            // pclose(popen("/usr/bin/konsole -e '/usr/bin/vlc' 2>&1", "r"));
        }
        else {
            echo 'Seems like you lost your way...';
        }
    }
?>
