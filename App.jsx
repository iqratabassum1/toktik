import React, { useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";

const videos = [
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://test-streams.mux.dev/pts_shift/master.m3u8",
  "https://test-streams.mux.dev/tears_of_steel/tears_of_steel.m3u8",
];

export default function App() {
  const containerRef = useRef(null);

  // TikTok style auto play/pause when in view
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
      { threshold: 0.7 } // 70% visible
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
      {videos.map((src, idx) => (
        <div
          key={idx}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#000",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "90%",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 0 20px rgba(0,0,0,0.6)",
            }}
          >
            <VideoPlayer src={src} />
          </div>
        </div>
      ))}
    </div>
  );
}
