import React from "react";
import VideoPlayer from "./VideoPlayer";
import "./styles.css";

const videos = [
  {
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    title: "Nature Vibes 🌿",
  },
  {
    url: "https://test-streams.mux.dev/pts_shift/master.m3u8",
    title: "Tech Talk 💻",
  },
  {
    url: "https://test-streams.mux.dev/tears_of_steel/tears_of_steel.m3u8",
    title: "Short Film 🎬",
  },
];

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {videos.map((video, idx) => (
        <div
          key={idx}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            position: "relative",
            background: "black",
          }}
        >
          <VideoPlayer src={video.url} />
          {/* Overlay content */}
          <div className="overlay">
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>@username</p>
            </div>
            <div className="actions">
              <button>❤️ Like</button>
              <button>💬 Comment</button>
              <button>🔗 Share</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
