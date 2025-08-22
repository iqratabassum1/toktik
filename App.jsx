import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const videos = [
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://test-streams.mux.dev/pts_shift/master.m3u8",
  "https://test-streams.mux.dev/tears_of_steel/tears_of_steel.m3u8",
];

export default function App() {
  const [likes, setLikes] = useState(Array(videos.length).fill(0));

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {videos.map((src, idx) => (
        <div
          key={idx}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            position: "relative",
          }}
        >
          <VideoPlayer src={src} autoPlay={idx === 0} />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={() => handleLike(idx)}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #1e293b",
                background: "#0f1b31",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              👍 Like {likes[idx]}
            </button>
            <button
              onClick={() => alert("Shared!")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #1e293b",
                background: "#0f1b31",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              🔗 Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
