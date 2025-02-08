from flask import redirect, request, jsonify
from urllib.parse import urlencode
from __main__ import client_id
from func.code import codeChallenge, codeVerifier
import requests

redirect_uri = "http://localhost:3000"
scope = "user-read-private user-read-email user-read-playback-state user-read-currently-playing"
auth_url = "https://accounts.spotify.com/authorize"

def get_auth_url():
    params = {
        "response_type": "code",
        "client_id": client_id,
        "scope": scope,
        "code_challenge_method": "S256",
        "code_challenge": codeChallenge,
        "redirect_uri": redirect_uri
    }
    
    auth_url_with_params = f"{auth_url}?{urlencode(params)}"
    return auth_url_with_params

def auth_route():
    auth_url = get_auth_url()
    return redirect(auth_url)

def get_code_token(code):
    token_url = "https://accounts.spotify.com/api/token"
    
    payload = {
        "client_id": client_id,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "code_verifier": codeVerifier
    }
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    response = requests.post(token_url, data=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": "Failed to retrieve token",
            "status": response.status_code
        }
        

# def callback_route():
#     code = request.args.get("code")
#     if code:
#         token_response = get_code_token(code)
#         return jsonify(token_response)
#     return jsonify({
#         "error": "No code provided"
#     })
    
    
# @app.route("/api/auth")
# def auth():
#     return auth_route()

# @app.route("/api/callback")
# def callback():
#     return callback_route()

# @app.route("/api/token")
# def get_token_route():
#     data = {
#         "token": get_token()
#     }
    
#     return jsonify(data)