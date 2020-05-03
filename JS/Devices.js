var aosAnimationDelayCal = 80;
var devices = {};
devices.currentData = [];
var updated = false;
var deletedImage = "";
var lastMarkedItemAvailability = null;

//Price Range variables
var maxPrice = 0;
var minPrice = 0;
var alreadyUnderSorting = false;
var alreadySortingTimeDelay = 10;

//Lazy Loading variables
var alreadyLazyLoading = false;
var olderScroll = 0;
var renderedUntil = 0;
var maxNoOfItemsInOneLoad = 12;
var initialRender = true;

$(document).ready(function () {
    mainLinksSwapLink();
    checkIfAdmin();
    getDevicesData();

    $('.searchFilterWrap').clone().appendTo($('.mobileNavContents'));
    $('.filterInnerWrap>div').clone().appendTo($('.mobileNavContents'));
    $('.mobileNavContainer .searchFilterWrap').removeClass('hidden-xs');
    // $('a.mobileNavLink:not(:nth-child(5))').hide(); //hide those links shown inside the mobile nav bar
    $('.searchBase select').val(getUrlKeyValue('Type'));

    initClickFunctions();
    initSearchLabels();
    onScrollBottom();
});

function checkIfAdmin() {
    try {
        if (JSON.parse(readCookie("cellularAdmin"))[0]['Access'].indexOf('admin') != -1) {
            CWAccess.isAdmin = true;
        }
    } catch (err) {
        console.log(err);
    }
}

function adminFunctions() {
    if (!CWAccess.isAdmin)
        return false;

    $('.deviceWrap').each(function (index, item) { //render edit icons to items
        if ($(item).find('.editFunction').length != 0)
            return;
        var html = "<a href='#' title='Edit' class='editFunction disabled devOnly editAccess' onclick='editItem($(this));'>E</a>";
        $(item).append(html);
        var html = "<a href='#' title='Delete' class='deleteFunction disabled' onclick='deleteItem($(this));'>D</a>";
        $(item).append(html);
        var html = "<a href='#' title='Mark Unavailable' class='unavailableFunction disabled' onclick='markItemUnavailable($(this));'>U</a>";
        $(item).append(html);
    });
    disableLink();
}

function markItemUnavailable(item) {
    var confirmationText = "Mark Unavailable?";
    var unavailable = 1;
    var hrefValue = $(item).closest('.deviceWrap').attr("href");
    var type = hrefValue.split("Type=")[1];
    var id = hrefValue.split("=")[1].split("&")[0];
    var deviceName = $(item).closest('.deviceWrap').find('.deviceName').text();
    var unavailableCurrentItem = $(item).closest('.deviceWrap').attr('unavailable');
    if (parseInt(unavailableCurrentItem)) { //if item already marked unavailable
        confirmationText = "Mark Available?";
        unavailable = 0;
    }
    lastMarkedItemAvailability = unavailable;
    if (confirm(confirmationText))
        updateItem("type=" + type + "&ID=" + id + "&Unavailable=" + unavailable, function (returnValue) {
            console.log(returnValue);
            if (returnValue.indexOf('Updated') != -1) {
                if (lastMarkedItemAvailability != null) {
                    id = parseInt(returnValue.split(':')[1]);
                    $.grep(devices.currentData, function (item, index) {
                        if (item.ID == id) {
                            item["Unavailable"] = lastMarkedItemAvailability;
                            renderDevices(devices.currentData);
                            lastMarkedItemAvailability = null;
                        }
                    })
                }
            }
        });
}

function editItem(item) {
    var hrefValue = $(item).closest('.deviceWrap').attr("href");
    var type = hrefValue.split("Type=")[1];
    var id = hrefValue.split("=")[1].split("&")[0];
    var deviceName = $(item).closest('.deviceWrap').find('.deviceName').text();
    var link = "addDevice.php?popUp=1&id=" + id + "&TableName=" + type;
    showPopUp("Update - " + deviceName, link);
}

