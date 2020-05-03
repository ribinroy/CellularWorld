$(document).ready(function(){
    $('body').append('<div class="header">\
                            <div class="container">\
                                <a class="logoCellularWorld" href="http://cellularworld.co.in"></a>\
                                <div class="menuNav hidden-xs hidden-sm">\
                                    <a class="menuNavLink" href="Devices?Type=Accessories">Accessories</a>\
                                    <a class="menuNavLink" href="Devices?Type=Laptops">Laptops</a>\
                                    <a class="menuNavLink" href="Devices?Type=SmartTV">Smart TV</a>\
                                    <a class="menuNavLink" href="Devices?Type=Mobiles">Mobiles</a>\
                                </div>\
                                <div class="mobileMenuBar hidden-md hidden-lg">\
                                    <div class="menuBarsContainer" onclick="responsiveBar(this)">\
                                        <div class="bar1"></div>\
                                        <div class="bar2"></div>\
                                        <div class="bar3"></div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="openOnWrap">\
                                <div class="openOn hidden-sm hidden-xs">\
                                   \
                                </div>\
                            </div>\
                        </div>');
    $('body').append('<div class="overlayShade hidden-lg hidden-md">\
                        </div><div class="hidden-md hidden-lg mobileNavContainer">\
                        <div class="mobileNavContents">\
                            <a class="mobileNavLink" href="Devices?Type=Mobiles">Mobiles</a>\
                            <a class="mobileNavLink" href="Devices?Type=SmartTV">Smart TV</a>\
                            <a class="mobileNavLink" href="Devices?Type=Laptops">Laptops</a>\
                            <a class="mobileNavLink" href="Devices?Type=Accessories">Accessories</a>\
                        </div>\
                    </div>');
    headerSet();
    scrollSmooth();
    selectInMenuBar();
    // initColorChangers();
});

function initColorChangers(){
    $('.header, .footerSection').addClass('colorChangeAdderSlow');
}
function headerSet(){
    $(window).scroll(function() {
        if($(window).scrollTop() < 150) {
            $('.header').removeClass('blackOut');
        }
        else{
            $('.header').addClass('blackOut');
        }
     });
}

function selectInMenuBar(){
    var type = getUrlKeyValue("Type");
    $.each($('a.menuNavLink'),function(index,item){
        if($(item).attr("href").indexOf(type) != -1)
            $(item).addClass("active");
    });
    $.each($('a.mobileNavLink'),function(index,item){
        if($(item).attr("href").indexOf(type) != -1)
            $(item).addClass("active");
    });
}

function responsiveBar(x) {
    x.classList.toggle("change");
    $('.mobileNavContainer').toggleClass("active");
    $('.overlayShade').toggleClass("active");
}

function scrollSmooth(){
    $(function() {
        $('a[href*="#"]:not([href="#"]):not(.carousel-control)').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            if(this.hash == "#topSlider")
                return false;
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('.mobileNavContainer').removeClass('active');
                $('.overlayShade').removeClass('active');
                $('.menuBarsContainer').removeClass('change');
              $('html, body').animate({
                scrollTop: target.offset().top - 55
              }, 500);
              return false;
            }
          }
        });
      });
}
