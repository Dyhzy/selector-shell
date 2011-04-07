# Copyright 2008 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import logging

import django
from django import http
from django import shortcuts
from django.http import HttpResponse
from django.template import loader, Context
from django.template import add_to_builtins

DEBUG = True


def selector_shell(request):
  """ """
  params = {
    'quirks': request.REQUEST.__contains__('quirks')
  }
  return respond(request, 'selector_shell.html', params)





# DO NOT EDIT BELOW HERE UNLESS YOU KNOW WHAT YER UP TO
def respond(request, template, params=None):
  """Helper to render a response, passing standard stuff to the response.

  Args:
    request: The request object.
    user: The User object representing the current user; or None if nobody
      is logged in.
    template: The template name; '.html' is appended automatically.
    params: A dict giving the template parameters; modified in-place.

  Returns:
    Whatever render_to_response(template, params) returns.

  Raises:
    Whatever render_to_response(template, params) raises.
  """
  logging.info('views.respond %s, %s' %
               (template, params))

  if params is None:
    params = {}

  # Sets a BUILD_VERSION variable for the templates to use.
  # Default to production and then set to development if we're local.
  BUILD = 'production'
  if 'Dev' in os.getenv('SERVER_SOFTWARE'):
    BUILD = 'development'
  params['BUILD'] = BUILD

  # Sets the CURRENT_VERSION_ID for file fingerprinting.
  params['CURRENT_VERSION_ID'] = os.getenv('CURRENT_VERSION_ID')

  # Otherwise, render the template normally
  return shortcuts.render_to_response(template, params)
