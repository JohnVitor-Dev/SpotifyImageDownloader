import axios from 'axios';
require('dotenv').config();

let tokenExpiry = null;

const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

export default async function getSpotify(req, res) {
    const accessToken = process.env.ACCESS_TOKEN;

    if (!accessToken) {
        return res.status(500).json({ error: 'ACCESS_TOKEN não encontrado no ambiente' });
    }

    try {
        const spotifyJson = await spotifyApi.get("/users/xd0rkwg0yhuhmayrhfdyb8a12", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const spotifyData = spotifyJson.data;
        res.status(200).json(spotifyData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar a API do Spotify', details: error.message });
    }
}


// async function fetchToken() {
//     const response = await axios.post('https://accounts.spotify.com/api/token', null, {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         data: {
//             grant_type: 'client_credentials',
//             client_id: process.env.Client_ID,
//             client_secret: process.env.Client_Secret
//         }
//     });

//     accessToken = response.data.access_token;
//     tokenExpiry = Date.now() + response.data.expires_in * 1000; // Expiração em milissegundos
// }

// Verifica se o token é válido
// async function checkToken() {
//   if (!accessToken || Date.now() > tokenExpiry) {
//     await fetchToken();
//   }
// }

// Configuração do Axios para incluir o token de autorização


// Interceptor para verificar o token antes de cada requisição
// spotifyApi.interceptors.request.use(async (config) => {
//   await checkToken(); // Checa se o token é válido e o renova se necessário
//   config.headers['Authorization'] = `Bearer ${accessToken}`;
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// Função para buscar informações do artista
// async function fetchArtistInfo(artistId) {
//   try {
//     const response = await spotifyApi.get(`/artists/${artistId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao buscar informações do artista:', error);
//     throw error;
//   }
// }

