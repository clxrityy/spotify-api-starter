from __main__ import app
from flask import render_template, jsonify, redirect, url_for
import requests

from func.token import get_access_token
from func.header import get_auth_header

# import other routes here
from routes.test import test
from routes.auth.index import *


@app.route('/api')
def index():
    token = get_access_token()
    if not token:
        return redirect(url_for('auth.index'))
        
    # Verify token by making a test request to Spotify API
    headers = get_auth_header(token)
    try:
        response = requests.get('https://api.spotify.com/v1/me', headers=headers)
        response.raise_for_status()
        return render_template('index.html')
    except requests.exceptions.RequestException:
        return redirect(url_for('auth.index'))