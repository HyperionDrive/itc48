$(function() {

	$('.header-slider').slick({
		centerMode: true,
		slidesToShow: 1,
		variableWidth: true,
		draggable: false,
		focusOnSelect: false,
		initialSlide: 0,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000
	});

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
		var obj= {root:[]};
		var inputDate = $("#searchDate");
		var searchOrg = $("#searchOrg");
		var searchSert = $("#searchSert");
		var loadText = $('#loadText');
		var form = $('.searchRegister');
		var table = $('.resultTable ');
		var error = $("#searchResultError");

		table.hide();
		error.hide();
		form.hide();

		if(elem.length) {
			var feedurl_start = "https://spreadsheets.google.com/feeds/";
		    var feedkey = "1Ds_JQqX5jrdVZVlGSpRoA3lgieH1VjoNJ4GZuvL6t90";
		    var flag = 0;

		    $.getJSON(feedurl_start+"worksheets/"+feedkey+"/public/basic?alt=json", function(sheetfeed) {
		    	count = sheetfeed.feed.entry.length;
		        $.each(sheetfeed.feed.entry, function(k_sheet, v_sheet){
		            var sheeturl = v_sheet.link[0]["href"]+"?alt=json";
		            sheeturl = sheeturl.replace("basic", "values");
		            var sheet_title = v_sheet.content["$t"]; // to know which sheet you're dealing with
		            $.getJSON(sheeturl, function(sheetjson){
		                obj.root[k_sheet] = sheetjson.feed.entry;
		            });
		            
		        });
		    });


		    $( document ).ajaxStop(function(){

		    	obj = Defiant.getSnapshot(obj);

		    	setTimeout(function(){
		    		form.show();
		    		loadText.hide();
		    	},1500);
		    	

		    	$.each([inputDate, searchOrg, searchSert], function () {
		    		
		    		$(this).on('blur', function(){

		    			

		    			var field = $(this).data('field');
		    			var value = $(this).val().trim().toLowerCase().replace(/"/g,"");
		    			console.log(value);
		    			$(this).val('');

		    	

		    			if(!value){
		    				return false;
		    			}

		    			loadText.show();
		    			error.hide()
		    			table.find('tbody').html("");
		    			var result;
		    			setTimeout(function () {
		    				result = doSearch(obj, field, value);


		    				if(!result){
		    					loadText.hide();
		    					error.show().html('Ничего не найдено, уточните запрос !');
		    					return false;
		    				}

		    				if(result.root.length > 100){
		    					loadText.hide();
		    					error.show().html('Найдено свыше 100 записей, пожалуйста уточните запрос');
		    					return false
		    				}


		    				$.each(result.root, function (i, k) {
		    					elem.find(".resultTable").append("<tr><td>"+k.gsx$рег.$t+"</td><td>"+k.gsx$дата.$t+"</td><td>"+k.gsx$организация.$t+"</td><td>"+k.gsx$серийныйномерскп.$t+"</td><tr>");
		    				});

		    				loadText.hide();
		    				table.show()


		    			}, 300);
		    			//var result = doSearch(obj, field, value);

		    			
		    			

		    		});
		    	});

        	});
		}

	})();
	// end поиск по реестру сертификатов





});


