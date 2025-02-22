from . import app
from func import auth as ath

@app.route("/api/auth")
def auth():
    return ath.auth_route()

from .callback import callback
from .token import get_token_route, get_refresh_token_route
from .profile.top import top