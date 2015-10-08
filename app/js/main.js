"use strict"

var MYAPP = function(){
   var callPopup = $('#add'),
       popup = $('.popup');

   callPopup.on('click', function(e){
       e.preventDefault();
       popup.bPopup();

   })
};
MYAPP();

      $('.window-close').click(function() {
        $(this).hide();
        $('.popup').hide();
        $('b-modal, .__b-popup1__').hide(); 
    });



                
function getName (str){
    if (str.lastIndexOf('\\')){
        var i = str.lastIndexOf('\\')+1;
    }
    else{
        var i = str.lastIndexOf('/')+1;
    }						
    var filename = str.slice(i);			
    var uploaded = document.getElementById("fileformlabel");
    uploaded.innerHTML = filename;
}


