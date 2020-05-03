<!DOCTYPE html>
<html>

<head>
        <div id="myWidget"></div>
        <script type="text/javascript">
        (function (window, document) {
        var loader = function () {
        var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
        script.src = "https://www.bajajfinserv.in/sites/bajaj/pstp/js/cellularworldexternalwidget.js"
        tag.parentNode.insertBefore(script, tag);
        };
        window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
        })(window, document);
        var tvc_cid_capture=setInterval(function(){
        console.log('inside interval')
        if(document.querySelector('.btns')){
        console.log('widget found');
        document.querySelector('.tvc_iframe').src="https://media.bajajfinserv.in/email/finance/mailer/2019/july/22/test/sidtest1.html";
        clearInterval(tvc_cid_capture);
        }
        },500);
        </script>
        <iframe class="tvc_iframe" height="1px" width = "1px" style="display:none"></iframe>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cellular World
        <?php
        if(isset($_GET['Brand']))
            echo $_GET['Brand'];
        if(isset($_GET['GadgetType']))
            echo $_GET['GadgetType'];
    ?>
    </title>
    <?php
        require 'PHP/loadLibraries.php';
    ?>
        <script src="../JS/Devices.js?v=1.12"></script>
        <link rel="stylesheet" type="text/css" media="screen" href="../../CSS/devices.css?v=1.12" />
</head>

<body>
    <div class="container-fluid devicePageWrap mainBox">
        <div class="col-md-2 hidden-xs hidden-sm">
            <div class="filterWrap">
                <div class="col-md-2 hidden-xs hidden-sm">
                    <div class="filterInnerWrap">
                        <div>
                            <div class="filterShowHideButton" onclick="showHideFilterDiv();"></div>
                            <div class="filterItemWrap">
                                <section class="range-slider hide">
                                    <div class="leftFilterPaneHeading">Filter:</div>
                                    <span class="rangeValues hide"></span>
                                    <div class="rangeSelectorWrap">
                                        <input id="rangeMin" value="0" min="0" max="50000" step="50" type="range">
                                        <input id="rangeMax" value="50000" min="0" max="50000" step="50" type="range">
                                    </div>
                                    <div class="rangeText rangeMin">00</div>
                                    <div class="rangeText rangeMax">50000</div>
                                </section>
                            </div>
                            <div class="filterItemWrap" type="Brands">
                                <div class="leftFilterPaneHeading">Brands available:</div>
                                <div class="brandListFilterWrap">
                                    <div class="brandList">
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="filterItemWrap">
                                <div class="leftFilterPaneHeading">Additional Filters:</div>
                                <div class="additionalFilter">
                                    <input type="checkbox" id="unavailable"><label for="unavailable">Exclude out of stock</label>
                                </div>
                                <div class="additionalFilter adminOnly">
                                    <input type="checkbox" id="TBCShow"><label for="TBCShow">Include TBC Items</label>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-10 col-sm-12 col-xs-12 hide">
                </div>
            </div>
        </div>
        <div class="col-md-10 col-sm-12 col-xs-12 devicesInThisDiv">
            <div class="row searchWrap">
                <!-- <div class="col-md-6 col-sm-12 col-xs-12 noPadding">
                    <div class="searchFilterWrap hidden-xs hidden-sm">
                         <div class="searchBase">
                            <select>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Accessories">Accessories</option>
                                <option value="SmartTV">Smart TV</option>
                            </select>
                        </div> 
                         <div class="priceRange">
                            <section class="range-slider hide">
                                <span class="rangeValues hide"></span>
                                <div class="rangeText rangeMin">00</div>
                                <div class="rangeSelectorWrap">
                                    <input id="rangeMin" value="0" min="0" max="50000" step="50" type="range">
                                    <input id="rangeMax" value="50000" min="0" max="50000" step="50" type="range">
                                </div>
                                <div class="rangeText rangeMax">50000</div>
                            </section>
                            <div class="priceLow hide">
                                <span>Min:</span>
                                <input type="number">
                            </div>
                            <div class="priceHigh hide">
                                <span>Max:</span>
                                <input type="number">
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="col-md-12 col-sm-12 col-xs-12 noPadding">
                    <div class="orderBy" status="2">Latest</div>
                    <div class="searchInput">
                        <input type="text" id="searchInputBox" autocomplete="on">
                        <span class="searchIcon" onclick="searchAll($(this))"></span>
                    </div>
                </div>
                
            </div>
            <div class="row searchedItemsWrap">
                <!-- <div class="searchItem" title="Brand"> Brand <span class="deleteSearchItem">x</span></div> -->
            </div>
            <div class="notFound">Sorry, no records exist.</div>
            <div class="loadingDiv">
                <div class="row">
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="loadingDummyItem">
                            <div class="loadingDummyImageDiv"></div>
                            <div class="loadingDummyPriceDiv"></div>
                            <div class="loadingDummtDetailsDiv"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row deviceContainerWrap">
                <!-- <div class="col-md-3">
                    <a href="#LINK" class="deviceWrap">
                        <div class="deviceImageWrap">
                            <div class="deviceImage" style="background:url();"></div>
                        </div>
                        <div class="deviceDetailsWrap">
                            <div class="devicePrice">PRICE</div>
                            <div class="deviceName">MODELNAME</div>
                            <div class="deviceDetails">MODELDETAILS</div>
                        </div>
                    </a>
                </div> -->
            </div>
            <div class="checkLastFileReached" onclick="loadMoreDevices();">
                Load More
            </div>
        </div>
        
    </div>
</body>

</html>