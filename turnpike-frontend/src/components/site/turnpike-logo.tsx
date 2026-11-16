import { cn } from "@turnpike/shared/lib/utils";
import { motion } from "motion/react";

export function TurnpikeLogo({ className, dark = true, iconOnly = false }: { className?: string, dark?: boolean, iconOnly?: boolean }) {
  return (
    <motion.div 
      className={cn("flex items-center", dark ? "text-white" : "text-slate-900 dark:text-white", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* No inline <style> font import here: it injected a render-blocking
          stylesheet once per rendered logo, and the family it asked for was
          never actually applied. The wordmark uses the display face the rest
          of the site already loads. */}
      {/* viewBox is 420 wide, not 320: the full "Turnpike Analyst" wordmark in
          the display face needs the extra room, and the swoosh group is
          translated to stay centred over it. */}
      <svg
        viewBox="0 0 420 90"
        className={cn(
          // The wordmark is 4.7:1, so height drives a lot of width. Kept
          // modest so the navigation bar beside it has room on a laptop.
          "w-auto drop-shadow-md",
          iconOnly ? "h-9 sm:h-10" : "h-9 sm:h-10 lg:h-11",
        )}
      >
        <defs>
          <linearGradient id="swoosh-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#026bc2" />
            <stop offset="100%" stopColor="#6cc24a" />
          </linearGradient>
          <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity={dark ? "0.3" : "0.1"} />
          </filter>
        </defs>

        <g transform="translate(50 0)">
          {/* Top Swoosh */}
          <path
            d="M 125 35 C 160 5, 210 10, 240 35 C 190 20, 150 20, 120 42 Z"
            fill="url(#swoosh-grad)"
            filter="url(#logo-shadow)"
          />

          {/* Bottom Swoosh */}
          <path
            d="M 80 60 C 110 90, 160 85, 190 60 C 150 75, 110 75, 85 53 Z"
            fill="url(#swoosh-grad)"
            filter="url(#logo-shadow)"
          />
        </g>

        {/* Text */}
        <text
          x="210"
          y="62"
          textAnchor="middle"
          fill="currentColor"
          className="font-display"
          fontSize="42"
          fontWeight="700"
          letterSpacing="-0.5"
          filter="url(#logo-shadow)"
        >
          Turnpike Analyst
        </text>
      </svg>
    </motion.div>
  );
}
