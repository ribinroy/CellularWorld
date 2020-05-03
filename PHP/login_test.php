
<?php
$hostname = 'localhost';
$username = 'cellular_RR';
$password = 'promise123';

$connection = mysql_connect($hostname,$username,$password);   
$db = mysql_select_db("cellular_MainPage", $connection);
$query = mysql_query("select * from Items", $connection);
$rows = mysql_num_rows($query);
$row=mysql_fetch_assoc($query);

while ($array = mysql_fetch_assoc($query)) {
    $jsonData[] = $array;
    echo $array['DeviceName'];
}

// echo $row['T1'];
// mysql_close($connection); 
?>