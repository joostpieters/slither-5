from django.shortcuts import render
from django.http import HttpResponse
from .models import Score
from social_django.models import UserSocialAuth
from django.contrib.auth.decorators import login_required
# Create your views here.

def index(request):
	return HttpResponse("Hello World")

def scoreboard(request):
	scores=Score.objects.order_by('score')
	scorecard={'scores':scores}
	return render(request,'slither/game.html',scorecard)

@login_required
def game(request):
	return render(request,'slither/gamepage.html')

def github_login(request):	
	return render(request,'slither/gamepage.html')

@login_required
def save (request):
	if(request.method=='POST'):
		#print type(request.user.username)
		usr = UserSocialAuth.objects.get(user__username=request.user.username)
		user_score=request.POST['score']
		#print usr
		#print user_score
		s = Score(user = usr, score=user_score)
		s.save()
		#Score.objects.create(user=username,score=user_score)
