(function() { // SIAF WRAPPER
// FUNCTION STACK
var GetStarted = function() {
	gsForms.generateStyledSelectbox('styleable-select');
	gsForms.styledSelectbox();
};

var gsForms = {
	/*----- Checkbox toggle -----*/
	// target: jQuery selector for checkbox el
	// activeClass: class to toggle/check for
	// radio: Set to `true` for radio-button behaviour
	// callbackFunc: callback function after click event

	checkbox: function(target, activeClass, radio, callbackFunc) {
		var $targets = $(target);
		$targets.each(function(index) {
			$(this).on('click', function() {
				if (radio === true) { // radio-button behaviour
					if ($(this).hasClass(activeClass) === true) {
						$targets.removeClass(activeClass);
					} else {
						$targets.removeClass(activeClass);
						$(this).addClass(activeClass);
					}
				} else {	// checkbox behaviour
					$(this).toggleClass(activeClass);
				}

				if (typeof callbackFunc === 'function') {
					return callbackFunc();
				}
			});
		});
	},

	/*
	*********************
	* These two methods need some serious refactoring!
	*********************
	*/
	generateStyledSelectbox: function(cssClass) {
		// Rought, working draft
		var $source = $('.custom-selectbox'),
			selected = $source.find("option[selected]"),
			options = $('option', $source);

		$source.after('<div id="result" class="' + cssClass + '"></div>');

		$('#result').append('<dl id="activeValue" class="dropdown"></dl>');
		$('#activeValue').append('<dt><a href="#">' + selected.text() + '<span class="value">' + selected.val() + '</span></a></dt>');
		$('#activeValue').append('<dd><ul></ul></dd>');

		options.each(function() {
			$('#activeValue dd ul').append('<li class="select-menu-item"><a href="#">' + $(this).text() + '<span class="value">' + $(this).val() + '</span></a></li>');
		});

		$('.dropdown dd ul li a').click(function(event) {
			event.preventDefault();
			var text = $(this).html(),
				$source = $('.custom-selectbox');

			$('.dropdown dt a').html(text);
			$('.dropdown dd ul').hide();

			$source.val($(this).find('span.value').html());

		});

		$('.dropdown dt a').click(function(event) {
			event.preventDefault();
		});
	},

	styledSelectbox: function() {
		$(".dropdown dt a").click(function() {
   			$(".dropdown dd ul").toggle();
		});

		$(".dropdown dd ul li a").click(function() {
    		var text = $(this).html();
    		$(".dropdown dt a span").html(text);
    		$(".dropdown dd ul").hide();
		});

		$(document).bind('click', function(e) {
    		var $clicked = $(e.target);
    		if (! $clicked.parents().hasClass("dropdown")) {
        		$(".dropdown dd ul").hide();
        	}
		});
	}
}

/*
*********************
* DOC READY FUNCTION STACK CALL
*********************
*/
$(document).ready(function() {
/*----- CUSTOM SCRIPT CALLS -----*/
	GetStarted();

/*----- JQUERY/PLUGIN CALLS -----*/

});
})(); // END SIAF WRAPPER