function deleteItem(item) {
    var deviceName = $(item).closest('.deviceWrap').find('.deviceName').text();
    if (!confirm("Confirm delete - " + deviceName))
        return false;
    deletedImage = $(item).closest('.deviceWrap').find('.deviceImage').css('background').split('"')[1];
    var hrefValue = $(item).closest('.deviceWrap').attr("href");
    var type = hrefValue.split("Type=")[1];
    var id = hrefValue.split("=")[1].split("&")[0];
    deleteDBItem(type, id, "", function (data) {
        if (data.indexOf("Deleted") != -1) {
            alert("Deleted Succesfully");
            var deltedId = data.split(":")[1];
            $('.deviceWrap[deviceid=' + deltedId + ']').parent().fadeOut(function () {
                $('.deviceWrap[deviceid=' + deltedId + ']').parent().remove();
            });
            var spliceAt = 0;
            var id = $.grep(devices.currentData, function (items, index) {
                if (items.ID == deltedId)
                    spliceAt = index;
            });
            devices.currentData.splice(spliceAt, 1);
            addImageLinkToDeleteTable();
        } else if (data.indexOf("Error") != -1) {
            alert("An unknown error Occured");
            console.log(data);
        }
    })
}

function addImageLinkToDeleteTable() {
    var defaultImageLink = 'http://cellularworld.co.in/Images/MainPage/DevicesTemplateImages/DefaultDevice.png';
    if (deletedImage.indexOf(defaultImageLink) != -1)
        return false;
    var Author = JSON.parse(readCookie('cellularAdmin'))[0].FirstName + " | " + JSON.parse(readCookie('cellularAdmin'))[0].ID;
    var query = "type=DeletedImages&ImageLink=" + deletedImage + "&DeletedBy=" + Author;
    updateItem(query, function (returnValue) {
        console.log(returnValue);
    });
}

function updateItem(dataString, doAfter) {
    $.ajax({
        type: 'post',
        url: 'PHP/updateHelper.php',
        data: dataString,
        success: function (data) {
            doAfter(data);
        },
        failure: function (data) {
            console.log("Errror in updation");
        }
    });
}

function deleteDBItem(type, id, imageLink, doAfter) {
    $.ajax({
        type: 'post',
        url: 'PHP/updateHelper.php',
        data: {
            DeleteItem: true,
            Type: type,
            ID: id,
            ImageLink: imageLink
        },
        success: function (data) {
            doAfter(data);
        },
        failure: function (data) {
            console.log("Errror in updation");
        }
    });
}

function getDevicesData() {
    showLoading(true);
    // parameters = createDataParameters(searchQueries);
    // parameters['Type'] = "Mobiles";
    $('input').val('');
    $.ajax({
        type: "POST",
        url: "PHP/DevicesSearch.php",
        data: {
            Type: getUrlKeyValue('Type'),
            Brand: getUrlKeyValue('Brand'),
            ModelName: getUrlKeyValue('ModelName'),
            PriceHigh: getUrlKeyValue('PriceHigh'),
            PriceLow: getUrlKeyValue('PriceLow'),
            GadgetType: getUrlKeyValue('GadgetType'),
            All: getUrlKeyValue('All')
        },
        success: function (result) {
            renderBrandInFilter();
            $('title').text('Cellular World | ' + getUrlKeyValue('Type'));
            devices.currentData = JSON.parse(result);
            checkSortByAndSortAccordingly();
            setRangeSelector();
            initSlider();
        }
    });
}

function renderBrandInFilter() {
    getData('loadMainPageContents', 'Items', function (data) {
        var typeSelected = getUrlKeyValue('Type');
        var requiredTypeData = [];
        var listTemplateHTML = "<li class='brandItem' brand='{0}' type='{1}' onclick='brandSelectionFilter($(this))'>{0}</li>"
        if (typeSelected === undefined) {
            //render all
            // requiredTypeData = data;
        } else {
            requiredTypeData = $.grep(data, function (item, index) {
                if (item.Category == typeSelected)
                    return item;
            })
        }
        $('.brandList ul').empty();
        $.each(requiredTypeData, function (index, item) {
            $('.brandList ul').append(listTemplateHTML.format(item.DeviceName, item.Category));
        });
        var selectedBrand = getUrlKeyValue('Brand');
        $('li.brandItem').removeClass('active');
        if (selectedBrand != "" && selectedBrand != undefined) {
            selectedBrand = selectedBrand.toLowerCase();
            $('li.brandItem').each(function (index, item) {
                if ($(item).text().toLowerCase() == selectedBrand) {
                    $(item).addClass('active')
                }
            });
        }
    });
}

