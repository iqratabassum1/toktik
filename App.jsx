import React from "react";
import VideoPlayer from "./VideoPlayer";
import "./styles.css";

const videos = [
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://test-streams.mux.dev/pts_shift/master.m3u8",
  "https://test-streams.mux.dev/tears_of_steel/tears_of_steel.m3u8",
];

export default function App() {
  return (
    <div className="app-container">
      {videos.map((src, idx) => (
        <div key={idx} className="video-frame">
          <VideoPlayer src={src} />
        </div>
      ))}
    </div>
  );
}
