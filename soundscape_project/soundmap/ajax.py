from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from soundmap.models import Song

@dajaxice_register
def getMarkerInfo(request):
	song_list = Song.objects.order_by('-likes')[:15]
	count =1
	song_db = {}
	for song in song_list:
		marker = {}
		marker['artist'] = song.artist
		marker['name'] = song.name
		marker['lat'] = song.latitude
		marker['lng'] = song.longitude
		marker['url'] = song.url
		marker['likes'] = song.likes
		marker['listens'] = song.listens
		song_db['song'+str(count)] = marker
		count +=1
	return simplejson.dumps(song_db)