from ....main import app
from requests import get
from flask import request
import json
# from func.token import get_access_token

@app.route("/api/auth/profile/top/<type>", methods=["GET"])
def top(type):
    url = "https://api.spotify.com/v1/me/top/" + type + "?time_range=short_term&limit=10"
    
    headers = {
        "Authorization": "Bearer " + str(request.cookies['spotify_token'])
    }
    
    response = get(url, headers=headers)
    
    json_result = json.loads(response.content)
    
    return json_result