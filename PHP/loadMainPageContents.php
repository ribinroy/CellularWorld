<?php
require 'login_main.php';
$table = $_GET['table'];
$table1 = $_GET['table1'];
$table2 = $_GET['table2'];
$table3 = $_GET['table3'];
$sqlQuery = "select * from ";
$jsonData = array();

$query = mysql_query($sqlQuery . $table, $connection);
$rows = mysql_num_rows($query);
while ($array = mysql_fetch_assoc($query)) {
    $jsonData[] = $array;
}
// $row=mysql_fetch_assoc($query);

if(isset($table1) && !empty($table1)){
    $query = mysql_query($sqlQuery . $table1, $connection);
    $rows = mysql_num_rows($query);
    while ($array = mysql_fetch_assoc($query)) {
        $jsonData[] = $array;
    }
}

if(isset($table2) && !empty($table2)){
    $query = mysql_query($sqlQuery . $table2, $connection);
    $rows = mysql_num_rows($query);
    while ($array = mysql_fetch_assoc($query)) {
        $jsonData[] = $array;
    }
}

if(isset($table3) && !empty($table3)){
    $query = mysql_query($sqlQuery . $table1, $connection);
    $rows = mysql_num_rows($query);
    while ($array = mysql_fetch_assoc($query)) {
        $jsonData[] = $array;
    }
}
// echo "Np of rows:" . $row;

echo json_encode($jsonData);
mysql_close($connection); 
?>