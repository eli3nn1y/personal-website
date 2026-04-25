import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main1.mp4";

const ITEMS = [
  { id: "i", badge: "I", title: "LANGUAGES", subtitle: "Syntax / fluency / survival", rank: 5 },
  { id: "ii", badge: "II", title: "FRAMEWORKS", subtitle: "React / Django / Spring", rank: 4 },
  { id: "iii", badge: "III", title: "CLOUD & DEVOPS", subtitle: "Deploy / automate / recover", rank: 4 },
  { id: "iv", badge: "IV", title: "AI & MACHINE LEARNING", subtitle: "Models / experiments / vibes", rank: 3 },
  { id: "v", badge: "V", title: "VERY IMPORTANT SKILLS", subtitle: "The official joke department", rank: 5 },
];

const SECTION_DETAILS = [
  {
    index: "01",
    title: "LANGUAGE LOG",
    progress: "CORE",
    rows: [
      { index: "01", title: "Python", status: "5/5" },
      { index: "02", title: "Java", status: "4/5" },
      { index: "03", title: "JavaScript / TypeScript", status: "4/5" },
      { index: "04", title: "SQL", status: "3/5" },
    ],
    bullets: [
      "The usual mix of scripting, backend, and 'why is this failing at runtime' languages.",
      "Python is the default for quick wins, Java for structured work, and TypeScript when the UI gets serious.",
      "C and C++ are still around for the occasional low-level detour.",
    ],
  },
  {
    index: "02",
    title: "FRAMEWORK LOG",
    progress: "STACK",
    rows: [
      { index: "01", title: "React", status: "5/5" },
      { index: "02", title: "Spring Boot", status: "4/5" },
      { index: "03", title: "Django", status: "3/5" },
      { index: "04", title: "Node.js", status: "4/5" },
    ],
    bullets: [
      "These are the tools I reach for when I want to ship fast without rebuilding the wheel.",
      "React is the main frontend lane, while Spring Boot and Django cover backend work.",
      "Next.js slots in when a project needs structure, routing, or a bit more polish.",
    ],
  },
  {
    index: "03",
    title: "INFRASTRUCTURE LOG",
    progress: "OPS",
    rows: [
      { index: "01", title: "AWS", status: "4/5" },
      { index: "02", title: "Docker", status: "4/5" },
      { index: "03", title: "Git", status: "5/5" },
      { index: "04", title: "Kubernetes", status: "3/5" },
    ],
    bullets: [
      "For deployment, automation, and the usual late-night 'why is prod on fire' moments.",
      "Git is the highest-rated skill because it has saved more work than any other tool on the page.",
      "Docker and AWS handle most of the shipping story; Kubernetes is still a work in progress.",
    ],
  },
  {
    index: "04",
    title: "AI / ML LOG",
    progress: "LAB",
    rows: [
      { index: "01", title: "scikit-learn", status: "5/5" },
      { index: "02", title: "PyTorch", status: "3/5" },
      { index: "03", title: "TensorFlow", status: "3/5" },
      { index: "04", title: "OpenCV", status: "3/5" },
    ],
    bullets: [
      "Mostly applied machine learning, experimentation, and a bit of vision work.",
      "scikit-learn is the reliable baseline; PyTorch and TensorFlow show up when the model gets more serious.",
      "OpenCV is in the mix for computer vision projects and occasional cursed hand-signal experiments.",
    ],
  },
  {
    index: "05",
    title: "JOKE LOG",
    progress: "FUN",
    rows: [
      { index: "01", title: "Public Speaking", status: "0/5" },
      { index: "02", title: "Clash Royale", status: "5/5" },
      { index: "03", title: "League of Legends", status: "5/5" },
      { index: "04", title: "Debugging by vibes", status: "4/5" },
    ],
    bullets: [
      "A deeply scientific ranking system with absolutely no bias whatsoever.",
      "Public speaking is a challenge, but gaming and crisis management are both elite-tier.",
      "Debugging by vibes is not recommended, but sometimes the vibes are surprisingly right.",
    ],
  },
];

