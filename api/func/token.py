from __main__ import client_id, client_secret
from requests import post
import base64
import json
from flask import session, has_request_context

# This function retrieves an access token from the Spotify API.
def get_credentials():
    # This concatenates the client_id and client_secret variables with a colon.
    auth_string = client_id + ":" + client_secret
    
    # This encodes the auth_string variable as UTF-8 bytes
    ## @See: https://docs.python.org/3/library/stdtypes.html#str.encode
    auth_bytes = auth_string.encode('utf-8')
    
    # This encodes the auth_bytes variable as base64
    ## @See: https://docs.python.org/3/library/base64.html
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')
    
    # This is the URL for the Spotify API token endpoint
    url = "https://accounts.spotify.com/api/token"
    
    # This is the headers for the POST request to the Spotify API token endpoint
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    # This is the data for the POST request to the Spotify API token endpoint
    data = {
        "grant_type": "client_credentials"
    }
    
    # This sends a POST request to the Spotify API token endpoint
    result = post(url, headers=headers, data=data)
    # This parses the JSON response from the Spotify API token endpoint
    json_result = json.loads(result.content)
    # This returns the access token from the JSON response
    
    # Finally, this returns the access token
    return json_result

def get_access_token():
    if not has_request_context():
        return None
    return session.get('access_token')

def get_refresh_token():
    if not has_request_context():
        return None
    return session.get('refresh_token')

def save_tokens(tokens):
    if not has_request_context():
        print("Session not available, cannot save tokens.")
        return
    session['access_token'] = tokens['access_token']
    if "refresh_token" in tokens:
        session['refresh_token'] = tokens['refresh_token']
        
def get_token(): 
    return get_credentials()['access_token']