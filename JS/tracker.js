
var allDeviceData = [];
var clickedDevices = {'category':[],'modelName':[], 'brand': [], 'month':[], 'area':[], 'state':[], 'country':[]};
$(document).ready(function(){
    initPerissions();
    showLoading(1);
    getAllCategoryDatas(function(data){
        allDeviceData = data;
        getData();
    });
})

var initPerissions = function(){
    if(JSON.parse(readCookie('cellularAdmin'))[0].ID != 2){
        //Not Ribin
        $('.onlyRibin').remove();

    }
}

function getData(){
    $.ajax({
        type:"POST",
        url:"fetchHelper.php",
        data :{
            database : "cellular_Test",
            table : "Tracker"
        },
        success:function(result){
            result = JSON.parse(result);
            renderData(result);
            var array = ["20px", "80px", "40px", "40px", "60px", "60px", "25%", "25px", "30px", "30px", "30px"];
            widthAdjuster('table#trackerTable thead tr th', array);
            plotCharts();
        }
    });
}

function timeConversion(date){
    var stillUtc = moment.utc(date).toDate();
    var fullDate = moment(stillUtc).local().format('HH:mm:ss DD/MMM/YYYY');
    var smallDate = moment(stillUtc).local().format('HH:mm:ss DD');
    clickedDevicesIncre(null, null, null, moment(stillUtc).local().format('MMMM'));
    return "<span title='" + fullDate + "'>"+smallDate+"</div>";
}

function getAllCategoryDatas(doAfter){
    $.getJSON('../PHP/loadMainPageContents.php?table=SmartTV&table1=Mobiles&table2=Laptops$table3=Accessories', function(data) {
        doAfter(data);
      });
}


function renderData(data){
    //render data
    $('#trackerTable').prepend("<tbody></tbody>");
    $.each(data,function(index, item){
        var extraColumnTemplate = "";
        var trTemplate = "<tr>{0}</tr>";
        columnTemplate = "";
        for(key in item){
            var columnHtml = "<td title='{1}'>{0}</td>";
            var value = item[key];
            if(key == "Date"){
                value = timeConversion(item[key]);
            }
            else if(key == "State"){
                clickedDevicesIncre(null, null, null, null, null, item[key], null);
            }
            else if(key == "Area"){
                clickedDevicesIncre(null, null, null, null, item[key], null, null);
            }
            else if(key == "Country"){
                clickedDevicesIncre(null, null, null, null, null, null, item[key]);
            }
            else if(key == "Link"){
                if(item[key].indexOf('Devices?') != -1){
                    var categoryTemp = item[key].split('=')[1] === undefined? "":item[key].split('=')[1].split('/*')[0];
                    extraColumnTemplate = extraColumnTemplate + "<td id='category' title='Category'>"+categoryTemp+"</td>";
                    extraColumnTemplate = extraColumnTemplate + "<td id='DeviceName' title='DeviceName'></td>";
                    extraColumnTemplate = extraColumnTemplate + "<td id='Brand' title='Brand'></td>";
                    clickedDevicesIncre(categoryTemp);
                }
                else if(item[key].indexOf('Details?') != -1){
                    var deviceType = item[key].split('/*Type=')[1].split('/*')[0];
                    var deviceID = item[key].split('deviceId=')[1].split('/*')[0];
                    var theItem = [];
                    $.each(allDeviceData, function(index, item){
                        if(item.Category == deviceType){
                            if(item.ID == deviceID){
                                theItem = item;
                            }
                        }
                    });
                    clickedDevicesIncre(theItem['Category'], theItem['ModelName'], theItem['Brand']);
                    extraColumnTemplate = extraColumnTemplate + "<td id='category' title='Category'>"+theItem['Category']+"</td>";
                    extraColumnTemplate = extraColumnTemplate + "<td id='DeviceName' title='DeviceName'>"+theItem['ModelName']+"</td>";
                    extraColumnTemplate = extraColumnTemplate + "<td id='Brand' title='Brand'>"+theItem['Brand']+"</td>";
                }
                else{
                    extraColumnTemplate = extraColumnTemplate + "<td id='category' title='Category'></td>";
                    extraColumnTemplate = extraColumnTemplate + "<td id='DeviceName' title='DeviceName'></td>";
                    extraColumnTemplate = extraColumnTemplate + "<td id='Brand' title='Brand'></td>";
                }
            }
            columnTemplate = columnTemplate + columnHtml.format(value, key);
        }
        columnTemplate = columnTemplate + extraColumnTemplate;
        trTemplate = trTemplate.format(columnTemplate);
        $('#trackerTable tbody').prepend(trTemplate);
    });

    
    //render header
    $('#trackerTable').prepend("<thead></thead>");
    var html = "<tr>{0}</tr>";
    var columnTemplate = "";
    for(key in data[0]){
        var columnHtml = "<th>{0}</th>";
        columnTemplate = columnTemplate + columnHtml.format(key);
    }
    columnTemplate = columnTemplate + "<td id='category'>Category</td>";
    columnTemplate = columnTemplate + "<td id='DeviceName'>Device Name</td>";
    columnTemplate = columnTemplate + "<td id='Brand'>Brand</td>";
    html = html.format(columnTemplate);
    $('#trackerTable thead').prepend(html);

    $('#trackerTable').DataTable( {
        "order": [[ 0, "desc" ]]
    });

    showLoading(0);
}

