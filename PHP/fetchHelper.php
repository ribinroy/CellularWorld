<?php
    require 'login_main.php';
    
    if($_POST["database"]){
        $db = mysql_select_db($_POST["database"], $connection);
    }

    $sqlQuery = "SELECT * FROM " . $_POST["table"];

    $search_query = checkPOSTValues();
    if($search_query != "")
        $sqlQuery = $sqlQuery . $search_query;
        
    // echo $sqlQuery;
    $query = mysql_query($sqlQuery, $connection);
    $rows = mysql_num_rows($query);

    $jsonData = array();
    while ($array = mysql_fetch_assoc($query)) {
        $jsonData[] = $array;
    }
    echo json_encode($jsonData);
    mysql_close($connection); 

    
    function checkPOSTValues(){
        $andAdded = false;
        $search_query = '';
        foreach ($_POST as $param_name => $param_val) {
            if($param_name == "database" || $param_name == "table"){
            }
            else{
                if(!$andAdded){
                    $search_query = " WHERE " . $param_name . " = '" .$param_val . "'";
                    $andAdded = true;
                }
                else{
                    $search_query = $search_query . " AND " . $param_name . " = '" .$param_val . "'";
                }
            }
            
        }
        return $search_query;
    }
?>