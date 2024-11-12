'use client';

import { useState } from "react";
import "./style.css";

export default function Home() {
  const [spotifyImg, setSpotifyImg] = useState("./SpotifyImageDownloader.png");

  return (
    <main>
      <div className="title-container">
        <img src="./SpotifyImageDownloader.png" />
        <h1>Spotify Image Downloader</h1>
      </div>
      <div className="main-container">
        <div className="preview-container" style={{ display: "none" }}>
          <p>name</p>
          <div className="preview-img-container">
            <img className="album" src={spotifyImg} />
            <img className="disc" src="./Disc.svg" />
          </div>
          <button className="btn-grad">Download</button>
          <hr />
        </div>
        <div className="input-container">
          <div className="input-msg">
            <p>Baixe imagens de arte do Spotify de qualquer faixa, playlist, álbum, artista e perfil em alta qualidade.</p>
          </div>
          <div className="send-container">
            <input type="text" id="playlist-link" placeholder="Cole o Spotify Link Aqui" />
            <button className="btn-grad" id="send-button">Enviar</button>
          </div>
        </div>
      </div>
    </main >
  );
}
