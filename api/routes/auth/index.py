from __main__ import app
from func.auth import auth_route

@app.route("/api/auth")
def auth():
    return auth_route()

from .callback import callback
from .token import get_token_route, get_refresh_token_route