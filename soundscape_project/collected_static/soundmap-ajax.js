$(document).ready(function() {
	// $('#2Pac').click(function () {
	// 	var songUrl = $(this).attr("data-id");
	// 	alert("hi");
	// });
	
});

var playMusic = function(songUrl) {
	  SC.oEmbed(songUrl,
  			{color: "ff0066",
  			 auto_play: true},
  			 document.getElementById("soundcloudPlayer"));
}
