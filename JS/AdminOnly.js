$(document).ready(function(){
    onload=function(){
        var e=document.getElementById("refreshed");
        if(e.value=="no")e.value="yes";
        else{e.value="no";location.reload();}
    }
    loadAOS();
    if(checkCookieEnabled()){
        adminFunctions();
    }
});


function loadAOS(){
    AOS.init();      
}

function adminFunctions(){
    try{
        if(readCookie("cellularAdmin")){
            $('.adminInputWrap').hide().empty();
            $('.changePassword').removeClass('hide');
        }
        else{
            $('.changePassword').empty();
        }
    }
    catch(err){}
}

function checkCookieEnabled(){
    if(!navigator.cookieEnabled){
        alert('Please enable cookie for smooth functioning of admin functionalities.')
        return false;
    }
    else{
        return true;
    }
}