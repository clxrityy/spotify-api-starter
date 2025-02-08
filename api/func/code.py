import secrets
import hashlib
import base64

def generate_random_string(length):
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    values = secrets.token_bytes(length)
    return ''.join(possible[x % len(possible)] for x in values)

codeVerifier = generate_random_string(64)

def sha256(plain):
    encoder = hashlib.sha256()
    encoder.update(plain.encode('utf-8'))
    return encoder.digest()

def base64encode(input_bytes):
    # Changed from urlsafe_b64decode to urlsafe_b64encode
    return base64.urlsafe_b64encode(input_bytes).rstrip(b'=').decode('utf-8')

hashed = sha256(codeVerifier)
codeChallenge = base64encode(hashed)