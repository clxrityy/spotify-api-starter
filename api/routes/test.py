from . import app
from flask import jsonify

@app.route("/api/test")
def test_route():
    data = {
        "message": "Hello World",
        "status": 200,
        "success": True,
    }
    return jsonify(data)