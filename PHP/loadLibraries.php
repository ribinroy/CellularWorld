<!-- Load all needed libraries here -->
<!-- <link rel="stylesheet" type="text/css" media="screen" href="../CSS/Lib/bootstrap.min.css?v=1.12" /> -->
<!-- <script src="main.js?v=1.12"></script> -->
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Mobile retailers situated in Alappuzha Cherthala, top for redmi in Kerala">
<meta name="keywords" content="Mobiles, Kerala, Alappuzha, Cellular, World, Cherthala, Redmi, Xiaomi, Apple, Samsung, LG">
<meta name="theme-color" content="#333">
</head>
<link rel="icon" href="../Images/SiteMain/favicon.png" type="image/png" sizes="20x20">
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" media="screen" href="../CSS/header.css?v=1.12" />
<link rel="stylesheet" type="text/css" media="screen" href="../CSS/footer.css?v=1.12" />
<link rel="stylesheet" type="text/css" media="screen" href="../CSS/Lib/aos.css?v=1.12" />
<script src="../JS/Lib/aos.js?v=1.12"></script>
<script src="../JS/Lib/jquery.min.js?v=1.12"></script>
<script src="../JS/header.js?v=1.12"></script>
<script src="../JS/footer.js?v=1.12"></script>
<script src="../JS/AdminFunctions.js?v=1.12"></script>

<script src="../JS/clientDetails.js?v=1.12"></script> <!-- To store in tracker -->

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css?v=1.12">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js?v=1.12"></script>

<script>
    function getUrlKeyValue(param){
         var parameters;
        try{
            parameters = window.location.href.split('?')[1];
            try{
                parameters = parameters.split(param)[1].split('&')[0];
                try{
                    parameters = parameters.split('=')[1];
                }
                catch(err){
                    console.log(err);
                    return;
                }
            }
            catch(err){
                console.log(err);
                return;
            }
        }
        finally{
            // console.log('Finally executed!');
        }
        parameters = parameters.split('#')[0].replace(/%20/g, " ");
        return parameters;
    }
    function getUrlVars(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            if(hash != ""){
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
        }
        if(vars.length != 0)
            return vars;
    }

    //html.format function below
    String.prototype.format = String.prototype.f = function() {
            var s = this,
                i = arguments.length;

            while (i--) {
                s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
            }
            return s;
        };

    function disableLink(){
        $('a.disabled').click(function(e){
            e.preventDefault();
        });
    }

    function createCookie(name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
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

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    function showPopUp(title,link){
        var html = '<div class="popUpWrap">\
                        <div class="popUpTitle">{0}</div>\
                        <div class="popUpClose" onClick="closePopUp($(this))">X</div>\
                        <iframe class="popUpFrame" id="popUpIframe" src="{1}"></iframe>\
                    </div>';
        html = html.format(title,link)
        $('body').append(html);
        $('.popUpWrap').addClass('zoomIn');
    }

    function closePopUp(item){
        $(item).closest('.popUpWrap').fadeOut(200,function(){
            $(item).closest('.popUpWrap').remove();
        });
    }
</script>