export default function Skills() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className="skills-entry-mask" aria-hidden="true">
        <video className="skills-entry-video" src={bgVideo} autoPlay loop muted playsInline />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .skills-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: skills-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .skills-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes skills-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .skills-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .skills-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .skills-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .skills-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .skills-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .skills-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .skills-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .skills-card-wrap.active .skills-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .skills-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .skills-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .skills-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .skills-card-wrap.active .skills-badge {
          background: #000;
          border-color: #000;
        }
        .skills-card-wrap.active .skills-badge-text {
          color: #fff;
        }

        .skills-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .skills-card-wrap.active .skills-title {
          color: #000;
        }

        .skills-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .skills-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .skills-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .skills-card-wrap.active .skills-rank-label,
        .skills-card-wrap.active .skills-rank-number {
          color: #000;
        }

        .skills-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .skills-card-wrap.active .skills-subtitle-bar {
          background: #000;
        }

        .skills-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .skills-card-wrap.active .skills-subtitle {
          color: #fff;
        }

        .skills-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .skills-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .skills-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .skills-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .skills-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .skills-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .skills-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .skills-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .skills-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .skills-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .skills-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .skills-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .skills-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .skills-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .skills-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .skills-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }

        .skills-footer {
          position: fixed;
          bottom: 20px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.58);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          z-index: 20;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .skills-footer.mounted {
          opacity: 1;
        }
        .skills-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 17px;
          letter-spacing: 2.2px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
        }
        .skills-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.72);
          color: #fff;
          padding: 2px 8px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .skills-stack {
            position: relative;
            width: min(96vw, 620px);
            top: 0;
            left: 0;
            margin: 10px auto 0 auto;
            transform: none;
          }

          .skills-detail-panel {
            position: relative;
            top: 0;
            right: 0;
            width: min(96vw, 620px);
            min-height: 0;
            margin: 12px auto 24px auto;
            padding: 14px 12px;
          }

          .skills-footer {
            display: none;
          }
        }
      `}</style>

      <div className="skills-overlay">
        <div className="skills-stack">
          <div className={`skills-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`skills-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="skills-card">
                <div className="skills-badge">
                  <div className="skills-badge-text">{item.badge}</div>
                </div>
                <div className="skills-card-inner">
                  <div className="skills-title">{item.title}</div>
                  <div className="skills-rank">
                    <div className="skills-rank-label">RANK</div>
                    <div className="skills-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="skills-subtitle-bar">
                  <div className="skills-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="skills-detail-panel">
          <div className="skills-detail-top">
            <div className="skills-detail-top-index">{SECTION_DETAILS[active].index}</div>
            <div className="skills-detail-top-title">{SECTION_DETAILS[active].title}</div>
            <div className="skills-detail-top-progress">{SECTION_DETAILS[active].progress}</div>
          </div>
          <div className="skills-detail-list">
            {SECTION_DETAILS[active].rows.map((row) => (
              <div className="skills-detail-row" key={row.index}>
                <div className="skills-detail-row-index">{row.index}</div>
                <div className="skills-detail-row-title">{row.title}</div>
                <div className="skills-detail-status">{row.status}</div>
              </div>
            ))}
          </div>
          <div className="skills-detail-bottom">
            <div className="skills-detail-bottom-title">NOTES</div>
            <div className="skills-detail-bullets">
              {SECTION_DETAILS[active].bullets.map((bullet) => (
                <div className="skills-detail-bullet" key={bullet}>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`skills-footer${mounted ? " mounted" : ""}`}>
        <div className="skills-footer-row">
          <span className="skills-footer-key">UP / DOWN</span>
          <span>SWITCH</span>
        </div>
        <div className="skills-footer-row">
          <span className="skills-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>
    </div>
  );
}
