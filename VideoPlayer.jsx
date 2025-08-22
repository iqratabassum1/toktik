import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      video.src = src;
    }
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      autoPlay
      loop
      playsInline
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
