<?php
    include('AdminLogin.PHP');
    if(empty($_SESSION['username'])){
        //logged out
        // echo "na na na" . $_SESSION['FirstName'];
        // header('Location: index.php?logOut=1'); 
    }
    else{
        //logged in
        // echo "yea yea yea " . $_SESSION['FirstName'];
        echo '<script src="../JS/AdminFunctions.js"></script>';
    }
?>
