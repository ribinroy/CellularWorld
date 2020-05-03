$(document).ready(function(){
    checkIfAdmin();
    loadContents();
    renderSlider();
});

var mobilesRenderedCount = 0;
var laptopsRenderedCount = 0;
var accessoriesRenderedCount = 0;
var smartTVRenderedCount = 0;
var maxItemsPerBox = 4;

function loadContents(){
    getData('loadMainPageContents', 'Items', function(data){
        resetIndex();
        renderAllItems(data);
        loadAOS();
        initClickFunctions();
    });
}

function resetIndex(){
    var html = '<div class="container">\
                <a name="sale">\
                    <div class="sectionWrap" id="#sale">\
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">\
                            <div class="showAllItems hideNow"></div>\
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">\
                                Mobiles\
                            </div>\
                            <div class="mobilesItemsWrap sectionItemsWrap row">\
                            </div>\
                        </div>\
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">\
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">\
                                Smart TV\
                                <div class="showAllItems hideNow"></div>\
                            </div>\
                            <div class="smartTVWrap sectionItemsWrap row">\
                            </div>\
                        </div>\
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">\
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">\
                                Laptops\
                                <div class="showAllItems hideNow"></div>\
                            </div>\
                            <div class="laptopsItemsWrap sectionItemsWrap row">\
                            </div>\
                        </div>\
                        <div class="row section" data-aos="flip-up"  data-aos-delay="0">\
                            <div class="sectionHeader" data-aos="zoom-in" data-aos-delay="10">\
                                Accessories\
                                <div class="showAllItems hideNow"></div>\
                            </div>\
                            <div class="accessoriesItemsWrap sectionItemsWrap row">\
                            </div>\
                        </div>\
                    </div>\
                </a>\
            </div>'
    
    mobilesRenderedCount = 0;
    laptopsRenderedCount = 0;
    accessoriesRenderedCount = 0;
    smartTVRenderedCount = 0;
    $('.middleSection').empty().append(html);
}
function loadAOS(){
    AOS.init();      
}

function checkIfAdmin(){
    try{
        if(readCookie("cellularAdmin")){
            if(JSON.parse(readCookie("cellularAdmin"))[0]['Access'].indexOf('admin') != -1)
                CWAccess.isAdmin = true;
        }
    }
    catch(err){
        console.log(err);
    }
}

function adminFunctions(){
    if(!CWAccess.isAdmin)
        return false;

    $('.itemWrap').each(function(index,item){ //render edit icons to items
        if($(item).find('.editFunction').length  != 0)
            return;
        var html = "<a href='#' title='Edit' class='editFunction disabled' onclick='editItem($(this));'>E</a>";
        $(item).append(html);
        var html = "<a href='#' title='Delete' class='deleteFunction disabled' onclick='deleteItem($(this));'>D</a>";
        // $(item).append(html);
    });
}


function editItem(item){
    var type = "Items";
    var id = $(item).closest('.itemWrap').attr('id');
    var link = "addDevice.php?popUp=1&id=" + id + "&TableName=" + type;
    var deviceName = $(item).closest('.itemWrap').find('.itemName').html();
    showPopUp("Update - " + deviceName,link);
}

function initClickFunctions(){
    $('.showAllItems').click(function(){
        $(this).closest('.section').find('.hideNow').slideToggle();
        $('.showAllItems').toggleClass('showing');
    });
}

function closeIframe() {
    var iframe=document.getElementById("popUpIframe");
    // iframe.parent.removeChild(iframe);
    $('.popUpWrap').fadeOut(200,function(){
        $(item).closest('.popUpWrap').remove();
    });
    loadContents();    
}

function renderSlider(){
    var atleastOneRendered = false;
    var link = "../Images/MainPage/Slider/";

    getData('SliderData', '', function(data){
        $.each(data,function(index,item){
            var html = '<div class="item">\
                    <div class="sliderImage" style="background:url({0})"></div>\
                </div>' ;
            if(item == "." || item == "..")
                return
            else{
                var Image = link + item;
                console.log(Image);
                html = html.format(Image);
                $('.promoSlider').append(html);
                atleastOneRendered = true;
            }
        });
        if(atleastOneRendered){
            $('.promoSlider>div:first-child').addClass('active');
        }
    });

    
}

function renderAllItems(data){
    var aosDurationMultiplier = 100;
    $.each(data,function(index,item){
        var html='<div class="col-md-3 col-sm-6 col-xs-12{4}"  data-aos-delay="{3}" data-aos="fade-up">\
                    <a class="itemWrap" href="Devices?{1}" id={5}>\
                        <div class="itemImageWrap">\
                            <div class="itemInsideImage" style="background:url({2})"></div>\
                        </div>\
                        <div class="itemNameWrap">\
                            <div class="itemName">{0}</div>\
                        </div>\
                    </a>\
                </div>';
        var showHideClass = "";
        if(item.Category=="Mobiles"){
            var link = "Type=Mobiles&Brand="+item.DeviceName;
            if(mobilesRenderedCount >= maxItemsPerBox){
                showHideClass = " hideNow";
                $('.mobilesItemsWrap').closest('.section').find('.showAllItems').removeClass('hideNow').fadeIn();
            }
            html=html.format(item.DeviceName,link,item.Image,(mobilesRenderedCount * aosDurationMultiplier), showHideClass, item.ID);
            $('.mobilesItemsWrap').append(html);
            mobilesRenderedCount+=1;
        }
        else if(item.Category=="Laptops"){
            var link = "Type=Laptops&Brand="+item.DeviceName;
            if(laptopsRenderedCount > maxItemsPerBox){
                showHideClass = " hideNow";
                $('.laptopsItemsWrap').closest('.section').find('.showAllItems').removeClass('hideNow').fadeIn();
            }
            html=html.format(item.DeviceName,link,item.Image,(laptopsRenderedCount * aosDurationMultiplier), showHideClass, item.ID);
            $('.laptopsItemsWrap').append(html);
            laptopsRenderedCount+=1;
        }
        else if(item.Category=="Accessories"){
            var link = "Type=Accessories&GadgetType="+item.AccessoryType;
            if(accessoriesRenderedCount >= maxItemsPerBox){
                showHideClass = " hideNow";
                $('.accessoriesItemsWrap').closest('.section').find('.showAllItems').removeClass('hideNow').fadeIn();
            }
            html=html.format(item.AccessoryType,link,item.Image,(accessoriesRenderedCount * aosDurationMultiplier), showHideClass, item.ID);
            $('.accessoriesItemsWrap').append(html);
            accessoriesRenderedCount+=1;
        }
        else if(item.Category=="SmartTV"){
            var link = "Type=SmartTV&Brand="+item.DeviceName;
            if(smartTVRenderedCount >= maxItemsPerBox){
                showHideClass = " hideNow";
                $('.smartTVWrap').closest('.section').find('.showAllItems').removeClass('hideNow').fadeIn();
            }
            html=html.format(item.DeviceName,link,item.Image,(smartTVRenderedCount * aosDurationMultiplier), showHideClass, item.ID);
            $('.smartTVWrap').append(html);
            smartTVRenderedCount+=1;
        }
    });
    
    adminFunctions();
}



function getData(phpFileName, tableName, doAfter){
    $.getJSON('../PHP/'+phpFileName+'.php?table='+tableName, function(data) {
        doAfter(data);
      });
}


