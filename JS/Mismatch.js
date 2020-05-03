var MM = MM || {};

MM.currentCount = 0;
MM.currentData = [];
MM.deviceID = "";
MM.deviceName = "";
MM.totalCount = 0;
MM.lastDoneIndex = 0;
MM.filterSelected = "ALL";

MM.Found = 0;
MM.NotFound = 0;

$(document).ready(function(){
    if(!CWAccess.isAdmin){
        window.location.href= "http://cellularworld.co.in/index.php";
    }

    
});

MM.initAllItems = function(listOnly){
    MM.Found = 0;
    MM.NotFound = 0;
    $('.mismatchesFound').empty();
    MM.getDevicesData(function(){
        MM.loopThroughData(function(){
            $('.label.total').empty().append($('.itemWrap').length);
            if(listOnly)
                return false;
            MM.loopThroughAPI();
        });
    });
}

MM.getDevicesData = function(doAfter){
    showLoading(true);
    $.ajax({
        type:"POST",
        url:"DevicesSearch.php",
        data :{
            Type : "Mobiles"
        },
        success:function(result){
            showLoading(false);
            MM.currentData = JSON.parse(result);
            doAfter();
        }
    });
}
MM.loopThroughAPI =function(){
    MM.totalCount = $('.itemWrap').length;
    $('.label.total').empty().append(MM.totalCount);
    MM.currentCount = 0;
    MM.checkInAPIAndUpdate(MM.currentCount);
}

MM.buttonActions = function(value){
    switch(value){
        case "SA":MM.initAllItems();break;
        case "L":MM.initAllItems(true);break;
        case "S":MM.currentCount = MM.totalCount;MM.lastDoneIndex=0;showLoading(0);break;
        case "P":MM.currentCount = MM.totalCount;showLoading(0);break;
        case "R":MM.currentCount = MM.lastDoneIndex;MM.checkInAPIAndUpdate(MM.currentCount);showLoading(1);break;
        case "NFO":MM.filterSelected = "NFO";$('.itemWrap').hide();$('.NotFound').show();break;
        case "FO":MM.filterSelected = "FO";$('.itemWrap').hide();$('.Found').show();break;
        case "ALL":MM.filterSelected = "ALL";$('.itemWrap').show();break;
    }
}

MM.checkInAPIAndUpdate = function(index){
    showLoading(1);
    MM.lastDoneIndex = MM.currentCount;
    $('.foneApiNotFOundChangeDIV').text("");
    MM.deviceID = parseInt($($('.itemWrap')[index]).find('.name').attr('id')); 
    MM.deviceName = $($('.itemWrap')[index]).find('.name').text(); 
    MM.foneapi(MM.deviceName, function(data){
        var found = MM.renderDeviceDetailsFromAPI(MM.deviceName, data);
        console.log(found);
        if(found != true){
            $('.name[id="'+MM.deviceID+'"]').closest('.itemWrap').addClass('NotFound');
            $('.name[id="'+MM.deviceID+'"]').closest('.itemWrap').find('.result').append(found);
            MM.buttonActions(MM.filterSelected);
            MM.NotFound+=1;
            $('.label.notFound').empty().append(MM.NotFound);
        }
        else{
            $('.name[id="'+MM.deviceID+'"]').closest('.itemWrap').addClass('Found');
            MM.buttonActions(MM.filterSelected);
            MM.Found+=1;
            $('.label.found').empty().append(MM.Found);
        }

        if(MM.currentCount<MM.totalCount)
            MM.checkInAPIAndUpdate(++MM.currentCount);
        else
            showLoading(0);
    });
    $('.foneApiNotFOundChangeDIV').bind("DOMSubtreeModified",function(){
        if($('.foneApiNotFOundChangeDIV').text() == "No Matching Results Found."){
            $('.name[id="'+MM.deviceID+'"]').closest('.itemWrap').addClass('NotFound');
            $('.name[id="'+MM.deviceID+'"]').closest('.itemWrap').find('.result').append("Not in API Please insert specification data for this item explicitly");
            MM.buttonActions(MM.filterSelected);
            MM.NotFound+=1;
            $('.label.notFound').empty().append(MM.NotFound);
            if(MM.currentCount<MM.totalCount)
                MM.checkInAPIAndUpdate(++MM.currentCount);
            else
                showLoading(0);
        }
    });
}

MM.loopThroughData = function(doAfter){
    var html = "<div class='itemWrap'><div onclick='editItem($(this))'>{1}</div><a href='Details?deviceId={1}&Type=Mobiles' target='_blank'>\
                    <div class='name' id='{1}'>{2} {0}</div></a>\
                    <div class='result'></div>\
                </div>";
    var containerDiv = $('.mismatchesFound');
    $.each(MM.currentData, function(index, item){
        modelName = item.ModelName.toLowerCase();
        if(modelName.indexOf(item.Brand.toLowerCase()) != -1){
            modelName = modelName.replace(item.Brand.toLowerCase(), "");
        }
        $(containerDiv).append(html.format(modelName, item.ID, item.Brand));
    });
    doAfter();
}

MM.foneapi = function(deviceName, doAfter){
    $('.foneApiNotFOundChangeDIV').fonoApi({
		token : "86b89476caaf66eda3f21279b7711afc",
		device : deviceName,
		limit : 50,
		template : function() {
            doAfter(arguments);
		}
	});
}

MM.renderDeviceDetailsFromAPI = function(deviceName, data, promiseFound){
    var returnValue = false;
    $.each(data,function(index, item){
        if(promiseFound || item.DeviceName.toLowerCase() == deviceName.toLowerCase()){
            returnValue = true;
            return returnValue;
        }
    });
    if(!returnValue && data.length != 0){
        returnValue = "No exact matches, but API return array not empty, please rename the device if needed to any of the below model names:";
        $.each(data,function(index, item){
            returnValue = returnValue + " " + item.DeviceName;
        });
    }
    if(!returnValue){
        returnValue = "Not in API Please insert specification data for this item explicitly";
    }  
    return returnValue;
}

function showLoading(show){
    if(show){
        // $('.deviceContainerWrap').hide();
        $('.loadingDiv').addClass('spinner').fadeIn(function(){
        });
    }
    else{
        $('.loadingDiv').fadeOut(function(){
            $('.loadingDiv').removeClass('spinner');
            // $('.deviceContainerWrap').fadeIn();
        });
    }
}

function editItem(item){
    var type = "Mobiles";
    var id = $(item).text();
    var deviceName = $(item).closest('.itemWrap').find('.name').text();
    var link = "addDevice.php?popUp=1&id=" + id + "&TableName=" + type;
    showPopUp("Update - " + deviceName,link);
}

function closeIframe() {
    var iframe=document.getElementById("popUpIframe");
    // iframe.parent.removeChild(iframe);
    $('.popUpWrap').fadeOut(200,function(){
        $(item).closest('.popUpWrap').remove();
    });    
}
