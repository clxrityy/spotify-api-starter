from . import app, client_id, client_secret
from requests import get
from func.header import get_auth_header
from func.token import get_token
from markupsafe import escape
import json
from flask import jsonify

def searchArtistFunc(artist_name: str):
    url = 'https://api.spotify.com/v1/search'
    query = f"?q={artist_name}&type=artist&limit=6"
    
    query_url = url + query
    result = get(query_url, headers=get_auth_header(get_token(client_id=client_id, client_secret=client_secret)))
    
    json_result = json.loads(result.content)['artists']["items"]
    
    if len(json_result) == 0:
        print("Artist not found")
        return None
    
    return jsonify(json_result[0])

def searchTrackFunc(track_name: str):
    url = 'https://api.spotify.com/v1/search'
    query = f"?q={track_name}&type=track&limit=6"
    
    query_url = url + query
    result = get(query_url, headers=get_auth_header(get_token(client_id=client_id, client_secret=client_secret)))
    
    json_result = json.loads(result.content)['tracks']["items"]
    
    
    if len(json_result) == 0:
        print("Track not found")
        return None
    
    return jsonify(json_result[0])


@app.route("/api/search/artist/<id>")
def searchArtist(id: str):
    id = escape(id)
    if len(id) > 2:
        results = searchArtistFunc(id)
    else:
        results = ""
    return results

@app.route("/api/search/track/<id>")
def searchTrack(id: str):
    id = escape(id)
    if len(id) > 2:
        results = searchTrackFunc(id)
    else:
        results = ""
    return results