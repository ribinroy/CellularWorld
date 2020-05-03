<?php
    session_start();
    require 'login_main.php';
    if(!empty($_SESSION['username'])){
        // echo "Admin Login Codes Blocked by user " . $_SESSION['username'];
        // header('Location: index.php'); 
    }
    else{
        // session_set_cookie_params(0);

        $error=''; 
        $errorPasswordChange = '';
        if(isset($_SESSION['FirstName'])){
            $_SESSION['FirstName'] = "";
        }
        if(isset($_SESSION['username'])){
            $_SESSION['username'] = "";
        }
        if (isset($_POST['submitEntry'])) {
            // $error = "Submit Clicked";
            if (empty($_POST['usernameCC']) || empty($_POST['passwordCC'])) {
                $error = "Username or Password is invalid HERE";
            }
            else{
                $username=$_POST['usernameCC'];
                $password=$_POST['passwordCC'];
                $username = stripslashes($username);
                $password = stripslashes($password);
                $username = mysql_real_escape_string($username);
                $password = mysql_real_escape_string($password);
                $query = mysql_query("select * from AdminBase where Username='$username' AND Password='$password'", $connection);
                $rows = mysql_num_rows($query);
                $row=mysql_fetch_assoc($query);
                if($rows==1){
                    if ($row['Username'] == $username && $row['Password'] == $password ) {
                        $_SESSION['username']=$username;
                        $_SESSION['FirstName']=$row["FirstName"];
                        $error = "Welcome " . $row["FirstName"];
                        //header("location: supervisor.php");
                        $jsonData = array(); 
                        $jsonData[] = $row;
                        // echo $_SESSION['username'];
                        echo "<script> var loggedInAdminData =  " . json_encode($jsonData) . ";createCookie('cellularAdmin', JSON.stringify(loggedInAdminData), 1);</script>";
                    }
                    else {
                        $error = "Username or Password is invalid";
                    }
                }else {
                    $error = "Username or Password is invalid";
                }
            mysql_close($connection); 
            }
        }
        else if (isset($_POST['submitPasswordChange'])) {
            // $errorPasswordChange = "Submit Clicked";
            if (empty($_POST['passwordNewSecond']) || empty($_POST['passwordNew']) || empty($_POST['usernameCCChange']) || empty($_POST['passwordCCChange'])) {
                $errorPasswordChange = "Enter all the fields";
            }
            else{
                $username=$_POST['usernameCCChange'];
                $password=$_POST['passwordCCChange'];
                $passOne=$_POST['passwordNewSecond'];
                $passTwo=$_POST['passwordNew'];
                $username = stripslashes($username);
                $password = stripslashes($password);
                $username = mysql_real_escape_string($username);
                $password = mysql_real_escape_string($password);
                $query = mysql_query("select * from AdminBase where Username='$username' AND Password='$password'", $connection);
                $rows = mysql_num_rows($query);
                $row=mysql_fetch_assoc($query);
                if($rows==1){
                    if ($row['Username'] == $username && $row['Password'] == $password ) {
                        if($passTwo == $passOne){
                            $errorPasswordChange = $passOne . $passTwo;
                            $query = mysql_query("UPDATE `AdminBase` SET `Password` = '" . $passOne . "' WHERE `AdminBase`.`ID` = " . $row['ID'] .";");
                            mysql_close($connection);
                            $errorPasswordChange = "Password reset succesfull";
                        }
                        else{
                            $errorPasswordChange = "Entered passwords dont match";
                        }
                    }
                    else {
                        $errorPasswordChange = "Username or Password is invalid";
                    }
                }else {
                    $errorPasswordChange = "Username or Password is invalid";
                }
            }
        }
        else{
            // echo "console.log('NIL')";
        }
    }
    
?>