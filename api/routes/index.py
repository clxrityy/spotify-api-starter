from ..main import app
from flask import render_template
import requests

from ..func import token as tk, auth, header




@app.route('/api')
def api_route():
    token = tk.get_access_token()
    if not token:
        return render_template("404.html")
        
    # Verify token by making a test request to Spotify API
    headers = header.get_auth_header(token)
    try:
        response = requests.get('https://api.spotify.com/v1/me', headers=headers)
        response.raise_for_status()
        return render_template('index.html')
    except requests.exceptions.RequestException:
        return render_template('404.html')
    
    return render_template('index.html')

# Import all the routes from the routes folder
import test
from .search import searchArtist, searchTrack
from ..routes.auth import route