function brandSelectionFilter(item) {
    $('li.brandItem').removeClass('active');
    $(item).addClass('active');
    updateQueryStringParam('Brand', $(item).attr('brand'));
    updateQueryStringParam('Type', $(item).attr('type'));
    getDevicesData();
}

function getData(phpFileName, tableName, doAfter) {
    $.getJSON('../PHP/' + phpFileName + '.php?table=' + tableName, function (data) {
        doAfter(data);
    });
}

function setRangeSelector() {
    var priceSortedArray = devices.currentData.sort(dynamicSort("-Price", 1));
    maxPrice = roundOfInteger(Math.floor(priceSortedArray[0]["Price"]), 500, 0);
    minPrice = roundOfInteger(Math.floor(priceSortedArray[priceSortedArray.length - 1]["Price"]), 500, 1);

    $('.rangeSelectorWrap input').attr('max', maxPrice);
    $('input#rangeMax').attr('value', maxPrice);
    $('input#rangeMax')[0].value = maxPrice;
    $('input#rangeMin')[0].value = 0;
    $('.rangeSelectorWrap input').attr('min', minPrice);
    $('.rangeText.rangeMax').empty().append(maxPrice);
    $('.rangeText.rangeMin').empty().append(minPrice);
}

function roundOfInteger(value, roundBy, floor) {
    var calc = value / roundBy;
    if (floor) {
        return Math.floor(calc) * roundBy;
    } else {
        return Math.ceil(calc) * roundBy;
    }
}

function searchAll(item) {
    var searchString = $(item).closest('.searchInput').find('input#searchInputBox').val();
    if (searchString == "") {
        return false;
    } else {
        $('.filterItemWrap[type="Brands"]').fadeOut();
        $('.menuNavLink, .mpbileNavLink').removeClass('active');
        updateQueryStringParam('All', searchString);
        updateQueryStringParam('Type', "");
        getDevicesData();
    }
}

function closeIframe() {
    var iframe = document.getElementById("popUpIframe");
    // iframe.parent.removeChild(iframe);
    $('.popUpWrap').fadeOut(200, function () {
        $(item).closest('.popUpWrap').remove();
    });
    getDevicesData();
}

function initClickFunctions() {
    $('input#searchInputBox').keypress(function (e) { //input search
        if (e.which == 13) {
            $('.mobileNavContainer').removeClass('active');
            $('.overlayShade').removeClass('active');
            $('.menuBarsContainer').removeClass('change');
            searchAll($(this));
            return false; //<---- Add this line
        }
    });

    //TBC Checked
    $('input#TBCShow').change(function () {
        if ($(this).prop('checked')) {
            $('.priceHidden').closest('.devicesSingleItem').show();
        } else {
            $('.priceHidden').closest('.devicesSingleItem').hide();
        }
    });

    //Out of stock Checked
    $('input#unavailable').change(function () {
        if ($(this).prop('checked')) {
            $('.deviceWrap[unavailable="1"]').closest('.devicesSingleItem').hide();
        } else {
            $('.deviceWrap[unavailable="1"]').closest('.devicesSingleItem').show();
        }
    });


    $('.searchWrap .priceLow input, .searchWrap .priceHigh input').keypress(function (e) { //input price range
        if (e.which == 13) {
            var priceHigh = $('.searchWrap .priceHigh input').val();
            var priceLow = $('.searchWrap .priceLow input').val();
            if (priceHigh != "")
                updateQueryStringParam('PriceHigh', priceHigh);
            if (priceLow != "")
                updateQueryStringParam('PriceLow', priceLow);

            $('.mobileNavContainer').removeClass('active');
            $('.overlayShade').removeClass('active');
            $('.menuBarsContainer').removeClass('change');
            getDevicesData();
            return false; //<---- Add this line
        }
    });

    $('.mobileNavContainer .priceLow input, .mobileNavContainer .priceHigh input').keypress(function (e) { //input price range
        if (e.which == 13) {
            var priceHigh = $('.mobileNavContainer .priceHigh input').val();
            var priceLow = $('.mobileNavContainer .priceLow input').val();
            if (priceHigh != "")
                updateQueryStringParam('PriceHigh', priceHigh);
            if (priceLow != "")
                updateQueryStringParam('PriceLow', priceLow);

            $('.mobileNavContainer').removeClass('active');
            $('.overlayShade').removeClass('active');
            $('.menuBarsContainer').removeClass('change');
            getDevicesData();
            return false; //<---- Add this line
        }
    });

    // $('.searchBase select').change(function(){ //select database dropdown
    //     $('.mobileNavContainer').removeClass('active');
    //     $('.overlayShade').removeClass('active');
    //     $('.menuBarsContainer').removeClass('change');
    //     updateQueryStringParam('Type', $(this).find(':selected').val());
    //     getDevicesData();
    // });

    $('.orderBy').click(function () { //input order by status
        //status = 0 noOrder
        // status = 1 low-high Order = blue
        // status = 2 high-low order = red
        switch (parseInt($('.orderBy').attr('status'))) {
            case 0:
                $('.orderBy').attr('status', "1");
                break;
            case 1:
                $('.orderBy').attr('status', "2");
                break;
            case 2:
                $('.orderBy').attr('status', "0");
                break;
            default:
                $('.orderBy').attr('status', "0");
        }
        checkSortByAndSortAccordingly();
    });
}

