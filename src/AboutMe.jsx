import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";

import bgVideo from "./assets/main1.mp4";

import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: [
      "Hi! I'm Anson, a second-year computer engineering student at UBC.",
      "Born in Hong Kong, raised in Australia for 15 years.",
      "Passionate about software engineering and machine learning.",
      "I enjoy tennis, trumpet, and League of Legends.",
    ],
    lower: "current mains: ahri and shen",
  },
  {
    upper: [
      "Education: University of British Columbia",
      "Major: Computer Engineering",
      "Dean's List: 2024W, 2025W",
    ],
    lower: "expected graduation: 2029",
  },
  {
    upper: [
      "Currently working on:",
      "NLP engine for sentiment analysis + reporting.",
      "OpenCV cursed-technique hand sign project.",
      "Learning system design + scalable backend architecture.",
    ],
    lower: "also trying to hit plat in league",
  },
];

const ROLES = [
  { text: "LEADER" },
  { text: "PARTY" },
  { text: "PARTY" },
];

const ITEMS = [
  { id: "profile", label: "PROFILE" },
  { id: "education", label: "EDUCATION" },
  { id: "goals", label: "CURRENTLY WORKING ON" },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!revealed) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((i) => Math.max(0, i - 1));
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((i) => Math.min(ITEMS.length - 1, i + 1));
        }
      }

      if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        setRevealed(true);
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setRevealed(false);
      }

      if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, revealed]);

  const handleMouseEnter = (index) => {
    if (!revealed) {
      setActive(index);
    }
  };

  const handleClick = (index) => {
    if (revealed) {
      // If revealed, clicking again could close it
      setRevealed(false);
    } else {
      setActive(index);
      setRevealed(true);
    }
  };

  return (
    <div id="menu-screen">
      <video
        className="sc-bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* OVERLAY - Only show when revealed */}
      {revealed && (
        <div className="sc-overlay">
          <div className="sc-dim" onClick={() => setRevealed(false)} />
          
          <div className="sc-main-portrait-shell">
            <img
              className="sc-main-portrait"
              src={MAIN_IMAGES[active]}
              alt=""
            />
          </div>

          <div className="sc-reveal-panel">
            <div className="sc-reveal-upper-bar">
              {REVEAL_CONTENT[active].upper.map((line, idx) => (
                <div className="sc-reveal-upper-line" key={idx}>
                  {line}
                </div>
              ))}
            </div>

            <div className="sc-reveal-lower-bar">
              {REVEAL_CONTENT[active].lower}
            </div>
          </div>

          <div className="sc-right-nav">
            <span className="sc-nav-arrow left">◄</span>
            <span className="sc-nav-btn">LB</span>
            <span className="sc-nav-dot" />
            <span className="sc-nav-btn">RB</span>
            <span className="sc-nav-arrow right">►</span>
          </div>
        </div>
      )}

      <div className="sc-root">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`
              sc-bar-outer
              ${active === i ? "active" : ""}
              ${mounted ? "mounted" : ""}
              ${revealed ? "disabled" : ""}
            `}
            onMouseEnter={() => handleMouseEnter(i)}
            onClick={() => handleClick(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">
                  {ROLES[i].text}
                </div>
                <div className="sc-main">
                  <div className="sc-label">
                    {item.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer ${mounted ? "mounted" : ""}`}>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↑↓</span>
          <span>SELECT</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↵</span>
          <span>REVEAL</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">←</span>
          <span>HIDE</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&display=swap');

        * {
          box-sizing: border-box;
        }

        #menu-screen {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: #000;
        }

        .sc-bg-video {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }

        .sc-root {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 6px;
          pointer-events: auto;
          padding-left: 40px;
        }

        .sc-bar-outer {
          position: relative;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .sc-bar-outer.disabled {
          pointer-events: none;
          opacity: 0.5;
        }

        .sc-bar-outer.mounted {
          transform: translateX(0);
        }

        .sc-bar-outer:nth-child(1) {
          transition-delay: 0ms;
        }
        .sc-bar-outer:nth-child(2) {
          transition-delay: 80ms;
        }
        .sc-bar-outer:nth-child(3) {
          transition-delay: 160ms;
        }

        .sc-bar-outer:hover:not(.disabled) {
          transform: translateX(6px);
        }

        .sc-bar-outer.active .sc-bar {
          height: 92px;
        }

        .sc-bar-outer.active .sc-bar-red {
          opacity: 1;
          height: 92px;
        }

        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          background: #111;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          overflow: hidden;
          transition: height 0.32s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 8px 30px rgba(0,0,0,0.55);
        }

        .sc-bar-red {
          position: absolute;
          top: 0;
          left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.22s ease, height 0.3s ease;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
        }

        .sc-bar-fill {
          position: absolute;
          inset: 0;
          background: #fff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sc-bar-outer.active .sc-bar-shade {
          opacity: 1;
        }

        .sc-bar-content {
          position: relative;
          z-index: 5;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        .sc-role {
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          color: #fff;
          transform: rotate(-30deg);
          letter-spacing: -2px;
          user-select: none;
        }

        .sc-main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 78px;
        }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.9);
          transition: color 0.22s ease;
        }

        .sc-bar-outer.active .sc-label {
          color: #111;
        }

        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          max-width: 160px;
          object-fit: cover;
          z-index: 4;
          pointer-events: none;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        .sc-overlay {
          position: fixed;
          inset: 0;
          z-index: 20;
          pointer-events: auto;
        }

        .sc-dim {
          position: fixed;
          inset: 0;
          background: rgba(30,35,44,0.72);
          cursor: pointer;
        }

        .sc-main-portrait-shell {
          position: fixed;
          top: 0;
          right: -4vw;
          width: 44vw;
          height: 100vh;
          overflow: hidden;
          animation: slideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(80px) skewX(-8deg) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewX(-8deg) scale(1);
          }
        }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
        }

        .sc-reveal-panel {
          position: fixed;
          left: -4vw;
          top: 44vh;
          width: 88vw;
          height: 58vh;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240,244,250,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.16), 18px 0 0 rgba(215,13,44,0.82), 28px 0 0 rgba(255,255,255,0.22);
          animation: panelSlide 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes panelSlide {
          from {
            opacity: 0;
            transform: translateX(-80px) rotate(-18deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-18deg);
          }
        }

        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0;
          width: 100%;
          height: 40%;
          background: rgba(0,0,0,0.92);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          color: white;
          text-align: center;
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
        }

        .sc-reveal-upper-line {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 1.6vw, 28px);
          letter-spacing: 1px;
          line-height: 1.15;
        }

        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          background: rgba(0,0,0,0.92);
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 1.8vw, 28px);
          letter-spacing: 1px;
          padding: 12px 20px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
        }

        .sc-right-nav {
          position: fixed;
          top: 9vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: navSlide 0.35s ease forwards;
        }

        @keyframes navSlide {
          from {
            opacity: 0;
            transform: translateX(-30px) rotate(-18deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-18deg);
          }
        }

        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 96px;
          color: white;
          -webkit-text-stroke: 2px black;
        }

        .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: black;
        }

        .sc-nav-arrow {
          color: #c4001a;
          font-size: 22px;
        }

        .sc-footer {
          position: fixed;
          right: 24px;
          bottom: 20px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 8px 10px;
          border-radius: 10px;
          background: rgba(0,0,0,0.58);
          border: 1px solid rgba(255,255,255,0.28);
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }

        .sc-footer.mounted {
          opacity: 1;
        }

        .sc-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          color: white;
        }

        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 5px;
          padding: 2px 8px;
          background: rgba(0,0,0,0.7);
        }

        @media (max-width: 768px) {
          .sc-bar, .sc-bar-red {
            width: 92vw;
          }

          .sc-main-portrait-shell {
            width: 52vw;
            right: -10vw;
          }

          .sc-reveal-panel {
            left: 4vw;
            width: 92vw;
            transform: none !important;
          }

          .sc-right-nav {
            top: 3vh;
            left: 4vw;
            transform: none !important;
          }

          .sc-nav-btn {
            font-size: 60px;
          }

          .sc-role {
            font-size: 36px;
          }

          .sc-label {
            font-size: 22px;
          }

          .sc-root {
            padding-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
