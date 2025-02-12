from app import app
from flask import render_template, redirect, url_for
import requests

from func.token import get_access_token
from func.header import get_auth_header

# import other routes here
from routes.test import test
from routes.auth.index import *
from routes.search.routes import  searchArtist, searchTrack


@app.route('/api')
def index():
    token = get_access_token()
    if not token:
        return render_template("404.html")
        
    # Verify token by making a test request to Spotify API
    headers = get_auth_header(token)
    try:
        response = requests.get('https://api.spotify.com/v1/me', headers=headers)
        response.raise_for_status()
        return render_template('index.html')
    except requests.exceptions.RequestException:
        return redirect(url_for('404.html'))