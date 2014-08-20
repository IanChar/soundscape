$(document).ready(function ($) {
	$.get('/soundmap/get_marker_info/', {}, function(data) {
        var json_struct = $.parseJSON(data);
        for(var key in json_struct) {
            var playlist = json_struct[key];
            populate_map(playlist);
        }
    });
});

var playMusic= function(songUrl, songid) {
    SC.oEmbed(songUrl,
            {color: "ff0066",
             auto_play: true,
            },
             document.getElementById("soundcloudPlayer"));
    $.get('/soundmap/updateListens/', {song_id:songid});
}