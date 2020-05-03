<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Cellular World | Tracker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
        require '../PHP/loadLibraries.php';
        require '../PHP/ValidateAdmin.php';
    ?>
    <link rel="stylesheet" type="text/css" media="screen" href="../CSS/tracker.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="http://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" />
    <script src="../JS/tracker.js"></script>
    <script src="http://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src= "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js"></script>
    <script src= "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>
    
</head>
<body>
    <div class="loadingDiv"></div>
    <div class="tracker onlyRibin">
        <table id="trackerTable">
        </table>
    </div>
    <div class="container-fluid chartsWrap">
    <div class="chartHeader">User Access Report | Page Hits</div>
        <div class="col-md-6 col-xs-12 chartItem">
            <div class="chartHeader">Month</div>
            <canvas id="chartMonth"></canvas>
        </div>
        <div class="col-md-6 col-xs-12 chartItem">
            <div class="chartHeader">Devices</div>
            <canvas id="chartDevices"></canvas>
        </div>
        <div class="col-md-6 col-xs-12 chartItem">
            <div class="chartHeader">Categories</div>
            <canvas id="chartCategory"></canvas>
        </div>
        <div class="col-md-6 col-xs-12 chartItem">
            <div class="chartHeader">Brands</div>
            <canvas id="chartBrand"></canvas>
        </div>
        <div class="col-md-6 col-xs-12 chartItem onlyRibin">
            <div class="chartHeader">Area</div>
            <canvas id="chartArea"></canvas>
        </div>
        <div class="col-md-6 col-xs-12 chartItem onlyRibin">
            <div class="chartHeader">State</div>
            <canvas id="chartState"></canvas>
        </div>
        <div class="col-md-6 col-xs-12 chartItem onlyRibin">
            <div class="chartHeader">Country</div>
            <canvas id="chartCountry"></canvas>
        </div>
    </div>
    
</body>
</html>