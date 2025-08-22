import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src, caption, username }) {
  const ref = useRef(null);
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

  return (
    <div className="video-container">
      <video
        ref={ref}
        playsInline
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Overlay UI */}
      <div className="video-overlay">
        <div className="video-caption">
          <p className="username">{username}</p>
          <p>{caption}</p>
        </div>

        {/* Right-side actions */}
        <div className="video-actions">
          <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
          <button>💬</button>
          <button
            onClick={() =>
              navigator.share
                ? navigator.share({ title: "Check this video", url: src })
                : alert("Share not supported")
            }
          >
            ↗️
          </button>
        </div>
      </div>
    </div>
  );
}
