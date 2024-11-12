export const metadata = {
  title: "Spotify Image Downloader",
  description: "Baixar imagens do Spotify",
  icons: "./SpotifyImageDownloader.png"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  );
}
