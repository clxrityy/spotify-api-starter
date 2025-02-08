from __main__ import app
# render_template is used to render HTML templates
from flask import render_template

# import other routes here
from routes.test import test
from routes.auth import callback, auth

@app.route('/api')
def index():
    # This renders the index.html file in the `templates/` folder
    return render_template('index.html')