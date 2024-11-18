'use client';

import { useState, useRef } from "react";
import "./style.css";

export default function Home() {
  const [spotifyImg, setSpotifyImg] = useState("./SpotifyImageDownloader.png");
  const [spotifyName, setSpotifyName] = useState("Name");
  const [preview, setPreview] = useState("none");
  const [alertMsg, setalertMsg] = useState("");
  const [downloadName, setDownloadName] = useState("SpotifyImage.png");

  const spotifyLink = useRef();

  async function getSpotifyData() {
    setalertMsg("");
    setSpotifyImg("./SpotifyImageDownloader.png");
    setSpotifyName("none");
    setDownloadName("SpotifyImage.png");

    const response = await fetch('/api/spotifyApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spotifyLink: spotifyLink.current.value })
    });

    const data = await response.json();

    if (response.status !== 200) {
      setalertMsg(data.error);
      setSpotifyImg("./SpotifyImageDownloader.png");
      setSpotifyName("none");
      setDownloadName("SpotifyImage.png");
      return;
    }

    if ((!data.images?.length && !data.album?.images?.length) ||
      (data.images?.[0]?.url === null && data.album?.images?.[0]?.url === null)) {
      setalertMsg("Imagem não encontrada");
      setSpotifyImg("./SpotifyImageDownloader.png");
      setDownloadName("SpotifyImage.png");
    } else {
      setSpotifyImg(data.images?.[0]?.url || data.album?.images?.[0]?.url || "./SpotifyImageDownloader.png");
    }

    if (!data.display_name && !data.name) {
      setalertMsg("Nome não encontrado");
      setSpotifyName("none");
      setDownloadName("SpotifyImage.png");
    } else {
      setSpotifyName(data.display_name || data.name || "none");
      setDownloadName(`${data.display_name}.jpeg` || `${data.name}.jpeg` || "SpotifyImage.png");
    }

    setPreview("flex");
  }

  async function downloadImage() {
    if (spotifyImg === "./SpotifyImageDownloader.png") {
      setalertMsg("Imagem não encontrada");
      return;
    }
    try {
      const response = await fetch(spotifyImg);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = downloadName;
      link.click();
      URL.revokeObjectURL(link.href);
      console.log("Download");
    } catch (error) {
      console.error('Erro ao baixar a imagem:', error);
    }
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
            <input type="text" id="playlist-link" placeholder="Cole o Spotify Link ou o ID Aqui" ref={spotifyLink} />
            <button className="btn-grad" id="send-button" onClick={getSpotifyData}>Enviar</button>
          </div>
          <p style={{ color: "#ff2e2e" }}>{alertMsg}</p>
        </div>
        <hr />
        <div className="preview-container" style={{ display: `${preview}` }}>
          <div className="name"><p>{spotifyName}</p></div>
          <div className="preview-img-container">
            <img className="album" src={spotifyImg} />
            <img className="disc" src="./Disc.svg" />
          </div>
          <button className="btn-grad" onClick={downloadImage}>Download</button>
        </div>
      </div>
    </main >
  );
}
