
//***********************MAP STUFF****************************
var map;
var currentLocation;
var browserSupportFlag = new Boolean();
var canPlaceMarker = false;
var markers = [];
var infoWindows = [];
var previousMarkerAnimated = null;

function initialize() {
	
	//*****************MAP OPTIONS*******************************
	var styles = [
	    {
	      featureType: "water",
	      elementType: "all",
	      stylers: [
	      	{hue: "#000000"},
	      	{saturation: -100},
	      	{lightness: 0}
	      ]
	    },{
	      featureType: "landscape",
	      elementType: "geometry",
	      stylers: [
	      	{hue: "#00FF00"},
	      	{saturation: 100},
	        { visibility: "simplified" }
	      ]
	    },{
	      featureType: "road",
	      elementType: "labels",
	      stylers: [
	        { visibility: "off" }
	      ]
	    }
	  ];
	
	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles,
	  {name: "Styled Map"});

	var mapOptions = {
	  center: new google.maps.LatLng(10, 0),
	  zoom: 2,
	  mapTypeControlOptions: {
	  	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	  }
	};

	map = new google.maps.Map(document.getElementById("mapContainer"),
	    mapOptions);
	
	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

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


//***********************MARKER STUFF********************
//CLASS
function placeMarker(location, name, songName, songUrl){
	if(canPlaceMarker)
	{   
		//*******DEFAULT VARIABLES**********************
		if(name === undefined)
			name = "Shumbody";
		if(songName === undefined)
			songName = "Folds in Your Hands";
		if(songUrl === undefined)
			songUrl = "https://soundcloud.com/shumbody/folds-in-your-hands/";

		//*********SET UP INFO WINDOW AND MARKER********
		var infoText = '<div id="infoWindow">' +
						'<p>Name: ' + name + '</p>' +
						'<p>Song: ' + songName + '</p>' +
						'</div>'

	    var marker = new google.maps.Marker({
	        position: location, 
	        map: map,
	        animation: google.maps.Animation.DROP
	        //icon: Need to make a better note 'note.jpg'
	    });

	    var infoWindow = new google.maps.InfoWindow({
	    	content: infoText
	    });


	    //***************LISTENERS******************
    	google.maps.event.addListener(marker, 'mouseover', function(){
			infoWindow.open(map, marker);
		});
		google.maps.event.addListener(marker, 'mouseout', function(){
			infoWindow.close(map, marker);
		});
		google.maps.event.addListener(marker, 'click', function() {
			playMusic(songUrl);
			marker.setAnimation(google.maps.Animation.BOUNCE);
			if(previousMarkerAnimated != null)
			{
				previousMarkerAnimated.setAnimation(null);
			}
			previousMarkerAnimated = marker;
		});

		//*************PUSH TO ARRAYS*****************
	    markers.push(marker);
	    infoWindows.push(infoWindow);
	    canPlaceMarker = false;
	}
}

//FUNCTIONS
var enablePlacing = function() {
	canPlaceMarker = true;
}

var placeCurrentLocationMarker = function() {
	canPlaceMarker = true;
	placeMarker(currentLocation);
}


var playMusic = function(songUrl) {
	  SC.oEmbed(songUrl,
  			{color: "ff0066",
  			 auto_play: true},
  			 document.getElementById("soundcloudPlayer"));
}

//***********************AJAX STUFF*******************

function populate(data) {
	var place1 = new google.maps.LatLng(data.m1.lat,data.m1.lng);
	var place2 = new google.maps.LatLng(data.m2.lat,data.m2.lng);
	var place3 = new google.maps.LatLng(data.m3.lat,data.m3.lng);
	var place4 = new google.maps.LatLng(data.m4.lat,data.m4.lng);
	var place5 = new google.maps.LatLng(data.m5.lat,data.m5.lng);
	
	enablePlacing();
	placeMarker(place1, data.m1.artist, data.m1.title, data.m1.url)

	enablePlacing();
	placeMarker(place2, data.m2.artist, data.m2.title, data.m2.url)

	enablePlacing();
	placeMarker(place3, data.m3.artist, data.m3.title, data.m3.url)

	enablePlacing();
	placeMarker(place4, data.m4.artist, data.m4.title, data.m4.url)

	enablePlacing();
	placeMarker(place5, data.m5.artist, data.m5.title, data.m5.url)
}

//********************INITIALIZE THE MAP*********************
google.maps.event.addDomListener(window, 'load', initialize);

