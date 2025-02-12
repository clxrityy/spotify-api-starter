# Changelog
> Last updated: `2025-02-12`
> - [Search for artists and tracks](#search-for-artists-and-tracks)

# OUTLINE

- ```2025-02-06``` | [Initial commit & setup](#initial-commit--setup)
- ```2025-02-07``` | [Setting up the frontend (Next.js)](#setting-up-the-frontend-nextjs)
    - [NPM Setup](#npm-setup)
    - [App structure setup](#app-structure-setup)
    - [Integrating the API with the frontend](#integrating-the-api-with-the-frontend)
-  ```2025-02-08``` | [Implement Authorization](#implement-authorization)
- ```2025-02-08``` | [Accessed user data on the frontend](#accessed-user-data-on-the-frontend)
    - [Authorization flow](#authorization-flow)
    - [Accessing user data](#accessing-user-data)
- ```2025-02-10``` | [Top 10 Artists & Tracks](#top-10-artists--tracks)
- ```2025-02-12``` | [Search for artists and tracks](#search-for-artists-and-tracks)
    - [Client-side display](#client-side-display)

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
    - ```YYYY-MM-DD``` [Brief title](#brief-title)
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

---

## Setting up the frontend (Next.js)
> `2025-02-07` | [@clxrityy](https://github.com/clxrityy)

- [NPM Setup](#npm-setup)
    - [NPM Scripts](#npm-scripts)
- [App structure setup](#app-structure-setup)
- [Integrating the API with the frontend](#integrating-the-api-with-the-frontend)


### NPM Setup
- Initiated a npm project.
- Installed the following dependencies for a [Next.js](https://nextjs.org/) project:
    - `next`
    - `react`
    - `react-dom`
- Installed additional dependencies for styling and utiility:
    - `tailwindcss`
    - `@tailwindcss/postcss`
    - `postcss`
    - `concurrently`

#### NPM Scripts
- Added the following scripts to the `package.json` file:
    ```json
    {
        "scripts": {
            "api-dev": "source api/venv/bin/activate && python api/app.py",
            "next-dev": "next dev",
            "dev": "concurrently \"pnpm run next-dev\" \"pnpm run api-dev\""
        },
    }
    ```

### App structure setup
- Set up the following files & directories:
    ```r
    |-- app/
    |   |-- layout.tsx # Main layout component for the app
    |   |-- page.tsx # Home page
    |   |-- globals.css # Initiliaze Tailwind CSS
    |-- public/ # Static assets
    |   |-- ...
    |-- package.json # NPM dependencies
    |-- tailwind.config.ts # Tailwind CSS configuration
    |-- tsconfig.json # TypeScript
    |-- postcss.config.ts # PostCSS configuration
    |-- next.config.ts # Next.js configuration
    |-- next-env.d.ts # Next.js environment variables
    ```

### Integrating the API with the frontend

- Altered the next.config.ts file to include rewrites and headers.
    ```ts
    const nextConfig: NextConfig = {
        rewrites: async () => {
            return [
                {
                    source: "/api/:path*",
                    destination: process.env.NODE_ENV === 'development' ? "http://127.0.0.1:5000/api/:path*" : "/api/"
                }
            ]
        },
        async headers() {
            return [
                {
                    // matching all API routes
                    // https://vercel.com/guides/how-to-enable-cors
                    source: "/api/:path*",
                    headers: [
                        { key: "Access-Control-Allow-Credentials", value: "true" },
                        { key: "Access-Control-Allow-Origin", value: "*" },
                        {
                            key: "Access-Control-Allow-Methods",
                            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                        },
                        {
                            key: "Access-Control-Allow-Headers",
                            value:
                                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                        },
                    ],
                },
            ];
        },
    }
    ```
---

## Implement Authorization 
> `2025-02-08` | [@clxrityy](https://github.com/clxrityy)

- [Authorization Code with PKCE Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)
    - Added the following endpoints to the API:
        - `/api/auth`
        - `/api/callback`
- Changed the `redirect_uri` from `http://localhost:5000/api/callback` to `http://localhost:3000`.
- Set up a code challenge and code verifier for the authorization code flow.
- You can now access user data after authorization.

---

## Accessed user data on the frontend

> `2025-02-08` | [@clxrityy](https://github.com/clxrityy)

- I added these server actions:
    - `setTokens()`: Sets the access and refresh tokens in the cookies.
    - `getToken()`: Gets the access token from the cookies.
    - `deleteToken()`: Deletes the access token from the cookies.

### Authorization flow

1. User navigates to the main route (`/`) ([`http://localhost:3000`](http://localhost:3000)).
2. The `page.tsx` component checks if the user is authenticated by calling the `getToken()` function.
    - If the user has a valid access token, they are considered authenticated.
3. By default (before authentication), the user can click the *"Login with Spotify"* button which redirects them to the `/api/auth` endpoint.
    - This endpoint generates the authorization URL and redirects the user to Spotify's authorization page.
    - The user is prompted to log in to their Spotify account and authorize the application.
4. After authorization, Spotify sends the user back to the redirect URI (`http://localhost:3000`) with an authorization code in the URL.
    - The `/api/callback` endpoint handles the callback from Spotify.
    - It exchanges the authorization code for an access token and refresh token.
    - The tokens are then stored in cookies using the `setTokens()` function.
5. The user is redirected back to the main route (`/`) where they are now authenticated.

<img src="./public/svg/auth_flow.svg" width="50%" />

### Accessing user data

- Once the user is authenticated, the `page.tsx` component fetches the user's data from the [`https://api.spotify.com/v1/me`](https://api.spotify.com/v1/me) endpoint using the access token.
    - If the response is successful, the user's data is stored in state and displayed on the page.

### Resources / References

- [Functions: cookies | Next.js](https://nextjs.org/docs/app/api-reference/functions/cookies)
    - **Note**: The cookie documentation suggests you can use `cookies()` from `next/headers` within a server component, but this is not the case. You must use `cookies()` within a server action and then call it from a **client** component with `useEffect()` to access the cookies on the client side.
        - Reference: [Setting cookie in server action gives me an error | Reddit](https://www.reddit.com/r/nextjs/comments/1flih2p/comment/lo6e83l/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
- [Authorization Code Flow with Proof Key for Code Exchange (PKCE) | Spotify for Developers](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)
- [Error: NEXT_REDIRECT](https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes)

---

## Top 10 Artists & Tracks

> `2025-02-10` | [@clxrityy](https://github.com/clxrityy)

When clicking the user button (top right corner) (must be logged in), you can see your top 10 artists and tracks.
- The data is fetched from the backend API endpoint (`/api/auth/profile/top/<type>`) where `<type>` can be either `artists` or `tracks`.
    - The endpoint fetches the user's top 10 artists or tracks from Spotify.
- The data is displayed in a modal on the frontend.

### References

- [`app/profile/[id]/page.tsx`](/src/app/(routes)/profile/[id]/page.tsx)
- [`api/routes/auth/profile/top.py`](/api//routes/auth/profile/top.py)

---

## Search for artists and tracks

> `2025-02-12` | [@clxrityy](https://github.com/clxrityyy)

You can now search for artists and tracks using the search bar(s) on the homepage.
- The search bar queries the backend API endpoint (`/api/search/<type>/<query>`) where `<type>` can be either `artist` or `track`.
    - The endpoint fetches the search results from Spotify. (`https://api.spotify.com/v1/search`)

### Client-side display

- The search results are displayed as the query is typed.
    - If the user clicks out of the area of focus, the search results are no longer visible.
- (For now) only **1** artist or track is displayed at a time.

Many hooks and components were created to handle the search functionality.

- Installed `lodash` for debouncing the search queries.

```tsx
"use client";
// ...
import {
    useCallback,
    // ...
} from "react";
import debouce from "lodash/debounce";

const debouncedSearch = useCallback(debouce(async (searchQuery: string) => {
    // ...
}, 300), [
    // ...
])
```

> See [`Search.tsx`](/src/components/ui/Search.tsx) for more details.

### References

- [`api/routes/search/routes.py`](/api/routes/search/routes.py)
- [`src/components/ui/Search.tsx`](/src/components/ui/Search.tsx)
- [`src/components/SearchResults.tsx`](/src/components/SearchResults.tsx)
- [Web API Reference | Search](https://developer.spotify.com/documentation/web-api/reference/search)
- [Debouncing in React | Medium](https://medium.com/@manigandham/debouncing-react-events-with-react-hooks-2f1d6f5c2467)
- [How to use debounce hooks in React](https://stackoverflow.com/questions/75556418/how-to-use-debounce-hooks-in-react)