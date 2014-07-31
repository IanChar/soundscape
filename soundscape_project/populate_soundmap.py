import os

def populate():

	add_song(name="Changes", artist = "2Pac", url="https://soundcloud.com/ghetto-records-2/2pac-changes", lat=10, lng=20)
	add_song(name="Super Rich Kids", artist = "Frank Ocean", url="https://soundcloud.com/defjam/frank-ocean-super-rich-kids", lat=34, lng=-118)
	add_song(name="Swimming Pools (Drank)", artist = "Kendrick Lamar", url="https://soundcloud.com/topdawgent/kendrick-lamar-swimming-pools", lat=33.897, lng=-118.22)
	add_song(name="Poetic Justice", artist = "Kendrick Lamar", url="https://soundcloud.com/interscope/kendrick-lamar-poetic-justice", lat=40.686, lng=-73.97)
	add_song(name="Have You Ever Seen the Rain", artist = "Creedance Clearwater Revival", url="https://soundcloud.com/joshnamauleg/have-you-ever-seen-the-rain", lat=37.786, lng=-122.414)
	add_song(name="It's Time", artist="Passion Pit", url="https://soundcloud.com/imaginedragons/imagine-dragons-its-time-2", lat=42, lng=-71)
	add_song(name="Tokyo Drift", artist="Teriyaki Boyz", url="https://soundcloud.com/jdm-music-2/teriyaki-boyz-tokyo-drift", lat=35.689, lng=139.69)

	for song in Song.objects.all():
		print "- {0}".format(str(song))

def add_song(name, artist, url, lat, lng, listens=0, likes=0):
	song = Song.objects.get_or_create(name=name, artist=artist, url=url, listens=listens, likes=likes, latitude=lat, longitude=lng)[0]
	return song

if __name__ =='__main__':
	print "Starting Soundmap population script..."
	os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'soundscape_project.settings')
	from soundmap.models import Song
	populate()