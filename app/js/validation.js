var validation = (function () {

  var init = function () {
	    _setUpListners();
	    // то, что должно произойти сразу
  	  };

  var _setUpListners = function () {
  	//чистим поля от ошибок
  	 $('form').on('keydown', '.has-error', _removeError);
  	 $('form').on('reset', _clearForm);
  	 $('.form__input-file').on('change', _removeError);
	 $('#fileupload').on('change', _changefileUpload);
      };

var _changefileUpload = function (){
		var input = $(this), // инпут type="file"
			value = input.val(),
			pureVal = value.replace(/c:\\fakepath\\/gmi, "");
				//name = input[0].files[0].name; // имя загруженного файла
		$('#filename')
			.val(pureVal) // 
			.trigger('hideTooltip')
			.removeClass('has-error'); 

	};

	// var _changefileUpload = function() {
	// 	var $this = $(this),
	// 		value = $this.val(),
	// 		pureVal = value.replace(/c:\\fakepath\\/gmi, "");

	// 	var setNewPath = (function() {
	// 		$('.form__input').val(pureVal);
	// 	})();
	// };

  var _removeError = function () {
  	
  	$(this).removeClass('has-error');
  	$(this).parent().find('.form__input').removeClass('has-error');

  };

  var _clearForm = function (form) { 
  	var form = $(this);
  	form.find('input, textarea').trigger('hideTooltip');
  	form.find('.has-error').removeClass('has-error');

  };


//создает тултипы
  var _createQtip = function (element, position) {

  	// позиция
	if(position === 'right'){
		position = {
			my: 'left center', 
			at: 'right center'
		};
	}else{
		position = {
			my: 'right center', 
			at: 'left center',
			adjust: {
				method: 'shift none'
			}
		}
	}

	// создание тултипа
	element.qtip({
		content: {
			text: function () {
				return $(this).attr('qtip-content');
			}
		},
		show: {
			event: 'show'
		},
		hide: {
			event: 'keydown hideTooltip'

		},
		position : position,
		style: {
			classes: 'qtip-mystyle qtip-rounded',
			tip: {
				height: 10,
				width: 16
			}
		}
	}).trigger('show');

  };

 var validateForm = function (form) {

 	console.log('Привет я в модуле валидации ');

 	var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
 	    valid = true;
 	    //пройдемся по всем эелемантам формы
 	 $.each(elements, function (index, val) {
 	 	var element = $(val),
 	 	    val = element.val(),
 	 	    pos = element.attr('qtip-position');

 	 	if (val.length === 0) {
 	 		//красный фон
 	 	  element.addClass('has-error');
 	 	 _createQtip(element, pos);
 	 	 valid = false;
 	 	}

 	 });

 	 return valid;
 };

  return {
	  init: init,
	  validateForm: validateForm

  };

})();

validation.init();