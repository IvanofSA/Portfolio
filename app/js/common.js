var myModule = (function () {

  //Инициализирует наш модуль
  var init = function () {
	    _setUpListners();
	    // то, что должно произойти сразу
  	  };

  //Прослушивает события
  var _setUpListners = function () {
  		$('#feedback-form').on('submit', _addProject); //добавление проекта
        $('#add').on('click', _showModal);
      };

  //Работате с модальным окном
  var _showModal = function (ev) {
		console.log('Вызов модального окна');
		ev.preventDefault();
		var divPopup = $('.popup'),
			form = divPopup.find('.form');
		divPopup.bPopup({
			speed: 650,
			transition: 'slideDown',
			onClose: function () { 
			  form.find('.server-mes').text('').hide();
			  this.find('.form').trigger("reset");
			}
		});
  	  };

  //Добовляет проект
  var _addProject = function (ev) {
  		console.log('добавление проекта');
  		ev.preventDefault();

  		//обьявляем переменные
  		var form = $(this),
  			url = 'add_project.php',
  			defObj = _ajaxform(form, url);
  			//проверяем был ли запрос 
  		if(defObj) {
  			defObj.done(function(ans) {

  			var successBox = form.find('.success-mes'),
  				errorBox = form.find('.error-mes');

  			if(ans.status === "OK") {
  				errorBox.hide();
  				successBox.text(ans.error).show();
  			}else{
  				successBox.hide();
  				errorBox.text(ans.error).show();
  			}
  		  });
  		}
  	};

  //Универсальная функция
  //1. собрать данные из формы 
  //2. проверить форму 
  //3. делает запрос на сервер и возвращает ответ с сервера
  var _ajaxform = function (form, url) {

   		
  		if (!validation.validateForm(form)) return false;

  		data = form.serialize();

  		var result = $.ajax({
  			url: url,
  			type: 'POST',
  			dataType: 'json',
  			data: data,
  		}).fail( function(ans) {
  			console.log('Проблемы PHP');
  			form.find('.error-mes').text('На сервере произошла ошибка').show();
  		});

  		return result;
  };

  // Возвращаем объект (публичные)
  return {
	  init: init
  };

})();

myModule.init();