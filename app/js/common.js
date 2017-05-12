$(function() {

	$('.partners-slider').slick({
		infinite: true,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  variableWidth: true
	});

	$('.useful-links-slider').slick({
		infinite: true,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  variableWidth: false
	});

	//steps-snippet
	(function(){
		var navListItems = $('ul.setup-panel li a'),
		    allWells = $('.setup-content');

		allWells.hide();

		navListItems.click(function(e)
		{
		    e.preventDefault();
		    var $target = $($(this).attr('href')),
		        $item = $(this).closest('li');
		    
		    if (!$item.hasClass('disabled')) {
		        navListItems.closest('li').removeClass('active');
		        $item.addClass('active');
		        allWells.hide();
		        $target.show();
		    }
		});
		
		$('ul.setup-panel li.active a').trigger('click');
		
		// DEMO ONLY //
		$('#activate-step-2').on('click', function(e) {
		    $('ul.setup-panel li:eq(1)').removeClass('disabled');
		    $('ul.setup-panel li a[href="#step-2"]').trigger('click');
		    $(this).remove();
		})

		$('#activate-step-3').on('click', function(e) {
		    $('ul.setup-panel li:eq(2)').removeClass('disabled');
		    $('ul.setup-panel li a[href="#step-3"]').trigger('click');
		    $(this).remove();
		})

		$('#activate-step-4').on('click', function(e) {
		    $('ul.setup-panel li:eq(3)').removeClass('disabled');
		    $('ul.setup-panel li a[href="#step-4"]').trigger('click');
		    $(this).remove();
		})

	})();
	//end steps-snippet


	// start vertical tabs
	$("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
	       e.preventDefault();
	       $(this).siblings('a.active').removeClass("active");
	       $(this).addClass("active");
	       var index = $(this).index();
	       $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
	       $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
	   });
	// end vertical tabs


	// start поиск по реестру сертификатов
	(function () {
		var elem = $("#searchResult");
		var obj;
		var inputDate = $("#searchDate");
		var searchOrg = $("#searchOrg");
		var searchSert = $("#searchSert");

		if(elem.length) {
			$.ajax({
			  method: "POST",
			  url: "/include/sertificatesJson.php"
			  // data: { name: "John", location: "Boston" }
			})
	  		.done(function( msg ) {
		    	obj = JSON.parse(msg);
		  	});
		}

		$.each([inputDate, searchOrg, searchSert], function () {
			
			$(this).on('blur', function(){
				var field = $(this).data('field');
				var value = $(this).val().trim().toLowerCase();

				if(!value){
					return false;
				}
				var result = doSearch(obj, field, value);

				console.log(result);
				if(!result.root.length){
					elem.html('Ничего не найдено!');
					return false
				}

				if(result.root.length > 20){
					elem.html('Уточните поиск');
					return false
				}



				 htm = Defiant.render('books_template', result);
				 elem.html(htm);

			});
		});
		

		
	})();
	// end поиск по реестру сертификатов


});


