
from django.conf.urls import include,url

from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
    url(r'^home$',views.scoreboard),	
    url(r'^game$',views.game),	
   # url(r'^login/github/$',views.github_login,name='github_login'),
    url(r'^accounts/profile/$',views.github_login,name='github_login'),	
    url(r'^save/',views.save),	
]

LOGIN_URL = 'login'
LOGOUT_URL = 'logout'
LOGIN_REDIRECT_URL = 'slither:home'
