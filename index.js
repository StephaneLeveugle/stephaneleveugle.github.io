$(function(){

	var touchStartX = 0;
	var touchStartY = 0;

	var animationEndVendors = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	var viewport = getViewport();

	$("html, body").css("min-width", viewport.width * 3);

	$(".page").css("width", viewport.width);
	$(".page").css("height", viewport.height);
	// $(".page").css("overflow-y", "auto");

	$(".page").each(function(){

		if($(this).height() > viewport.height) {
			$(this).addClass("scrollable");
		}

	});

	$(".hollow.secondary").on("click", function(e){

		e.preventDefault();

		$("#testInput").css("-webkit-animation-duration", "0.5s");
		$("#testInput").css("-webkit-animation-delay", "0s");
		$("#testInput").addClass("animated fadeInUp").one(animationEndVendors, function() {
			$(this).removeClass("animated fadeInUp");
		});

	});

	$(document).on('touchstart', function(e){
		if($(e.target).parents("#projectDetails")[0]) {
			touchStartX = e.originalEvent.touches[0].pageX;
			touchStartY = e.originalEvent.touches[0].pageY;

			var $this = $(this);
		    var scroller = $("#projectDetails").get(0);

		    if ($this.scrollTop() === 0) $this.scrollTop(1);
		    var scrollTop = scroller.scrollTop;
		    var scrollHeight = scroller.scrollHeight;
		    var offsetHeight = scroller.offsetHeight;
		    var contentHeight = scrollHeight - offsetHeight;
		    if (contentHeight == scrollTop) $this.scrollTop(scrollTop-1);
		}
	});

	$(document).on('touchmove', function(e) {
		// e.preventDefault();
	    if ($(e.target).parents('#projectDetails')[0] ) {
	    	
	    	if(Math.abs(touchStartX - e.originalEvent.touches[0].pageX)
	    		> Math.abs(touchStartY - e.originalEvent.touches[0].pageY)) {
	    		e.preventDefault();
	    	}
	    } else {
	    	e.preventDefault();
	    }
	});

	$(".nextPage").on("click", function(e) {

		e.preventDefault();

		$("html, body").animate({
			scrollLeft: $($(this).attr("href")).offset().left
		}, 1000);
		
	});

	$(".previousPage").on("click", function(e){

		e.preventDefault();

		$("html, body").animate({
			scrollLeft: $($(this).attr("href")).offset().left 
		}, 1000);

	});

	$(".seeMore").on("click", function(e){

		e.preventDefault();

		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top
		}, 1000);

	});

	$(".seeLess").on("click", function(e){

		e.preventDefault();

		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top
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