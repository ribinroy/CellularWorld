var addDevice = {};
var loadData =false;
addDevice.tableSchema = [];
addDevice.presentData = [];
addDevice.brandNames = [];
var continueSaving = true;
var uploadLocation = "../Uploads/";
$(document).ready(function(){
    initClickHandlers();
    initialLoad(true);
    loadMetadataAndPopulate();
});

function loadMetadataAndPopulate(){
    getSelectedTableBrandNames(function(){
        getSelectedTabeExistingData(function(){
            renderFormData();
        });
    })
}
function getSelectedTabeExistingData(doAfter){
    $.ajax({
        type:"POST",
        url:"PHP/DevicesSearch.php",
        data :{
            Type : getUrlKeyValue('TableName')
        },
        success:function(result){
            addDevice.presentData = JSON.parse(result);
            doAfter();
        }
    });
}

function renderFormData(){
    $('input#Brand').parent().append("<select class='BrandSelection' name='Brand'></select>");
    var existingVal = $('input#Brand').val();
    $('input#Brand').attr('name', '');
    $('input#Brand').hide();
    var optionHTML = "<option value='{0}'>{0}</option";
    $.each(addDevice.brandNames,function(index, items){
        $('.BrandSelection').append(optionHTML.format(items.DeviceName));
    });
    if(existingVal != '' && existingVal != undefined)
        $('select.BrandSelection').val(existingVal);

    if(getUrlKeyValue('TableName') == "Accessories"){
        $('input#GadgetType').parent().append("<select class='GadgetTypeSelection' name='GadgetType'></select>");
        var existingVal = $('input#GadgetType').val();
        $('input#GadgetType').attr('name', '');
        $('input#GadgetType').hide();
        var optionHTML = "<option value='{0}'>{0}</option";
        $.each(addDevice.brandNames,function(index, items){
            $('.GadgetTypeSelection').append(optionHTML.format(items.AccessoryType));
        });
        if(existingVal != '' && existingVal != undefined)
            $('select.GadgetTypeSelection').val(existingVal);
    }
}

function getSelectedTableBrandNames(doAfter){
    $.ajax({
        type:"POST",
        url:"PHP/fetchHelper.php",
        data :{
            database : "cellular_MainPage",
            table : "Items",
            Category : getUrlKeyValue('TableName')
        },
        success:function(result){
            addDevice.brandNames = JSON.parse(result);
            doAfter();
        }
    });
}

function initialLoad(hideSelector){
    $('.TypeSelector select').val(getUrlKeyValue('TableName'));
    if(getUrlKeyValue('popUp') == 1)
        $('.footerSection, .header, .showAddedDevices').hide();
    if(getUrlKeyValue('id') != null){
        if(hideSelector)
            $('.TypeSelector select').hide();
        loadData = true;
    }
    getTableSchemaData();
}

function isAlphaNumeric(e) {
        if (!(event.charCode > 47 && event.charCode < 58) && // numeric (0-9)
            !(event.charCode > 64 && event.charCode < 91) && // upper alpha (A-Z)
            !(event.charCode > 96 && event.charCode < 123) &&
            !event.charCode == 32){ // lower alpha (a-z)
                event.preventDefault();
        }

    
        // var code = (e.keyCode ? e.keyCode : e.which);
        // if (code == 13) { //Enter keycode
        //     e.preventDefault();
        //     checkInputValue(e);
        // }
  };
  
function addNewInput(field, fieldValue){
    // if(loadData && field == undefined && fieldValue == undefined){
    //     return false;
    // }
    var html = '<div class="col-md-12 additionalSpec">\
                    <div class="col-xs-11 paddingRight_0">\
                        <div class="formInputItem">\
                            <div class="formInputTitle">\
                                <input type="text" id="field" onKeyPress="isAlphaNumeric()">\
                            </div>\
                            <div class="formInputArea">\
                                <input type="text" id="fieldValue" onKeyPress="isAlphaNumeric()">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-xs-1 paddingLeft_0"><div class="removeItem" onclick="removeItem($(this));">X</div></div>\
                </div>';
    $('.jsonDataObjectsWrap').append(html);
    $('.jsonDataObjectsWrap>div:last-child input#field').val(field);
    $('.jsonDataObjectsWrap>div:last-child input#fieldValue').val(fieldValue);
    // $('.jsonDataObjectsWrap>div:last-child').slideDown(function(){
    //     $("html").scrollTop($("html")[0].scrollHeight);
    // });
    $('.jsonDataObjectsWrap>div:last-child input#field').focus();
}

