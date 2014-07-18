from django.conf.urls import patterns, url
from soundmap import views

urlpatterns=patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^login/$', views.user_login, name='login'),
	url(r'^logout/$', views.user_logout, name='logout'),
	url(r'^register/$', views.register, name='register'),
	url(r'^add_song/$', views.add_song, name='add_song'),
	url(r'^profile/(?P<profile_username>\w+)/$', views.profile, name='profile'),
	url(r'^get_location_add_song/$', views.get_location_add_song, name='get_location'),

)