function checkSortByAndSortAccordingly() {
    if ($('.orderBy').attr('status') == 1) {
        $('.orderBy').removeClass('high');
        $('.orderBy').addClass('low');
        // $('.orderBy').attr('status',"1");
        devices.currentData = devices.currentData.sort(dynamicSort("Price", 1));
        renderDevices(devices.currentData);
        $('.orderBy').text("₹ Low- High");
    } else if ($('.orderBy').attr('status') == 2) {
        $('.orderBy').removeClass('low');
        $('.orderBy').addClass('high');
        // $('.orderBy').attr('status',"2");
        devices.currentData = devices.currentData.sort(dynamicSort("-Price", 1));
        renderDevices(devices.currentData);
        $('.orderBy').text("₹ High - Low");
    } else if ($('.orderBy').attr('status') == 0) {
        $('.orderBy').removeClass('low');
        $('.orderBy').removeClass('high');
        // $('.orderBy').attr('status',"0");
        devices.currentData = devices.currentData.sort(dynamicSort("-Created", 0));
        renderDevices(devices.currentData);
        $('.orderBy').text("Latest");
    }
}

function showLoading(show) {
    if (show) {
        $('.deviceContainerWrap').hide();
        $('.loadingDiv').addClass('spinner').fadeIn(function () {});
    } else {
        $('.loadingDiv').fadeOut(function () {
            $('.loadingDiv').removeClass('spinner');
            $('.deviceContainerWrap').fadeIn();
        });
    }
}

function initSearchLabels() {
    $('.searchedItemsWrap').empty();
    var urlParameters = getUrlVars();
    if (urlParameters === undefined)
        return;
    for (var i = 0; i < urlParameters.length; i++) {
        var html = '<div class="searchItem" title="{0}" query="{1}">{1}<span onclick="deleteSearchItem($(this))" class="deleteSearchItem">x</span></div>';
        if (urlParameters[urlParameters[i]] == "" || urlParameters[i] == "Type")
            console.log('Not labeled')
        else if (urlParameters[i] == "PriceHigh") {
            html = html.format(urlParameters[i].replace(/%20/g, " "), "Less than " + urlParameters[urlParameters[i]].replace(/%20/g, " "));
            $('.searchedItemsWrap').append(html);
        } else if (urlParameters[i] == "PriceLow") {
            html = html.format(urlParameters[i].replace(/%20/g, " "), "Greater than " + urlParameters[urlParameters[i]].replace(/%20/g, " "));
            $('.searchedItemsWrap').append(html);
        } else {
            html = html.format(urlParameters[i].replace(/%20/g, " "), urlParameters[urlParameters[i]].replace(/%20/g, " "));
            $('.searchedItemsWrap').append(html);
        }
    }

    $('.searchItem span.deleteSearchItem').mouseenter(function () {
        $(this).closest('.searchItem').addClass('toClose')
    });
    $('.searchItem span.deleteSearchItem').mouseleave(function () {
        $(this).closest('.searchItem').removeClass('toClose')
    });
}

function deleteSearchItem(item) {
    var queryQ = $(item).closest('.searchItem').attr('title');
    $(item).closest('.searchItem').fadeOut(150, function () {
        $(item).closest('.searchItem').remove();
    });
    updateQueryStringParam(queryQ, "");
    getDevicesData();
}

