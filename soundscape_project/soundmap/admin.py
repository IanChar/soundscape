from django.contrib import admin
from soundmap.models import UserProfile, Song

class SongAdmin(admin.ModelAdmin):
	list_display = ('name', 'artist', 'url', 'listens', 'likes', 'latitude', 'longitude')
	
admin.site.register(UserProfile)
admin.site.register(Song, SongAdmin)

