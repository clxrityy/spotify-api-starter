# This function retrieves the authorization header for the Spotify API.
def get_auth_header(token):
    return {
        "Authorization": "Bearer " + token
    }