$(function(){



	var animationEndVendors = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	var viewport = getViewport();

	$("html, body").css("min-width", viewport.width * 3);

	$(".page").css("width", viewport.width);
	$(".page").css("min-height", viewport.height);

	$(".hollow.secondary").on("click", function(e){

		e.preventDefault();

		$("#testInput").css("-webkit-animation-duration", "0.5s");
		$("#testInput").css("-webkit-animation-delay", "0s");
		$("#testInput").addClass("animated fadeInUp").one(animationEndVendors, function() {
			$(this).removeClass("animated fadeInUp");
		});

	});

	$(".nextPage").on("click", function(e) {

		e.preventDefault();

		$("html, body").animate({
			scrollLeft: "+=" + getViewport().width 
		}, 1000);
		
	});

	$(".previousPage").on("click", function(e){

		e.preventDefault();

		$("html, body").animate({
			scrollLeft: "-=" + getViewport().width 
		}, 1000);

	});

	$(".seeMore").on("click", function(e){

		e.preventDefault();

		$("html, body").animate({
			scrollTop: "+=" + getViewport().height
		}, 1000);

	});

	$(".seeLess").on("click", function(e){

		e.preventDefault();

		$("html, body").animate({
			scrollTop: "-=" + getViewport().height
		}, 1000);

	});

});

function getViewport() {
    var container = window, property = "inner";
    if (!("innerWidth" in window )) {
       property = "client";
       container = document.documentElement || document.body;
    }
    return { width : container[property + "Width"], height : container[property + "Height"]};
}