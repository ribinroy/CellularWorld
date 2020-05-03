<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cellular World</title>
    <?php
        require 'PHP/loadLibraries.php';
    ?>
        <script src="../JS/Details.js?v=1.1"></script>
        <script src="../JS/Lib/fonoapi.min.js?v=1.1"></script>
        <link rel="stylesheet" type="text/css" media="screen" href="../../CSS/Details.css?v=1.1" />
</head>

<body>

<div class="loadingDiv">
    <div class="col-sm-6 col-md-4 col-xs-12 avoidAnim">
        <div class="laodingImage"></div>
    </div>
    <div class="col-sm-6 col-md-8 col-xs-12 avoidAnim">
        <div class="loadingDetails avoidAnim">
            <div class="loadingName"></div>
            <div class="loadingPrice"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
            <div class="loadingDetailsItems"></div>
        </div>
    </div>
</div>
<div id="fb-root"></div>
    <div class="container devicePageWrap mainBox">
        <div class="deviceNotFound"> Not Found</div>
        <div class="col-sm-6 col-md-4 col-xs-12">
            <div class="detailsWrapImageContainer">
                <div class="detailsWrapImage"></div>
            </div>
        </div>
        <div class="col-sm-6 col-md-8 col-xs-12">
        <div class="detailsInformationWrap">
                <div class="deviceNameHeading" data-aos="zoom-in" data-aos-offset="10" data-aos-once="true"></div>
                <br>
                <div class="devicePriceDetails" data-aos="flip-left" data-aos-offset="10" data-aos-once="true"></div>
                <div class="devicePDFIcon" data-aos="flip-left" data-aos-offset="80" data-aos-once="true"></div>
                <div class="foneApiNotFOundChangeDIV hide"></div>
                <div class="deviceDetailsTab" tabMainId="1">
                    <div class="deviceDetailsTabHeader active" tabId="1">Specifications</div>
                    <div class="deviceDetailsTabHeader" tabId="2">Comments</div>
                </div>
                <div class="deviceDetailsTabContainer" tabMainId="1">
                    <div class="deviceDetailsTabContainerItem active" tabId="1">
                        <div class="notFound">Specifications to be updated soon.</div>
                        <div class="deviceFullInformationWrap">
                        </div>
                    </div>
                    <div class="deviceDetailsTabContainerItem" tabId="2">
                    <div class="fb-comments" data-order-by="social" data-width="100%"  mobile="auto-detect" data-numposts="5" data-mobile="true"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="adminConsoleWrap adminOnly">
            <div class="adminHeader">Admin Console <span>(Click on box to copy text)</span></div>
            <div class="hideAdminConsole" onclick="showHideAdminConsole()">X</div>
            <div class="adminConsole"></div>
        </div>
        <div class="adminConsoleButton adminOnly active" onclick="showHideAdminConsole()">Open Console</div>
        <div class="adminButtons"></div>
    </div>
    
</body>

</html>