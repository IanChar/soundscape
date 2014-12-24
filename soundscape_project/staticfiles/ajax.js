var likeSong=function(songid) {
		var text_id='#like_count_'+songid;
		var btn_id='#like-btn-'+songid;

		$.get('/soundmap/like_song/', {song_id:songid}, function(data) {
			$(text_id).html(data + " likes");
			$(btn_id).hide();
		});
	}

var playMusic= function(songUrl, songid, username) {
  	SC.oEmbed(songUrl,
			{color: "424242",
			 auto_play: true,
			},
			document.getElementById("soundcloudPlayer"));
  	$.get('/soundmap/updateListens/', {song_id:songid});
	$.get('/soundmap/profile/', {name:username}, function(data) {
		$('#profile-tab').fadeIn(300).siblings().hide();
		$('#profileTab').parent('li').addClass('active').siblings().removeClass('active');
		//Add HTML to the profile tab and display profile information
		var json_data = jQuery.parseJSON(data);
		$('#profile-name').html("Uploaded by ".concat(json_data.username));
		$('#profile-location').html(json_data.location);
		if(json_data.picture_url) {
			$('#profile-picture').attr('src',json_data.picture_url);
		}
	});
}