var callBackDataTable = function(d){
    alert('lol');
}

var widthAdjuster = function(wrapDiv, widthArray){
    $(wrapDiv).each(function(index, item){
        $(item).css('width', widthArray[index]);
    });
}

var clickedDevicesIncre = function(category, modelName, brand, month, area, state, country){
    // clickedDevices
    var readWrite = function(type, value){
        var foundAtIndex = -1;
        $.each(clickedDevices[type], function(index, item){
            if(item['title'] == value){
                foundAtIndex = index;
                return;
            }
        });
        if(foundAtIndex == -1){ //not found
            clickedDevices[type].push({title:value, count:1});
        }
        else {
            clickedDevices[type][foundAtIndex].count = (parseInt(clickedDevices[type][foundAtIndex].count) + 1)
        }
    }
    if(category != undefined && category != null){
        readWrite('category', category);
    }
    if(brand != undefined && brand != null){
        readWrite('brand', brand);
    }
    if(modelName != undefined && modelName != null){
        readWrite('modelName', modelName);
    }
    if(month != undefined && month != null){
        readWrite('month', month);
    }
    if(area != undefined && area != null){
        readWrite('area', area);
    }
    if(state != undefined && state != null){
        readWrite('state', state);
    }
    if(country != undefined && country != null){
        readWrite('country', country);
    }
}

function showLoading(show){
    if(show){
        $('.tracker, .chartsWrap').hide();
        $('.loadingDiv').addClass('spinner').fadeIn(function(){
        });
    }
    else{
        $('.loadingDiv').fadeOut(function(){
            $('.loadingDiv').removeClass('spinner');
            $('.tracker, .chartsWrap').fadeIn();
        });
    }
}

var plotChartsHelper = (function(){
    function chartRender(id, labels, dataSet, title, type){
        var ctx = document.getElementById(id).getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: type,

            // The data for our dataset
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    backgroundColor: [
                        '#f44242','#f49541','#f4c441','#f4eb41','#c4f441','#49f441',
                        '#8ef441','#41f4bb','#41eef4','#41a0f4','#415ef4','#5b41f4','#c141f4',
                        '#f441e2','#f4418b','#f4415b','#b28bed','#96ffbe'                        
                    ],
                    borderColor: '#fff',
                    data: dataSet,
                }]
            },

            // Configuration options go here
            options: {}
        });
    }
    return {
        init : function(id, labels, dataSet, title, type){
            chartRender(id, labels, dataSet, title, type)
        }
    }
})();

var plotCharts = function(){
    var plotForCategory = function(category, id, type){
        var labels= [];
        var dataSet = [];
        var restTotal = 0;
        $.each(clickedDevices[category], function(index, item){
            if(item['title'] == "")
                return
            if(index >= 10){
                restTotal = restTotal + parseInt(item['count'])
            }
            else{
                labels.push(item['title']);
                dataSet.push(item['count']);
            }
        });
        if(restTotal != 0){
            labels.push("Others");
            dataSet.push(restTotal);
        }
        plotChartsHelper.init(id, labels, dataSet, (category[0].toUpperCase() + category.slice(1)),type)
    }
    plotForCategory('month', 'chartMonth', 'pie');
    plotForCategory('modelName', 'chartDevices', 'pie');
    plotForCategory('category', 'chartCategory', 'pie');
    plotForCategory('brand', 'chartBrand', 'pie');
    plotForCategory('area', 'chartArea', 'pie');
    plotForCategory('state', 'chartState', 'pie');
    plotForCategory('country', 'chartCountry', 'pie');
}