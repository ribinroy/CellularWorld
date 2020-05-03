var CWAccess = CWAccess || {};

CWAccess.isAdmin = false;
CWAccess.isDev = false;
CWAccess.isEditAccessed = false;
/*
Permission Levels: admin => admin level => adminOnly is visible
Permission Levels: edit => edit option available => editAccess is visible
Permission Levels: dev => developer level level => devOnly is visible
*/
$(document).ready(function(){
    // alert('Welcome Admin');
    if(readCookie("cellularAdmin")){
        var parsedCookieValue = JSON.parse(readCookie("cellularAdmin"));
        var userName = parsedCookieValue[0]["FirstName"] + " " + parsedCookieValue[0]["LastName"];
        $('.menuNav').prepend('<a title="'+userName+'" class="menuNavLink" href="http://cellularworld.co.in/PHP/AdminLogout.PHP">Logout</a>');
        $('.mobileNavContents').append('<a title="'+userName+'" class="mobileNavLink" href="http://cellularworld.co.in/PHP/AdminLogout.PHP">Logout</a>');
        //Admin div visible
        if(parsedCookieValue[0]['Access'].indexOf('admin') != -1){
            CWAccess.isAdmin = true;
            console.log('Admin Access Granted');
            $('html').append('<style>.adminOnly{display: block !important;}</style>');
        }

        //Developer div visible
        if(parsedCookieValue[0]['Access'].indexOf('dev') != -1){
            $('html').append('<style>.devOnly{display: block !important;}</style>');
            CWAccess.isDev = true;
        }
        
        //editAccess
        if(parsedCookieValue[0]['Access'].indexOf('edit') != -1){
            $('html').append('<style>.editAccess{display: block !important;}</style>');
            CWAccess.isEditAccessed = true;
        }
            
    }
    else{
        console.log("NonAdmin");
    }
    
    // try{
    //     if(adminAccess){
    //         if(readCookie("cellularAdmin")){
    //             console.log("Cookie Already in");
    //         }
    //         else{
    //             createCookie("cellularAdmin", JSON.stringify(loggedInAdminData), 1);
    //         }
    //     }
    // }
    // catch(err){}
});