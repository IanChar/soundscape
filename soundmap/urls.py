from django.conf.urls import patterns, url
from soundmap import views

urlpatterns=patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^login/$', views.user_login, name='login'),
	url(r'^logout/$', views.user_logout, name='logout'),
	url(r'^register/$', views.register, name='register'),
	url(r'^add_song/$', views.add_song, name='add_song'),
	url(r'^profile/$', views.profile, name='profile'),
	url(r'^get_marker_info/$', views.getMarkerInfo, name='get_marker_info'),
	url(r'^get_playlist_info/$', views.getPlaylistInfo, name='get_playlist_info'),
	url(r'^like_song/$', views.likeSong, name='like_song'),
	url(r'^updateListens/$', views.updateListens, name='update_listens'),
)