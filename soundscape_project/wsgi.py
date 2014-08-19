"""
WSGI config for soundscape_project project.

This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.

"""
import os
import sys

# ADD YOUR PROJECT TO THE PYTHONPATH FOR THE PYTHON INSTANCE
# path = '/home/tommy/Documents/soundscape/soundscape_project/'

# if path not in sys.path:
#     sys.path.append(path)

# os.chdir(path)

# # TELL DJANGO WHERE YOUR SETTINGS MODULE IS LOCATED
# os.environ['DJANGO_SETTINGS_MODULE'] = 'soundscape_project.settings'

# IMPORT THE DJANGO WSGI HANDLER TO TAKE CARE OF REQUESTS
#import django.core.handlers.wsgi
#application = django.core.handlers.wsgi.WSGIHandler()

from django.core.wsgi import get_wsgi_application
from dj_static import Cling

application = Cling(get_wsgi_application())