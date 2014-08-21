
//***********************MAP STUFF****************************
var map;
var geocoder;
var currentLocation;
var browserSupportFlag = false;
var markers = [];
var infoWindows = [];
var previousMarkerAnimated = null;
var playlistNum = 0;

function initialize() {

	geocoder = new google.maps.Geocoder();
	
	//*****************MAP OPTIONS*******************************
	var styles = [
	    {
	      featureType: "water",
	      elementType: "all",
	      stylers: [
	      	{hue: "#000000"},
	      	{saturation: -100},
	      	{lightness: -8}
	      ]
	    },{
	      featureType: "landscape",
	      elementType: "geometry",
	      stylers: [
	      	{hue: "#00FF00"},
	      	{saturation: 60},
	      	{lightness:0},
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
}

//Stuff to do with the window
google.maps.event.addDomListener(window, "resize", function() {
	var center = map.getCenter();
	google.maps.event.trigger(map, "resize");
	map.setCenter(center); 
});


//***********************MARKER STUFF********************
//CLASS
function placeMarker(location, city){

		//*********SET UP INFO WINDOW AND MARKER********
		var infoText = '<div id="infoWindow">' +
						'<h5> '+city+' </h5>' +
						'</div>'

	    var marker = new google.maps.Marker({
	        position: location, 
	        map: map,
	        animation: google.maps.Animation.DROP,
	        title: city
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
		google.maps.event.addListener(marker, 'click', function(){
			$('#playlist').empty();
			$.get('/soundmap/get_playlist_info/', {city:marker.getTitle()}, function(data) {
		        var json_struct = $.parseJSON(data);
		        console.log(json_struct);
		        for(var key in json_struct) {
		            var song = json_struct[key];
		            addToPlaylist(song.name, song.artist, song.url, song.id, song.username, song.likes);
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

}

function addToPlaylist(name, artist, url, id, username, likes){
	var result = '<li id="playlist" class="playlist"> <a onclick="playMusic('.concat("'").concat(url).concat("'").concat(', ').concat(id).concat(', ').concat("'").concat(username).concat("'").concat(')" href="#" id="playSong">').concat(name).concat(' -- ').concat(artist).concat('</a> <b id="like_count_').concat(id).concat('">').concat(likes).concat(' likes</b> <button onclick="likeSong(').concat(id).concat(')" id="like-btn-').concat(id).concat('" data-songid="').concat(id).concat('" class="btn btn-xs btn-default" type="button">Like</button></li>')
	$('#playlist').append(result);
}

function clearPlaylist(){
	
	playlistNum = 0;
}



//********************INITIALIZE THE MAP*********************
google.maps.event.addDomListener(window, 'load', initialize);
//addToPlaylist("This Link", "Should be Broken", "ianwashere.com");

//Function: document ready
//----------------------
//Called when the document is ready to load all playlist markers
//onto the map. The parameter is a playlist object that contains lat, lng, city
//attributes. 

$(document).ready(function ($) {
	$.get('/soundmap/get_marker_info/', {}, function(data) {
        var json_struct = $.parseJSON(data);
        for(var key in json_struct) {
            var playlist = json_struct[key];
			var coordinates = new google.maps.LatLng(playlist.lat, playlist.lng);
			placeMarker(coordinates, playlist.city);        
		}
    });
});
