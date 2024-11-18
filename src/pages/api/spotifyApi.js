import axios from 'axios';
require('dotenv').config();

let accessTokenGlobal = null;
let tokenExpiryGlobal = null;

const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const spotifyToken = axios.create({
    baseURL: 'https://accounts.spotify.com'
});

spotifyApi.interceptors.request.use((config) => {
    const token = accessTokenGlobal;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default async function getSpotify(req, res) {
    await checkToken(accessTokenGlobal);
    let spotify_Link = req.body.spotifyLink;

    if (!spotify_Link) {
        return res.status(500).json({ error: 'Link do Spotify não encontrado' });
    }

    if (!accessTokenGlobal) {
        return res.status(501).json({ error: 'ACCESS_TOKEN não encontrado no ambiente' });
    }

    let { ID, typeID } = await extractID(spotify_Link);

    if (!ID || !typeID) {
        return res.status(503).json({ error: 'O ID ou Link fornecido é inválido ou não existe.' });
    }

    try {
        const spotifyJson = await spotifyApi.get(`/${typeID}/${ID}`);
        const spotifyData = spotifyJson.data;
        res.status(200).json(spotifyData);
    } catch (error) {
        res.status(502).json({ error: 'ID incorreto', details: error.message });
    }
}

async function checkToken(accessToken) {

    if (!accessTokenGlobal || Date.now() >= tokenExpiryGlobal) {
        await fetchToken();
    }

}

async function fetchToken() {
    try {
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
        console.log("Token solicitado com sucesso");
    } catch (error) {
        console.log('Erro ao solicitar token', error.message);
    }
}


async function extractID(spotify_Link) {
    let ID = null;
    let typeID = null;

    switch (true) {
        case spotify_Link.includes('album'):
            typeID = 'albums';
            ID = spotify_Link.split('album/')[1].split('?')[0];
            break;

        case spotify_Link.includes('artist'):
            typeID = 'artists';
            ID = spotify_Link.split('artist/')[1].split('?')[0];
            break;

        case spotify_Link.includes('audiobook'):
            typeID = 'audiobooks';
            ID = spotify_Link.split('audiobook/')[1].split('?')[0];
            break;

        case spotify_Link.includes('chapter'):
            typeID = 'chapters';
            ID = spotify_Link.split('chapter/')[1].split('?')[0];
            break;

        case spotify_Link.includes('episode'):
            typeID = 'episodes';
            ID = spotify_Link.split('episode/')[1].split('?')[0];
            break;

        case spotify_Link.includes('playlist'):
            typeID = 'playlists';
            ID = spotify_Link.split('playlist/')[1].split('?')[0];
            break;

        case spotify_Link.includes('track'):
            typeID = 'tracks';
            ID = spotify_Link.split('track/')[1].split('?')[0];
            break;

        case spotify_Link.includes('user'):
            typeID = 'users';
            ID = spotify_Link.split('user/')[1].split('?')[0];
            break;

        case spotify_Link.includes('show'):
            typeID = 'shows';
            ID = spotify_Link.split('show/')[1].split('?')[0];
            break;

        default:
            ID = spotify_Link;
            typeID = await searchType(ID);
            break;
    }

    if (typeID === null) {
        ID = null;
    }

    return { ID, typeID };
}

async function searchType(ID) {
    const types = ['tracks', 'albums', 'playlists', 'artists', 'users', 'episodes', 'audiobooks', 'chapters', 'shows'];

    for (let type of types) {
        try {
            const typeGet = await spotifyApi.get(`/${type}/${ID}`);

            if (typeGet.status === 200) {
                return type;
            } else {
                console.log(`ID não encontrado no tipo ${type}. Status code: ${typeGet.status}`);
            }
        } catch (error) {
            console.log(`ID não encontrado no tipo ${type}.`);
            continue;
        }
    }

    return null;
}