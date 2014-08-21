var lat;
var lng;
var locality;
var state;
var browserSupportFlag =  new Boolean();

function loadCoordinates() {
    
    var getLocation = function() {
        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(success);
          }
          // Browser doesn't support Geolocation
          else {
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
          }
    }

    function success(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
         
        geocoder.geocode({'latLng': new google.maps.LatLng(lat, lng)}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                for (var i = results[0].address_components.length - 1; i >= 0; i--) {
                    if(results[0].address_components[i].types[0]=='locality') {
                        locality = results[0].address_components[i].long_name;
                    }
                    if(results[0].address_components[i].types[0]=='administrative_area_level_1') {
                        state = results[0].address_components[i].short_name;
                    }
                }
                $('#id_city').attr('value', locality.concat(', ').concat(state));
                $('#id_latitude').attr('value', lat);
                $('#id_longitude').attr('value', lng);
              } else {
                alert('No results found');
              }
            } else {
              alert('Geocoder failed due to: ' + status);
            }
          });
    }
    
    function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
            alert("Geolocation service failed.");
            lat = 40.69847032728747;
            lng = -73.9514422416687;
        } else {
            alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
            lat = 60;
            lng = 105;
        }
    }
    getLocation();
}

$(document).ready(function() {
    loadCoordinates();
});