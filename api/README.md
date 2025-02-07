# API

```r
|-- api/
    |-- .env ---> # Environment variables
    |-- app.py ---> # Main entry point of the API
    |-- requirements.txt ---> # Python dependencies
    |-- static/ ---> # Static assets (e.g., CSS, JS)
    |   # -- ...
    |-- templates/ ---> # HTML Flask templates
    |   -- index.html
    |-- routes ---> # API routes
    |   # -- ...
    |-- util/ ---> # Utility functions
    |   # -- ...
    |-- venv/ ---> # Virtual environment
    |   # -- ...
```

## App Structure

##### The `api/` directory contains the backend code for the application. It is built using Flask, a Python web framework. The API handles user authentication, data retrieval, and other server-side logic.
- The `app.py` file is the main entry point of the API. It initializes the Flask application and sets up the routes.
    ```py
    app = Flask(__name__)

    if __name__ == "__main__":
        app.run(load_dotenv=True)
        # To run with debug mode, use:
        # app.run(debug=True)
    ```
- The `routes/` directory contains the API routes, which define the endpoints and their corresponding logic.
    - All routes are imported into the base `routes/index.py` file.
        - The `routes/index.py` file is imported into the main `app.py` file.
            ```py
            from routes import index
            ```
- The `templates/` directory contains HTML templates used by Flask to render dynamic content.
    ```py
    from flask import render_template

    @app.route('/')
    def index():
        # Render the index.html template from the templates directory
        return render_template('index.html')
    ```
- The `static/` directory contains static assets such as CSS and JavaScript files.
    - Using css in the `static/` directory within the template (`index.html`) file:
        ```html
        <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
        ```
- The `util/` directory contains utility functions that are used throughout the API.