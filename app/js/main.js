"use strict"

var MYAPP = function(){
   var callPopup = $('#add'),
       popup = $('#popup');

   callPopup.on('click', function(e){
       e.preventDefault();
       popup.bPopup();
   })
};
MYAPP();


// $('popup').bPopup({
//             speed: 650,
//             transition: 'slideIn',
//       transitionClose: 'slideBack'
//          } });
                
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


