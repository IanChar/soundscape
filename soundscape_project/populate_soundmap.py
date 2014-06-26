import os

def populate():

	add_song(name="Let It Be", artist = "The Beatles", url="https://soundcloud.com/narzo-fernandez-maldonado-sanabria/the-beatles-let-it-be-live")
	add_song(name="Super Rich Kids", artist = "Frank Ocean", url="https://soundcloud.com/defjam/frank-ocean-super-rich-kids")
	add_song(name="Swimming Pools (Drank)", artist = "Kendrick Lamar", url="https://soundcloud.com/topdawgent/kendrick-lamar-swimming-pools")
	add_song(name="Poetic Justice", artist = "Kendrick Lamar", url="https://soundcloud.com/interscope/kendrick-lamar-poetic-justice")
	add_song(name="Strawberry Fields", artist = "The Beatles", url="")
	add_song(name="Money", artist = "Pink Floyd", url="")
	add_song(name="Sheep", artist = "Pink Floyd", url="")
	add_song(name="Have You Ever Seen the Rain", artist = "Creedance Clearwater Revival", url="https://soundcloud.com/joshnamauleg/have-you-ever-seen-the-rain")
	add_song(name="Who Are You", artist = "The Who", url="")

	for song in Song.objects.all():
		print "- {0}".format(str(song))

def add_song(name, artist, url, listens=0, likes=0):
	song = Song.objects.get_or_create(name=name, artist=artist, url=url, listens=listens, likes=likes)[0]
	return song

if __name__ =='__main__':
	print "Starting Soundmap population script..."
	os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'soundscape_project.settings')
	from soundmap.models import Song
	populate()