function renderDevices(data, loadNext) {
    initSearchLabels();
    if (data.length == 0) {
        $('.notFound').fadeIn();
        showLoading(false);
        $('.deviceContainerWrap').empty();
        $('.checkLastFileReached').fadeOut();
        return false;
    } else
        $('.notFound').fadeOut();

    var currentRenderCounts = 0;
    if (!loadNext) {
        $('.checkLastFileReached').fadeIn();
        renderedUntil = 0;
        initialRender = true;
        $('.deviceContainerWrap').empty();
    }
    $.each(data, function (index, item) {
        if (index > renderedUntil || initialRender) {
            if (currentRenderCounts >= maxNoOfItemsInOneLoad)
                return false;
            renderedUntil = index;
            initialRender = false;
            currentRenderCounts += 1;
            var html = '<div class="col-md-3 col-sm-6 col-xs-12 devicesSingleItem{9}" title="{1}" price="{10}" data-aos="fade-up" data-aos-once="true" data-aos-delay="{6}">\
                            <a href="Details?deviceId={4}&Type={5}" deviceId={4} unavailable="{8}" class="deviceWrap{7}">\
                                <div class="deviceImageWrap">\
                                    <div class="deviceImage" style="background:url(\'{3}\');"></div>\
                                </div>\
                                <div class="deviceDetailsWrap">\
                                    <div class="devicePrice">{0}</div>\
                                    <div class="deviceName">{1}</div>\
                                    <div class="deviceDetails">{2}</div>\
                                </div>\
                            </a>\
                        </div>';
            var disableLink = "";
            var priceHiddenClass = "";
            var price, realPrice = "";
            var nameHeading = item.ModelName;

            image = '../Images/MainPage/DevicesTemplateImages/DefaultDevice.png';
            if (item.Image != "")
                image = item.Image;
            // if(getUrlKeyValue('Type') != "Mobiles")
            //     disableLink = " disabled";
            if (item.Price == 0)
                price = item.OfferPrice;
            else
                price = item.Price;
            if (price == 0)
                price = "TBC";
            realPrice = price;
            if (price >= minPrice && price <= maxPrice) {} else {
                priceHiddenClass = " priceHidden";
            }
            if (item.OfferPrice != 0) {
                //offer price found
                price = "<span class='oldPrice'>" + item.Price + "</span><span class='newPrice'>" + item.OfferPrice + "</span>";
            } else {
                price = "<span>" + item.Price + "</span>";
            }
            if (nameHeading.toLowerCase().indexOf(item.Brand.toLowerCase()) == -1)
                nameHeading = item.Brand + " " + nameHeading;
            html = html.format(price, nameHeading, fetchImportantDetails(item), image, item.ID, item.Category, aosAnimationDelayCal, disableLink, item.Unavailable, priceHiddenClass, realPrice);
            if (loadNext)
                $('.deviceContainerWrap').append(html).fadeIn(1000);
            else
                $('.deviceContainerWrap').append(html);
        }
    });
    loadAOS();
    disableLink();
    showLoading(false);
    adminFunctions();
    if ((renderedUntil + 1) == devices.currentData.length)
        $('.checkLastFileReached').fadeOut();
}

function fetchImportantDetails(value) {
    var details = "";
    if (value.Specifications == "")
        return details;

    value.Specifications = value.Specifications.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    value.Specifications = value.Specifications.replace(/[\u0000-\u0019]+/g, "");
    var jsonString = JSON.parse(value.Specifications);
    var arrayDetailsToBeChecked = ["Series", "Inch", "RAM", "ROM", "Hard Disk Capacity", "Processor Name", "Color", "Colour", "Memory"]
    for (key in jsonString) {
        $.each(arrayDetailsToBeChecked, function (index, item) {
            if (checkEquality(key, item)) {
                details = details + createPunctuatedString(details, "", jsonString[key]);
            }
        });
    }
    return details;
}

function createPunctuatedString(mainString, key, value) {
    if (mainString.indexOf(',') == -1) {
        mainString = key + " " + value;
    } else {
        mainString = mainString + ", " + key + " " + value;
    }
    return mainString;
}

function checkEquality(value, substring) {
    return (value.toLowerCase().indexOf(substring.toLowerCase()) != -1)
}

function loadAOS() {
    AOS.init();
}

