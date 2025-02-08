# Spotify API Starter <img src="./api/static/favicon-32x32.png" width="30" height="30" />

[![GitHub license](https://img.shields.io/github/license/clxrityy/spotify-api-starter)](https://github.com/clxrityy/spotify-api-starter/blob/master/LICENSE)

This is a starter project for a Spotify API application.

- [Changelog](CHANGELOG.md)
    - [Contributers](CHANGELOG.md#contributers)
- [Roadmap](#roadmap)
- [Overview](#overview)

## 🛠️ Using the project

1. **Option 1**: Clone the repository and run the API locally.
    ```bash
    git clone https://github.com/clxrityy/spotify-api-starter.git
    ```
2. **Option 2**: Use the template directly from GitHub to create a new repository.
    - This will allow you to use the template and push the changes to your own repository and/or make a pull request to the [original repository](https://github.com/clxrityy/spotify-api-starter).
    - **This is optimal for making changes to the project and/or contributing to the project.**

---

### Roadmap

- [x] Backend Initialized
    - Python [Flask](https://flask.palletsprojects.com/en/stable/quickstart/) API
    - [x] HTML Template(s)
- [x] Frontend Initialized
    - ~~Will use basic HTML/CSS/JS for now~~
    - Next.js
- [ ] Database Setup
    - Undecided on database yet
- [ ] Deployment
    - Will deploy to [Heroku](https://www.heroku.com) likely, unless integrating into a [Next.js](https://nextjs.org/) project (in which case, [Vercel](https://vercel.com/))
- [x] Spotify API Integration
    - [x] [Access Token](https://developer.spotify.com/documentation/web-api/concepts/access-token)
    - [x] User Authentication
        - ~~[Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)~~
        - [Authorization Code with PKCE Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)


## Overview
- [Backend API Setup](#backend-api-setup)
    - [API Key](#api-key)
    - [API Setup](#api-setup)
    - [Running the API](#running-the-api)
- [Frontend](#frontend)
- [Authorization](#authorization-code-flow)


---

## Backend API Setup

##### API Key

- Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and create a new application.
- Add ~~`http://127.0.0.1:5000/api/callback`~~ (`http://localhost:3000`) as a redirect URI.
- Copy the `Client ID` and `Client Secret` and save them in a `.env` file in the `api/` directory:
    ```bash
    CLIENT_ID="your_client_id"
    CLIENT_SECRET="your_client_secret"
    REDIRECT_URI=http://localhost:3000
    ```
    - You can also copy the example over and fill it in:
    ```bash
    cp api/.env.example api/.env
    ```


##### API Setup

- Create a virtual environment within the `api/` directory:
    ```bash
    python3 -m venv api/venv
    ```

- Activate the virtual environment:
    - On Windows:
    ```bash
    api/venv/Scripts/activate
    ```
    - On MacOS/Linux:
    ```bash
    source api/venv/bin/activate
    ```
- Install the required packages:
    ```bash
    pip install -r api/requirements.txt
    ```
    - When installing other packages, ensure you update the `requirements.txt` file:
    ```bash
    pip freeze > api/requirements.txt
    ```


### Running the API

> Ensure you've sourced the virtual environment before running the API.
> If you haven't, refer to the steps above.
- Run the API:
    - On MacOS/Linux:
    ```bash
    python3 api/app.py
    ```
    - On Windows:
    ```bash
    python api/app.py
    ```
- The application will be running on [`http://127.0.0.1:5000/`](http://127.0.0.1:5000/).
- You can test the API by visiting [http://127.0.0.1:5000/api/test](http://127.0.0.1:5000/api/test).
    - This will return a JSON response to confirm the API is running.
    ```json
    {
        "message": "Hello World",
        "status": 200,
        "success": true
    }
    ```

## Frontend

- Install the required packages:
    ```bash
    npm install
    ```
- Run the application:
    ```bash
    npm run dev
    ```
- The application will be running on [`http://localhost:3000/`](http://localhost:3000/).
    - All API requests will be proxied to the backend API.


## Authorization 

### Authorization Code with PKCE Flow

- The Authorization Code with PKCE Flow is a more secure way to authenticate users and obtain an access token.
- The flow involves the following steps:
    1. The user is redirected to the Spotify Accounts Service to authorize the application.
    2. The user is redirected back to the application with an authorization code.
    3. The application exchanges the authorization code for an access token.
- The flow is implemented in the [`api/routes/auth.py`](/api/routes/auth.py) file.

To authorize, visit [`http://localhost:3000/api/auth`](http://localhost:3000/api/auth).
    - This will redirect you to the Spotify Accounts Service to authorize the application.
    - After authorizing, you will be redirected back to the application with an authorization code.
    - The application will exchange the authorization code for an access token and store it in a cookie.