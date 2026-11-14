import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Generate 15 decorative floating particles scattered across the page height
  const particles = [
    { type: "circle", color: "bg-red-400", size: "size-3", top: "5%", left: "10%", delay: 0, duration: 8, yRange: -20 },
    { type: "circle", color: "bg-yellow-400", size: "size-4", top: "15%", left: "85%", delay: 1, duration: 10, yRange: -30 },
    { type: "quarter", color: "bg-emerald-400", size: "size-6", top: "25%", left: "90%", delay: 2, duration: 9, yRange: -25 },
    { type: "circle", color: "bg-brand-cyan", size: "size-2", top: "35%", left: "15%", delay: 0.5, duration: 7, yRange: -15 },
    { type: "square", color: "bg-purple-400", size: "size-4", top: "45%", left: "5%", delay: 3, duration: 11, yRange: -20 },
    { type: "circle", color: "bg-pink-400", size: "size-3", top: "55%", left: "80%", delay: 1.5, duration: 9, yRange: -25 },
    { type: "quarter", color: "bg-amber-400", size: "size-5", top: "65%", left: "10%", delay: 0.8, duration: 12, yRange: -30 },
    { type: "circle", color: "bg-blue-400", size: "size-4", top: "75%", left: "90%", delay: 2.2, duration: 8, yRange: -20 },
    { type: "square", color: "bg-emerald-300", size: "size-3", top: "85%", left: "20%", delay: 1.1, duration: 10, yRange: -25 },
    { type: "circle", color: "bg-red-300", size: "size-2", top: "95%", left: "85%", delay: 0.3, duration: 7, yRange: -15 },
    // Extra ones for middle density
    { type: "circle", color: "bg-primary", size: "size-3", top: "30%", left: "50%", delay: 1.8, duration: 11, yRange: -35 },
    { type: "square", color: "bg-brand-cyan", size: "size-5", top: "70%", left: "45%", delay: 2.5, duration: 9, yRange: -20 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.color} ${p.size}`}
          style={{
            top: p.top,
            left: p.left,
            borderRadius: p.type === "circle" ? "50%" : p.type === "quarter" ? "100% 0 0 0" : "6px",
          }}
          animate={{
            y: [0, p.yRange, 0],
            rotateZ: p.type !== "circle" ? [0, 10, -10, 0] : 0,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
