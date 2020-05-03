var deviceName = "";
var deviceBrand = "";
var deviceID = "";
var deviceDetails = [];
var scaleValue = 1.4;
var adminConsoleNo = 0;
$(document).ready(function(){
    checkIfAdmin();
    getDevicesData();
    initTabs();
    initImageZoom();
    initAdminFunctions();
});

function getDevicesData(){
    showLoading(true);
    $.ajax({
        type:"POST",
        url:"PHP/DevicesSearch.php",
        data :{
            deviceId : getUrlKeyValue('deviceId'),
            Type : getUrlKeyValue('Type'),
        },
        success:function(result){
            deviceDetails = JSON.parse(result);
            renderInformation(deviceDetails);
        }
    });
}

// ==================Admin Functions============
function checkIfAdmin(){
    try{
        if(readCookie("cellularAdmin")){
            CWAccess.isAdmin = true;
        }
    }
    catch(err){
        console.log(err);
    }
}

function initAdminFunctions(){
    if(CWAccess.isAdmin){
        editDeleteItems();
    }
}

function showHideAdminConsole(){
    $('.adminConsoleWrap').toggleClass('active');
    $('.adminConsoleButton').toggleClass('active');
}

function copyDivToClipboard(id) {
    var id = "adminConsole" + id;
    var range = document.getSelection().getRangeAt(0);
    range.selectNode(document.getElementById(id));
    window.getSelection().addRange(range);
    document.execCommand("copy")
}

function consoleInAdmin(message, heat){
    switch(heat){
        case 1 : heatClass = 'red';break;
        case 2 : heatClass = 'blue';break;
        case 3 : heatClass = 'green';break;
        default : heatClass = '';break;
    }
    var html = "<div class='adminItem {2}' id='adminConsole{1}' onclick='copyDivToClipboard({1})'>{0}</div>";
    $('.adminConsole').append(html.format(message,adminConsoleNo++, heatClass));
}

function editDeleteItems(){
    var container = ".adminButtons";
    var html = "<a href='#' title='Edit' class='editFunction disabled devOnly editAccess' onclick='editItem($(this));'>E</a>";
    $(container).append(html);
    var html = "<a href='#' title='Delete' class='deleteFunction disabled' onclick='deleteItem($(this));'>D</a>";
    // $(container).append(html);
}

function editItem(item){
    var deviceName = $('.deviceNameHeading').html();
    var id = getUrlKeyValue('deviceId');
    var type = getUrlKeyValue('Type');
    var link = "addDevice.php?popUp=1&id=" + id + "&TableName=" + type;
    showPopUp("Update - " + deviceName,link);
}

// ==================Admin Functions ends============
function initAlertFunction(){
    $('.foneApiNotFOundChangeDIV').bind("DOMSubtreeModified",function(){
        finalCheckForData();
    });
}

function finalCheckForData(){
    var specDetails = [];
    if(deviceDetails[0]["Specifications"] != ""){
        specDetails.push(JSON.parse(deviceDetails[0]["Specifications"]));
        renderDeviceDetailsFromAPI(specDetails, true);
    }else{
        showLoading(false);
        $('.notFound').fadeIn();
    }
}

function renderInformation(data){
    $('.laodingImage').css('background', '#fff');
    if(data.length == 0){
        $('.deviceNotFound').fadeIn();
        $('.deviceDetailsTab').hide();
        return false;
    }
    deviceName = data[0].ModelName;
    deviceBrand = data[0].Brand;
    deviceID = data[0].ID;
    var nameHeading = data[0].ModelName;
    if(nameHeading.toLocaleLowerCase().indexOf(deviceBrand.toLocaleLowerCase()) == -1)
        nameHeading = deviceBrand + " " + nameHeading;
    if(parseInt(data[0].Unavailable)){
        $('.detailsWrapImage').addClass('unavailable');
    }
    if(data[0].PDFLink != "" && data[0].PDFLink != undefined){
        $('.devicePDFIcon').fadeIn();
        $('.devicePDFIcon').attr('onclick', 'showPopUp("' + nameHeading + '", "http://cellularworld.co.in/PHP/PDFReader.php?Link=' + data[0].PDFLink + '")');
    }
    $('title').text('Cellular World | ' + data[0].ModelName);
    renderDevicePriceAndOffers(data[0]);
    $('.detailsWrapImage').css('background', 'url("'+data[0].Image+'")');
    
    $('.deviceNameHeading').empty().append(nameHeading);
    // if(getUrlKeyValue('Type') == "Mobiles"){
        initAlertFunction();
        foneapi(data[0].ModelName);
    // }
    // else
    //     alert('laptop Details to be updated');
    initfacebookCommentBox();
}

function renderDevicePriceAndOffers(device){
    var offerDivContainer = $('.devicePriceDetails');
    if(device.OfferPrice == 0){
        var html = '<div class="realPrice">{0}</div>';
        $(offerDivContainer).append(html.format(device.Price));
    }
    else{
        var html = '<div class="realPrice offerFound">{0}</div>\
                    <div class="OfferPrice">{1}</div>'
        $(offerDivContainer).append(html.format(device.Price, device.OfferPrice));
    }
}

function initImageZoom(){
    $('.detailsWrapImageContainer').click(function(){
        var imageX = $('.detailsWrapImage').width();
        var imageY = $('.detailsWrapImage').height();
        var moveX = imageX-event.clientX;
        var moveY = imageY-event.clientY;
        if(moveY >= (imageY/4))
            moveY = event.clientY/4;
        if(moveX >= (imageX/4))
            moveX = event.clientX/4;
        $('.detailsWrapImage').css('transform', 'scale(' + scaleValue + ') translate(' + moveX + 'px, '+ moveY +'px)')
    });

    $('.detailsWrapImageContainer').mouseleave(function(){
        $('.detailsWrapImage').css('transform', "");
    });
}

