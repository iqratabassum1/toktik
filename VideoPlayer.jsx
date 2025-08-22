import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { ThumbsUp, MessageCircle, Share2, Play, Pause } from "lucide-react";

export default function VideoPlayer({ src }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

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
    const v = ref.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="video-wrapper">
      <video
        ref={ref}
        autoPlay
        loop
        playsInline
        muted
        className="video-element"
        onClick={togglePlay}
      />

      {/* Overlay Controls */}
      <div className="overlay-controls">
        <button onClick={() => setLikes(likes + 1)}>
          <ThumbsUp size={28} />
          <span>{likes}</span>
        </button>
        <button onClick={() => setComments(comments + 1)}>
          <MessageCircle size={28} />
          <span>{comments}</span>
        </button>
        <button onClick={() => setShares(shares + 1)}>
          <Share2 size={28} />
          <span>{shares}</span>
        </button>
      </div>

      {/* Play/Pause Center Icon */}
      <div className="center-control" onClick={togglePlay}>
        {playing ? <Pause size={60} /> : <Play size={60} />}
      </div>
    </div>
  );
}
