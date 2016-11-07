"use strict";
$(function(){

	var touchStartX = 0;
	var touchStartY = 0;
	var touchMoveDiffY = 0;
	var touchMoveDiffX = 0;

	var animationEndVendors = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	var viewport = getViewport();
	var currViewport;



	$(window).on("resize", function(e){
		currViewport = getViewport();
		if(currViewport.width < 1440) {
			$(".humanSkills").css("padding-top", 0);
		}
		resizePages(currViewport);
	});

	resizePages(viewport);

	// $(".hollow.secondary").on("click", function(e){

	// 	e.preventDefault();

	// 	$("#testInput").css("-webkit-animation-duration", "0.5s");
	// 	$("#testInput").css("-webkit-animation-delay", "0s");
	// 	$("#testInput").addClass("animated fadeInUp").one(animationEndVendors, function() {
	// 		$(this).removeClass("animated fadeInUp");
	// 	});

	// });

	$("body").on("touchstart", ".scrollable", function(e){
		if (e.currentTarget.scrollTop === 0) {
			e.currentTarget.scrollTop = 1;
		} else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
			e.currentTarget.scrollTop -= 1;
		}

		touchStartX = e.originalEvent.touches[0].pageX;
		touchStartY = e.originalEvent.touches[0].pageY;
	});

	$('body').on('touchmove', ".scrollable", function(e) {
		
		if($(this).hasClass("activePage")) {
			e.stopPropagation();		
			touchMoveDiffX = touchStartX - e.originalEvent.touches[0].pageX;
			touchMoveDiffY = touchStartY - e.originalEvent.touches[0].pageY;

			var $pageContent = $(this).find(".pageContent");

			// console.log(touchMoveDiffY);

		  	if(Math.abs(touchMoveDiffX)
		    		> Math.abs(touchMoveDiffY)) {
	    		e.preventDefault();
	    		return;
	    	}
	    	
	    	if(touchMoveDiffY > 0) {
	    		if( Math.abs($pageContent.prop("scrollHeight") -  ($pageContent.scrollTop() + $pageContent.innerHeight())) <= 3) {
	    			e.preventDefault();
	    		}
	    	}
	    	else if(touchMoveDiffY < 0) {
	    		if($pageContent.scrollTop() < 1) {
	    			e.preventDefault();
	    		}
	    	}	
		}

	});

	$(document).on('touchmove', function(e) {
		e.preventDefault();
	});

	$(".nextPage").on("click", function(e) {

		e.preventDefault();

		goToNextPageHorizontal($(this));
	});

	$(".previousPage").on("click", function(e){

		e.preventDefault();

		goToPreviousPageHorizontal($(this));
	});

	$(".seeMore").on("click", function(e){

		e.preventDefault();

		goToNextPageVertical($(this));
	});

	$(".seeLess").on("click", function(e){

		e.preventDefault();

		goToPreviousPageVertical($(this));
	});

	$(".top-bar a, .anchor").on("click", function(e){

		e.preventDefault();

		var $linkTarget = $($(this).attr("href"));

		if($linkTarget && $linkTarget.offset()) {

			$(".activePage").addClass("animated fadeOut").one(animationEndVendors, function() {

				$(this).removeClass("animated fadeOut");

				$(window).scrollLeft($linkTarget.offset().left);
				$(window).scrollTop($linkTarget.offset().top);

				$(".activePage").addClass("animated fadeIn").one(animationEndVendors, function() {
					$(this).removeClass("animated fadeIn");
				});
			});

			setNewActivePage($(this));
		}
	});

	// listen to keydown event 
	// to allow arrow navigation
	$("body").on("keydown", function(e){
		switch(e.keyCode) {
			case 37:
				if($(".activePage .previousPage").length > 0) {
					goToPreviousPageHorizontal($(".activePage .previousPage")[0]);
				}
				break;
			case 38:
				// make sure the user hasn't scrolled down
				if($(".activePage > .pageContent").scrollTop() === 0) {
					if($(".activePage .seeLess").length > 0) {
						goToPreviousPageVertical($(".activePage .seeLess")[0]);
					}
				}
				break;
			case 39:
				if($(".activePage .nextPage").length > 0) {
					goToNextPageHorizontal($(".activePage .nextPage")[0]);
				}
				break;
			case 40:
				// make sure the user has scrolled down to the bottom
				if($(".activePage > .pageContent").prop("scrollHeight") 
					=== $(".activePage").height() + $(".activePage > .pageContent").scrollTop()) {

					if($(".activePage .seeMore").length > 0) {
						goToNextPageVertical($(".activePage .seeMore")[0]);
					}
				}
				break;
			default:
				return;
		}
	});

	var topBarHeight = 86;

	$("#aboutMeSkills .pageContent").scroll(function(e) {

		if(getViewport().width >= 1024) {
			var $el = $(".humanSkills");
			var padding = 0;

			// check we're low enough to need the scroll
			if($el.offset().top - $(".page").height() - topBarHeight < 0) {
				// check there is still space below
				padding = Math.min(
						$el.prop("scrollHeight") - $(".humanSkillsInner").height() - 20,
						Math.abs($el.offset().top - $(".page").height() - topBarHeight)
					);

				$el.css("padding-top", padding);

			} else {
				$el.css("padding-top", 0);
			}	
		} 


	});

});

