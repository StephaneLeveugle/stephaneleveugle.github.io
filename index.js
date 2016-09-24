$(function(){

	var lastX = -1;

	var animationEndVendors = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	var viewport = getViewport();

	$("html, body").css("min-width", viewport.width * 3);

	$(".page").css("width", viewport.width);
	$(".page").css("height", viewport.height);
	$(".page").css("overflow-y", "auto");

	// $(".page").each(function(){
	// 	$(this).css("height", $(this).css("height"));
	// });

	// $(".page").each(function(){
	// 	if($(this).height() > viewport.height){
	// 		$(this).css("overflow-y", "auto");	
	// 	}
	// });

	$(".hollow.secondary").on("click", function(e){

		e.preventDefault();

		$("#testInput").css("-webkit-animation-duration", "0.5s");
		$("#testInput").css("-webkit-animation-delay", "0s");
		$("#testInput").addClass("animated fadeInUp").one(animationEndVendors, function() {
			$(this).removeClass("animated fadeInUp");
		});

	});

	// disable touch move
	$("html, body").on("touchmove", function(e){
		$("#logs").text(JSON.stringify(this));
		if($(this).height() <= getViewport().height){
			$("#testInput").val("prevented!");
			e.preventDefault();
			return;
		}
		e.preventDefault();
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