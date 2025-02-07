# Changelog
> Last updated: `2025-02-06`
> - [Initial commit & setup](#)
>   - [@clxrityy](https://github.com/clxrityy)

# OUTLINE

- [Initial commit & setup](#initial-commit--setup) | [@clxrityy](https://github.com/clxrityy)

## Contributers

Whenever you make a change to the project, please update the changelog with a brief description of the change. This will help keep track of the project's progress and make it easier for others to understand what has been done.

1. Update the **last updated** date at the top of the changelog.
    - Include the date in the format `YYYY-MM-DD`.
    - Include a link to the heading that describes the change.
        - Include your GitHub username in the format `[@username](https://github.com/username)`
    ```md
    # Changelog
    > Last updated: `2025-02-06`
    > - [Brief title](#brief-title)
    >   - [@username](https://github.com/username)
    ```
2. Add your change
    - Create a new heading for your change in the format `## Brief title`.
        - By default, add it to the bottom of the page.
        - If your change is related to an existing heading, add it to that heading.
        - Next, include a blockquote with the date of the change (if applicable) & your GitHub username.
        ```md
        ## Brief title
        > `YYYY-MM-DD` | [@username](https://github.com/username)
        ```
    - Add any necessary details about the change.
    - Include any link(s) or external resources that are relevant to the change.
    - Add a link to the heading to the changelog outline (in its respective section).
    ```md
    - [Brief title](#brief-title) | [@username](https://github.com/username)
    ```
    - If applicable, add a `##### Resources` and/or `##### References` section with links to relevant resources.
3. Add your changelog entry to the outline at the top of the page.

---

## Initial commit & setup
> `2025-02-06` | [@clxrityy](https://github.com/clxrityy)

- Set up the initial API structure with Flask.
- Added a basic HTML template for the frontend.
    - With some simple styles.
- Created a virtual environment for the API.
    - See [API SEtup](./README.md#api-setup) for more details.
- The API runs on port `5000` by default.
    - See [Running the API](./README.md#running-the-api) for more details.
- Set up the test API endpoint.
    - `/api/test`
    - Returns a simple JSON response.

##### Resources / References

- [clxrityy/next-spotify-stats](https://github.com/clxrityy/next-spotify-stats/blob/main/api/index.py)
- [Web API | Spotify](https://developer.spotify.com/documentation/web-api)
- [Quickstart — Flask Documentation](https://flask.palletsprojects.com/en/stable/quickstart/)