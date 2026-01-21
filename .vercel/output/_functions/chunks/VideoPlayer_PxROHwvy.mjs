import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

const LiveCaptions = ({ videoRef }) => {
  const [caption, setCaption] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!videoRef.current) return;
    let interval;
    const mockCaptions = [
      "Selamat datang kembali di StreamID.",
      "Kami sedang menyiarkan konten terbaru untuk Anda.",
      "Nikmati pengalaman menonton dengan kualitas terbaik.",
      "Berita terkini akan segera hadir sejenak lagi.",
      "Saksikan terus program favorit Anda hanya di sini.",
      "AI Transcription sedang mengoptimalkan teks...",
      "Terima kasih telah setia menonton bersama kami.",
      "Koneksi stabil, kualitas HD diaktifkan.",
      "Jangan lupa untuk menyimpan channel ini di watchlist."
    ];
    const showMockCaptions = () => {
      interval = setInterval(() => {
        const text = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];
        setCaption(text);
        setIsVisible(true);
        const hideTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 3500);
        return () => clearTimeout(hideTimeout);
      }, 6e3);
    };
    showMockCaptions();
    return () => clearInterval(interval);
  }, []);
  if (!caption) return null;
  return /* @__PURE__ */ jsxs("div", { style: {
    position: "absolute",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    pointerEvents: "none",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? "blur(0)" : "blur(4px)"
  }, children: [
    /* @__PURE__ */ jsx("div", { style: {
      background: "rgba(225, 29, 72, 0.9)",
      color: "white",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "0.65rem",
      fontWeight: 800,
      letterSpacing: "1px",
      textTransform: "uppercase",
      boxShadow: "0 4px 12px rgba(225, 29, 72, 0.3)"
    }, children: "AI LIVE" }),
    /* @__PURE__ */ jsx("div", { style: {
      background: "rgba(15, 17, 21, 0.85)",
      backdropFilter: "blur(12px)",
      color: "#fff",
      padding: "12px 28px",
      borderRadius: "16px",
      fontSize: "1.1rem",
      fontWeight: 600,
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      maxWidth: "100%",
      lineHeight: 1.5,
      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      transform: isVisible ? "translateY(0)" : "translateY(10px)"
    }, children: caption })
  ] });
};

function VideoPlayer({ url }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hlsRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const setupPlayer = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (!url || url.trim() === "") {
          setError("Tautan siaran tidak tersedia.");
          setIsLoading(false);
          return;
        }
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
        const isMp4 = url.toLowerCase().includes(".mp4");
        if (isMp4) {
          video.src = url;
          video.addEventListener("loadedmetadata", () => {
            setIsLoading(false);
            video.play().catch(() => {
            });
          });
          video.addEventListener("error", () => {
            setError("Gagal memutar video MP4. Pastikan tautan masih aktif.");
            setIsLoading(false);
          });
          return;
        }
        if (Hls.isSupported()) {
          const hls = new Hls({
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 60
          });
          hlsRef.current = hls;
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(url);
          });
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
            video.play().catch((err) => {
              console.log("Autoplay blocked:", err);
            });
          });
          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS Error:", data.type, data.details, data.url);
            if (data.fatal) {
              setIsLoading(false);
              if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                console.log("Network error details:", data);
                setError("Masalah jaringan/CORS. Server streaming mungkin memblokir akses dari domain ini.");
              } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                setError("Kesalahan media. Mencoba memulihkan...");
                hls.recoverMediaError();
              } else {
                setError("Gagal memuat siaran. Server mungkin memerlukan izin khusus.");
                hls.destroy();
              }
            }
          });
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = url;
          video.addEventListener("loadedmetadata", () => {
            setIsLoading(false);
            video.play().catch(() => {
            });
          });
          video.addEventListener("error", () => {
            setError("Browser tidak dapat memutar format ini secara native.");
            setIsLoading(false);
          });
        } else {
          setError("Browser Anda tidak mendukung teknologi streaming HLS.");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Terjadi kesalahan sistem saat memutar video.");
        setIsLoading(false);
      }
    };
    setupPlayer();
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url]);
  return /* @__PURE__ */ jsxs("div", { className: "player-wrapper", style: { width: "100%", height: "100%", position: "relative", background: "#000", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsx("div", { className: "overlay", style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      padding: "20px",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
      zIndex: 5,
      display: isLoading ? "none" : "block"
    }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
      /* @__PURE__ */ jsx("div", { style: { width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 10px #22c55e" } }),
      /* @__PURE__ */ jsx("span", { style: { color: "#fff", fontSize: "12px", fontWeight: 800, letterSpacing: "1px", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }, children: "LIVE STREAMING" })
    ] }) }),
    error && /* @__PURE__ */ jsxs("div", { className: "error-display", style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(6, 9, 15, 0.95)",
      color: "#f8fafc",
      padding: "2rem",
      textAlign: "center",
      zIndex: 10,
      backdropFilter: "blur(10px)"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: /* @__PURE__ */ jsx("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }) }),
      /* @__PURE__ */ jsx("h3", { style: { marginBottom: "0.5rem", color: "#38bdf8" }, children: "Oops! Gangguan Siaran" }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: "0.9rem", color: "#94a3b8", maxWidth: "350px", lineHeight: "1.6", marginBottom: "1rem" }, children: error }),
      /* @__PURE__ */ jsxs("div", { style: { fontSize: "0.8rem", color: "#64748b", marginBottom: "1.5rem", textAlign: "left", maxWidth: "320px" }, children: [
        /* @__PURE__ */ jsx("strong", { children: "Solusi:" }),
        /* @__PURE__ */ jsxs("ul", { style: { marginTop: "0.5rem", paddingLeft: "1.2rem" }, children: [
          /* @__PURE__ */ jsx("li", { children: "Server streaming mungkin memblokir akses dari domain ini" }),
          /* @__PURE__ */ jsx("li", { children: "Coba gunakan VPN atau browser berbeda" }),
          /* @__PURE__ */ jsx("li", { children: "Pilih channel Indonesia lainnya" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.location.reload(),
          style: {
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            background: "#38bdf8",
            border: "none",
            borderRadius: "12px",
            color: "#06090f",
            fontWeight: 700,
            cursor: "pointer"
          },
          children: "Coba Segarkan"
        }
      )
    ] }),
    isLoading && !error && /* @__PURE__ */ jsxs("div", { className: "loading-state", style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#06090f",
      zIndex: 8
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "spinner", style: {
        width: "50px",
        height: "50px",
        border: "3px solid rgba(56, 189, 248, 0.1)",
        borderTop: "3px solid #38bdf8",
        borderRadius: "50%",
        animation: "spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite"
      } }),
      /* @__PURE__ */ jsx("p", { style: { marginTop: "1.5rem", color: "#94a3b8", fontSize: "0.9rem", letterSpacing: "1px" }, children: "MENYAMBUNGKAN..." }),
      /* @__PURE__ */ jsx("style", { children: `
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          ` })
    ] }),
    /* @__PURE__ */ jsx(
      "video",
      {
        ref: videoRef,
        controls: true,
        playsInline: true,
        muted: false,
        autoPlay: false,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "#000",
          display: "block"
        },
        onLoadedData: () => console.log("Video loaded successfully"),
        onError: (e) => console.error("Video element error:", e)
      }
    ),
    !isLoading && !error && /* @__PURE__ */ jsx(LiveCaptions, { videoRef })
  ] });
}

export { VideoPlayer as V };
