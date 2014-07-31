$(document).ready(function ($) {
	$.get('/soundmap/get_marker_info/', {}, function(data) {
        var json_struct = $.parseJSON(data);
        for(var key in json_struct) {
            var song = json_struct[key];
            populate_map(song);
        }
    });
});