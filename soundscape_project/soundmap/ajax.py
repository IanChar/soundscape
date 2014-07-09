from django.utils import simplejson
from dajaxice.decorators import dajaxice_register

@dajaxice_register
def getMarkerInfo(request):
	return simplejson.dumps({'artist':'Ian', 'lat':1, 'lng':1})