$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    data['link'] = window.location.href.replace("http://cellularworld.co.in", "");
    data['link'] = data['link'].replace('&', "/*"); //& doesnt support - error on writing to DB
    var value=JSON.stringify(data);
    var user = false;
//   data.ip;
//   data.region_name;//kerala
//   data.country_name;
//   data.city;
// value = "aa";
    if(readCookie("cellularAdmin")){ //add admin data to tracker too
        if(JSON.parse(readCookie('cellularAdmin'))[0].ID != 2){
            var user = JSON.parse(readCookie('cellularAdmin'))[0].Username + " | " +JSON.parse(readCookie('cellularAdmin'))[0].ID;
            //   http://cellularworld.co.in/PHP/write.php?ipAddress=124.145.122.1&area=area&country=country&state=state
        }
        else{
            //ribins
            console.log("Bro! Avoided!!");
            user = "RR";
            return false;
        }
    }
    else{ //add non-admin details to tracker
        user = "NonAdmin";
        //   http://cellularworld.co.in/PHP/write.php?ipAddress=124.145.122.1&area=area&country=country&state=state
    }
    if(user != "RR"){
        $.ajax({
            data: 'data=' + value + '&user='+ user,
            url: 'http://cellularworld.co.in/PHP/TrackerUpdater.php',
            method: 'POST', // or GET
            success: function(msg) {
                // alert(msg);
                console.log("UserPicked");
            }
        });
    }
});

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}