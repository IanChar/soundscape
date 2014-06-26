from django import forms
from soundmap.models import UserProfile, Song
from django.contrib.auth.models import User

class SongForm(forms.ModelForm):
	name = forms.CharField(max_length=128, help_text="Please enter the song name.")
	artist = forms.CharField(max_length=128, help_text="Please enter the artist name.")
	url = forms.URLField(max_length=200, help_text="Please enter the URL of the Soundcloud file, if available.")
	listens = forms.IntegerField(widget=forms.HiddenInput(), initial=0)
	likes = forms.IntegerField(widget=forms.HiddenInput(), initial=0)

	class Meta:
		model = Song

class UserForm(forms.ModelForm):
	password = forms.CharField(widget=forms.PasswordInput())

	class Meta:
		model = User
		fields = ('username', 'email', 'password')

class UserProfileForm(forms.ModelForm):
	class Meta:
		model = UserProfile
		fields = ('location', 'picture')