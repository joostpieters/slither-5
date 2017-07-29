from django.db import models
from social_django.models import UserSocialAuth
# Create your models here.

class Score(models.Model):
	user = models.ForeignKey(UserSocialAuth,on_delete=models.CASCADE,null = True)
	score=models.IntegerField(default=0)
	def __unicode__(self):
		return self.user.user.username
