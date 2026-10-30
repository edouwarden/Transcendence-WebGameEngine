"use client";
import { useEffect, useState } from "react";

export default function OrientationGuard({ children }) {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const check = () => {
      const ua = navigator.userAgent;

      const isTablet = /iPad|Tablet|Android(?!.*Mobile)/i.test(ua);
      const isMobile = /Mobi|iPhone|Android/i.test(ua) && !isTablet;

      const isLandscape = window.innerWidth > window.innerHeight;

      setIsBlocked(isMobile && isLandscape);
    };

    check();

    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  if (isBlocked) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 24,
          textAlign: "center",
          background: "#050912",
          color: "#e7edf7",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="7" y="3" width="10" height="18" rx="2" stroke="#7cf56a" strokeWidth="1.6" />
          <path d="M10.5 18h3" stroke="#7cf56a" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <strong style={{ fontSize: 15, fontWeight: 600 }}>Rotate your device</strong>
        <span style={{ maxWidth: 240, color: "#8b99ae", fontSize: 12.5, lineHeight: 1.6 }}>
          Parkour Arena runs in portrait on phones. Turn your phone upright to keep playing.
        </span>
      </div>
    );
  }

  return children;
}
