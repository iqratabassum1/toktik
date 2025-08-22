import React, { useEffect, useRef, forwardRef } from "react";
import Hls from "hls.js";

const VideoPlayer = forwardRef(({ src }, ref) => {
  const internalRef = useRef(null);
  const videoRef = ref || internalRef;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // HLS setup
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
    <video
      ref={videoRef}
      muted
      controls
      playsInline
      style={{ width: "100%", height: "100vh", objectFit: "cover" }}
    />
  );
});

export default VideoPlayer;
