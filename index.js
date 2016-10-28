"use strict";
$(function(){

	var touchStartX = 0;
	var touchStartY = 0;

	var animationEndVendors = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	var viewport = getViewport();


	$(window).on("resize", function(e){
		resizePages();
	});

	resizePages();

	$(".hollow.secondary").on("click", function(e){

		e.preventDefault();

		$("#testInput").css("-webkit-animation-duration", "0.5s");
		$("#testInput").css("-webkit-animation-delay", "0s");
		$("#testInput").addClass("animated fadeInUp").one(animationEndVendors, function() {
			$(this).removeClass("animated fadeInUp");
		});

	});

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
		e.stopPropagation();
	  	if(Math.abs(touchStartX - e.originalEvent.touches[0].pageX)
	    		> Math.abs(touchStartY - e.originalEvent.touches[0].pageY)) {
    		e.preventDefault();
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
				console.log("left");
				if($(".activePage .previousPage").length > 0) {
					goToPreviousPageHorizontal($(".activePage .previousPage"));
				}
				break;
			case 38:
				console.log("up");
				// make sure the user hasn't scrolled down
				if($(".activePage > .pageContent").scrollTop() === 0) {
					if($(".activePage .seeLess").length > 0) {
						goToPreviousPageVertical($(".activePage .seeLess"));
					}
				}
				break;
			case 39:
				console.log("right");
				if($(".activePage .nextPage").length > 0) {
					goToNextPageHorizontal($(".activePage .nextPage"));
				}
				break;
			case 40:
				console.log("down");
				// make sure the user has scrolled down to the bottom
				if($(".activePage > .pageContent").prop("scrollHeight") 
					=== $(".activePage > .pageContent").height() + $(".activePage > .pageContent").scrollTop()) {

					if($(".activePage .seeMore").length > 0) {
						goToNextPageVertical($(".activePage .seeMore"));
					}
				}
				break;
			default:
				return;
		}
	});

});

$(window).on("load", function(){

	setInitialActivePage();

});

function resizePages() {

	var viewport = getViewport();

	// alert(JSON.stringify(viewport));

	$("html, body").css("min-width", viewport.width * 4);

	$(".page").each(function(){

		$(this).css("width", viewport.width);
		$(this).css("height", viewport.height);

		$(this).find(".pageContent").css("width", viewport.width);
		$(this).find(".pageContent").css("height", viewport.height);

		if($(this).hasClass("activePage")){
			var $activePageOffset = $(this).offset();
			// $("html, body").scrollLeft($activePageOffset.left);
			// $("html, body").scrollTop($activePageOffset.top);
			

			// alert(JSON.stringify($activePageOffset));


			window.scrollTo($activePageOffset.left, $activePageOffset.top);
		}

		if($(this).find(".pageContent").prop("scrollHeight") > viewport.height) {
			$(this).addClass("scrollable");
		} else {
			if($(this).hasClass("scrollable")) {
				$(this).removeClass("scrollable");
			}
		}
	});
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
	$($link.attr("href")).addClass("activePage");
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
