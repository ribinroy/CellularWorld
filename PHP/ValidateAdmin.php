<script>
if(!readCookie('cellularAdmin')){
    window.location.href = "http://cellularworld.co.in?Unauthorized=1";
}
else{
    if(window.location.href.indexOf('Tracker') != -1){
        if(JSON.parse(readCookie('cellularAdmin'))[0].ID != 2 && JSON.parse(readCookie('cellularAdmin'))[0].ID != 3)
            window.location.href = "http://cellularworld.co.in?Unauthorized=1";
    }
}

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
</script>