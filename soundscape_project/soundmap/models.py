from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
	name = models.CharField(max_length=128)
	artist = models.CharField(max_length=128)
	url = models.URLField()
	listens = models.IntegerField(default=0)
	likes = models.IntegerField(default=0)
	latitude = models.FloatField(default=0)
	longitude = models.FloatField(default=0)

	def __unicode__(self):
		return self.name

class UserProfile(models.Model):
	#This line is required. It links UserProfile to a User model instance.
	user = models.OneToOneField(User)

	location = models.CharField(max_length=128)
	picture = models.ImageField(upload_to='profile_images', blank=True)

	def __unicode__(self):
		return self.user.username

