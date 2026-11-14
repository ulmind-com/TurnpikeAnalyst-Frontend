import React, { useEffect, useRef } from "react";
import { cn } from "@turnpike/shared/lib/utils";

const INDUSTRIES_CARDS = [
  {
    id: "healthcare",
    title: ["Healthcare &", "Life Sciences"],
    body: "FDA 21 CFR Part 11 and HIPAA compliant data pipelines, automated clinical trial master files, and validated GxP audit trails.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 9v6m-3-3h6" />
      </svg>
    ),
  },
  {
    id: "fintech",
    title: ["Fintech &", "Banking"],
    body: "SEC Rule 17a-4 and SOC2 Type II immutable WORM storage, sub-millisecond transaction archiving, and cryptographic audit ledgers.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z" />
      </svg>
    ),
  },
  {
    id: "energy",
    title: ["Energy &", "Utilities"],
    body: "NERC CIP critical infrastructure protection, SCADA sensor telemetry vaults, and sub-second CAD/BIM drawing distribution.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "aerospace",
    title: ["Aerospace &", "Defense"],
    body: "ITAR export control boundary enforcement, air-gapped GovCloud architectures, and CMMC Level 3 certification readiness.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.6-.1-1.2.1-1.6.5l-.7.7c-.5.5-.4 1.3.2 1.7L8 13.5 5.5 16 3 15.5l-1 .5 2 2 2 2 .5-1-.5-2.5 2.5-2.5 3.9 4.8c.4.6 1.2.7 1.7.2l.7-.7c.4-.4.6-1 .5-1.6z" />
      </svg>
    ),
  },
  {
    id: "logistics",
    title: ["Logistics &", "Global Supply"],
    body: "Electronic Bill of Lading (eBL) orchestration, automated customs declaration workflows, and real-time multimodal container tracking.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
        <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 6M12 4v6M10 7h4" />
      </svg>
    ),
  },
];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));

