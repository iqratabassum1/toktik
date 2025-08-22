import React, { useState, useRef, useEffect } from "react";
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
  const videoRefs = useRef([]);

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

  const handleShare = (platform) => {
    const demoURL = encodeURIComponent("https://example.com/demo-video");
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${demoURL}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${demoURL}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${demoURL}`;
        break;
      default:
        url = demoURL;
    }
    window.open(url, "_blank");
  };

  // IntersectionObserver for autoplay visible video
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.75 } // play when 75% visible
    );

    videoRefs.current.forEach((v) => {
      if (v) observer.observe(v);
    });

    return () => {
      videoRefs.current.forEach((v) => {
        if (v) observer.unobserve(v);
      });
    };
  }, []);

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
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
          }}
        >
          <VideoPlayer ref={(el) => (videoRefs.current[idx] = el)} src={src} />

          {/* Vertical buttons */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              bottom: "100px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {/* Like */}
            <button
              onClick={() => handleLike(idx)}
              style={{
                padding: "12px",
                borderRadius: "50%",
                border: "none",
                background: "#0f1b31",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Like {likes[idx]}
            </button>

            {/* Comment */}
            <button
              onClick={() => alert(`Commented: ${comments[idx]}`)}
              style={{
                padding: "12px",
                borderRadius: "50%",
                border: "none",
                background: "#0f1b31",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Comment
            </button>

            {/* Share Buttons with placeholders for images/icons */}
            <button
              onClick={()
