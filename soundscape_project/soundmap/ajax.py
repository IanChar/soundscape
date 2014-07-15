from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from soundmap.models import Song

def findArtist(url):
	stop = len(url)
	for i in range(23, len(url)):
		if url[i] == '/':
			stop = i
			break
	return makePretty(url[23:stop])

def findTitle(url):
	start = 0
	for i in range(len(url) - 2, 0, -1):
		if url[i] == '/':
			start = i
			break
	return makePretty(url[start + 1:len(url) - 1])

def makePretty(url):
	url = url.replace('-', ' ')
	url = url.title()
	return url

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