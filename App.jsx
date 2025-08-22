import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const videos = [
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://test-streams.mux.dev/pts_shift/master.m3u8",
  "https://test-streams.mux.dev/tears_of_steel/tears_of_steel.m3u8",
  "https://test-streams.mux.dev/bbb/bbb.m3u8",
  "https://test-streams.mux.dev/elephantsdream/elephantsdream.m3u8",
  "https://test-streams.mux.dev/sintel/sintel.m3u8",
];

export default function App() {
  const [likes, setLikes] = useState(Array(videos.length).fill(0));
  const [comments, setComments] = useState(Array(videos.length).fill(""));

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  const handleCommentChange = (index, value) => {
    const newComments = [...comments];
    newComments[index] = value;
    setComments(newComments);
  };

  const handleShare = (src, platform) => {
    let url = "";
    const encoded = encodeURIComponent(src);

    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encoded}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encoded}`;
        break;
      default:
        url = src;
    }

    window.open(url, "_blank");
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

          {/* Like & Share buttons */}
          <div
            style={{
              position: "absolute",
              bottom: "100px",
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
              onClick={() => handleShare(src, "whatsapp")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #1e293b",
                background: "#0f1b31",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              📱 WhatsApp
            </button>
            <button
              onClick={() => handleShare(src, "facebook")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #1e293b",
                background: "#0f1b31",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              📘 Facebook
            </button>
            <button
              onClick={() => handleShare(src, "twitter")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #1e293b",
                background: "#0f1b31",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              🐦 Twitter
            </button>
          </div>

          {/* Comment box */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              display: "flex",
              gap: "8px",
              width: "80%",
              maxWidth: "500px",
            }}
          >
            <input
              type="text"
              placeholder="Add a comment..."
              value={comments[idx]}
              onChange={(e) => handleCommentChange(idx, e.target.value)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid #1e293b",
                background: "#0f1b31",
                color: "#fff",
              }}
            />
            <button
              onClick={() => alert(`Commented: ${comments[idx]}`)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: "0",
                background: "#60a5fa",
                color: "#071427",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
