from django.contrib import admin
from soundmap.models import UserProfile, Song, Playlist

class SongAdmin(admin.ModelAdmin):
	list_display = ('name', 'artist', 'url', 'uploader', 'listens', 'likes', 'city', 'playlist')
	
class PlaylistAdmin(admin.ModelAdmin):
	list_display=('city', 'latitude', 'longitude')

admin.site.register(UserProfile)
admin.site.register(Song, SongAdmin)
admin.site.register(Playlist, PlaylistAdmin)