$(window).on("load", function(){

	$(".pageLoadingPanel").fadeOut(500, function() {

		// $(".pageLoadedPanel").css("display", "static");
		$(".pageLoadedPanel").fadeIn(500);

	});

	setInitialActivePage();
	

});



function resizePages(viewport) {

	// var viewport = getViewport();

	if(viewport) {

		$("html, body").css("min-width", viewport.width * 4);

		$(".page").each(function(){

			$(this).css("width", viewport.width);
			$(this).css("height", viewport.height);

			$(this).find(".pageContent").css("width", viewport.width);
			$(this).find(".pageContent").css("height", viewport.height);

			// if($(this).hasClass("activePage")){
			// 	var $activePageOffset = $(this).offset();
			// 	window.scrollTo($activePageOffset.left, $activePageOffset.top);
			// }

			if($(this).find(".pageContent").prop("scrollHeight") > viewport.height) {
				$(this).addClass("scrollable");
			} else {
				if($(this).hasClass("scrollable")) {
					$(this).removeClass("scrollable");
				}
			}
		});
		

		if($(".activePage").length > 0) {

			if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {

				$("body").css("opacity", 0);

				setTimeout(function(){
					var $activePageOffset = $(".activePage").offset();
					$activePageOffset.pageWidth = $(".page").width();
					$activePageOffset.pageHeight = $(".page").height();
					
					window.scrollTo($activePageOffset.left, $activePageOffset.top);
					$("body").css("opacity", 1);
				}, 500);

			} else {
				var $activePageOffset = $(".activePage").offset();
				$activePageOffset.pageWidth = $(".page").width();
				$activePageOffset.pageHeight = $(".page").height();
				window.scrollTo($activePageOffset.left, $activePageOffset.top);
			}
			
		}

	}

}

function setInitialActivePage() {

	var windowScrollLeft = $(window).scrollLeft(),
		windowScrollTop = $(window).scrollTop();

	$(".page").each(function(){

		if(Math.abs($(this).offset().left - windowScrollLeft) < 1 
			&& Math.abs($(this).offset().top - windowScrollTop) < 1) {
			$(this).addClass("activePage");
		}

	});
}

function setNewActivePage($link) {
	$(".activePage").removeClass("activePage");
	var newActivePageId; 
	// if a link has been clicked
	if($link.length) {
		newActivePageId = $link.attr("href");
	} 
	// else it was a keyboard event
	else {
		newActivePageId = $link.attributes && $link.attributes.href && $link.attributes.href.value;
	}
	$(newActivePageId).addClass("activePage");
}

function getViewport() {
    var container = window, property = "inner";
    if (!("innerWidth" in window )) {
       property = "client";
       container = document.documentElement || document.body;
    }
    return { width : container[property + "Width"], height : container[property + "Height"]};
}

function goToNextPageHorizontal($link) {

	if(!$(".content").hasClass("isPageScrolling")) {

		setNewActivePage($link);

		$(".content").addClass("isPageScrolling");

		$("html, body").animate({
			scrollLeft: $(window).scrollLeft() + $(".page").width()
		}, 
		{
			duration: 800,
			complete: function() {
				$(".content").removeClass("isPageScrolling");
			}
		});
	}
}

function goToPreviousPageHorizontal($link) {

	if(!$(".content").hasClass("isPageScrolling")) {

		setNewActivePage($link);

		$(".content").addClass("isPageScrolling");

		$("html, body").animate({
			scrollLeft: $(window).scrollLeft() - $(".page").width()
		}, 
		{
			duration: 800,
			complete: function() {
				$(".content").removeClass("isPageScrolling");
			}
		});
	}
}

function goToNextPageVertical($link) {

	if(!$(".content").hasClass("isPageScrolling")) {

		setNewActivePage($link);

		$(".content").addClass("isPageScrolling");

		$("html, body").animate({
			scrollTop: $(window).scrollTop() + $(".page").height()
		}, 
		{
			duration: 800,
			complete: function() {
				$(".content").removeClass("isPageScrolling");
			}
		});
	}
}

function goToPreviousPageVertical($link) {

	if(!$(".content").hasClass("isPageScrolling")) {

		setNewActivePage($link);

		$(".content").addClass("isPageScrolling");

		$("html, body").animate({
			scrollTop: $(window).scrollTop() - $(".page").height()
		}, 
		{
			duration: 800,
			complete: function() {
				$(".content").removeClass("isPageScrolling");
			}
		});
	}
}


// function createLanguageChart() {
// 	new Chartist.Bar("#languageChart", {
// 		// labels: ["Débutant", "Intermédiaire", "Avancé", "Courant", "Langue maternelle"],
// 		labels: ["Espagnol", "Anglais", "Français"],
// 		// series: ["Débutant", "Courant", "Langue Maternelle"]
// 		series: [
// 			["Débutant", "Courant", "Langue Maternelle"]
// 		]
// 	}, {
// 		horizontalBars: true
// 	});
// }
