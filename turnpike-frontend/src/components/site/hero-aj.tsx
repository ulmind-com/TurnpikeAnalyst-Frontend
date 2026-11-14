import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import {
  MarkG,
  MarkM,
  MarkS,
  MarkSlack,
} from "@/components/site/hero-icons";
import type { HeroSection, HeroClaim } from "@turnpike/shared/api/services/homepage.api";

// Remote assets exactly as specified in ATRIUM MTL
const ASSETS = {
  sculpt: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/fc524fc3-03c3-40a1-9954-22eab1322592.webp",
  man: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/1d56967e-0ed5-40f8-812d-9360e5ec1780.webp",
  visit: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5f3f6135-26b9-4c48-92ad-105161327cbc.webp",
  sil: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e7b68ae9-9240-4f52-a0a2-89082df4b8d0.webp",
  grain: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/40b7fef3-410d-4ef3-bd67-0a2fc7ee5a1d.svg",
};

interface TileSpec {
  type: "photo" | "solid";
  bg?: string;
  img?: string;
  cropClass?: string;
  tag?: string;
  isDark?: boolean;
}

// 5 base cells per column (duplicated once for seamless -50% translation loop)
const COL1_BASE: TileSpec[] = [
  { type: "solid", bg: "#ef5d44", tag: "ARCHIVE" },
  { type: "photo", img: ASSETS.sculpt, cropClass: "object-[center_15%]", tag: "MIGRATION" },
  { type: "photo", img: ASSETS.man, cropClass: "object-[center_25%]", tag: "PRECISION" },
  { type: "solid", bg: "#9fd5f7", tag: "AUTOMATION" },
  { type: "photo", img: ASSETS.visit, cropClass: "object-[center_40%]", tag: "ORCHESTRATE" },
];

const COL2_BASE: TileSpec[] = [
  { type: "solid", bg: "#fcdd71", tag: "INTELLIGENCE" },
  { type: "photo", img: ASSETS.visit, cropClass: "object-[center_35%]", tag: "ENTERPRISE" },
  { type: "solid", bg: "#151515", isDark: true, tag: "WATSONX" },
  { type: "photo", img: ASSETS.sil, cropClass: "object-[center_50%]", tag: "GOVERNANCE" },
  { type: "solid", bg: "#ef5d44", tag: "SCALE" },
];

const COL3_BASE: TileSpec[] = [
  { type: "solid", bg: "#9fd5f7", tag: "PIPELINES" },
  { type: "solid", bg: "#f9f6f1", tag: "FIDELITY" },
  { type: "photo", img: ASSETS.sil, cropClass: "object-[center_45%]", tag: "SECURITY" },
  { type: "solid", bg: "#fcdd71", tag: "RUNTIME" },
  { type: "photo", img: ASSETS.sculpt, cropClass: "object-[center_20%]", tag: "RECORDS" },
];

