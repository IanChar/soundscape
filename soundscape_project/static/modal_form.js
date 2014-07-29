$(function() {
	var dialog, form,

	name = $( "#name" ),
	artist = $( "#artist" ),
	url = $( "#url" ),
	
	urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

	allFields = $([]).add(name).add(artist).add(url),
	tips = $(".validateTips");

	function updateTips(t) {
		tips
			.text(t)
			.addClass("ui-state-highlight");
		setTimeout(function() {
			tips.removeClass("ui-state-highlight", 1500);
		}, 500);
	}

	function checkLength(o, n, min, max) {
		if (o.val().length>max || o.val().length < min) {
			o.addClass("ui-state-error");
			updateTips("Length of "+n+" must be between "+min+" and " + max +".");
			return false;
		}
		else {
			return true;
		}
	}
	function checkRegexp(o, regexp, n) {
		if(!(regexp.test(o.val()))) {
			o.addClass("ui-state-error");
			updateTips(n);
			return false;
		}
		else {
			return true;
		}
	}
	function addSong() {
		var valid = true;
		allFields.removeClass("ui-state-error");
		valid = valid && checkLength(name, "name", 1, 128);
		valid = valid && checkLength(artist, "artist", 1, 128);
		valid = valid && checkLength(url, "url", 1, 200);
		valid = valid && checkRegexp(url, urlRegex, "Invalid URL. eg: www.soundcloud.com");
		if(valid) {	
			document.getElementById('song_form').submit();
			dialog.dialog('close');
		}
		return valid;
	}

	dialog = $("#dialog-form").dialog({
		autoOpen: false,
		height: 430,
		width: 470,
		resizable: false,
		modal: true,
		show: {
			effect:"fadeIn",
			duration:300,
		},
		buttons: {
			"Add Song": addSong,
			Cancel: function() {
				dialog.dialog("close");
			}
		},
		close: function() {
			form[0].reset();
			allFields.removeClass("ui-state-error");
		}
	});

	form = dialog.find("form").on("submit", function(event) {
		event.preventDefault();
		addSong();
	});

	$('#addsong').button().on("click", function() {
		dialog.dialog("open");
	});

});
