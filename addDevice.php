<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Add device</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <?php
        require 'PHP/loadLibraries.php';
        require 'PHP/ValidateAdmin.php';
    ?>
    <script src="JS/addDevice.js?v=1"></script>
    <link rel="stylesheet" type="text/css" href="../CSS/addDevice.css?v=1" />
</head>
<body>
    <div class="mainDiv">
        <form id="submitValueFormID">
            <div class="formWrap container">
                <div class="TypeSelector">
                    <select name="type">
                        <option value="Mobiles">Mobiles</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Accessories">Accessories</option>
                        <option value="SmartTV">Smart TV</option>
                        <option value="Items">Brand Update</option>
                    </select>
                </div>
                <div class="formInputSectionWrap row">
                    <!-- <div class="col-md-6 col-xs-12">
                        <div class="formInputItem">
                            <div class="formInputTitle">Title</div>
                            <div class="formInputArea"><input type="text"></div>
                        </div>   
                    </div>      -->
                </div>
                <div class="jsonDataObjectsWrap">
                    <div class="smallerHead">Additional Specifications</div>
                </div>
                <?php echo $errorIs ?>
                <div class="buttonsWrap">
                    <a class="submitValue button disabled" href="#">Submit</a>
                    <a class="button disabled" onKeyPress="workKeyPress(32,addNewInput())" onclick="addNewInput();" href="#">Add Row</a>
                </div>
                <!-- <input type="submit" name="submitValue" value="Done" id="submitValue"> -->
            </div>
        </form>
        <div class="loadingDiv">
            <div class="spinner"></div>
        </div>
        <div class="showAddedDevices"></div>
    </div>
</body>
</html>