export function HeroAJ({ hero, claims: _claims }: { hero?: HeroSection; claims?: HeroClaim[] } = {}) {
  const reduce = useReducedMotion();
  const badge = hero?.badge || "Enterprise Archive & Automation";
  const titleLines = hero?.title_lines?.length ? hero.title_lines : ["We Are Solution", "Oriented"];
  const highlightWord = hero?.highlight_word || "Digital";
  const titleSuffix = hero?.title_suffix ?? "Agency";
  const subtitle =
    hero?.subtitle ||
    "Enterprise content migration, intelligent automation and practitioner-led engineering — purpose-built for regulated organisations that cannot afford to lose a single record.";
  const primaryCta = { label: hero?.primary_cta?.label || "Get Started", href: hero?.primary_cta?.href || "#contact" };
  const secondaryCta = { label: hero?.secondary_cta?.label || "How It Works", href: hero?.secondary_cta?.href || "#services" };
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section ref={ref} className="hero-aj relative overflow-hidden bg-background">
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,#FFFFFF_0%,#F5F9F7_35%,#F0F8FA_68%,#EBF5FC_100%)] dark:bg-[linear-gradient(115deg,#0A1014_0%,#0C161A_35%,#0F1B22_68%,#0A131A_100%)]" />
      <div className="pointer-events-none absolute -left-28 top-1/4 size-[520px] rounded-full bg-[#10B981]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 size-[540px] rounded-full bg-[#0EA5E9]/12 blur-3xl" />

      {/* Embedded CSS for exact 14.6s keyframes */}
      <style>{`
        @keyframes atriumColDown {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes atriumColUp {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .atrium-col-down {
          animation: atriumColDown 14.6s linear infinite;
          will-change: transform;
        }
        .atrium-col-up {
          animation: atriumColUp 14.6s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .atrium-col-down, .atrium-col-up {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:pb-24 lg:pt-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          
          {/* ---------- LEFT COLUMN: EDITORIAL COPY ---------- */}
          <motion.div style={{ y: copyY }} className="relative z-10 pt-2 lg:pt-0">
            {/* Architectural Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0B2B33] dark:text-emerald-400 backdrop-blur-md shadow-xs"
            >
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{badge}</span>
            </motion.div>

            {/* Display Headline */}
            <h1
              style={{ fontFamily: "var(--font-hero-display, 'Archivo', sans-serif)" }}
              className="mt-5 text-[2.75rem] font-black leading-[1.02] tracking-tight text-[#0B2B33] dark:text-white sm:text-6xl xl:text-[4.4rem]"
            >
              {titleLines.map((line, i) => {
                const isLast = i === titleLines.length - 1;
                return (
                  <span key={`${line}-${i}`} className="block overflow-hidden">
                    <motion.span
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      {isLast && highlightWord ? (
                        <span className="inline-flex flex-wrap items-center gap-x-4">
                          <span>{line}</span>
                          <HighlightWord word={highlightWord} />
                        </span>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                );
              })}
              {titleSuffix ? (
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.29, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4"
                  >
                    {titleSuffix}
                    <TogglePill />
                  </motion.span>
                </span>
              ) : null}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#4F6B72] dark:text-slate-300 font-normal"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href={primaryCta.href}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 rounded-full bg-[#0B2B33] dark:bg-white px-7 py-3.5 text-sm font-bold text-white dark:text-[#0B2B33] shadow-[0_14px_30px_-12px_rgba(11,43,51,0.55)] transition-all"
              >
                <span>{primaryCta.label}</span>
                <span className="grid size-6 place-items-center rounded-full bg-white/20 dark:bg-black/10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5">
                    <path fillRule="evenodd" d="M4 12.5a.75.75 0 0 1 0-1.06L9.44 6H5.25a.75.75 0 0 1 0-1.5h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V6.56L4.53 12.03a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.a>
              <motion.a
                href={secondaryCta.href}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#10B981] px-7 py-3.5 text-sm font-semibold text-[#0B2B33] dark:text-[#10B981] hover:bg-[#10B981]/10 transition-colors"
              >
                {secondaryCta.label}
              </motion.a>
            </motion.div>

            {/* Trusted By Section */}
            <TrustedBy />
          </motion.div>

          {/* ---------- RIGHT COLUMN: ATRIUM 3-COLUMN MARQUEE MOSAIC ---------- */}
          <motion.div
            style={{ y: artY }}
            onPointerMove={(event) => {
              if (reduce) return;
              const rect = event.currentTarget.getBoundingClientRect();
              setTilt({
                x: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
                y: ((event.clientY - rect.top) / rect.height - 0.5) * -12,
              });
            }}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          >
            <motion.div
              animate={{ rotateY: tilt.x, rotateX: tilt.y }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              style={{ transformPerspective: 1000 }}
              className="relative h-[480px] sm:h-[560px] lg:h-[620px] w-full overflow-hidden rounded-3xl"
            >
              {/* Vertical soft gradient mask so columns fade seamlessly at edges */}
              <div
                className="size-full overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
              >
                <div className="relative size-full flex justify-center gap-3 sm:gap-3.5">
                  
                  {/* Column 1 (Scrolls Down) */}
                  <div className="relative w-1/3 min-w-[100px] max-w-[185px]">
                    <div className="atrium-col-down absolute inset-x-0 -top-8 flex flex-col gap-3 sm:gap-3.5">
                      {[...COL1_BASE, ...COL1_BASE].map((tile, i) => (
                        <MosaicCard key={i} tile={tile} />
                      ))}
                    </div>
                  </div>

                  {/* Column 2 (Scrolls Up) */}
                  <div className="relative w-1/3 min-w-[100px] max-w-[185px]">
                    <div className="atrium-col-up absolute inset-x-0 -top-28 flex flex-col gap-3 sm:gap-3.5">
                      {[...COL2_BASE, ...COL2_BASE].map((tile, i) => (
                        <MosaicCard key={i} tile={tile} />
                      ))}
                    </div>
                  </div>

                  {/* Column 3 (Scrolls Down) */}
                  <div className="relative w-1/3 min-w-[100px] max-w-[185px]">
                    <div className="atrium-col-down absolute inset-x-0 -top-12 flex flex-col gap-3 sm:gap-3.5">
                      {[...COL3_BASE, ...COL3_BASE].map((tile, i) => (
                        <MosaicCard key={i} tile={tile} />
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Architectural Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 15 }}
                className="pointer-events-none absolute bottom-6 right-6 hidden sm:flex items-center gap-2.5 rounded-2xl bg-black/85 text-white px-4 py-2.5 shadow-2xl backdrop-blur-md border border-white/15"
              >
                <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold tracking-wider uppercase font-mono">
                  LIVE MARQUEE // 14.6s
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function MosaicCard({ tile }: { tile: TileSpec }) {
  if (tile.type === "photo" && tile.img) {
    return (
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-[20px] sm:rounded-[22px] bg-slate-200 dark:bg-slate-800 shadow-md">
        <img
          src={tile.img}
          alt={tile.tag || "Enterprise Archive Asset"}
          className={`size-full object-cover ${tile.cropClass || "object-center"}`}
          loading="lazy"
        />
        {/* Subtle grain texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply"
          style={{ backgroundImage: `url(${ASSETS.grain})` }}
        />
        {tile.tag && (
          <span className="absolute bottom-2.5 left-2.5 rounded-md bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
            {tile.tag}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-[20px] sm:rounded-[22px] p-3 shadow-md flex flex-col justify-between"
      style={{ backgroundColor: tile.bg || "#ef5d44" }}
    >
      {/* Grain overlay */}
      <div
        className={`pointer-events-none absolute inset-0 ${tile.isDark ? "opacity-5 mix-blend-screen" : "opacity-15 mix-blend-multiply"}`}
        style={{ backgroundImage: `url(${ASSETS.grain})` }}
      />
      {/* Corner Minimalist Label */}
      {tile.tag && (
        <span
          className={`relative z-10 text-[9px] font-black uppercase tracking-widest ${
            tile.isDark ? "text-white/60" : "text-black/60"
          }`}
        >
          {tile.tag}
        </span>
      )}
      <div className="relative z-10 mt-auto flex items-center justify-between">
        <span
          className={`size-1.5 rounded-full ${tile.isDark ? "bg-white/40" : "bg-black/40"}`}
        />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`size-3 ${tile.isDark ? "text-white/50" : "text-black/50"}`}
        >
          <path d="M3 13L13 3M13 3H5M13 3V11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function HighlightWord({ word }: { word: string }) {
  const corners = [
    { top: -5, left: -5 },
    { top: -5, right: -5 },
    { bottom: -5, left: -5 },
    { bottom: -5, right: -5 },
  ] as const;

  return (
    <span className="relative inline-block px-3 py-0.5 text-[#0EA5E9]">
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-[#0EA5E9]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {corners.map((pos, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.05 + index * 0.05, type: "spring", stiffness: 320, damping: 15 }}
          className="pointer-events-none absolute size-[9px] border-[1.5px] border-[#0EA5E9] bg-white"
          style={pos}
        />
      ))}
      <span className="relative">{word}</span>
      <motion.svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 size-4 text-[#0EA5E9]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 260, damping: 14 }}
      >
        <path d="M4 2 20 12l-7 1.6L10 21Z" fill="currentColor" />
      </motion.svg>
    </span>
  );
}

function TogglePill() {
  const [on, setOn] = useState(true);
  return (
    <button
      type="button"
      aria-label="Toggle accent"
      onClick={() => setOn((value) => !value)}
      className="relative inline-flex h-9 w-24 items-center rounded-full bg-[#0B2B33] px-2 shadow-[0_10px_22px_-12px_rgba(11,43,51,0.6)] cursor-pointer"
    >
      <motion.span
        animate={{ x: on ? 0 : 46 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="grid size-6 place-items-center rounded-full bg-[#34D399]"
      >
        <span className="size-2.5 rounded-full bg-[#0EA5E9]" />
      </motion.span>
      <motion.span
        animate={{ x: on ? 0 : -46 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="ml-auto size-3 rounded-full bg-[#0EA5E9]"
      />
    </button>
  );
}

function TrustedBy() {
  const marks = [MarkG, MarkS, MarkM, MarkSlack];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.6 }}
      className="relative mt-12"
    >
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-semibold text-[#0B2B33] dark:text-slate-200">Trusted By</span>
        {marks.map((Mark, index) => (
          <motion.span
            key={index}
            whileHover={{ y: -4, scale: 1.08 }}
            className="grid size-11 place-items-center rounded-full bg-white dark:bg-slate-800 shadow-[0_12px_26px_-14px_rgba(11,43,51,0.35)]"
          >
            <Mark className="size-5" />
          </motion.span>
        ))}
      </div>

      <svg
        viewBox="0 0 320 70"
        className="pointer-events-none mt-2 h-16 w-full max-w-sm overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M4 58C34 58 40 22 66 22s30 30 56 30 34-34 62-34 40 24 68 24 34-14 62-14"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="66"
          cy="22"
          r="5"
          fill="#22C55E"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.25, 1] }}
          transition={{ delay: 1.9, duration: 0.7 }}
        />
        <text x="52" y="10" fontSize="11" fontWeight="700" fill="#22C55E">
          90%
        </text>
      </svg>
    </motion.div>
  );
}
