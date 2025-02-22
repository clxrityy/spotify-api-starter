##### Initial imports #####
# This imports the load_dotenv function from the dotenv module, which allows us to load environment variables from a .env file.
from dotenv import load_dotenv
# This imports the os module, which allows us to access environment variables through the operating system.
import os

# This loads the environment variables from the .env file.
load_dotenv()
# This assigns the value of the CLIENT_ID & CLIENT_SECRET environment variables to the client_id & client_secret variables, respectively.
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
# This assigns the value of the DEVELOPMENT environment variable to the development variable.
development = os.getenv("DEVELOPMENT", "False").lower() == "true"
debug = False
host = "localhost"

if development:
    debug = True
else:
    host = "spotify-api-starter-kappa.vercel.app"


##### Flask imports #####
# This imports the Flask class from the flask module, which allows us to create a Flask application.
## @See: https://flask.palletsprojects.com/en/stable/
from flask import Flask
# This imports the CORS class from the flask_cors module, which allows us to enable CORS for our Flask application.
## @See: https://flask-cors.readthedocs.io/en/latest/api.html
from flask_cors import CORS
from flask_session import Session
# import flask sessions
# This imports the session object from the flask module, which allows us to manage user sessions in our Flask application.
## @See: https://flask.palletsprojects.com/en/stable/quickstart/#sessions

## This imports the post function from the requests module, which allows us to send HTTP POST requests.
from requests import post
## This imports the base64 module, which allows us to encode and decode data using base64 encoding.
import base64
## This imports the json module, which allows us to parse and manipulate JSON data.
import json

##### Other imports #####
from .func.header import get_auth_header

##### Functions #####
# This function takes a client_id and client_secret as arguments and returns the access token from the Spotify API.
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

### Variables
spotify_token = get_credentials()['access_token']
spotify_auth_header = get_auth_header(spotify_token)

# This creates a new Flask application.
app = Flask(__name__)
# Required for session
app.secret_key = os.urandom(24)

# Import all the routes from the routes folder
import routes.index


# This enables CORS for our Flask application.
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://spotify-api-starter-kappa.vercel.app"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True,
    }
})

# !!! IMPORTANT !!!
# This is the main function that runs when the script is executed
if __name__ == "__main__":
    # This runs the Flask application
    app.run(load_dotenv=True,
            # host=host,
            debug=debug)