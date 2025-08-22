import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(v);
      return () => hls.destroy();
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = src;
    } else {
      v.src = src;
    }
  }, [src]);

  const togglePlay = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <video
        ref={ref}
        autoPlay
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Center Play/Pause Overlay */}
      <div
        onClick={togglePlay}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "50px",
          color: "white",
          opacity: 0.8,
          cursor: "pointer",
        }}
      >
        {playing ? "" : "▶️"}
      </div>

      {/* Right Side Buttons */}
      <div
        style={{
          position: "absolute",
          right: "10px",
          bottom: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          color: "white",
          fontSize: "20px",
        }}
      >
        {/* Like Button */}
        <div onClick={() => setLikes(likes + 1)} style={{ cursor: "pointer" }}>
          ❤️
          <div style={{ fontSize: "14px" }}>{likes}</div>
        </div>

        {/* Comment Button */}
        <div onClick={() => alert("Comment feature coming soon!")} style={{ cursor: "pointer" }}>
          💬
          <div style={{ fontSize: "14px" }}>Comment</div>
        </div>

        {/* Share Button */}
        <div onClick={() => alert("Share feature coming soon!")} style={{ cursor: "pointer" }}>
          ↗️
          <div style={{ fontSize: "14px" }}>Share</div>
        </div>
      </div>
    </div>
  );
}
