from flask import request, jsonify
from ...main import app, client_id
import requests
from ...func.code import codeVerifier
from ...func.auth import development

@app.route('/api/callback', methods=["POST"])
def callback():
    try:
        # Get code from request body
        data = request.get_json()
        code = data.get('code')
        
        if not code:
            return jsonify({"error": "No code provided"}), 400

        # Exchange code for token
        token_url = 'https://accounts.spotify.com/api/token'
        
        payload = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': development and "http://localhost:3000" or "https://spotify-api-starter-kappa.vercel.app",  # Next.js app URL
            'client_id': client_id,
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