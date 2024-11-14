'use client';

import { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Home() {
  const [spotifyImg, setSpotifyImg] = useState("./SpotifyImageDownloader.png");
  const [spotifyName, setSpotifyName] = useState("Name");
  const [preview, setPreview] = useState("none");

  const spotifyLink = useRef();

  async function getSpotifyData() {
    const response = await fetch('/api/spotifyApi');
    const data = await response.json();
    setSpotifyImg(data.images[0].url);
    setSpotifyName(data.display_name);
    setPreview("flex");
    console.log(spotifyLink.current.value);
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
        </div>
        <hr style={{ display: `none` }} />
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
