'use client';

import { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Home() {
  const [spotifyImg, setSpotifyImg] = useState("./SpotifyImageDownloader.png");
  const [spotifyName, setSpotifyName] = useState("Name");
  const [preview, setPreview] = useState("none");
  const [alertMsg, setalertMsg] = useState("");

  const spotifyLink = useRef();

  async function getSpotifyData() {
    setalertMsg("");

    const response = await fetch('/api/spotifyApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spotifyLink: spotifyLink.current.value })
    });

    if (response.status !== 200) {
      setalertMsg("Link inválido");
      setSpotifyImg("./SpotifyImageDownloader.png");
      setSpotifyName("none");
      return;
    }

    const data = await response.json();

    if (data.error) {
      setalertMsg(data.error);
      return;
    }

    if (data.images.length === 0) {
      setalertMsg("Imagem não encontrada");
      setSpotifyImg("./SpotifyImageDownloader.png");
    } else if (data.images[0].url === null) {
      setalertMsg("Imagem não encontrada");
      setSpotifyImg("./SpotifyImageDownloader.png");
    } else {
      setSpotifyImg(data.images[0].url);
    }

    if (data.display_name === null) {
      setalertMsg("Nome não encontrado");
      setSpotifyName("none");
    } else {
      setSpotifyName(data.display_name);
    }

    setPreview("flex");
  }


  return (
    <main>
      <div className="title-container">
        <img src="./SpotifyImageDownloader.png" />
        <h1>Spotify Image Downloader</h1>
      </div>
      <div className="main-container">
        <div className="input-container">
          <div className="input-msg">
            <h3>Spotify Artista | Álbum | Faixa</h3>
            <p>Baixe imagens de arte do Spotify de qualquer faixa, playlist, álbum, artista e perfil em alta qualidade.</p>
          </div>
          <div className="send-container">
            <input type="text" id="playlist-link" placeholder="Cole o Spotify Link Aqui" ref={spotifyLink} />
            <button className="btn-grad" id="send-button" onClick={getSpotifyData}>Enviar</button>
          </div>
          <p style={{ color: "#ff2e2e" }}>{alertMsg}</p>
        </div>
        <hr />
        <div className="preview-container" style={{ display: `${preview}` }}>
          <p>{spotifyName}</p>
          <div className="preview-img-container">
            <img className="album" src={spotifyImg} />
            <img className="disc" src="./Disc.svg" />
          </div>
          <button className="btn-grad">Download</button>
        </div>
      </div>
    </main >
  );
}
