$(document).ready(function(){
    initPDFDiv();
});

var initPDFDiv = function(){
    var link = getUrlKeyValue('Link');
    var loadHTML = "<div class='loadingPDF'>Loading</div>";
    // var htmlTemplate = '<object data="{0}" type="application/pdf" width="100%" height="100%">\
    //                         <p>No Support for view Click <a href="{0}">here</a></p>\
    //                     </object>';
    // // var htmlTemplate = "<iframe src='https://docs.google.com/viewerng/viewer?url={0}' width='100%' height='100%'></iframe>"
    // // $('.pdfMainWrap').empty().append(htmlTemplate.format(link));
    $(".pdfMainWrap").pdf( {
        source: link
        // disableKeys: true,
        // showToolbar: false
      } );
}