export function IndustryGrid({ className }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const whiteFloorRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);
  const bandWrapRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    const headerEl = headerRef.current;
    const whiteFloorEl = whiteFloorRef.current;
    const letters = lettersRef.current;
    const speedEl = speedRef.current;
    const bandWrap = bandWrapRef.current;
    const strip = stripRef.current;

    if (!track || !video || !letters || !speedEl || !bandWrap || !strip) return;

    const A = 3.2; // 3.2 viewports for smooth cinematic video scrub
    let B = 2.5;   // Calculated dynamically based on strip width
    let duration = 4.04;
    let targetTime = 0;
    let curTime = 0;
    let isSeeking = false;
    let lastSeekTime = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let smoothedSpeed = 0;

    let cachedClipTop = 0;
    let cachedClipHeight = window.innerHeight;

    // Warm up the video decoder pipeline on mount
    try {
      video.preload = "auto";
      video.load();
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          video.pause();
          video.currentTime = 0;
        }).catch(() => {});
      }
    } catch {
      // Ignore autoplay policy rejections
    }

    function updateLayout() {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isNarrow = vw <= 768;

      const stripWidth = strip.scrollWidth;
      B = ((stripWidth + 0.45 * vw) / vw) * 1.1;

      // Track Height: (1 + A + B) * vh
      const totalHeight = (1 + A + B) * vh;
      track.style.height = `${totalHeight}px`;

      if (isNarrow) {
        const videoWidth = vw * 1.45;
        const videoHeight = videoWidth * (1080 / 1920);
        cachedClipHeight = videoHeight;
        cachedClipTop = (vh - videoHeight) / 2;
        video.style.width = `${videoWidth}px`;
        video.style.height = `${videoHeight}px`;
        video.style.left = "50%";
        video.style.top = "50%";
        video.style.transform = "translate(-50%, -50%)";
      } else {
        const scale = Math.max(vw / 1920, vh / 1080);
        const videoWidth = 1920 * scale;
        const videoHeight = 1080 * scale;
        cachedClipHeight = videoHeight;
        cachedClipTop = (vh - videoHeight) / 2;
        video.style.width = `${videoWidth}px`;
        video.style.height = `${videoHeight}px`;
        video.style.left = "50%";
        video.style.top = "50%";
        video.style.transform = "translate(-50%, -50%)";
      }

      // Initial edge sits at the natural ground level of the video (82.9%)
      const initialEdgePx = cachedClipTop + 0.829 * cachedClipHeight;
      track.style.setProperty("--edge-px", `${Math.round(initialEdgePx)}px`);
    }

    window.addEventListener("resize", updateLayout);

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }
      updateLayout();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleSeeked = () => {
      isSeeking = false;
      const diff = Math.abs(curTime - video.currentTime);
      if (diff > 1 / 30) {
        seekVideo();
      }
    };

    video.addEventListener("seeked", handleSeeked);

    function seekVideo() {
      if (!video) return;
      const now = performance.now();
      const diff = Math.abs(curTime - video.currentTime);
      if (diff > 1 / 48 && (!isSeeking || now - lastSeekTime > 75)) {
        isSeeking = true;
        lastSeekTime = now;
        try {
          if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
            (video as any).fastSeek(curTime);
          } else {
            video.currentTime = curTime;
          }
        } catch {
          video.currentTime = curTime;
        }
      }
    }

    let animId: number;

    function render(time: number) {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const sy = window.scrollY;

      // 1. Calculate Scroll Speed (KM/H)
      const dt = Math.max(1, time - lastTime);
      const dy = Math.abs(sy - lastScrollY);
      lastScrollY = sy;
      lastTime = time;

      const rawSpeed = (dy / dt) / 0.032;
      smoothedSpeed += (rawSpeed - smoothedSpeed) * 0.12;
      const kmh = Math.min(99, Math.round(smoothedSpeed));
      speedEl.textContent = `${String(kmh).padStart(2, "0")} KM/H`;

      // 2. Relative Scroll Progress inside Track
      const rect = track.getBoundingClientRect();
      const scrollWithinTrack = -rect.top;

      // Video Scrub Progress q: 0 -> 1 over A * vh
      const q = clamp(scrollWithinTrack / (A * vh));
      targetTime = q * (duration - 1 / 48);
      curTime += (targetTime - curTime) * 0.22;
      seekVideo();

      // Strip Progress r: 0 -> 1 over B * vh (starts after A * vh)
      // Computed early: it is read by the header/band logic below.
      const r = clamp((scrollWithinTrack - A * vh) / (B * vh));

      // 3. Dynamic Section Header:
      // User requirement: Keep section header prominently visible during the reach-stacker scrub!
      // Only gently fades when the cards strip (r > 0.05) actively takes over the full viewport.
      if (headerEl) {
        let headerOpacity = 1;
        if (r > 0.05) {
          headerOpacity = Math.max(0, 1 - (r - 0.05) / 0.15);
        }
        headerEl.style.opacity = headerOpacity.toFixed(3);
        headerEl.style.transform = `translate(-50%, -${(clamp(q) * 8).toFixed(1)}px)`;
        headerEl.style.pointerEvents = headerOpacity > 0.2 ? "auto" : "none";
      }

      // 4. DYNAMIC GROUND EDGE CALCULATION:
      // - 0s to 3.1s (q <= 0.767): ground sits at 82.9% of video (clean white stage, reach stacker operating)
      // - 3.1s to 3.75s (0.767 < q < 0.95): camera pulls back, ground rises from 82.9% to 44.8%
      // - >= 3.75s (q >= 0.95): ground sits at 44.8%, truck sits on it
      let bandFraction = 0.829;
      if (q <= 0.767) {
        bandFraction = 0.829;
      } else if (q < 0.95) {
        const t = (q - 0.767) / (0.95 - 0.767);
        const easedT = t * t * (3 - 2 * t);
        bandFraction = 0.829 + (0.448 - 0.829) * easedT;
      } else {
        bandFraction = 0.448;
      }

      const currentEdgePx = cachedClipTop + bandFraction * cachedClipHeight;
      track.style.setProperty("--edge-px", `${Math.round(currentEdgePx)}px`);

      // 4b. White Floor Cover during reach-stacker scrub:
      // Masks any dark floor in the video with pure white, guaranteeing a 100% clean white stage!
      // Stays active throughout q < 0.96 so NO black bar cuts off the crane/container in the first 2-3 scrolls!
      if (whiteFloorEl) {
        if (q <= 0.94) {
          whiteFloorEl.style.display = "block";
          whiteFloorEl.style.opacity = "1";
        } else if (q < 0.99) {
          whiteFloorEl.style.display = "block";
          const floorFade = 1 - (q - 0.94) / 0.05;
          whiteFloorEl.style.opacity = Math.max(0, floorFade).toFixed(3);
        } else {
          whiteFloorEl.style.display = "none";
          whiteFloorEl.style.opacity = "0";
        }
      }

      // 5. Band Wrap (Cards Container) Appearance:
      // STRICT FIX: bandWrap MUST NOT appear during the video scrub phase (q < 0.98)!
      // It only fades in when the video is complete and the cards strip (r >= 0) is ready to slide in.
      // This completely eliminates the black bar that was cutting off the reach stacker during the first 2-3 scrolls!
      if (q < 0.98 && r <= 0) {
        bandWrap.style.display = "none";
        bandWrap.style.opacity = "0";
        bandWrap.style.visibility = "hidden";
        bandWrap.style.pointerEvents = "none";
      } else {
        bandWrap.style.display = "block";
        const bandOpacity = clamp(r > 0 ? (r / 0.05) : ((q - 0.98) / 0.02));
        bandWrap.style.opacity = bandOpacity.toFixed(3);
        bandWrap.style.visibility = bandOpacity > 0.01 ? "visible" : "hidden";
        bandWrap.style.pointerEvents = bandOpacity > 0.3 ? "auto" : "none";
      }

      // Settled Flag: q >= 0.94
      const ph = q >= 0.94 ? 1 : 0;
      track.style.setProperty("--ph", String(ph));

      // 6. Giant Letters translateX: vw -> -(lettersWidth + vw * 0.8)
      const lettersWidth = letters.offsetWidth;
      const lettersX = vw - r * (lettersWidth + vw * 0.8);
      letters.style.transform = `translateX(${lettersX}px)`;

      // Strip translateX: vw -> -(stripWidth + 0.45 * vw)
      const stripWidth = strip.scrollWidth;
      const stripX = vw - r * (stripWidth + 0.45 * vw);
      strip.style.transform = `translateX(${stripX}px)`;

      // 7. Card Text Gradient Sweep: s = clamp((0.98 - cardLeft/vw)/0.3, -0.4, 1.6) * 100%
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const cRect = card.getBoundingClientRect();
        const cardLeftFrac = cRect.left / vw;
        const s = clamp((0.98 - cardLeftFrac) / 0.3, -0.4, 1.6) * 100;
        card.style.setProperty("--s", `${s.toFixed(1)}%`);
      });

      animId = requestAnimationFrame(render);
    }

    updateLayout();
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateLayout);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      id="industry-track"
      className={cn("relative w-full bg-white text-[#111111] select-none", className)}
      style={{
        // @ts-ignore
        "--u": "min(100vw / 1440, 100vh / 960)",
        "--white": "#ffffff",
        "--ink": "#111111",
        "--band": "#111111",
        "--cobalt": "#2f63ff",
        "--letters": "#e9e9e9",
        "--edge-px": "83vh",
        "--ph": 0,
      }}
    >
      <style>{`
        #industry-track {
          --u: min(100vw / 1440, 100vh / 960);
          --white: #ffffff;
          --ink: #111111;
          --band: #111111;
          --cobalt: #2f63ff;
          --letters: #e9e9e9;
        }

        @media (max-width: 768px), (orientation: portrait) {
          #industry-track {
            --u: min(100vw / 430, 1.4px);
          }
        }

        .kv-scene {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          height: 100lvh;
          overflow: hidden;
          background: #ffffff;
        }

        /* Clean stage background - pure white seamless canvas */
        .kv-scene-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: #ffffff;
        }

        /* White Floor Cover: Masks any dark ground in the video during the reach-stacker scrub (q < 0.78) */
        .kv-white-floor {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: var(--edge-px, 83vh);
          background: #ffffff;
          z-index: 4;
          pointer-events: none;
          will-change: opacity, top;
        }

        /* ── Prominent Section Header Floating over initial white canvas ── */
        /* Simple floating text (no card): lifted higher so the scrubbing
           reach-stacker artwork below is never hidden under a panel. */
        .kv-section-header {
          position: absolute;
          top: clamp(32px, 5vh, 56px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 35;
          pointer-events: none;
          width: min(94vw, 880px);
          padding: 0;
          background: transparent;
          opacity: 1;
          visibility: visible;
          will-change: transform, opacity;
        }

        .kv-header-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          border: 1px solid rgba(15, 118, 110, 0.35);
          background: rgba(15, 118, 110, 0.08);
          padding: 4px 14px;
          font-family: 'Archivo', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #0F766E;
          margin-bottom: 10px;
        }

        .kv-header-title {
          font-family: 'Anton', Impact, sans-serif;
          font-size: clamp(32px, 4.4vw, 54px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #111111;
          margin-bottom: 10px;
        }

        .kv-header-highlight {
          position: relative;
          display: inline-block;
          padding: 0 8px;
          color: #0F766E;
        }

        .kv-header-highlight::before {
          content: "";
          position: absolute;
          inset: -2px 0;
          border: 1.5px dashed #0F766E;
          border-radius: 4px;
          pointer-events: none;
        }

        .kv-header-desc {
          font-family: 'Archivo', sans-serif;
          font-size: clamp(12.5px, 1.1vw, 15px);
          line-height: 1.5;
          color: #4b5563;
          max-width: 620px;
          margin: 0 auto;
          font-weight: 500;
        }

        .kv-header-hint {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.1em;
          color: #9ca3af;
          text-transform: uppercase;
        }

        .kv-header-hint::after {
          content: "↓";
          font-family: sans-serif;
          font-size: 12px;
          color: #0F766E;
          animation: kv-bounce 1.5s infinite;
        }

        @keyframes kv-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        .kv-video-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .kv-scrub-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Giant Letters ("WHICH INDUSTRY ARE YOU BUILDING FOR?") ── */
        .kv-letters-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--edge-px, 80vh);
          z-index: 5;
          pointer-events: none;
          overflow: visible;
          mix-blend-mode: darken;
        }

        .kv-giant-letters {
          position: absolute;
          bottom: 0;
          left: 0;
          white-space: nowrap;
          font-family: 'Anton', Impact, sans-serif;
          font-size: calc(330 * var(--u));
          line-height: 0.8;
          color: var(--letters);
          transform: translateX(100vw);
          will-change: transform;
          user-select: none;
        }

        .kv-speed-readout {
          position: absolute;
          top: calc(52 * var(--u));
          left: calc(26 * var(--u));
          font-family: 'JetBrains Mono', monospace;
          font-size: calc(10.5 * var(--u));
          color: var(--ink);
          z-index: 20;
          opacity: var(--ph, 0);
          transition: opacity 0.3s;
          pointer-events: none;
          letter-spacing: 0.04em;
        }

        /* ── Dark Band with Sliding Strip ── */
        .kv-band-wrap {
          position: absolute;
          top: var(--edge-px, 83vh);
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--band);
          z-index: 10;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.25s ease-out;
          will-change: opacity, transform;
        }

        .kv-strip {
          position: absolute;
          top: calc(76 * var(--u));
          left: 0;
          display: flex;
          align-items: flex-start;
          gap: calc(120 * var(--u));
          transform: translateX(100vw);
          will-change: transform;
          color: #ffffff;
        }

        .kv-lead-block {
          display: flex;
          align-items: flex-start;
          gap: calc(64 * var(--u));
          flex-shrink: 0;
        }

        .kv-lead-headline {
          font-family: 'Anton', Impact, sans-serif;
          font-size: calc(64 * var(--u));
          line-height: 0.98;
          text-transform: uppercase;
          white-space: nowrap;
          color: #ffffff;
        }

        .kv-lead-headline .cobalt {
          color: var(--cobalt);
        }

        .kv-lead-copy {
          width: calc(250 * var(--u));
          display: flex;
          flex-direction: column;
          gap: calc(16 * var(--u));
          font-family: 'Archivo', sans-serif;
          font-size: calc(12 * var(--u));
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.62);
        }

        .kv-card {
          width: calc(270 * var(--u));
          padding-left: calc(30 * var(--u));
          padding-right: calc(30 * var(--u));
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: calc(20 * var(--u));
        }

        .kv-card:first-child {
          border-left: none;
          padding-left: 0;
        }

        .kv-card-icon {
          width: calc(38 * var(--u));
          height: calc(38 * var(--u));
          color: #ffffff;
        }

        .kv-card-title {
          font-family: 'Anton', Impact, sans-serif;
          font-size: calc(26 * var(--u));
          line-height: 1.05;
          text-transform: uppercase;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff calc(var(--s, 0%) - 34%),
            #2f63ff calc(var(--s, 0%) - 6%),
            transparent calc(var(--s, 0%) + 26%),
            transparent 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .kv-card-body {
          font-family: 'Archivo', sans-serif;
          font-size: calc(12.4 * var(--u));
          line-height: 1.5;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.9) calc(var(--s, 0%) - 34%),
            #2f63ff calc(var(--s, 0%) - 6%),
            transparent calc(var(--s, 0%) + 26%),
            transparent 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .kv-services-pill {
          position: absolute;
          bottom: calc(36 * var(--u));
          left: 50%;
          transform: translateX(-50%) translateY(calc((1 - var(--ph, 0)) * 24px));
          opacity: var(--ph, 0);
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
          font-family: 'Archivo', sans-serif;
          font-weight: 500;
          font-size: calc(10 * var(--u));
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 999px;
          padding: calc(8 * var(--u)) calc(22 * var(--u));
          pointer-events: auto;
          text-decoration: none;
        }

        .kv-services-pill:hover {
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px), (orientation: portrait) {
          .kv-section-header {
            top: clamp(24px, 4vh, 44px);
            width: calc(100vw - 24px);
            padding: 0;
          }
          .kv-header-title {
            font-size: clamp(24px, 6.8vw, 36px);
          }
          .kv-header-desc {
            font-size: 12px;
          }
          .kv-giant-letters {
            font-size: calc(180 * var(--u));
          }
          .kv-speed-readout {
            top: 22px;
            left: 20px;
            font-size: 11px;
          }
          .kv-strip {
            top: calc(44 * var(--u));
            gap: calc(56 * var(--u));
            padding-left: 22px;
          }
          .kv-lead-block {
            flex-direction: column;
            gap: calc(20 * var(--u));
          }
          .kv-lead-headline {
            font-size: calc(46 * var(--u));
          }
          .kv-lead-copy {
            width: 300px;
            font-size: 13px;
          }
          .kv-card {
            width: 250px;
          }
          .kv-card-title {
            font-size: 26px;
          }
          .kv-card-body {
            font-size: 13px;
          }
        }
      `}</style>

      {/* ── Sticky Viewport Scene ── */}
      <div className="kv-scene" id="scene">
        {/* Dynamic ground background */}
        <div className="kv-scene-bg" />

        {/* White floor cover to guarantee pure white stage during reach-stacker scrub */}
        <div ref={whiteFloorRef} className="kv-white-floor" />

        {/* ── Prominent Sticky Section Header (Visible throughout scrub) ── */}
        <div ref={headerRef} className="kv-section-header">
          <span className="kv-header-eyebrow">
            <span className="inline-block size-2 rounded-full bg-teal-600 animate-pulse mr-1" />
            Industry Disciplines &amp; Architecture
          </span>
          <h2 className="kv-header-title">
            Which Industry Are You <span className="kv-header-highlight">Building</span> For?
          </h2>
          <p className="kv-header-desc">
            Tailored enterprise solutions engineered for mission-critical compliance, high-volume automated migration, and institutional security.
          </p>
          <div className="kv-header-hint">
            SCROLL DOWN TO SCRUB THE INTERACTIVE STAGE
          </div>
        </div>

        {/* Layer 1: Video */}
        <div className="kv-video-wrap">
          <video
            ref={videoRef}
            className="kv-scrub-video"
            playsInline
            webkit-playsinline="true"
            muted
            preload="auto"
            poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2307e4bf-be39-42b4-b579-e168aeccabf0.jpg"
          >
            <source
              media="(min-width: 901px)"
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/409763c0-95f4-49d3-a601-dc564d55072b.mp4"
              type="video/mp4"
            />
            <source
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3718419-7a0a-478d-bfb0-0ff8bef7f3f7.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Layer 2: Giant Letters ("WHICH INDUSTRY ARE YOU BUILDING FOR?") with mix-blend-mode: darken */}
        <div className="kv-letters-wrap">
          <div ref={lettersRef} className="kv-giant-letters">
            WHICH INDUSTRY ARE YOU BUILDING FOR?
          </div>
        </div>

        {/* Layer 3: Speed Readout */}
        <div ref={speedRef} className="kv-speed-readout">
          00 KM/H
        </div>

        {/* Layer 4: Dark Band with Sliding Strip */}
        <div ref={bandWrapRef} className="kv-band-wrap">
          <div ref={stripRef} className="kv-strip">
            {/* Lead Block */}
            <div className="kv-lead-block">
              <h2 className="kv-lead-headline">
                WHICH INDUSTRY<br />
                ARE YOU BUILDING FOR?<br />
                <span className="cobalt">SECTOR SPECIALISTS.</span>
              </h2>
              <div className="kv-lead-copy">
                <p>
                  From healthcare compliance to fintech security, from critical infrastructure to defense data custody, our teams bring decades of practitioner engineering to every project.
                </p>
                <p>
                  One unified architecture means one partner, automated audit trails, and zero compliance exposure from day one.
                </p>
              </div>
            </div>

            {/* Five Cards */}
            {INDUSTRIES_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="kv-card"
              >
                <div className="kv-card-icon">{card.icon}</div>
                <h3 className="kv-card-title">
                  {card.title[0]}<br />
                  {card.title[1]}
                </h3>
                <p className="kv-card-body">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Outline Pill */}
          <a href="#contact" className="kv-services-pill">
            INDUSTRIES WE SERVE
          </a>
        </div>
      </div>
    </div>
  );
}
