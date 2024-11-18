<div align="center">
    <h1>Spotify Image Downloader</h1>
    <img src="https://img.shields.io/badge/Status-Concluído-brightgreen" alt="Badge">
</div>

## **Descrição**
O **Spotify Image Downloader** é uma aplicação que permite aos usuários fazer o download de imagens relacionadas a conteúdos do Spotify, como Álbuns, Artistas, Audiobooks, Capítulos, Episódios, Playlists, Podcasts, Faixas, Usuários e Shows. É ideal para quem deseja capturar imagens diretamente do Spotify sem complicações.

---

## **Funcionalidades**
- 🎵 Suporte para a maioria de tipos de link.
- 🔎 Identificação automática do tipo de link do Spotify.
- 🔑 Suporte a busca por ID
- 📥 Download direto da imagem relacionada ao conteúdo.
- ❌ Mensagens de erro claras quando o link ou ID for inválido.

---

## **Tipos de Links Suportados**

- 🎵 **Álbum**: `album/`
- 🎤 **Artista**: `artist/`
- 📚 **Audiobook**: `audiobook/`
- 📖 **Capítulo**: `chapter/`
- 🎙️ **Episódio**: `episode/`
- 📂 **Playlist**: `playlist/`
- 🎧 **Faixa**: `track/`
- 👤 **Usuário**: `user/`
- 🎶 **Show (Podcast)**: `show/`

---

## **Como Usar**
1. Cole o link ou ID do conteúdo do Spotify no campo de entrada.
2. Clique no botão "Baixar Imagem".
3. A imagem será baixada automaticamente ou uma mensagem de erro será exibida caso o conteúdo seja inválido.

---

## **Exemplo de Uso**

| Tipo de Conteúdo       | Exemplo de Link do Spotify                                  |
|------------------------|-----------------------------------------------------------|
| 📚 **Audiobook**        | `https://open.spotify.com/audiobook/7tpR91mg2XpmQGo87GeIJv` |
| 🎵 **Álbum (Album)**    | `https://open.spotify.com/album/3HFbH1loOUbqCyPsLuHLLh`     |
| 🎤 **Artista (Artist)** | `https://open.spotify.com/artist/0epOFNiUfyON9EYx7Tpr6V`    |
| 📖 **Capítulo (Chapter)**| `https://open.spotify.com/chapter/1u8gcxdS3Quj3bWS6Ykejt`  |
| 🎙️ **Episódio (Episode)**| `https://open.spotify.com/episode/1OlktOmXNNABcqlhpLZc7B` |
| 📂 **Playlist**         | `https://open.spotify.com/playlist/0kuFboVydsEiEgiCEnKOBK`  |
| 🎧 **Faixa (Track)**    | `https://open.spotify.com/track/57Xjny5yNzAcsxnusKmAfA`     |
| 👤 **Usuário (User)**    | `https://open.spotify.com/user/xd0rkwg0yhuhmayrhfdyb8a12`  |
| 🎶 **Show (Podcast)**    | `https://open.spotify.com/show/3U17J8f2btTTD5PH4R8bGU`  |

---

## **Tecnologias Utilizadas**
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: Spotify Web API

---

## **Como Instalar e Usar**

### **Pré-requisitos**
- **Node.js** (v16 ou superior)
- Uma conta **Spotify Developer** para obter uma API Key.

---

### **Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/JohnVitor-Dev/SpotifyImageDownloader.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd SpotifyImageDownloader
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### **Configuração**
1. Crie um arquivo `.env` na raiz do projeto e adicione sua API Key do Spotify:
   ```env
    Client_ID=suachaveaqui
    Client_Secret=suachaveaqui
   ```
2. Certifique-se de ter configurado o redirect URI no Spotify Developer Dashboard.

### **Execução**
- Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
- Acesse a aplicação no navegador em `http://localhost:3000`.

---

## **Possíveis Melhorias**
- 📱 Interface responsiva para dispositivos móveis.
- 🔒 Autenticação via OAuth com Spotify.
- 🖼️ Suporte para download de imagens em diferentes resoluções.

---

## **Contribuição**
Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do projeto.
2. Crie um branch para sua funcionalidade:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Faça um pull request.

---

## **Contato**
- **Instagram**: [John Vitor](https://www.instagram.com/john_vitor_costa)
- **Email**: primaryjotavee@gmail.com  
- **GitHub**: [github.com/JohnVitor-Dev](https://github.com/JohnVitor-Dev)  
