import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'soundscape_project.settings')
from soundmap.models import Song, User, UserProfile, Playlist

uploader = User.objects.get(username="Tommy")
uploader_profile = UserProfile.objects.get(user=uploader)

def populate():
	add_song(name="Changes", artist = "2Pac", url="https://soundcloud.com/ghetto-records-2/2pac-changes", lat=39.7, lng=-105.2, city ="Lakewood, CO")
	add_song(name="Super Rich Kids", artist = "Frank Ocean", url="https://soundcloud.com/defjam/frank-ocean-super-rich-kids", lat=34, lng=-118, city="Hacienda Heights, CA")
	add_song(name="Swimming Pools (Drank)", artist = "Kendrick Lamar", url="https://soundcloud.com/topdawgent/kendrick-lamar-swimming-pools", lat=33.897, lng=-118.22, city="Compton, CA")
	add_song(name="Poetic Justice", artist = "Kendrick Lamar", url="https://soundcloud.com/interscope/kendrick-lamar-poetic-justice", lat=40.686, lng=-73.9, city="Brooklyn, NY")
	add_song(name="Have You Ever Seen the Rain", artist = "Creedance Clearwater Revival", url="https://soundcloud.com/joshnamauleg/have-you-ever-seen-the-rain", lat=37.786, lng=-122.414, city="San Francisco, CA")
	add_song(name="It's Time", artist="Passion Pit", url="https://soundcloud.com/imaginedragons/imagine-dragons-its-time-2", lat=42.37, lng=-71.05, city="Boston, MA")
	add_song(name="Tokyo Drift", artist="Teriyaki Boyz", url="https://soundcloud.com/jdm-music-2/teriyaki-boyz-tokyo-drift", lat=35.689, lng=139.69, city="Tokyo")
	
	for song in Song.objects.all():
		print "- {0}".format(str(song))

def add_song(name, artist, url, lat, lng, city, listens=0, likes=0, up=uploader_profile):
	playlist = Playlist.objects.get_or_create(latitude=lat, longitude=lng, city =city)[0]
	song = Song.objects.get_or_create(name=name, artist=artist, url=url, listens=listens, likes=likes, city=city, uploader=up, playlist=playlist)[0]
	return song

if __name__ =='__main__':
	print "Starting Soundmap population script..."
	populate()