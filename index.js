$(function(){

	var lastX = -1;
	var touchStartX = 0;

	var lastY = 0;

	var animationEndVendors = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	var viewport = getViewport();

	$("html, body").css("min-width", viewport.width * 3);

	$(".page").css("width", viewport.width);
	$(".page").css("height", viewport.height);
	$(".page").css("overflow-y", "auto");

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

	// $(document).on("swipe", function(e){
	// 	e.preventDefault();
	// });



	// $(document).on('touchmove', function(e) {
	// 	e.preventDefault();
	//     if ($(e.target).parents('#projectDetails')[0] ) {
	    	
	//     	if(e.originalEvent.touches[0].pageY - lastY > 0) {
	//     		$("#projectDetails").scrollTop($("#projectDetails").scrollTop() - 5);	
	//     	} else {
	//     		$("#projectDetails").scrollTop($("#projectDetails").scrollTop() + 5);
	//     	}

	    	
	//     	lastY = e.originalEvent.touches[0].pageY;
	//     }
	// });

	$("#projectDetails").swipe({
		swipe:function(event, direction) {
			$("#testLogs2").text(JSON.stringify(event));
			$("#testLogs").text(direction);
			if(direction.toLowerCase() !== "up" && direction.toLowerCase() !== "up") {
				event.preventDefault();
			}
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