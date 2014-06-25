
//*******INITIALIZING THE MAP***********
var map;

function initialize() {
	

	var mapOptions = {

	  center: new google.maps.LatLng(10, 0),
	  zoom: 2
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);

	google.maps.event.addListener(map, 'click', function(event) {
	   placeMarker(event.latLng);
	});
}

//Stuff to do with the window
google.maps.event.addDomListener(window, "resize", function() {
	var center = map.getCenter();
	google.maps.event.trigger(map, "resize");
	map.setCenter(center); 
});


//*******Add Markers*******************


function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

