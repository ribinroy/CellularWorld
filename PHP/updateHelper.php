<?php
    require 'login_main.php';
    $createUpdateQuery = false;
    if($_POST['ID'] != ""){
        $createUpdateQuery = true;
    }
    if($createUpdateQuery){ //check if update function
        $header = "UPDATE " . $_POST['type'] . " SET ";
    }
    else{
        $header = "INSERT INTO " . $_POST['type'] . " ";
    }
    $addComa = false;
    $appendedItems = "";
    $appendedItemsColumns = "";
    $appendedItemsValues = "";

    foreach ($_POST as $param_name => $param_val) {
        if ($param_name == "ID" || $param_name == "type" || $param_name == "submitValue"){
            $check = "added";
        }
        else{
            if($createUpdateQuery){
                if($param_val != ""){
                    if(!$addComa){
                        $addComa = true;
                    }
                    else{
                        $appendedItems = $appendedItems . ", "; 
                    }
                    $appendedItems = $appendedItems . "`" . $param_name . "`" . "= '" . $param_val ."'";
                }
            }
            else{
                if($param_val != ""){
                    if(!$addComa){
                        $addComa = true;
                    }
                    else{
                        $appendedItemsColumns = $appendedItemsColumns . ", "; 
                        $appendedItemsValues = $appendedItemsValues . ", "; 
                    }
                    $appendedItemsColumns = $appendedItemsColumns . "`" . $param_name . "`";
                    $appendedItemsValues = $appendedItemsValues . "'" . $param_val . "'";
                }
            }
        }
        // echo "Param: $param_name; Value: $param_val<br />\n";
    }
    if(!$createUpdateQuery){
        $appendedItems = "(" . $appendedItemsColumns . ") VALUES (" . $appendedItemsValues . ")";
    }

    if($createUpdateQuery){
        $footer = " WHERE ID=" . $_POST['ID'];
    }
    $query = $header . $appendedItems . $footer;
    // echo "header: " . $header;
    // echo "<br>appendedItems: " . $appendedItems;
    // echo "<br>query: " . $query;
    if($_POST['DeleteItem'] == "true"){
        $query = "DELETE FROM `" . $_POST["Type"] . "` WHERE `" . $_POST["Type"] . "`.`ID` = " . $_POST["ID"];
    }
    $update = mysql_query($query);
    if($update === false){
        echo "Error Occured" . $update;
    }
    else{
        if($_POST['DeleteItem'] == "true"){
            echo "Deleted, ID:" . $_POST["ID"];
        }
        else if($createUpdateQuery){
            echo "Updated, ID:" . $_POST["ID"];
        }
        else{
            echo "Added";
        }
    }
    mysql_close($connection); 
?>