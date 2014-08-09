var likeSong=function(songid) {
		var text_id='#like_count_'+songid;
		var btn_id='#like-btn-'+songid;

		$.get('/soundmap/like_song/', {song_id:songid}, function(data) {
			$(text_id).html(data + " likes");
			$(btn_id).hide();
		});
	}

var playMusic= function(songUrl, songid) {
  	SC.oEmbed(songUrl,
			{color: "424242",
			 auto_play: true,
			},
			 document.getElementById("soundcloudPlayer"));
  	$.get('/soundmap/updateListens/', {song_id:songid});
}

