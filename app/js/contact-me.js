var contactMe = (function () {

  var init = function () {
	    _setUpListners();
	    // то, что должно произойти сразу
  	  };
  var _setUpListners = function () {
	$('#contact-me').on('submit', _submitForm);
      };

  var _submitForm = function (ev) {
  	console.log('отправка формы');
  	ev.preventDefault();

  	var form = $(this),
  		url = 'contact.php',
  		defObj = _ajaxForm(form, url);

  };

  var _ajaxForm = function (form, url) { 
  	 console.log('ajax запрос');
  	if (!validation.validateForm(form)) return false;


  };

  return {
	  init: init

  };

})();

contactMe.init();