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

##### Other imports #####
from func.token import get_token
from func.header import get_auth_header


### Variables
spotify_token = get_token(client_id=client_id, client_secret=client_secret)
spotify_auth_header = get_auth_header(spotify_token)

# This creates a new Flask application.
app = Flask(__name__)
# Required for session
app.secret_key = os.urandom(24)

# This enables CORS for our Flask application.
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://spotify-api-starter-kappa.vercel.app"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True,
    }
})

# Import all the routes from the routes folder
from routes import index
from routes.auth.index import *

# !!! IMPORTANT !!!
# This is the main function that runs when the script is executed
if __name__ == "__main__":
    # This runs the Flask application
    app.run(load_dotenv=True,
            host=host,
            debug=debug)