function updateQueryStringParam(key, value) {
    baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
    urlQueryString = document.location.search;
    if (value == '') {
        newParam = "";
    } else {
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

    if (window.location.href[window.location.href.length - 1] == "&") //remove & if last charcter it is
        window.history.replaceState({}, "", window.location.href.substring(0, window.location.href.length - 1));

    window.history.replaceState({}, "", window.location.href.replace('&&', '&'));
}

function dynamicSort(property, toInt) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        if (toInt)
            var result = (parseInt(a[property]) < parseInt(b[property])) ? -1 : (parseInt(a[property]) > parseInt(b[property])) ? 1 : 0;
        else
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function onScrollBottom() {
    $(window).scroll(function () {
        toScroll = $(document).height() - $(window).height() - 250;
        if ($(this).scrollTop() > toScroll) {
            if ($(this).scrollTop() >= olderScroll) {
                if (!alreadyLazyLoading) {
                    alreadyLazyLoading = true;
                    console.log($(this).scrollTop());
                    renderDevices(devices.currentData, true);
                    setTimeout(function () {
                        alreadyLazyLoading = false
                    }, 500);
                }
            }
            olderScroll = $(this).scrollTop();
        }
    });
}

function loadMoreDevices() {
    renderDevices(devices.currentData, true);
}

function getVals() {
    // Get slider values
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat(slides[0].value);
    var slide2 = parseFloat(slides[1].value);
    if (parseInt($(slides[0]).attr('max')) == slide1 || parseInt($(slides[0]).attr('max')) == slide2)
        alreadyUnderSorting = false;
    if (parseInt($(slides[1]).attr('min')) == slide1 || parseInt($(slides[1]).attr('min')) == slide2)
        alreadyUnderSorting = false;
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
        var tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }

    var displayElement = $('span.rangeValues');
    displayElement.innerHTML = "" + slide1 + " - " + slide2 + "";
    $('.rangeText.rangeMin').empty().append(slide1);
    $('.rangeText.rangeMax').empty().append(slide2);
    if (!alreadyUnderSorting) {
        alreadyUnderSorting = true;
        sortByPrice(slide1, slide2);
        setTimeout(function () {
            alreadyUnderSorting = false
        }, alreadySortingTimeDelay);
    }
    // console.log(slide1);
    // console.log(slide2);
}

function initSlider() {
    $('.range-slider').removeClass('hide');
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
    for (var x = 0; x < sliderSections.length; x++) {
        var sliders = sliderSections[x].getElementsByTagName("input");
        sliders[0].value = 0;
        sliders[1].value = 99999999;
        for (var y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
        }
    }
}

function sortByPrice(price1, price2) {
    if (price1 > price2) {
        maxPrice = price1;
        minPrice = price2;
    } else {
        minPrice = price1;
        maxPrice = price2;
    }
    $('.devicesSingleItem').each(function (index, item) {
        var itemPrice = parseInt($(item).attr("price"));
        if (itemPrice >= minPrice && itemPrice <= maxPrice) {
            $(item).fadeIn(function () {
                $(item).removeClass('priceHidden');
            });
        } else {
            $(item).fadeOut(function () {
                $(item).addClass('priceHidden');
            });
        }
    });
    // if($('.devicesSingleItem:visible').length == 0){
    //     $('.notFound').show();
    // }
    // else{
    //     $('.notFound').hide();
    // }
}

function showHideFilterDiv() {
    $('.filterWrap').toggleClass('filterHidden');
    if ($('.devicesInThisDiv').hasClass('col-md-10')) {
        $('.devicesInThisDiv').removeClass('col-md-10');
        $('.devicesInThisDiv').addClass('col-md-12');
    } else {
        $('.devicesInThisDiv').addClass('col-md-10');
        $('.devicesInThisDiv').removeClass('col-md-12');
    }
}

var mainLinksSwapLink = function () {
    $('a.mobileNavLink, a.menuNavLink').click(function (e) {
        if ($(this).attr('href').indexOf('AdminLogout.PHP') == -1) {
            e.preventDefault();
            $('a.mobileNavLink, a.menuNavLink').removeClass('active');
            var type = $(this).attr('href').split('?Type=')[1];
            $('a.mobileNavLink, a.menuNavLink').each(function (index, item) {
                if ($(item).attr('href').indexOf(type) != -1) {
                    $(item).addClass('active');
                }
            })
            updateQueryStringParam('Type', type);
            updateQueryStringParam('Brand', "");
            updateQueryStringParam('All', "");
            updateQueryStringParam('ModelName', "");
            getDevicesData();
        }
    })
}