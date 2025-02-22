from flask import redirect, request, jsonify
from urllib.parse import urlencode
from ..main import client_id
from ..func.code import codeChallenge, codeVerifier
import requests
from .token import save_tokens
import os

development = os.getenv("DEVELOPMENT", "False").lower() == "true"

redirect_uri = development and "http://localhost:3000" or "https://spotify-api-starter-kappa.vercel.app"
scope = "user-read-private user-read-email user-read-playback-state user-read-currently-playing user-top-read"
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
        token_data = response.json()
        save_tokens(token_data)
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