function removeItem(item){
    if($('.formInputTitle input').length == 1)
        return false;
    $(item).closest('.additionalSpec').slideUp(function(){
        $(item).closest('.additionalSpec').remove();
    });
}

function getTableSchemaData(){
    showLoading(true);
    $.ajax({
        type:"POST",
        url:"PHP/TableDetailsRetrieve.php",
        data :{
            TableName : getUrlKeyValue('TableName')
        },
        success:function(result){
            addDevice.tableSchema = JSON.parse(result);
            renderQuestions();
        }
    });
}

function initClickHandlers(){
    $('.TypeSelector select').change(function(){
        updateQueryStringParam("TableName", $(this).val());    
        $('.formInputSectionWrap').empty();
        $('.additionalSpec').remove();
        loadMetadataAndPopulate();
        getTableSchemaData();
    });

    $('.submitValue').click(function(){
        // $(this).serialize()
        if(!validated()){
            alert('Please fill all the mandatory fields');
            return false;
        }
        showLoading(true);
        uploadItem(function(fileLink){
            var Device = getUrlKeyValue('TableName');
            var Brand = $('select.BrandSelection').val();
            var Modelname = $('input#ModelName').val(); 
            if(getUrlKeyValue("TableName") == "Items"){
                Brand = $('input#Category').val(); 
                Modelname = $('input#DeviceName').val(); 
            }
            var directory = Device + "/" + Brand + "/" +Modelname + "/";
            var imageLink = "http://cellularworld.co.in/Images/DevicesImages/Uploads/" + directory + fileLink;
            $('input#Image').val(imageLink);
            inputToTheDatabase();
        },
        false,
        function(){
            console.log("Upload Error");
            if($('input#Image').val().indexOf('http://cellularworld.co.in') == -1){
                if(confirm("No item selected for upload, continue without image?")){
                    inputToTheDatabase();
                    return true;
                }
                showLoading(false);
            }
            else{
                inputToTheDatabase();
            }
        });
        
    });
}

function isEmpty(value){
    if(value == "" || value == null)
        return true;
    else
        return false;
}

function isNullorEmpty(value){
    if(value == null || value == "" || value == undefined)
        return true;
}

function validated(){
    if(getUrlKeyValue('TableName') == "Items")
        return true;
    validation = true;
    if(isNullorEmpty($('select.BrandSelection').val())){
        validation = false;
        $('select.BrandSelection').addClass('notFilled');
    }
    if(isNullorEmpty($('input#ModelName').val())){
        validation = false;
        $('input#ModelName').addClass('notFilled');
    }
    if(isNullorEmpty($('input#Price').val())){
        validation = false;
        $('input#Price').addClass('notFilled');
    }
    return validation;
}

function inputToTheDatabase(){
    var Author = JSON.parse(readCookie('cellularAdmin'))[0].FirstName + " | " + JSON.parse(readCookie('cellularAdmin'))[0].ID;
    var Category = "&Category=" + getUrlKeyValue('TableName');
    var sentValue = $("#submitValueFormID").serialize() + "&Specifications=" + JSON.stringify(createJson()) + "&Author=" + Author + Category;
    if(!continueSaving){
        if(!confirm("Some mismatches found in the data entered, continue saving and neglect the issues?")){
            continueSaving = true;
            showLoading(0);
            return false;
        }
    }
    updateItem(sentValue, function(data){
        if(data.indexOf("Updated") != -1){
            alert("Value updated Succesfully");
            showLoading(0);  
            $('.formInputSectionWrap').empty();
            $('.jsonDataObjectsWrap').remove();
            parent.closeIframe();
        }
        else if(data.indexOf("Added") != -1){
            alert("Item added Succesfully");
            var database = $('.TypeSelector select').val();
            getLastAddedDevice(database);
            $('input').val("");
            $('.additionalSpec').remove();
            addNewInput();
        }
    });
}
function getLastAddedDevice(database){
    showLoading(true);
    $('input').val('');
    $.ajax({
        type:"POST",
        url:"PHP/DevicesSearch.php",
        data :{
            Type : database,
            Latest : true
        },
        success:function(result){
            var data = JSON.parse(result);
            showLatestAddedDevice(data);
        }
    });
}

