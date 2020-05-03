    <?php
    require 'login_main.php';
    $searchAll = $_REQUEST['All'];
    $brand = $_POST['Brand'];
    $deviceId = $_POST['deviceId'];
    $gadegetType = $_POST['Type'];
    $modelName = $_POST['ModelName'];
    $gadgetTypeAcc = $_POST['GadgetType'];
    $priceHigh = $_REQUEST['PriceHigh'];
    $priceLow = $_REQUEST['PriceLow'];
    $latestOnly = $_POST['Latest'];
    $whereAdded = false;
    $andCondition = " AND ";
    $sqlQuery = "";
    if(empty($priceHigh) || $priceHigh == ""){
        $priceHigh = 99999999;
    }
    if(empty($priceLow) || $priceLow == ""){
        $priceLow = 0;
    }
    if(!empty($searchAll)){
            $modelName = $searchAll;
            $gadgetTypeAcc = $searchAll;
            $brand = $searchAll;
            $andCondition = " OR ";
            $whereAdded = true;
            $sqlQuery = $sqlQuery . " WHERE `Specifications` LIKE '%" . $searchAll. "%'";
            // $gadegetType = "`Mobiles`, `Accessories`, `Laptops`";
            // $priceHigh = "";
            // $priceLow = "";
    }
    // $sqlQuery = "SELECT * FROM `Mobiles`";
    $sqlQueryTableSelection = "SELECT * FROM `" . $gadegetType ."` ";
    if(!empty($brand)){
        if($whereAdded){
            $sqlQuery = $sqlQuery . $andCondition;
        }
        else{
            $sqlQuery = $sqlQuery . "WHERE";
            $whereAdded = true;
        }
        $sqlQuery = $sqlQuery . " `Brand` LIKE '" . $brand. "'";
    }
    if(!empty($modelName)){
        if($whereAdded){
            $sqlQuery = $sqlQuery . $andCondition;
        }
        else{
            $sqlQuery = $sqlQuery . "WHERE";
            $whereAdded = true;
        }
        $sqlQuery = $sqlQuery . " `ModelName` LIKE '%" . $modelName . "%'";
    }
    if(!empty($gadgetTypeAcc)){
        if($whereAdded){
            $sqlQuery = $sqlQuery . $andCondition;
        }
        else{
            $sqlQuery = $sqlQuery . "WHERE";
            $whereAdded = true;
        }
        $sqlQuery = $sqlQuery . " `GadgetType` LIKE '%" . $gadgetTypeAcc . "%'";
    }
    if(!empty($priceLow) || !empty($priceHigh)){ //price search
        if($whereAdded){
            $sqlQuery = $sqlQuery . "AND";
        }
        else{
            $sqlQuery = $sqlQuery . "WHERE";
            $whereAdded = true;
        }
        $sqlQuery = $sqlQuery . " `Price` >= " . $priceLow . " AND `Price` <= " . $priceHigh;
    }

    
    
    
    
    if(!empty($searchAll)){
        $sqlQuery = "(SELECT * FROM `Mobiles` " . $sqlQuery . ") 
                        UNION
                        (SELECT * FROM `Accessories` " . $sqlQuery . ") 
                        UNION
                        (SELECT * FROM `Laptops` " . $sqlQuery . ") 
                        UNION
                        (SELECT * FROM `SmartTV`  " . $sqlQuery . ")";
    }
    else if(!empty($deviceId)){ //if deviceId got then show that item only
        $sqlQuery = "SELECT * FROM `" . $gadegetType ."` ";
        $sqlQuery = $sqlQuery . "WHERE";
        $whereAdded = true;
        $sqlQuery = $sqlQuery . " `ID` = " . $deviceId;
    }
    else if($latestOnly == "true"){ //only last added latest device
        $sqlQuery = "SELECT * FROM `" . $gadegetType . "` ORDER BY ID DESC LIMIT 1";
    }
    else{
        $sqlQuery = $sqlQueryTableSelection . $sqlQuery;
    }
    
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