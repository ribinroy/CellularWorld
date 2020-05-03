<?php
    require 'login_main.php';
    $TableName = $_REQUEST['TableName'];
    $sqlQuery = "select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='" . $TableName . "'";
    $query = mysql_query($sqlQuery, $connection);
    $rows = mysql_num_rows($query);

    // echo "GADGETTYPE : " . $gadegetType . $brand . "haha";
    // echo "GADGETTYPE : " . $modelName . $priceRange . "haha";
    // echo "SQLQUERY : " . $sqlQuery;
    // echo "Np of rows:" . $rows;
    // echo "ALL : " . $searchAll ;
    $jsonData = array();
    while ($array = mysql_fetch_assoc($query)) {
        $jsonData[] = $array;
    }
    echo json_encode($jsonData);
    mysql_close($connection); 
    ?>