function updateThisItem(item){
    var id = $(item).html();
    var type = $(item).attr("type");
    var deviceName = "";
    var link = "addDevice.php?popUp=1&id=" + id + "&TableName=" + type;
    showPopUp("Update - " + deviceName,link);
}

function showLatestAddedDevice(data){
    var mainTemplate ="<div class='item'>{0}</div>";
    var eachItemTemplate = "<div class='each'>\
                                <div class='column{2}' columnName='{0}'>{0}</div>\
                                <div class='columnValue{2}'>{1}</div>\
                            </div>";
    var html = "";
    for(var key in data[0]){
        var emptyValue = "";
        var htmlTemp = eachItemTemplate;
        var value = data[0][key];
        if(data[0][key] == "")
            emptyValue = " empty";
        if(key == "Image"){
            value = "<img src='" + value + "'>";
        }
        else if(key == "ID"){
            emptyValue = emptyValue + " edit' onclick='updateThisItem($(this));' type='" + $('.TypeSelector select').val() + "'";
        }
        if(key != "Author"){
            if(key == "Specifications"){
                html = html + htmlTemp.format(key, tablify(value), emptyValue);
            }
            else 
                html = html + htmlTemp.format(key, value, emptyValue);
        }
    }
    $('.showAddedDevices').prepend(mainTemplate.format(html));
    $('.showAddedDevices div:first-child').hide().slideDown();
    showLoading(false);
}

function tablify(obj){
    obj = JSON.parse(obj);
    var html = "<table>{0}</table>";
    var trHTML = "";
    for(keys in obj){
        trHTML = trHTML + "<tr><td>" + keys + "</td><td> : " + obj[keys] + "</td></tr>";
    }
    return html.format(trHTML);
}

