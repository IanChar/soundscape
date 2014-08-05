
//***********************MAP STUFF****************************
var map;
var currentLocation;
var browserSupportFlag = false;
var canPlaceMarker = false;
var markers = [];
var infoWindows = [];
var previousMarkerAnimated = null;
var playlistNum = 0;

function initialize() {
	
	//*****************MAP OPTIONS*******************************
	var styles = [
	    {
	      featureType: "water",
	      elementType: "all",
	      stylers: [
	      	{hue: "#FBF7E4"},
	      	{saturation: -10},
	      	{lightness: 75}
	      ]
	    },{
	      featureType: "landscape",
	      elementType: "geometry",
	      stylers: [
	      	{hue: "#8E001C"},
	      	{saturation: 50},
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
	      alert("Geolocation service failed. Default location set.");
	      currentLocation = newyork;
	    } else {
	      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
	      currentLocation = siberia;
	    }
	    map.setCenter(currentLocation);
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
function placeMarker(location){
	if(canPlaceMarker)
	{   
		//*********SET UP INFO WINDOW AND MARKER********
		var infoText = '<div id="infoWindow">' +
						'<p>latitude: ' + location.lat() + '</p>' +
						'<p>longitude: ' + location.lng() + '</p>' +
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
			clearPlaylist();
			$.get('/soundmap/get_playlist_info/', {latitude:location.lat(), longitude:location.lng()}, function(data) {
		        var json_struct = $.parseJSON(data);
		        for(var key in json_struct) {
		            var song = json_struct[key];
		            addToPlaylist(song.name, song.artist, song.url);
		        }
		    });
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

function addToPlaylist(name, artist, url){
	playlistNum = playlistNum + 1;
	$('#playlist').append('<li><a id="'.concat(playlistNum).concat('" href="#">').concat(name).concat(" -- ").concat(artist).concat('</a> </li>'));
	$('#'.concat(playlistNum)).click(function(){
		playMusic(url);
	});
}

function clearPlaylist(){
	$('#playlist').empty();
	playlistNum = 0;
}

//FUNCTIONS
var enablePlacing = function() {
	canPlaceMarker = true;
}

var playMusic = function(songUrl) {
	  SC.oEmbed(songUrl,
  			{color: "ff0066",
  			 auto_play: true},
  			 document.getElementById("soundcloudPlayer"));
}

//***********************AJAX*******************

function populate_map(song) {
	var coordinates = new google.maps.LatLng(song.lat, song.lng);
	enablePlacing();
	placeMarker(coordinates)
}

//********************INITIALIZE THE MAP*********************
google.maps.event.addDomListener(window, 'load', initialize);
addToPlaylist("Borat", "Throw the Jew Down the Well", "https://soundcloud.com/user3843991/borat-throw-the-jew-down-the");
addToPlaylist("Paprika", "Parade", "https://soundcloud.com/dj-tenk/susumu-hirasawa-parade");
//addToPlaylist("This Link", "Should be Broken", "ianwashere.com");

