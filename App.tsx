import { useEffect, useState, useCallback } from "react";
import { ChevronUp, X, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Image helpers ─────────────────────────────────────────────────────────────
const u = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const skills = [
  { icon: "🎮", name: "Unity Development" },
  { icon: "💻", name: "C# Programming" },
  { icon: "🕹️", name: "Game Design" },
  { icon: "🗺️", name: "Level Design" },
  { icon: "🎨", name: "Pixel Art" },
  { icon: "🧊", name: "3D Modelling" },
  { icon: "📸", name: "Photography" },
  { icon: "✏️", name: "Concept Art" },
];

const tools = ["Unity", "Unreal Engine", "Blender", "Aseprite", "Photoshop", "Figma", "GitHub", "VS Code"];

const timeline = [
  { label: "Week 1 — Module Introduction", desc: "Attended the first lecture, received the brief, and started researching game genres and design documents.", color: "text-blue-400" },
  { label: "Week 2–3 — Concept & Planning", desc: "Chose game ideas, sketched level layouts on paper, and wrote initial game design documents for each project.", color: "text-purple-400" },
  { label: "Week 4–6 — First Prototype", desc: "Built the first playable prototype in Unity, focused on getting core mechanics working before adding any art or audio.", color: "text-blue-400" },
  { label: "Week 7–9 — Playtesting & Iteration", desc: "Shared builds with classmates, collected feedback, and iterated on controls, difficulty, and overall feel.", color: "text-purple-400" },
  { label: "Week 10–12 — Polish & Submission", desc: "Added final art, sound effects, UI screens, and bug fixes. Built and submitted the finished projects.", color: "text-blue-400" },
];

interface Project {
  title: string;
  genre: string;
  platform: string;
  overview: string;
  howToPlay: string;
  features: string[];
  process: string;
  role: string;
  tech: string[];
  thumb: string;
  gallery: string[];
}

const projects: Project[] = [
  {
    title: "Pixel Dash",
    genre: "2D Platformer",
    platform: "PC (Windows)",
    thumb: u("photo-1768933294252-92470e942eea"),
    gallery: [
      u("photo-1768933294252-92470e942eea"),
      u("photo-1768933294578-02022bfb7532"),
      u("photo-1574661569551-8374cd0465e2"),
      u("photo-1708099332948-d6d3b06e918c"),
      u("photo-1770177267441-1d8dadda4feb"),
      u("photo-1607983014687-c75af0417134"),
      u("photo-1645400926478-10776db899a4"),
      u("photo-1777978701283-f9bc4436de3a"),
      u("photo-1513807762437-8c8dee6b3776"),
      u("photo-1610561212775-b191f21b6998"),
    ],
    overview:
      "A retro-inspired 2D platformer where you play as a pixel character jumping through levels. Collect coins, avoid spikes, and reach the flag before the timer runs out. Built as my first Unity project focusing on core platformer mechanics.",
    howToPlay:
      "Use A/D or Arrow Keys to move. Press Space to jump (hold for higher jump). Press Shift to dash mid-air. Collect all coins for a bonus star. Reach the flag to complete the level.",
    features: [
      "3 hand-designed levels with increasing difficulty",
      "Coin collection and scoring system",
      "Wall-jump mechanic",
      "Simple particle effects on landing",
      "Timer-based challenge mode",
      "Main menu and pause screen",
    ],
    process:
      "I started by following a Unity 2D platformer tutorial, then expanded it with my own level designs sketched on paper. Getting the jump feel right took the most time — I tweaked gravity and jump force values a lot. Classmates found the wall-jump timing too strict, so I added a small input buffer window.",
    role: "Solo Developer — Design, Programming, Art, Sound",
    tech: ["Unity 2D", "C#", "Aseprite", "Audacity", "GitHub"],
  },
  {
    title: "Turbo Circuit",
    genre: "Arcade Racing",
    platform: "PC (Windows)",
    thumb: u("photo-1572359642202-3cc832e60700"),
    gallery: [
      u("photo-1572359642202-3cc832e60700"),
      u("photo-1778617844730-4be31ef0ab7a"),
      u("photo-1761942943380-ecf870f444f0"),
      u("photo-1749952649360-fe09c0bfaf45"),
      u("photo-1780850676003-f9dbbba28cc4"),
      u("photo-1773142268750-a1cd90300ce5"),
      u("photo-1783427402927-19813595f4da"),
      u("photo-1593507377346-d7b0797885aa"),
      u("photo-1749952649292-125c5888ee79"),
      u("photo-1780850675651-6ba095befc6a"),
    ],
    overview:
      "A low-poly arcade racer with 3 tracks and basic AI opponents. The focus was on satisfying drift mechanics and a sense of speed using FOV changes and motion blur. Made in Unity 3D as a group project.",
    howToPlay:
      "W to accelerate, S to brake. A/D to steer. Hold Space while turning to drift and build a boost meter. Release Space to get a speed boost. Press R to reset if stuck. Complete 3 laps to finish.",
    features: [
      "3 unique tracks (city, mountain, night)",
      "Drift-boost mechanic",
      "4 AI racers with rubber-banding",
      "Car selection screen with 3 vehicles",
      "Lap timer and position tracker",
      "Post-race results screen",
    ],
    process:
      "Our team of 3 split the work — I did car physics and AI, one teammate did track modelling, another did UI and audio. Making drifting feel fun was the hardest part. We tried about 8 versions of the physics system before it clicked. We switched from Unity Wheel Colliders to a custom raycast setup for more control.",
    role: "Programming Lead — Car Physics, AI, Game Flow",
    tech: ["Unity 3D", "C#", "Blender", "Photoshop", "GitHub"],
  },
  {
    title: "Keep the Keep",
    genre: "Tower Defence",
    platform: "PC / WebGL",
    thumb: u("photo-1518709268805-4e9042af9f23"),
    gallery: [
      u("photo-1518709268805-4e9042af9f23"),
      u("photo-1514539079130-25950c84af65"),
      u("photo-1599587997303-86d4294c5df7"),
      u("photo-1685955192099-bc7a058ec777"),
      u("photo-1604579928748-9da87a135c51"),
      u("photo-1546405439-fdf97d946f48"),
      u("photo-1596113239195-012fdd66d174"),
      u("photo-1562576650-27130b06c0ab"),
      u("photo-1561572639-773635958b8f"),
      u("photo-1536617645539-f27a343cc862"),
    ],
    overview:
      "A medieval tower defence game where you place archer towers, barricades, and mage towers along a path to stop enemies reaching your castle. Built with a focus on balancing economy and difficulty curves.",
    howToPlay:
      "Click build spots to place towers (costs gold). Press 1 for Archer, 2 for Mage, 3 for Barricade. Click towers to upgrade. Press Space to start the next wave early for bonus gold. Survive all 10 waves to win.",
    features: [
      "3 tower types with 2 upgrade levels each",
      "10 enemy waves with 4 enemy types",
      "Gold economy and interest system",
      "Speed-up button (2x speed)",
      "2 maps to choose from",
      "Wave preview showing upcoming enemies",
    ],
    process:
      "I designed enemy paths on graph paper first, then built a waypoint system in Unity. Balancing was the biggest challenge — I used a spreadsheet to model damage vs enemy health. Added the interest mechanic after playtesters said early waves felt too easy and slow.",
    role: "Solo Developer — Design, Programming, Art",
    tech: ["Unity 2D", "C#", "Photoshop", "Google Sheets", "GitHub"],
  },
  {
    title: "Chromatic",
    genre: "Puzzle",
    platform: "PC / Mobile (WebGL)",
    thumb: u("photo-1553532434-5ab5b6b84993"),
    gallery: [
      u("photo-1553532434-5ab5b6b84993"),
      u("photo-1458682625221-3a45f8a844c7"),
      u("photo-1747948254100-bafa6e7e979b"),
      u("photo-1723283126758-28f2a308bc47"),
      u("photo-1780221841156-e6c66837acdb"),
      u("photo-1780221841359-3a294fa62732"),
      u("photo-1780221841238-0d5eef914f18"),
      u("photo-1780221841229-ec9922aee812"),
      u("photo-1777730039426-31b650e4ca6a"),
      u("photo-1763311849929-90ec93c144ea"),
    ],
    overview:
      "A minimalist colour-matching puzzle game where you swap coloured tiles to complete patterns. Starts simple with 3 colours and grows to 6 with special tiles. Designed for short play sessions.",
    howToPlay:
      "Click a tile to select it, then click an adjacent tile to swap. Match 3+ of the same colour to clear them. Complete the target score before running out of moves. Crystal tiles clear whole rows when matched.",
    features: [
      "50 hand-crafted levels",
      "3 special tile types",
      "Star rating system (1–3 stars per level)",
      "Undo button with limited uses",
      "Colour-blind friendly mode",
      "Calm ambient soundtrack",
    ],
    process:
      "I prototyped the swap mechanic in a week then spent most of the time designing levels that teach mechanics gradually. The colour-blind mode was added after a classmate could not tell green from red tiles. I used scriptable objects in Unity to define each level's grid and move limit.",
    role: "Solo Developer — Design, Programming, UI, Audio",
    tech: ["Unity 2D", "C#", "Figma", "Audacity", "itch.io"],
  },
  {
    title: "Hollow Signal",
    genre: "First-Person Horror",
    platform: "PC (Windows)",
    thumb: u("photo-1511406361295-0a1ff814c0ce"),
    gallery: [
      u("photo-1511406361295-0a1ff814c0ce"),
      u("photo-1677659144116-ca9d329e023a"),
      u("photo-1516552335949-d1e27f71ca8a"),
      u("photo-1616163527093-41acfce459ce"),
      u("photo-1525015471056-0f7e78652361"),
      u("photo-1500398925958-b224455d0828"),
      u("photo-1517405030045-45f7ad942106"),
      u("photo-1437680041790-b7ed7b5a4950"),
      u("photo-1728920724045-463d58ba943f"),
      u("photo-1523804427826-322aa3cfaa42"),
    ],
    overview:
      "A short first-person horror game set in an abandoned radio station. You explore dark corridors with only a flashlight, collecting audio logs and notes. No combat — tension comes from atmosphere and sound design.",
    howToPlay:
      "WASD to move, Mouse to look. Left-click to interact. F to toggle flashlight. Scroll wheel to zoom in on documents. Hold Shift to walk quietly. Find all 5 audio logs and reach the rooftop to escape.",
    features: [
      "15-minute linear horror experience",
      "Environmental storytelling through 12 notes",
      "Dynamic ambient audio system",
      "Flashlight with battery that recharges slowly",
      "Screen distortion effects near the entity",
      "2 endings based on items collected",
    ],
    process:
      "I focused on atmosphere over mechanics. I built a custom audio manager that layers ambient sounds by player location. Making the 'entity' feel threatening without any combat was the hardest part — solved with audio cues, brief glimpses, and screen distortion. I playtested in a dark room with headphones.",
    role: "Solo Developer — Design, Programming, Level Design, Audio",
    tech: ["Unity 3D", "C#", "Blender", "Audacity", "GitHub"],
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────

function useScroll() {
  const [state, setState] = useState({ progress: 0, scrolled: false, showTop: false });
  useEffect(() => {
    const onScroll = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setState({ progress: (s / h) * 100, scrolled: s > 50, showTop: s > 400 });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
}

function useFadeUp() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    setCurrent(index);
  }, [index]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.93)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
        style={arrowBtn}
      >
        <ChevronLeft size={28} />
      </button>

      <img
        src={images[current]}
        alt={`Screenshot ${current + 1}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "82vw", maxHeight: "82vh", borderRadius: 10, objectFit: "contain", display: "block" }}
      />

      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
        style={arrowBtn}
      >
        <ChevronRight size={28} />
      </button>

      <button
        onClick={onClose}
        style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 40, height: 40, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <X size={20} />
      </button>

      <div style={{ position: "absolute", bottom: "1.5rem", color: "#94a3b8", fontSize: "0.85rem" }}>
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

const arrowBtn: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "none",
  borderRadius: "50%",
  width: 48,
  height: 48,
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  margin: "0 0.75rem",
};

// ─── Project Modal ─────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape" && lightboxIdx === null) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, lightboxIdx]);

  if (!project) return null;

  return (
    <>
      <div className="modal-overlay active">
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "1.5rem", paddingTop: "5rem" }}>
          <button onClick={onClose} className="btn-small" style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 50 }}>
            <X size={16} /> Close
          </button>

          {/* Banner */}
          <img src={project.thumb} alt={project.title} style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 12, marginBottom: "1.5rem" }} />

          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "2rem", fontWeight: 900, marginBottom: 4 }} className="gradient-text">
            {project.title}
          </h1>
          <p style={{ color: "#a78bfa", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
            {project.genre} · {project.platform}
          </p>

          {/* Screenshot Gallery */}
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2 style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.75rem", fontSize: "1rem" }}>Screenshots</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden", aspectRatio: "16/9" }}
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              ))}
            </div>
            <p style={{ color: "#475569", fontSize: "0.75rem", marginTop: "0.5rem" }}>Click any image to view full size</p>
          </div>

          {/* Info cards */}
          {[
            { label: "Overview", body: <p className="body-text">{project.overview}</p> },
            { label: "How to Play", body: <p className="body-text" style={{ whiteSpace: "pre-line" }}>{project.howToPlay}</p> },
            {
              label: "Features",
              body: (
                <ul style={{ paddingLeft: "1.25rem", color: "#cbd5e1" }}>
                  {project.features.map((f, i) => <li key={i} style={{ listStyleType: "disc", marginBottom: 4, fontSize: "0.9rem" }}>{f}</li>)}
                </ul>
              ),
            },
            { label: "Development Process", body: <p className="body-text">{project.process}</p> },
            { label: "My Role", body: <p className="body-text">{project.role}</p> },
            {
              label: "Technologies Used",
              body: (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                </div>
              ),
            },
          ].map(({ label, body }) => (
            <div key={label} className="card" style={{ marginBottom: "0.75rem" }}>
              <h2 style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.5rem", fontSize: "1rem" }}>{label}</h2>
              {body}
            </div>
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox images={project.gallery} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const { progress, scrolled, showTop } = useScroll();
  useFadeUp();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setActiveProject(null), []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #0c1122;
          --card-bg: rgba(15,23,42,0.75);
          --border: rgba(255,255,255,0.07);
          --blue: #3b82f6;
          --purple: #8b5cf6;
          --grad: linear-gradient(135deg, #3b82f6, #8b5cf6);
          --glow: 0 0 18px rgba(59,130,246,0.25), 0 0 36px rgba(139,92,246,0.12);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: #e2e8f0; line-height: 1.6; }
        h1, h2, h3 { font-family: 'Fraunces', serif; line-height: 1.2; }
        .gradient-text { background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; backdrop-filter: blur(10px); }
        .card-hover { transition: transform 0.25s, box-shadow 0.25s; cursor: pointer; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: var(--glow); }
        .btn-primary { background: var(--grad); color: #fff; border: none; border-radius: 9999px; padding: 0.65rem 1.4rem; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; transition: box-shadow 0.25s, transform 0.25s; font-family: 'DM Sans', sans-serif; }
        .btn-primary:hover { box-shadow: var(--glow); transform: scale(1.03); }
        .btn-outline { background: transparent; color: var(--blue); border: 1px solid var(--blue); border-radius: 9999px; padding: 0.65rem 1.4rem; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; transition: background 0.25s, color 0.25s; font-family: 'DM Sans', sans-serif; }
        .btn-outline:hover { background: var(--blue); color: #fff; }
        .btn-small { background: var(--grad); color: #fff; border: none; border-radius: 9999px; padding: 0.5rem 1rem; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; font-family: 'DM Sans', sans-serif; }
        .section { padding: 4rem 1.5rem; max-width: 1100px; margin: 0 auto; }
        @media (max-width: 640px) { .section { padding: 3rem 1rem; } }
        .section-title { font-size: 2rem; font-weight: 900; text-align: center; margin-bottom: 2.5rem; }
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.55s, transform 0.55s; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .particle { position: absolute; width: 2px; height: 2px; background: rgba(139,92,246,0.55); border-radius: 50%; animation: float 6s infinite ease-in-out; }
        @keyframes float { 0%,100% { transform: translateY(0) scale(1); opacity: 0.35; } 50% { transform: translateY(-80px) scale(1.4); opacity: 0.9; } }
        .modal-overlay { position: fixed; inset: 0; z-index: 5000; background: rgba(10,14,30,0.97); overflow-y: auto; display: none; }
        .modal-overlay.active { display: block; }
        .body-text { color: #94a3b8; font-size: 0.92rem; }
        .tech-tag { background: rgba(59,130,246,0.15); color: #93c5fd; border: 1px solid rgba(59,130,246,0.25); border-radius: 9999px; padding: 0.25rem 0.75rem; font-size: 0.8rem; }
        .skill-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--grad); display: flex; align-items: center; justify-content: center; font-size: 1.15rem; margin: 0 auto 0.5rem; }
        .timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--grad); transform: translateX(-50%); }
        @media (max-width: 768px) { .timeline-line { left: 16px; } }
        .nav-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        .text-blue-400 { color: #60a5fa; }
        .text-purple-400 { color: #c084fc; }
      `}</style>

      {/* Progress */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${progress}%`, background: "var(--grad)", zIndex: 9999, transition: "width 0.1s" }} />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0.85rem 0", transition: "background 0.3s", ...(scrolled ? { background: "rgba(12,17,34,0.96)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" } : {}) }}>
        <div className="nav-inner">
          <button onClick={() => scrollTo("#home")} style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: "1.1rem", background: "none", border: "none", cursor: "pointer" }} className="gradient-text">
            Supriya Rawa
          </button>
          <div className="hidden-mobile" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {[["Home", "#home"], ["Skills", "#skills"], ["Projects", "#projects"], ["Timeline", "#timeline"]].map(([label, href]) => (
              <button key={href} onClick={() => scrollTo(href)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "0.9rem", fontFamily: "DM Sans, sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(v => !v)} className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", flexDirection: "column", gap: 5 }} aria-label="Menu">
            {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 }} />)}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(12,17,34,0.98)", borderTop: "1px solid var(--border)", padding: "0.75rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[["Home", "#home"], ["Skills", "#skills"], ["Projects", "#projects"], ["Timeline", "#timeline"]].map(([label, href]) => (
              <button key={href} onClick={() => scrollTo(href)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", textAlign: "left", padding: "0.4rem 0", fontFamily: "DM Sans, sans-serif" }}>{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 25%, rgba(59,130,246,0.12) 0%, transparent 55%), radial-gradient(ellipse at 70% 75%, rgba(139,92,246,0.08) 0%, transparent 55%)" }} />
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="particle" style={{ left: `${(i * 37.3) % 100}%`, top: `${(i * 53.7) % 100}%`, animationDelay: `${(i * 0.4) % 6}s`, animationDuration: `${4 + (i % 4)}s` }} />
        ))}
        <div style={{ position: "relative", textAlign: "center", padding: "0 1rem", zIndex: 1 }}>
          <h1 className="gradient-text" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 900, marginBottom: "1rem" }}>
            Game Design Portfolio
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", maxWidth: 520, margin: "0 auto 2rem" }}>
            Hi, I am Supriya Rawa — a game design student at London Metropolitan University. Here are the games I made during my Game Design module.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("#projects")} className="btn-primary">View Projects</button>
            <button onClick={() => scrollTo("#skills")} className="btn-outline">My Skills</button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="section">
          <div className="fade-up">
            <h2 className="gradient-text section-title">About Me</h2>
            <div className="card" style={{ maxWidth: 680, margin: "0 auto" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 4 }}>Supriya Rawa</h3>
              <p style={{ color: "#a78bfa", marginBottom: 2, fontSize: "0.9rem" }}>London Metropolitan University</p>
              <p style={{ color: "#64748b", marginBottom: "0.75rem", fontSize: "0.85rem" }}>Game Design</p>
              <p style={{ color: "#94a3b8", fontSize: "0.92rem" }}>
                I am a game design student who enjoys building games from scratch. During this module I worked on five different projects — from a simple 2D platformer to a short horror game. I enjoy the problem-solving side of game development, especially figuring out why something does not feel right and fixing it through playtesting and iteration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="section">
          <div className="fade-up">
            <h2 className="gradient-text section-title">Skills</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem" }}>
              {skills.map((s, i) => (
                <div key={i} className="card card-hover" style={{ textAlign: "center", padding: "1rem 0.75rem" }}>
                  <div className="skill-icon">{s.icon}</div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{s.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section>
        <div className="section">
          <div className="fade-up">
            <h2 className="gradient-text section-title">Tools & Software</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem" }}>
              {tools.map((t, i) => (
                <div key={i} className="card card-hover" style={{ textAlign: "center", padding: "0.9rem" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div className="section">
          <div className="fade-up">
            <h2 className="gradient-text section-title">My Projects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {projects.map((p, i) => (
                <div key={i} className="card card-hover" style={{ overflow: "hidden", padding: 0 }} onClick={() => setActiveProject(p)}>
                  <img src={p.thumb} alt={p.title} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 3, fontFamily: "Fraunces, serif" }}>{p.title}</h3>
                    <p style={{ color: "#a78bfa", fontSize: "0.82rem", marginBottom: 2 }}>{p.genre}</p>
                    <p style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: "0.6rem" }}>{p.platform}</p>
                    <p style={{ color: "#94a3b8", fontSize: "0.85rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {p.overview}
                    </p>
                    <p style={{ color: "#3b82f6", fontSize: "0.8rem", marginTop: "0.75rem", fontWeight: 600 }}>
                      Click to view — {p.gallery.length} screenshots →
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline">
        <div className="section">
          <div className="fade-up">
            <h2 className="gradient-text section-title">Project Timeline</h2>
            <div style={{ position: "relative" }}>
              <div className="timeline-line" />
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {timeline.map((t, i) => (
                  <div key={i} className="fade-up" style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }}>
                    <div className="card" style={{ maxWidth: 320, ...(i % 2 === 0 ? { marginLeft: "calc(50% + 1.5rem)" } : { marginRight: "calc(50% + 1.5rem)" }) }}>
                      <p style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }} className={t.color}>{t.label}</p>
                      <p style={{ color: "#64748b", fontSize: "0.82rem" }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reflection */}
      <section>
        <div className="section">
          <div className="fade-up">
            <h2 className="gradient-text section-title">Reflection</h2>
            <div className="card" style={{ maxWidth: 680, margin: "0 auto" }}>
              <p style={{ color: "#94a3b8", fontSize: "0.92rem" }}>
                This module taught me a lot about what it actually takes to make a game — not just the programming side, but the design thinking behind every decision. The biggest lesson for me was how important playtesting is. Every time I thought something was obvious, a classmate would sit down and be completely confused. I also learnt that simpler mechanics are usually better, and that most of my early ideas needed to be cut down before the game felt fun. Going forward I want to improve my storytelling and narrative design skills, as I feel most comfortable with systems and mechanics but want to learn how to support them with better writing and world-building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ color: "#334155", fontSize: "0.82rem" }}>Supriya Rawa · London Metropolitan University · Game Design</p>
      </footer>

      {/* Back to top */}
      <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
        style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 900, opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0)" : "translateY(16px)", pointerEvents: showTop ? "all" : "none", transition: "opacity 0.3s, transform 0.3s", padding: "0.6rem", borderRadius: "50%" }}>
        <ChevronUp size={20} />
      </button>

      <ProjectModal project={activeProject} onClose={closeProject} />
    </>
  );
}
