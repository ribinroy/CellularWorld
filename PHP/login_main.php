
<?php
$hostname = 'localhost';
$username = 'cellular_RR';
$password = 'promise123';

$connection = mysql_connect($hostname,$username,$password);   
$db = mysql_select_db("cellular_MainPage", $connection);
// $query = mysql_query("select * from Items", $connection);
// $rows = mysql_num_rows($query);
// $row=mysql_fetch_assoc($query);
// echo $row[0];
// echo $row[1];
// echo $row[2];
// echo $rows;
// echo "looo.";
// mysql_close($connection); 
?>