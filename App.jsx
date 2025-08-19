import React from "react";
import VideoPlayer from "./VideoPlayer";

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  // 👉 Add more videos in public/videos folder
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
      {videos.map((src, idx) => (
        <div
          key={idx}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
          }}
        >
          <VideoPlayer src={src} />
        </div>
      ))}
    </div>
  );
}