function uploadItem(doAfter, Overwrite, failure){
    var phpURL = 'PHP/uploadHelper.php?';
    var file_data = $('#fileToUpload').prop('files')[0];  
    var Brand = $('select.BrandSelection').val();
    var Modelname = $('input#ModelName').val(); 
    
    if(getUrlKeyValue("TableName") == "Items"){
        Brand = $('input#Category').val(); 
        Modelname = $('input#DeviceName').val(); 
    }
    
    if(file_data == undefined){
        failure();
        return false;
    }
    // phpURL = phpURL + "location=" + uploadLocation;
    if(Overwrite)
        phpURL = phpURL + "overwrite=true";
    else
        phpURL = phpURL + "overwrite=false";
    var fileName = file_data["name"];
    var form_data = new FormData();                  
    form_data.append('file', file_data);             
    form_data.append('Brand', Brand);             
    form_data.append('Modelname', Modelname);     
    form_data.append('Device', getUrlKeyValue('TableName'));   
    $.ajax({
        url: phpURL, // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                        
        type: 'post',
        success: function(php_script_response){
            console.log(php_script_response); // display response from the PHP script, if any
            if(php_script_response.indexOf("(#ErrorFileExists)") != -1){ //File eXists
                if(confirm("File already exists, Overwrite?")){
                    uploadItem(doAfter, true, failure);
                }
                else{
                    showLoading(0);
                }
            }
            else if(php_script_response.indexOf("(#UploadSuccess)" != -1)){
                doAfter(fileName);
            }
            else if(php_script_response.indexOf("(#Error" != -1)){
                failure();
            }

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

function renderQuestions(){
    $('.formInputSectionWrap').empty();
    $('.additionalSpec').remove();
    var htmlTemplate = '<div class="col-md-6 col-xs-12{2}">\
                            <div class="formInputItem">\
                                <div class="formInputTitle">{0}</div>\
                                <div class="formInputArea">{1}</div>\
                            </div>\
                        </div>     ';
    $.each(addDevice.tableSchema, function(index, item){
        var itemHtml = htmlTemplate;
        var inputHtml = "";
        var disabled = "";
        var hiddenColumnArray = [ "Category", "ModifiedOn", "ID", "Created", "Specifications", "Author", "Details", "Unavailable", "Hide", "APINotFound"];

        if(hiddenColumnArray.indexOf(item.COLUMN_NAME) != -1){
            disabled = " hide ";
        }

        switch(item.DATA_TYPE){
            case "int":inputHtml = "<input type='number'  name='" + item.COLUMN_NAME + "' id='" + item.COLUMN_NAME + "'>";break;
            case "varchar":inputHtml = "<input type='text' name='" + item.COLUMN_NAME + "' id='" + item.COLUMN_NAME + "'>";break;
            case "timestamp":inputHtml = "<input type='text' disabled name='" + item.COLUMN_NAME + "' id='" + item.COLUMN_NAME + "'>";break;
            default : inputHtml = "";break;
        }

        if(item.COLUMN_NAME == "GadgetType"){
            if($('.TypeSelector select').val() == "Accessories"){
                itemHtml = itemHtml.format(item.COLUMN_NAME, inputHtml, disabled);
            }
            else{
                itemHtml = "";
            }
        }
        else if(item.COLUMN_NAME == "Image"){
            var chooseUploadHTML = "<a href=''  onkeypress='workKeyPress(32, openBrowseFile())'><label for='fileToUpload'>Upload</label></a><input type='file' name='fileToUpload' accept='image/*' id='fileToUpload' />";
            var inputHtml = "<div class='inputText'>" + inputHtml + "</div><div class='inputSelector'>" + chooseUploadHTML + "</div>"
            itemHtml = itemHtml.format(item.COLUMN_NAME, inputHtml, disabled);
        }
        // else if(item.COLUMN_NAME == "PDFLink"){
        //     var chooseUploadHTML = "<a href=''  onkeypress='workKeyPress(32, openBrowseFile())'><label for='fileToUpload'>Upload</label></a><input type='file' name='fileToUpload' accept='pdf/*' id='fileToUpload' />";
        //     var inputHtml = "<div class='inputText'>" + inputHtml + "</div><div class='inputSelector'>" + chooseUploadHTML + "</div>"
        //     itemHtml = itemHtml.format(item.COLUMN_NAME, inputHtml, disabled);
        // }
        else
            itemHtml = itemHtml.format(item.COLUMN_NAME, inputHtml, disabled);

        $('.formInputSectionWrap').append(itemHtml);
    });
    $('input[type="file"]').change(function(){
        var file_data = $('#fileToUpload').prop('files')[0];   
        $('input#Image').val(file_data["name"]);
    });
    if(getUrlKeyValue('TableName') != "Items"){
        $('.jsonDataObjectsWrap').show();
        addNewInput();
    }
    else{
        $('.jsonDataObjectsWrap').hide();
    }
    if(loadData)
        loadCurrentData();
    showLoading(false);

    $('input#Image').keypress(function(e){ //AVOID DATA INTO IMAGE FILE
        e.preventDefault();
        return false;
    })
}

function openBrowseFile(){
    $('input#fileToUpload').click();
}

function workKeyPress(value, doFunction){
    if(event.keyCode == value){
        doFunction;
    }
}
function createJson(){
    $('.additionalSpec').removeClass("ExistingField").removeClass("EmptyInput");
    $('.additionalSpec').attr("title",null);
    var jsonValue = {};
    $('.additionalSpec').each(function(index, item){
        var field = $(item).find('input#field').val();
        var fieldValue = $(item).find('input#fieldValue').val();
        if(isEmpty(field) && isEmpty(fieldValue)){
            $(item).addClass("EmptyInput");
            $(item).attr("title","Empty field");
            continueSaving = false;
        }
        else if(foundInsideJSON(jsonValue, field)){
            $(item).addClass("ExistingField");
            $(item).attr("title","Field already exists");
            continueSaving = false;
        }
        else
            jsonValue[field] = fieldValue;
    });
    return jsonValue;
}

function foundInsideJSON(obj, value){
    var found = false;
    for(keys in obj){
        if(keys == value)
            found = true;
    }
    return found;
}
function loadCurrentData(){
    showLoading(true);
    $.ajax({
        type:"POST",
        url:"PHP/DevicesSearch.php",
        data :{
            deviceId : getUrlKeyValue('id'),
            Type : getUrlKeyValue('TableName'),
        },
        success:function(result){
            populateData(JSON.parse(result));
        }
    });
}

function populateData(data){
    showLoading(1);
    for(var key in data[0]){
        if(key != "Specifications")
            $(".formInputSectionWrap #"+key).val(data[0][key]);
        console.log(key + " : " + data[0][key] )
    }
    $('select.BrandSelection').val(data[0].Brand);
    populateAdditionalData(data[0]["Specifications"]);
    showLoading(0);
}

function populateAdditionalData(data){
    if(data == ""){
        return true;
    }
    $('.additionalSpec').remove();
    var additionalData = JSON.parse(data);
    for(keys in additionalData){
        addNewInput(keys, additionalData[keys]);
    };
}

function showLoading(show){
    if(show){
        $('.deviceContainerWrap').hide();
        $('.loadingDiv').addClass('active').fadeIn(function(){
        });
    }
    else{
        $('.loadingDiv').fadeOut(function(){
            $('.loadingDiv').removeClass('active');
            $('.deviceContainerWrap').fadeIn();
        });
    }
}

function updateQueryStringParam(key, value) {
    baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
    urlQueryString = document.location.search;
    if(value == ''){
        newParam = "";
    }
    else{
        var newParam = key + '=' + value;
    }
    params = '?' + newParam;
  
    // If the "search" string exists, then build params from it
    if (urlQueryString) {
      keyRegex = new RegExp('([\?&])' + key + '[^&]*');
      // If param exists already, update it
      if (urlQueryString.match(keyRegex) !== null) {
        params = urlQueryString.replace(keyRegex, "$1" + newParam);
      } else { // Otherwise, add it to end of query string
        params = urlQueryString + '&' + newParam;
      }
    }
    window.history.replaceState({}, "", baseUrl + params);

    if( window.location.href[ window.location.href.length - 1] == "&" )//remove & if last charcter it is
        window.history.replaceState({}, "", window.location.href.substring(0, window.location.href.length - 1));

    window.history.replaceState({}, "", window.location.href.replace('&&', '&'));
  }

function updateQueryStringParam(key, value) {
    baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
    urlQueryString = document.location.search;
    if(value == ''){
        newParam = "";
    }
    else{
        var newParam = key + '=' + value;
    }
    params = '?' + newParam;
  
    // If the "search" string exists, then build params from it
    if (urlQueryString) {
      keyRegex = new RegExp('([\?&])' + key + '[^&]*');
      // If param exists already, update it
      if (urlQueryString.match(keyRegex) !== null) {
        params = urlQueryString.replace(keyRegex, "$1" + newParam);
      } else { // Otherwise, add it to end of query string
        params = urlQueryString + '&' + newParam;
      }
    }
    window.history.replaceState({}, "", baseUrl + params);

    if( window.location.href[ window.location.href.length - 1] == "&" )//remove & if last charcter it is
        window.history.replaceState({}, "", window.location.href.substring(0, window.location.href.length - 1));

    window.history.replaceState({}, "", window.location.href.replace('&&', '&'));
  }

  function closeIframe() {
    var iframe=document.getElementById("popUpIframe");
    // iframe.parent.removeChild(iframe);
    $('.popUpWrap').fadeOut(200,function(){
        $(item).closest('.popUpWrap').remove();
    });
    getDevicesData();    
}