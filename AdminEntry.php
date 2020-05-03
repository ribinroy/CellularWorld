<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Cellular World | Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
        require 'PHP/loadLibraries.php';
        require 'PHP/AdminLogin.PHP';
    ?>
    <script src="../JS/AdminOnly.js?v=1.1"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="../../CSS/AdminOnly.css?v=1.1" />
</head>

<body>
    <div class="container mainBox">
        <div class="adminInputWrap">
            <form action="" method="post">
                <div class="inputArea">
                    <input id="usernameCC" name="usernameCC" type="text" placeholder="Username">
                    <input id="passwordCC" name="passwordCC" type="password" placeholder="Password">
                    <input type="submit" value="Login" name="submitEntry">
                    <div class="error"><?php echo $error ?></div>
                </div>
            </form>
        </div>
        <div class="changePassword hide">
            <form action="" method="post">
                <div class="inputArea">
                    <input id="usernameCCChange" name="usernameCCChange" type="text" placeholder="Username">
                    <input id="passwordCCChange" name="passwordCCChange" type="password" placeholder="Old Password">
                    <input id="passwordNew" name="passwordNew" type="password" placeholder="Enter new password">
                    <input id="passwordNewSecond" name="passwordNewSecond" type="password" placeholder="Enter new password again">
                    <input type="submit" value="Reset Password" name="submitPasswordChange">
                    <div class="error"><?php echo $errorPasswordChange ?></div>
                    
                </div>
            </form>
            <div class="UsefulLinks">
                <a href="addDevice?TableName=Mobiles" target="_blank">Add new device</a>
                <a class="devOnly" href="PHP/MobileAPIMismatch" target="_blank">Mismatch Checker</a>
                <a class="devOnly" href="PHP/Tracker" target="_blank">Tracker</a>
            </div>
        </div>
        <input type="hidden" id="refreshed" value="no">
    </div>
</body>
