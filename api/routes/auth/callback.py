from flask import request, jsonify
from __main__ import app, client_id
import requests
from func.code import codeVerifier

@app.route('/api/callback', methods=["POST"])
def callback():
    try:
        # Get code from request body
        data = request.get_json()
        if not data or 'code' not in data:
            return jsonify({"error": "No code provided"}), 400

        code = data['code']
        
        # Exchange code for token
        token_url = 'https://accounts.spotify.com/api/token'
        
        payload = {
            'client_id': client_id,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': 'http://localhost:3000',  # Next.js app URL
            'code_verifier': codeVerifier
        }
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        
        response = requests.post(token_url, data=payload, headers=headers)
        response.raise_for_status()
        
        return jsonify(response.json())
    
    except Exception as e:
        print(f"Error in callback: {str(e)}")
        return jsonify({"error": str(e)}), 400