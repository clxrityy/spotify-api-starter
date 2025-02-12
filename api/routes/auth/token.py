from app import app, client_id
from flask import jsonify
import requests
from func.token import get_access_token, get_refresh_token

@app.route("/api/token")
def get_token_route():
    data = {
        "token": get_access_token()
    }
    return data

@app.route("/api/refresh-token")
def get_refresh_token_route():
    refresh_token = get_refresh_token()
    url = "https://accounts.spotify.com/api/token"
    
    payload = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id
    }
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    try:
        response = requests.post(url, data=payload, headers=headers)
        response.raise_for_status()  # Raises an error for bad status codes
        
        token_data = response.json()
        return jsonify({
            "access_token": token_data.get("access_token"),
            "refresh_token": token_data.get("refresh_token", None)  # Might not always be present
        })
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 400