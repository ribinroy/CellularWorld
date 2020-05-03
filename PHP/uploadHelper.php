<?php
    require 'login_main.php';
    $target_dir = "../Images/DevicesImages/Uploads/";
    echo "aaaa" . $_GET['overwrite'] . "aaaa";
    $uploadOk = 1;

    createIfFolderDoesntExist($target_dir);
    $target_dir = $target_dir . $_REQUEST['Device'] . "/";
    createIfFolderDoesntExist($target_dir);
    $target_dir = $target_dir . $_REQUEST['Brand'] . "/";
    createIfFolderDoesntExist($target_dir);
    $target_dir = $target_dir . $_REQUEST['Modelname'] . "/";
    createIfFolderDoesntExist($target_dir);


    $target_file = $target_dir . $_FILES['file']['name'];
    echo $target_dir;
    
    if (file_exists($target_file) ) {
        if($_GET['overwrite'] == "true"){
            echo "Overwriting (#Overwritten)";
        }
        else{
            echo "Sorry, file already exists.(#ErrorFileExists)";
            $uploadOk = 0;
        }
    }
    
    if ( 0 < $_FILES['file']['error'] ) {
        echo '\\Error: ' . $_FILES['file']['error'] . '(#ErrorNotUploaded)';
    }
    else if($uploadOk == 1) {
        $uploaded = move_uploaded_file($_FILES['file']['tmp_name'], $target_file);
        if($uploaded){
            echo $_FILES['file']['tmp_name'] . "(#UploadSuccess)";
        }
        else{
            echo $_FILES['file']['tmp_name'] . "(#UnexpectedError1)";
        }
    }
    else{
        echo $_FILES['file']['tmp_name'] . "(#UnexpectedError2)";
    }

    function createIfFolderDoesntExist($path){
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
            echo $path . "Doesnt exist and created";
        }
    }
?>
