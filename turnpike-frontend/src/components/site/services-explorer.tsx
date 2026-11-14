import React, { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import * as THREE from "three";
import type { ServiceResponse } from "@turnpike/shared/types/api";

const WORK = [
  {
    title: "Enterprise Cloud ECM Migration",
    slug: "digital-content-migration",
    image: "/services/ecm-content-migration.jpg",
  },
  {
    title: "Cognitive AI Document Capture",
    slug: "digital-content-capture",
    image: "/services/cognitive-document-capture.jpg",
  },
  {
    title: "Autonomous Agent P8 Operations",
    slug: "artificial-augmented-intelligence",
    image: "/services/agent-p8-operations.jpg",
  },
  {
    title: "Zero-Trust Cybersecurity Shield",
    slug: "cybersecurity",
    image: "/services/zero-trust-cybersecurity.jpg",
  },
  {
    title: "24/7 Managed ECM Infrastructure",
    slug: "managed-services",
    image: "/illustrations/service-managed-services.jpg",
  },
  {
    title: "Cloud Modernization & Microservices",
    slug: "cloud",
    image: "/images/cloud.png",
  },
  {
    title: "Business Process Automation & RPA",
    slug: "business-process",
    image: "/images/engineering.png",
  },
  {
    title: "Enterprise Data & Advanced Analytics",
    slug: "data-analytics",
    image: "/images/dynamic_data_streams.png",
  },
];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - (1 - t) ** 3;
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

export function ServicesExplorer({
  services,
  eyebrow = "Our services",
  title = "Which service does your business need right now?",
  loading = false,
}: {
  services?: readonly ServiceResponse[];
  eyebrow?: string;
  title?: string;
  loading?: boolean;
}) {
  const navigate = useNavigate();

  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const l1 = l1Ref.current;
    const l2 = l2Ref.current;
    const cap = capRef.current;
    const glow = glowRef.current;
    const cross = crossRef.current;
    const rule = ruleRef.current;
    const hint = hintRef.current;
    const pager = pagerRef.current;

    if (!track || !canvas || !l1 || !l2 || !cap || !glow || !cross || !rule) {
      return;
    }

    // ── 1. Renderer Setup ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const scene = new THREE.Scene();
    const FOV = 35;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

    // ── 2. Ribbon Path ──
    let path: THREE.CatmullRomCurve3;
    let PATH_L = 1;
    const SAMPLES = 1200;
    const pathP: THREE.Vector3[] = [];
    const pathT: THREE.Vector3[] = [];
    const PH0 = -1.5;
    const PH1 = Math.PI * 2 + 1.35;

    function buildPath() {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);
        const cs = Math.cos(ph);
        const u = 2 * t - 1;
        // a shallow arc close to the camera, then long runs far behind it
        const depth = cs > 0 ? 7.6 + 16.4 * cs ** 0.9 : 7.6 + 2.2 * cs;
        const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * 0.63,
            -depth
          )
        );
      }
      path = new THREE.CatmullRomCurve3(pts, false, "centripetal");
      path.arcLengthDivisions = 1500;
      PATH_L = path.getLength();
      pathP.length = 0;
      pathT.length = 0;
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;
        pathP.push(path.getPointAt(u));
        pathT.push(path.getTangentAt(u));
      }
    }

    const at = (s: number, op: THREE.Vector3, ot: THREE.Vector3) => {
      const f = clamp(s / PATH_L) * SAMPLES;
      const i = Math.min(SAMPLES - 1, Math.floor(f));
      const k = f - i;
      op.lerpVectors(pathP[i], pathP[i + 1], k);
      ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
    };

    // ── 3. Cards Setup ──
    const CARD_W = 2.1;
    const CARD_H = 1.32;
    const GAP = 0.03;
    const STEP = CARD_W + GAP;
    const NX = 28;
    const NY = 3;

    const vs = `
      varying vec2 vUv;
      void main(){
        vUv=uv;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
      }
    `;

    const fs = `
      uniform sampler2D map;
      uniform vec2 cover;
      uniform float aspect,ready,radius;
      varying vec2 vUv;
      void main(){
        vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
        float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
        float px=fwidth(d),a=1.-smoothstep(-px,px,d);
        if(a<.01)discard;
        vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
        vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
        float edge=smoothstep(-.012-px,-.012,d);
        gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
      }
    `;

    interface CardRecord {
      i: number;
      title: string;
      slug: string;
      geo: THREE.PlaneGeometry;
      mat: THREE.ShaderMaterial;
      mesh: THREE.Mesh;
      rect: { x: number; y: number; w: number; h: number; vw: number; vh: number; c: number; r: number } | null;
    }

    const textureLoader = new THREE.TextureLoader();

    const cards: CardRecord[] = WORK.map((item, i) => {
      const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          map: { value: null },
          cover: { value: new THREE.Vector2(1, 1) },
          aspect: { value: CARD_W / CARD_H },
          ready: { value: 0 },
          radius: { value: 0.018 },
        },
      });

      textureLoader.load(item.image, (tex) => {
        tex.colorSpace = THREE.NoColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;

        const img = tex.image;
        if (img && img.width && img.height) {
          const va = img.width / img.height;
          const ca = CARD_W / CARD_H;
          mat.uniforms.cover.value.set(va > ca ? ca / va : 1, va > ca ? 1 : va / ca);
          mat.uniforms.map.value = tex;
          mat.uniforms.ready.value = 1;
        }
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);

      return {
        i,
        title: item.title,
        slug: item.slug,
        geo,
        mat,
        mesh,
        rect: null,
      };
    });

    // ── 4. Responsive Layout & Grid ──
    const GZ = 8;
    let W = 1;
    let H = 1;
    let asp = 1;
    let cols = 3;
    let rows = 2;
    let tanH = 0.3153;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      asp = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      camera.aspect = asp;
      camera.fov = asp < 16 / 9 ? (Math.atan(0.561 / asp) * 360) / Math.PI : FOV;
      camera.updateProjectionMatrix();
      tanH = Math.tan((camera.fov * Math.PI) / 360);
      cols = asp < 0.9 ? 2 : 3;
      rows = asp < 0.9 ? 3 : 2;
    }

    window.addEventListener("resize", resize);
    resize();
    buildPath();

    function grid(i: number) {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const gw = vw * (cols === 3 ? 0.74 : 0.88);
      const gap = gw * 0.017;
      const cw = (gw - gap * (cols - 1)) / cols;
      const ch = cw / (CARD_W / CARD_H);
      const gh = ch * rows + gap * 1.6 * (rows - 1);
      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: -gw / 2 + cw / 2 + c * (cw + gap),
        y: gh / 2 - ch / 2 - r * (ch + gap * 1.6),
        w: cw,
        h: ch,
        vw,
        vh,
        c,
        r,
      };
    }

    // ── 5. Scroll Progress ──
    let target = 0;
    let p = 0;

    const readScroll = () => {
      const rect = track.getBoundingClientRect();
      const scrollDist = track.offsetHeight - window.innerHeight;
      if (scrollDist > 0) {
        target = clamp(-rect.top / scrollDist);
      }
    };

    window.addEventListener("scroll", readScroll, { passive: true });
    readScroll();

    // ── 6. Posing Engines ──
    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();
    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    function poseRibbon(c: CardRecord, head: number) {
      const pos = c.geo.attributes.position;
      const centre = head - c.i * STEP;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;
          at(centre + lu * CARD_W, op, ot);
          // keep the sheet upright, leaning a little into the turn
          up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
          vp.copy(op).addScaledVector(up, lv * CARD_H);
          pos.setXYZ(k, vp.x, vp.y, vp.z);
        }
      }
      pos.needsUpdate = true;
    }

    function poseGrid(c: CardRecord, q: number) {
      const g = grid(c.i);
      const pos = c.geo.attributes.position;
      const dx = (g.c - (cols - 1) / 2) * 1.2 + (cols === 3 && g.c === 1 ? 0 : 0);
      const dy = g.r < rows / 2 ? 1 : -1;
      const ox = dx * g.vw * 0.62 * (1 - q);
      const oy = dy * g.vh * (g.c === 1 ? 0.95 : 0.34) * (1 - q);
      const tilt = (1 - q) * 0.22 * (g.c - 1 || 0.5) * dy;
      const cs = Math.cos(tilt);
      const sn = Math.sin(tilt);

      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const x = (ix / NX - 0.5) * g.w;
          const y = (0.5 - iy / NY) * g.h;
          pos.setXYZ(
            k,
            g.x + ox + x * cs - y * sn,
            g.y + oy + x * sn + y * cs,
            -GZ - (1 - q) * 0.6 * Math.sin((ix / NX) * Math.PI)
          );
        }
      }
      pos.needsUpdate = true;
      c.rect = g;
    }

    const RIB_A = 0.14;
    const RIB_B = 0.63;

    function render() {
      const pp = p;

      // Opposing headlines run across
      const rise = 1 - out(span(pp, 0, 0.12));
      const run = mix(-50, 76, span(pp, 0, 0.58));
      l1.style.transform = `translate3d(${run}vw,${rise * 34}vh,0)`;
      l2.style.transform = `translate3d(${-run}vw,${rise * 34}vh,0)`;

      const capA = 1 - span(pp, 0.52, 0.57);
      cap.style.opacity = `${capA}`;
      cap.style.transform = `translate(-50%,calc(-50% + ${rise * 34}vh))`;

      const intro = 1 - span(pp, 0, 0.05);
      if (hint) hint.style.opacity = `${intro}`;
      if (pager) pager.style.opacity = `${intro}`;
      cross.style.opacity = `${intro}`;
      glow.style.opacity = `${intro}`;

      rule.style.transform = `scaleX(${ease(span(pp, 0.72, 0.86))})`;
      rule.style.top = "50%";

      // Ribbon, then the grid
      const pr = span(pp, RIB_A, RIB_B);
      const head = mix(0, PATH_L + cards.length * STEP, pr);

      for (const c of cards) {
        const s = head - c.i * STEP;
        const end = PATH_L - CARD_W;
        if (s < end) {
          c.mesh.visible = s > CARD_W;
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else if (c.i < cols * rows) {
          // each card flies to its slot the moment it leaves the rail
          const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP));
          const q = out(span(pp, st, st + 0.13));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) poseGrid(c, q);
        } else {
          c.mesh.visible = false;
          c.rect = null;
        }
      }

      renderer.render(scene, camera);
    }

    // ── 7. Hover & Click on Settled Grid ──
    let activeHoveredCard: CardRecord | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      let hit: CardRecord | null = null;
      if (p > 0.86) {
        const nx = e.clientX / W - 0.5;
        const ny = 0.5 - e.clientY / H;
        for (const c of cards) {
          const g = c.rect;
          if (!g) continue;
          const x = nx * g.vw;
          const y = ny * g.vh;
          if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) {
            hit = c;
            break;
          }
        }
      }

      activeHoveredCard = hit;
      if (canvas) {
        canvas.style.cursor = hit ? "pointer" : "default";
      }
    };

    const handleClick = () => {
      if (activeHoveredCard) {
        navigate({ to: "/services/$slug", params: { slug: activeHoveredCard.slug } });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("click", handleClick);

    // ── 8. Render Loop ──
    let animId: number;
    function loop() {
      p += (target - p) * 0.09;
      if (Math.abs(target - p) < 0.00005) p = target;
      render();
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("click", handleClick);
      renderer.dispose();
      cards.forEach((c) => {
        c.geo.dispose();
        c.mat.dispose();
      });
    };
  }, [navigate]);

  return (
    <div
      id="track"
      ref={trackRef}
      className="relative w-full h-[900vh] bg-[#0a0a0b] text-[#f4f1ea] select-none"
    >
      <style>{`
        #track {
          --bg: #0a0a0b;
          --ink: #f4f1ea;
          --mid: #8d8b86;
          --line: rgba(244, 241, 234, 0.14);
        }
        .hl {
          position: absolute;
          left: 0;
          right: 0;
          font-weight: 400;
          font-size: clamp(40px, 6.7vw, 130px);
          line-height: 1;
          letter-spacing: -0.055em;
          white-space: nowrap;
          text-align: center;
          will-change: transform;
        }
        #l1 {
          top: calc(50% - 0.98em);
        }
        #l2 {
          top: calc(50% + 0.03em);
        }
        #l1 span {
          display: inline-block;
          margin-right: 15vw;
        }
        #l2 span {
          display: inline-block;
          margin-left: 15vw;
        }
        #cap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 15em;
          text-align: center;
          font-size: clamp(9px, 0.74vw, 13px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--ink);
          pointer-events: none;
        }
        #gl {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .vante-top {
          position: absolute;
          left: 32px;
          right: 32px;
          top: 26px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          pointer-events: none;
          z-index: 20;
        }
        .vante-acts {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 7px;
          pointer-events: auto;
        }
        .vante-acts a {
          display: flex;
          align-items: center;
          gap: 9px;
          height: 32px;
          padding: 0 15px;
          border: 1px solid rgba(244, 241, 234, 0.55);
          border-radius: 99px;
          color: var(--ink);
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          transition: background 0.2s, color 0.2s;
        }
        .vante-acts a:hover {
          background: var(--ink);
          color: var(--bg);
        }
        .vante-acts a i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }
        .vante-acts a b {
          display: block;
          width: 13px;
          height: 7px;
          border-top: 1px solid currentColor;
          border-bottom: 1px solid currentColor;
        }
        #pager {
          display: flex;
          margin: -26px 0 0 28px;
          pointer-events: auto;
        }
        #pager span {
          display: grid;
          place-items: center;
          width: 44px;
          height: 50px;
          border: 1px solid var(--line);
          border-top: 0;
          margin-left: -1px;
          font: 400 11px 'IBM Plex Mono', monospace;
          color: var(--mid);
        }
        #glow {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 42%;
          background: linear-gradient(rgba(244, 241, 234, 0.1), rgba(244, 241, 234, 0));
          pointer-events: none;
        }
        #cross {
          position: absolute;
          left: 32px;
          right: 32px;
          top: 37.5%;
          height: 1px;
          background: var(--line);
          pointer-events: none;
        }
        #cross i {
          position: absolute;
          left: 50%;
          top: -0.62em;
          margin-left: -0.3em;
          font: 400 13px 'IBM Plex Mono', monospace;
          color: var(--mid);
          background: var(--bg);
          padding: 0 0.3em;
          line-height: 1.2;
          font-style: normal;
        }
        .vante-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 19px;
          font-weight: 600;
          letter-spacing: 0.09em;
        }
        .vante-logo svg {
          width: 22px;
          height: 18px;
          fill: var(--ink);
        }
        #hint {
          position: absolute;
          left: 50%;
          top: 33px;
          transform: translateX(-50%);
          font: 400 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.06em;
          color: var(--ink);
          padding-bottom: 6px;
          border-bottom: 1px solid var(--line);
          pointer-events: none;
          z-index: 20;
        }
        .vante-bot {
          position: absolute;
          left: 32px;
          right: 32px;
          bottom: 26px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: end;
          font-size: 12.5px;
          line-height: 1.35;
          pointer-events: none;
          z-index: 20;
        }
        .vante-bot p {
          color: var(--ink);
          max-width: 21em;
        }
        .vante-bot .mid {
          font: 400 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.06em;
        }
        .vante-bot .mid s {
          text-decoration: none;
          color: var(--mid);
          margin: 0 0.9em;
        }
        .vante-bot .r {
          justify-self: end;
          display: flex;
          gap: 12px;
          align-items: center;
          font: 400 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.06em;
        }
        .vante-bot .r:after {
          content: "";
          width: 22px;
          height: 1px;
          background: var(--ink);
        }
        #rule {
          position: absolute;
          left: 3.5vw;
          right: 3.5vw;
          top: 50%;
          height: 1px;
          background: var(--line);
          transform-origin: left;
          transform: scaleX(0);
          pointer-events: none;
        }
        @media (max-width: 760px) {
          .vante-top {
            left: 18px;
            right: 18px;
            top: 18px;
          }
          .vante-bot {
            left: 18px;
            right: 18px;
            bottom: 18px;
            grid-template-columns: 1fr auto;
          }
          .vante-bot .mid {
            display: none;
          }
          #hint, #pager {
            display: none;
          }
          .vante-bot p {
            max-width: 17em;
            font-size: 11px;
          }
        }
      `}</style>

      {/* ── STICKY FULL-VIEWPORT STAGE ── */}
      <main className="stage sticky top-0 h-screen h-[100svh] w-full overflow-hidden bg-[#0a0a0b]">
        {/* Two-part Headline running in opposite directions */}
        <h1 aria-label="Craft in motion">
          <div ref={l1Ref} className="hl" id="l1" aria-hidden="true">
            <span>CRAFT IN</span>
          </div>
          <div ref={l2Ref} className="hl" id="l2" aria-hidden="true">
            <span>MOTION</span>
          </div>
        </h1>

        {/* Center Caption */}
        <div ref={capRef} id="cap">
          Exploring ideas through daily design practice.
        </div>

        {/* Top Glow & Hairline Cross */}
        <div ref={glowRef} id="glow" />
        <div ref={crossRef} id="cross">
          <i>+</i>
        </div>

        {/* Scaled Center Rule */}
        <div ref={ruleRef} id="rule" />

        {/* Three.js WebGL Canvas */}
        <canvas ref={canvasRef} id="gl" className="cursor-pointer" />

        {/* Top Center Hint */}
        <div ref={hintRef} id="hint">
          START A PROJECT &nbsp;→
        </div>

        {/* Header Bar */}
        <header className="vante-top">
          <div className="vante-logo">
            <svg viewBox="0 0 22 18">
              <path d="M11 0l11 18h-6.200L11 9.600 6.200 18H0z" />
            </svg>
            VANTE
          </div>
          <div ref={pagerRef} id="pager">
            <span>←</span>
            <span>→</span>
          </div>
          <nav className="vante-acts">
            <a href="#contact">
              <i />
              LET'S TALK
            </a>
            <a href="#platforms">
              MENU
              <b />
            </a>
          </nav>
        </header>

        {/* Bottom Technical Bar */}
        <footer className="vante-bot">
          <p>
            Concepts, explorations and interface experiments shared openly as part of our creative process.
          </p>
          <div className="mid">
            VISUALS<s>/</s>FILM<s>/</s>MUSIC<s>/</s>EXPERIMENTS
          </div>
          <div className="r">VIEW SHOWREEL</div>
        </footer>
      </main>
    </div>
  );
}
