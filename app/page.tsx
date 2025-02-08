export default async function Home({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string }>
}) {
    const code = (await searchParams).code;

    // If we have a code, exchange it for an access token
    if (code) {
        try {
            const tokenResponse = await fetch(`http://localhost:3000/api/callback`, {
                method: 'POST',
                body: JSON.stringify({ code }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log("Token response", await tokenResponse.clone().text()); // Log the response body

            if (!tokenResponse.ok) {
                throw new Error(`HTTP error! status: ${tokenResponse.status}`);
            }

            const tokenData = await tokenResponse.json()

            if (tokenData.access_token) {
                const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
                    headers: {
                        Authorization: `Bearer ${tokenData.access_token}`
                    }
                });

                const userData = await userResponse.json();

                console.log(userData);

                return (
                    <div>
                        <h1>Welcome, {userData.display_name}</h1>
                        <p>Your Spotify ID is: {userData.id}</p>
                    </div>
                );
            }

        } catch (e) {
            console.error(e);
            return <div>Something went wrong</div>;
        }
    }

    // If no code, redirect to login
    return (
        <div>
            <a href="http://localhost:3000/api/auth">Login with Spotify</a>
        </div>
    );
}