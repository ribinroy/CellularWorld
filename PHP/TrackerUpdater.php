<?php
require 'login_main.php';

$db = mysql_select_db("cellular_Test", $connection);
$array=json_decode($_POST['data']);
$query = mysql_query("INSERT INTO `Tracker` (`IP Address`, `Area`, `State`, `Country`, `Date`,`Link`,`User`) VALUES ('".$array->geobytesipaddress."', '".$array->geobytescity."', '".$array->geobytesregion."', '".$array->geobytestitle."', CURRENT_TIMESTAMP,'".$array->link."', '".$_POST['user']."')");
 echo $array->link;
mysql_close($connection); 
?>