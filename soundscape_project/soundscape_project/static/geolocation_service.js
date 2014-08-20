var lat;
var lng;
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
        // $('#id_latitude').attr('value', lat);
        // $('#id_longitude').attr('value', lng);
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