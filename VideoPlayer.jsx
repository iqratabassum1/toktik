import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }) {
  const ref = useRef(null);

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
    <video
      ref={ref}
      autoPlay
      loop
      playsInline
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
