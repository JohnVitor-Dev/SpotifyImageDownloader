import axios from 'axios';
require('dotenv').config();

let accessTokenGlobal = null;
let tokenExpiryGlobal = null;

const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

const spotifyToken = axios.create({
    baseURL: 'https://accounts.spotify.com'
});

export default async function getSpotify(req, res) {
    await checkToken(accessTokenGlobal);

    if (!accessTokenGlobal) {
        return res.status(500).json({ error: 'ACCESS_TOKEN não encontrado no ambiente' });
    }

    try {
        const spotifyJson = await spotifyApi.get("/users/xd0rkwg0yhuhmayrhfdyb8a12", {
            headers: {
                Authorization: `Bearer ${accessTokenGlobal}`
            }
        });
        const spotifyData = spotifyJson.data;
        res.status(200).json(spotifyData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar a API do Spotify', details: error.message });
    }
}


async function fetchToken() {
    const response = await spotifyToken.post("/api/token",
        `grant_type=client_credentials&client_secret=${process.env.CLIENT_SECRET}&client_id=${process.env.CLIENT_ID}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    console.log(response.data);
    accessTokenGlobal = response.data.access_token;
    tokenExpiryGlobal = Date.now() + (response.data.expires_in * 1000);
}

async function checkToken(accessToken) {

    if (!accessTokenGlobal || Date.now() >= tokenExpiryGlobal) {
        await fetchToken();
    }

}
