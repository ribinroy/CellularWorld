
function getData(tableName, sqlQuery){
    if(sqlQuery==undefined)
        sqlQuery = "";
    $.getJSON('../PHP/Test.php?db='+tableName+'&sql='+sqlQuery, function(data) {
        return data;
      });
}