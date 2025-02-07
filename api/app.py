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

##### Flask imports #####
# This imports the Flask class from the flask module, which allows us to create a Flask application.
## @See: https://flask.palletsprojects.com/en/stable/
from flask import Flask
# This imports the CORS class from the flask_cors module, which allows us to enable CORS for our Flask application.
## @See: https://flask-cors.readthedocs.io/en/latest/api.html
from flask_cors import CORS

##### Other imports #####
# Imports the `get_token()` function from `util/token.py`
from util.token import get_token
# Imports the `get_auth_header()` function from `util/header.py`
from util.header import get_auth_header

### Variables
spotify_token = get_token()
spotify_auth_header = get_auth_header(spotify_token)

# This creates a new Flask application.
app = Flask(__name__)
# This enables CORS for our Flask application.
CORS(app)


# Import all the routes from the routes folder
from routes import index


# !!! IMPORTANT !!!
# This is the main function that runs when the script is executed
if __name__ == "__main__":
    # This runs the Flask application
    app.run(load_dotenv=True)