var toAdminClicks = 0;
$(document).ready(function(){
    html = '<div class="footerSection">\
                <div class="container">\
                    <div class="col-md-4 col-sm-5 col-xs-12 paddingLeft_0">\
                        <div class="addressWrap adminTakeOver">\
                            Opposite KSRTC Bus Stand Cherthala\
                        </div>\
                        <div class="phoneNo">\
                        <a href="tel:+919142102000">+91 9142 10 2000</a>\
                        <a href="tel:+919248111000">+91 9249 111 000</a>\
                        </div>\
                    </div>\
                    <div class="col-md-4 col-sm-5 col-xs-12">\
                        <div class="socialLinks">\
                            <a href="https://www.facebook.com/cellularworldcherthala?_rdr=p" target="_blank" class="overlayIcon facebookLink"></a>\
                            <a class="emailLink overlayIcon" href="mailto:info@cellularworld.co.in"></a>\
                            <a class="whatsappNo overlayIcon" href="tel:+91 9142102000"></a><span class="whatsappNum hide"></span>\
                        </div>\
                    </div>\
                    <div class="col-md-4 col-sm-2 col-xs-12 paddingRight_0">\
                        <div class="ribinRoys">Powered by <a href="http://ribinroys.yolasite.com" target="_blank">Ribin Roys</a></div>\
                    </div>\
                </div>\
            </div>'
    $('body').append(html);
    toAdminPage();
});

function toAdminPage(){
    window.setInterval("resetClicks()", 2000);
    $('.adminTakeOver').click(function(){
        toAdminClicks++;
        if(toAdminClicks > 5){
            alert('You are entering Admin Cave');
            window.location.href = "http://cellularworld.co.in/PHP/AdminEntry";
        }
        else{
            console.log(( 5 - toAdminClicks) + " clicks away from admin page");
        }
    });
}
  
function resetClicks(){
    toAdminClicks = 0;
  }