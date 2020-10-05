$(document).ready(function(){
	/* ====== LOADER ====== */
	var width = 100,
		timing = window.performance.timing,
		est = -(timing.loadEventEnd - timing.navigationStart),
		time = parseInt((est/1000)%60)*100;

	// Progressbar animation
	$('.rt-loader__progress').animate({
		width: width + '%'
	}, time);


	// Percentage
	var	start = 0,
		end = 100,
		durataion = time;
		animateValue(start, end, durataion);
		
	function animateValue(start, end, duration) {
		var range = end - start, 
			current = start,
			increment = (end > start) ? 1 : -1,
			stepTime = Math.abs(Math.floor(duration / range)),
			obj = $('.rt-loader__percent');

		var timer = setInterval(function() {
			current += increment;
				$(obj).text(current);
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
	}

	// Fading on finised and remove
	setTimeout(function(){
		$('.rt-loader').fadeOut(300, function(){
			$(this).remove()
		});
		$('body').removeClass('loading')
	}, time);			
	
	
	
	/* ====== CUSTOM SELECT ====== */
	// Iterate over each select element
	$('select').each(function() {
 		var numberOfOptions = $(this).children('option').length;

		// Insert a styled div to sit over the top of the hidden select element
		$(this).after('<div class="rt-select__selected"></div>');

		// Cache the styled div
		var styledSelect = $(this).next('div.rt-select__selected');

		// Show the first select option in the styled div
		styledSelect.text($(this).children('option').eq(0).text());

		// Insert an unordered list after the styled div and also cache the list
		var list = $('<div />', {
			class: 'rt-select__list rt-select__list--hidden'
		}).insertAfter(styledSelect);

		// Insert a list item into the unordered list for each select option
		for(var i = 0; i < numberOfOptions; i++) {
			$('<div />', {
				text: $(this).children('option').eq(i).text(),
				class: 'rt-select__item'
			}).appendTo(list);
		}

		// Cache the list items
		var listItems = list.children('div');

		// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
		styledSelect.on('click', function(e) {
			e.stopPropagation();
			$('.rt-select__selected').not($(this)).each(function () {
				$(this).removeClass('rt-select__selected--open').next('.rt-select__list').addClass('rt-select__list--hidden');
			});

			if($(this).hasClass('rt-select__selected--open')){
				$(this).removeClass('rt-select__selected--open')
				$(this).next('.rt-select__list').addClass('rt-select__list--hidden');
			} else {
				$(this).addClass('rt-select__selected--open')
				$(this).next('.rt-select__list').removeClass('rt-select__list--hidden');
			}
		});

		// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
		// Updates the select element to have the value of the equivalent option
		listItems.on('click', function (e) {
			e.stopPropagation();
			$(this).parent().find('.rt-select__item').removeClass('rt-select__item--current')
			$(this).addClass('rt-select__item--current')
			styledSelect.text($(this).text()).removeClass('rt-select__selected--open');
			$(this).find('option').eq($(this).index()).prop('selected', true)
			$(this).trigger('change')
			list.addClass('rt-select__list--hidden');;
		});

		// Hides the unordered list when clicking outside of it
		$(document).click(function () {
			styledSelect.removeClass('rt-select__selected--open');
			list.addClass('rt-select__list--hidden');
		});


	});
		/* ====== SLIDER ====== */
	var speed = 500;
	var delay = 3000;
	
	// Show first slide
	$('.rt-slider__slide').hide().eq(0).show();
	var current = 0;
	var time;
	var total = $('.rt-slider__slide').length;
	var aniamate = function(to){
		clearTimeout(time);
		$('.rt-slider__slide').eq(current).fadeOut(speed);
		if(to == 'next'){
			if(current == (total - 1)){
				current = 0;
			} else{ 
				current++;
			}
		}
		else if(to == 'prev'){
			if(current == 0){
				current = total - 1;
			} else{
				current -= 1;
			}
		} else {
			current = to;
		}

		$('.rt-slider__slide').eq(current).fadeIn(speed, rotator);
		$('.rt-slider__navitem--active').removeClass('rt-slider__navitem--active');
		$('.rt-slider__navitem').eq(current).addClass('rt-slider__navitem--active');
	}

	$('.rt-slider__navitem').on('click', function(e){
		e.preventDefault()
		var to = $(this).index();
		aniamate(to);
	});
	var rotator = function(){
		time = setTimeout(function(){
			aniamate('next')
		}, delay)
	}
	rotator();		

	
	
	/* ====== TABS ====== */
	$('.rt-tabs__link').on('click', function(e){
		e.preventDefault();
		var target = $(this).attr('href')
		$('.rt-tabs__link').parent().removeClass('rt-tabs__item--active');
		$(this).parent().addClass('rt-tabs__item--active')

		$('.rt-tabs__tab').removeClass('rt-tabs__tab--active');
		$(target).addClass('rt-tabs__tab--active')
	})

	
	
	/* ====== TOGLE HEADER MENU ====== */
	$('.rt-header__bar').on('click', function(){
		$(this).toggleClass('rt-header__bar--close')
		$('.rt-header__menu').slideToggle(100)
	})



	/* ====== TOGLE FOOTER MENU ====== */
	$('.rt-footnav__title').on('click', function(){
		if($(window).outerWidth() < 768){
			$('.rt-footnav__title').not($(this)).each(function(){
				$(this).removeClass('rt-footnav__title--open');
			});
			if($(this).hasClass('rt-footnav__title--open')){
				$(this).removeClass('rt-footnav__title--open')
			} else {
				$(this).addClass('rt-footnav__title--open')
			}
			$(this).next().slideToggle(100);
			$('.rt-footnav--collapsible .rt-footnav__list').not($(this).next()).slideUp(100);

		} else {
			return false
		}
	})

	
	
	
	/* ====== TOGLE MAP FILTER ====== */
	$('.rt-map__button').on('click', function(){
		$(this).toggleClass('rt-map__button--open')
		$('.rt-map__filter').fadeToggle(100);
	})

	
	
	
	/* ====== FORM VALIDATE ====== */
	var valid_name = false;
	var valid_phone = false;
	$('#form').on('reset', function(){
		// Set select to the initial state
		$('select').each(function(){
			$(this).next('.rt-select__selected').text($(this).children('option').eq(0).text());
			$('.rt-select__item').removeClass('rt-select__item--current')
		})
		
		// Make button unavailable
		$('[data-action="submit-form"]').prop('disabled', true)
		
		// Clearing the validation state variables
		valid_name = false
		valid_phone = false
	})

	$('input[name="phone"]').mask('+7 999 999-99-99', {placeholder: '+7 999 123-45-67'});
	$('input[name="name"]').on('input', function(){
		var input_name = $(this);
		var val_name = input_name.val();
		if(val_name){
			input_name.parent().removeClass('rt-field--error');
			valid_name = true;
		} else {
			input_name.parent().addClass('rt-field--error')
			valid_name = false;
		}

	})
	$('input[name="phone"]').on('input', function(){
		var input_phone = $(this);
		var val_phone = input_phone.val();
		if(val_phone && val_phone.length == 16){
			input_phone.parent().removeClass('rt-field--error');
			valid_phone = true
		} else {
			input_phone.parent().addClass('rt-field--error')
			valid_phone = false
		}

	})	

	$('#form').on('change input', function(){
		// If form valid - make button available
		if(valid_name && valid_phone){
			$('[data-action="submit-form"]').prop('disabled', false);
		} else {
			$('[data-action="submit-form"]').prop('disabled', true);
		}
	})
	$('[data-action="submit-form"]').on('click', function(){
		//Show splash
		$('.rt-splash').slideDown(100)
		
		// Add extra class for control animations
		setTimeout(function(){
			$('#form').trigger('reset');
			$('.rt-splash').addClass('rt-splash--stop-animation')
		}, 1900)
		
		// Hide splash
		setTimeout(function(){
			$('.rt-splash').slideUp(100)
			$('.rt-splash').removeClass('rt-splash--stop-animation')
		}, 2500)
	})
})
		
