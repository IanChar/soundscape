
//***********************MAP STUFF****************************
var map;
var canPlaceMarker = false;
var currentLocation;
var browserSupportFlag = new Boolean();

function initialize() {
	
	//*****************MAP OPTIONS*******************************
	var mapOptions = {
<<<<<<< HEAD
	  center: new google.maps.LatLng(10, 0),
	  zoom: 2
=======

	  center: new google.maps.LatLng(30, -90),
	  zoom: 3
>>>>>>> 62c2a0ae8d66fe2b74fc4b5293238cc3fca341ac
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);

	//******************GET CURRENT LOCATION*********************
	 // Try W3C Geolocation (Preferred)
	  if(navigator.geolocation) {
	    browserSupportFlag = true;
	    navigator.geolocation.getCurrentPosition(function(position) {
	      currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	    }, function() {
	      handleNoGeolocation(browserSupportFlag);
	    });
	  }
	  // Browser doesn't support Geolocation
	  else {
	    browserSupportFlag = false;
	    handleNoGeolocation(browserSupportFlag);
	  }

	  function handleNoGeolocation(errorFlag) {
	    if (errorFlag == true) {
	      alert("Geolocation service failed.");
	      initialLocation = newyork;
	    } else {
	      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
	      initialLocation = siberia;
	    }
	    map.setCenter(initialLocation);
	  }

	//****************LISTENERS*********************************
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


//***********************MARKER FUCNTIONS********************
var placeMarker = function(location) {
	if(canPlaceMarker)
	{    
	    var marker = new google.maps.Marker({
	        position: location, 
	        map: map
	    });
	    canPlaceMarker = false;
	}
}

var enablePlacing = function() {
	canPlaceMarker = true;
}

var placeCurrentLocationMarker = function() {
	canPlaceMarker = true;
	placeMarker(currentLocation);
}

//********************INITIALIZE THE MAP*********************
google.maps.event.addDomListener(window, 'load', initialize);
<<<<<<< HEAD

=======
google.maps.event.addDomListener(window, "resize", function() {
	var center = map.getCenter();
	google.maps.event.trigger(map, "resize");
	map.setCenter(center); 
});
>>>>>>> 62c2a0ae8d66fe2b74fc4b5293238cc3fca341ac
