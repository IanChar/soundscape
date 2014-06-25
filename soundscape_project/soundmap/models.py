from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	#This line is required. It links UserProfile to a User model instance.
	user = models.OneToOneField(User)

	location = models.CharField(max_length=128)
	picture = models.ImageField(upload_to='profile_images', blank=True)

	def __unicode__(self):
		return self.user.username

#class SoundcloudProfile(models.Model):
#	soundcloud_user = models.OneToOneField(UserProfile)
#	soundcloud_username = models.CharField(max_length=128)
#	soundcloud_password = models.CharField(max_length=128)