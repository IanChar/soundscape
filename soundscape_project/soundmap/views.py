from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from soundmap.models import Song, UserProfile, User
from soundmap.forms import UserForm, UserProfileForm, SongForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


def index(request):
	context = RequestContext(request)

	song_list = Song.objects.order_by('-likes')[:16]
	context_dict = {'song_list':song_list}

	return render_to_response('soundmap/index.html', context_dict, context)

def add_song(request):
	context = RequestContext(request)
	context_dict={}

	if request.method=='POST':
		form = SongForm(request.POST)

		if form.is_valid():
			song = form.save(commit=False)

			song.listens=0
			song.likes=0
			song.save()

			return HttpResponseRedirect('/soundmap/')	#After submitting the form, redirects the user back to the homepage
		else:
			print form.errors
	else:
		form = SongForm()

	context_dict['form'] = form
	return render_to_response('soundmap/add_song.html', context_dict, context)

def register(request):
    context = RequestContext(request)

    # A boolean value for telling the template whether the registration was successful.
    # Set to False initially. Code changes value to True when registration succeeds.
    registered = False

    # If it's a HTTP POST, we're interested in processing form data.
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)
        # If the two forms are valid...
        if user_form.is_valid() and profile_form.is_valid():
            # Save the user's form data to the database.
            user = user_form.save()

            # Now we hash the password with the set_password method.
            # Once hashed, we can update the user object.
            user.set_password(user.password)
            user.save()

            # Now sort out the UserProfile instance.
            # Since we need to set the user attribute ourselves, we set commit=False.
            # This delays saving the model until we're ready to avoid integrity problems.
            profile = profile_form.save(commit=False)
            profile.user = user

            # Did the user provide a profile picture?
            # If so, we need to get it from the input form and put it in the UserProfile model.
            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']

            # Now we save the UserProfile model instance.
            profile.save()

            # Update our variable to tell the template registration was successful.
            registered = True

        # Print form errors to the terminal.
        else:
            print user_form.errors, profile_form.errors

    # Not a HTTP POST, so we render our form using two ModelForm instances.
    # These forms will be blank, ready for user input.
    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    return render_to_response(
            'soundmap/register.html',
            {'user_form': user_form, 'profile_form': profile_form, 'registered': registered},
            context)

def user_login(request):
	context = RequestContext(request)

	context_dict = {}

	if request.method== 'POST':
		username = request.POST['username']
		password = request.POST['password']

		user = authenticate(username=username, password=password)

		if user:
			if user.is_active:
				login(request, user)
				return HttpResponseRedirect('/soundmap/')
			else:
				context_dict['disabled_acct'] = True
				return render_to_response('soundmap/login.html', context_dict, context)
		else:
			#print "Invalid login details: {0}, {1}".format(username, password)
			#return HttpResponse("Invalid login details provided.")
			context_dict['bad_details']=True
			return render_to_response('soundmap/login.html', context_dict, context)
	else:
		return render_to_response('soundmap/login.html', context_dict, context)

def profile(request, profile_username):
	context = RequestContext(request)

	context_dict={}

	u = User.objects.get(username = profile_username)
	try:
		context_dict['user']=u
		profile = UserProfile.objects.get(user=u)
		context_dict['user_profile']=profile

	except UserProfile.DoesNotExist:
		pass
	return render_to_response('soundmap/profile.html', context_dict, context)

@login_required
def user_logout(request):
	logout(request)

	return HttpResponseRedirect('/soundmap/')