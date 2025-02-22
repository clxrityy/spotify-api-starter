from flask import session, has_request_context
from main import get_credentials

def get_access_token():
    if not has_request_context():
        return None
    return session.get('access_token')

def get_refresh_token():
    if not has_request_context():
        return None
    return session.get('refresh_token')

def save_tokens(tokens):
    if not has_request_context():
        print("Session not available, cannot save tokens.")
        return
    session['access_token'] = tokens['access_token']
    if "refresh_token" in tokens:
        session['refresh_token'] = tokens['refresh_token']
        
def get_token(client_id: str, client_secret: str): 
    return get_credentials(client_id, client_secret)