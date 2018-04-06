'use strict';

var Resize = function() {
	scroll(0, 0);
	var header 					= $(".header:visible");
	var content 				= $(".content:visible");
	var tab							=	$('.tabs:visible');
	var viewport_height = $(window).height();
	var content_height 	= viewport_height - header.outerHeight() - tab.outerHeight();
	// content_height -= (content.outerHeight() - content.height());
	// content.height(content_height);
	$("#map_canvas").height(content_height);
	$("#map_canvas_M").height(content_height);
	$(".sidebar-left").height(content_height);
};
module.exports.Resize = Resize;