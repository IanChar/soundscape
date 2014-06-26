
//***********************MAP STUFF****************************
var map;
var currentLocation;
var browserSupportFlag = new Boolean();
var canPlaceMarker = false;
var markers = [];
var infoWindows = [];

function initialize() {
	
	//*****************MAP OPTIONS*******************************
	var mapOptions = {
	  center: new google.maps.LatLng(10, 0),
	  zoom: 2
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


//***********************MARKER FUNCTIONS********************


//Functions
function placeMarker(location) {
	if(canPlaceMarker)
	{   

		/* In the future this will have better UI or maybe even
		   a whole page dedicated to it. Additionally, instead
		   of asking for a song name you should pick one of 
		   your songs off of soundcloud.
		*/
		var name = prompt("Enter your name...");
		var song = prompt("Enter the song name...");

		if(name == null || song == null)
			return;

		var infoText = '<div id="infoWindow">' +
						'<p>Name: ' + name + '</p>' +
						'<p>Song: ' + song + '</p>' +
						'</div>'

	    var marker = new google.maps.Marker({
	        position: location, 
	        map: map
	    });

	    var infoWindow = new google.maps.InfoWindow({
	    	content: infoText
	    });

    	google.maps.event.addListener(marker, 'mouseover', function(){
			infoWindow.open(map, marker);
		});
		google.maps.event.addListener(marker, 'mouseout', function(){
			infoWindow.close(map, marker);
		});
		google.maps.event.addListener(marker, 'click', function() {
			playTestMusic();
		});

	    markers.push(marker);
	    infoWindows.push(infoWindow);
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

var playTestMusic = function() {
	  SC.oEmbed("https://soundcloud.com/shumbody/folds-in-your-hands/",
  			{color: "ff0066"},
  			 document.getElementById("soundcloudPlayer"));
}

var test = function() {
	infoWindows[0].open(map,markers[0]);
}

//********************INITIALIZE THE MAP*********************
google.maps.event.addDomListener(window, 'load', initialize);

