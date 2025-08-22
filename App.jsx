import React, { useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";

const videos = [
  {
    src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    user: "@naturelover",
    caption: "Exploring the beauty of mountains 🏔️✨",
  },
  {
    src: "https://test-streams.mux.dev/pts_shift/master.m3u8",
    user: "@tech_guru",
    caption: "Future of AI and Robotics 🤖🚀",
  },
  {
    src: "https://test-streams.mux.dev/tears_of_steel/tears_of_steel.m3u8",
    user: "@cinemagic",
    caption: "Short film scene 🎬🔥",
  },
];

export default function App() {
  const containerRef = useRef(null);

  // auto play / pause logic
  useEffect(() => {
    const container = containerRef.current;
    const videos = container.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      videos.forEach((video) => observer.unobserve(video));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {videos.map((vid, idx) => (
        <div
          key={idx}
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
            scrollSnapAlign: "start",
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Video */}
          <VideoPlayer src={vid.src} />

          {/* Overlay (TikTok style) */}
          <div
            style={{
              position: "absolute",
              bottom: "100px",
              left: "20px",
              color: "white",
              fontSize: "16px",
              textShadow: "0 0 6px rgba(0,0,0,0.7)",
            }}
          >
            <div style={{ fontWeight: "600", marginBottom: "6px" }}>
              {vid.user}
            </div>
            <div>{vid.caption}</div>
          </div>

          {/* Right side buttons */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              bottom: "120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              color: "white",
            }}
          >
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              ❤️
              <div style={{ fontSize: "12px" }}>1.2k</div>
