<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Cellular World</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
        require 'PHP/loadLibraries.php';
    ?>
    <script src="../JS/index.js?v=1"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="../../CSS/index.css?v=1" />
    
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
</head>

<body>
    <div class="pageContent" data-aos="zoom-out-up">
        <a name="cellularWorld">
            <div class="container-fluid noPadding noMargin">
                <div id="topSlider" class="carousel slide" data-ride="carousel" data-interval="5000">
                    <!-- Indicators -->
                    <ol class="carousel-indicators hide">
                        <li data-target="#topSlider" data-slide-to="0" class="active"></li>
                        <li data-target="#topSlider" data-slide-to="1"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner promoSlider">
                    </div>

                    <!-- Left and right controls -->
                    <a class="carousel-control leftEffect noScroll" href="#topSlider" data-slide="prev">
                        <span class="leftArrow"></span>
                    </a>
                    <a class="carousel-control rightEffect noScroll" href="#topSlider" data-slide="next">
                        <span class="rightArrow"></span>
                    </a>
                </div>
            </div>
        </a>

        <div class="container-fluid middleSection">
            <div class="container">
                <!-- <div class="row">
                    <div class="sectionHeader">
                        Best Deals
                    </div>
                    <div class="col-md-12"></div>
                </div> -->
                <a name="sale">
                    <div class="sectionWrap" id="#sale">
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">
                            <div class="showAllItems hideNow"></div>
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">
                                Mobiles
                            </div>
                            <div class="mobilesItemsWrap sectionItemsWrap row">
                            </div>
                        </div>
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">
                                Smart TV
                                <div class="showAllItems hideNow"></div>
                            </div>
                            <div class="smartTVWrap sectionItemsWrap row">
                            </div>
                        </div>
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">
                                Laptops
                                <div class="showAllItems hideNow"></div>
                            </div>
                            <div class="laptopsItemsWrap sectionItemsWrap row">
                            </div>
                        </div>
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">
                                Accessories
                                <div class="showAllItems hideNow"></div>
                            </div>
                            <div class="accessoriesItemsWrap sectionItemsWrap row">
                            </div>
                        </div>
                        
                    </div>
                </a>


            </div>
        </div>
    </div>

    
    

</body>

</html>