function initTabs(){
    // $('.deviceDetailsTabContainerItem').each(function(index, item){
    //     var position = $(item.attr('itemId')) * 100;
    //     $(item).css('transform','transalteX(-'+position+'deg)');
    // });
    $('.deviceDetailsTabHeader').click(function(){
        var tabId = $(this).attr('tabid');
        var tabmainid = $(this).closest('.deviceDetailsTab').attr('tabmainid');
        $('.deviceDetailsTabContainerItem').hide();// for fadeIn to work
        $('.deviceDetailsTabHeader, .deviceDetailsTabContainerItem').removeClass('active');
        $('.deviceDetailsTabHeader[tabid="' + tabId + '"]').addClass('active');
        $('.deviceDetailsTabContainer[tabmainid="' + tabmainid + '"]').find('.deviceDetailsTabContainerItem[tabId="' + tabId + '"]').fadeIn(function(){
            $(this).addClass('active');
        });
    });
}

function initfacebookCommentBox(){
    $('.fb-comments').attr('data-href', window.location.href);
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=1402331976650336&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
}
function foneapi(deviceName){
    $('.foneApiNotFOundChangeDIV').fonoApi({
		token : "86b89476caaf66eda3f21279b7711afc",
		device : deviceName,
		limit : 50,
		template : function() {
            renderDeviceDetailsFromAPI(arguments);
		}
	});
}

function loadAOS(){
    AOS.init();      
}

function updateAPINotFound(message){
    updateItem("type=Mobiles&ID="+deviceID+"&APINotFound="+message, function(returnValue){
        console.log(returnValue);
        if(returnValue.indexOf('Updated') != -1){
            console.log("Api data updated");
        }
    });
}

function updateItem(dataString, doAfter){
    $.ajax({
        type: 'post',
        url: 'PHP/updateHelper.php',
        data: dataString,
        success: function(data) {
            doAfter(data);
        },
        failure: function(data){
            console.log("Errror in updation");
        }
    });
}


function renderDeviceDetailsFromAPI(data, promiseFound){
    var foundInAPI = false;
    if(deviceName.toLocaleLowerCase().indexOf(deviceBrand.toLocaleLowerCase()) == -1){
        deviceName = deviceBrand + " " + deviceName;
    }
    $.each(data,function(index, item){
        if(promiseFound || item.DeviceName.toLowerCase() == deviceName.toLowerCase()){
            for(key in item) {
                if(key == "DeviceName"){
                    $('.deviceNameHeading').empty().append(item[key]);
                }
                else{
                    var html = '<div class="devicePerSpecWrap" data-aos="zoom-in" data-aos-offset="10" data-aos-once="true">\
                                    <div class="deviceSpecHeading">' + beautifyKey(key) + '</div>\
                                    <div class="deviceSpecDetail">' + item[key] + '</div>\
                                </div>';
                    $('.deviceFullInformationWrap').append(html);
                }
            }
            foundInAPI = true;
            updateAPINotFound("Found in API");
        }
    });
    if(!foundInAPI && data.length != 0){
        var errorMessage = "No exact matches, but API return array not empty, please rename the device if needed to any of the below model names:";
        consoleInAdmin(errorMessage, 1);
        $.each(data,function(index, item){
            consoleInAdmin(item.DeviceName, 2);
        });
        updateAPINotFound("Not Exact Match");
    }
    if(!foundInAPI){
        consoleInAdmin('Not in API Please insert specification data for this item explicitly', 1);  
        updateAPINotFound("Not in API");
        finalCheckForData();
    }  
    else{
        showLoading(false);
    }
}

function beautifyKey(value){
    var beautifiedKey = "";
    value = value.toLowerCase();
    value = value.replace(/_/g, " "); //replace all underscores
    $.each(value.split(" "),function(index,item){
        try{
            item = item.replace(item.charAt(0), item[0].toUpperCase()); //set first letter to caps for all letters
        }
        catch(errr){
            item
        }
        beautifiedKey = beautifiedKey + " " + item;
    });
    beautifiedKey = beautifiedKey.replace(beautifiedKey.charAt(0), ""); //remove empty space in the front
    if(beautifiedKey.split(" ")[1] == "C")
        beautifiedKey = beautifiedKey.split(" ")[0]; //remove "C" found for some keys at the last
    //Special Cases to the dwn
    if(beautifiedKey == " 3 5mm Jack ")
    beautifiedKey = "3.5mm Jack";
    if(beautifiedKey == "Nfc" || beautifiedKey == "Sar" || beautifiedKey == "Os" || beautifiedKey == "Gps" || beautifiedKey == "Usb" || beautifiedKey == "Wlan" || beautifiedKey == "Gprs" || beautifiedKey == "Sim" || beautifiedKey == "Cpu" || beautifiedKey == "Gpu")
        beautifiedKey = beautifiedKey.toUpperCase();
    return beautifiedKey;
}

function showLoading(show){
    if(show){
        $('.detailsInformationWrap').hide();
        $('.loadingDiv').addClass('active').fadeIn(function(){
        });
    }
    else{
        $('.loadingDiv').fadeOut(function(){
            $('.loadingDiv').removeClass('active');
            $('.detailsInformationWrap').fadeIn(function(){
                loadAOS();
            });
        });
    }
}
