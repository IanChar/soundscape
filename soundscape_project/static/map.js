var map;

function initialize() {
	var mapOptions = {

	  center: new google.maps.LatLng(30, -90),
	  zoom: 3
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);
}

// $(document).ready(function(){
// 	//$('#map-canvas').css("heigh", $(window).height());
// 	//$('#map-canvas').css("width", $(window).width());
// 	google.maps.event.trigger(map, 'resize');
// });

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, "resize", function() {
	var center = map.getCenter();
	google.maps.event.trigger(map, "resize");
	map.setCenter(center); 
});