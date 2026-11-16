import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Linkedin } from "lucide-react";

// X (Twitter) glyph — lucide ships only the old bird, so inline the current mark.
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
];

const COLUMNS: {
  title: string;
  links: { label: string; to: string; badge?: string }[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "Services", to: "/services" },
      { label: "Software support", to: "/software-support" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Customer stories", to: "/our-clients" },
      { label: "Blog & insights", to: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/career", badge: "WE'RE HIRING" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-background text-foreground border-t border-border px-5 sm:px-8 pt-14 pb-7 font-sans">
      <div className="mx-auto w-full max-w-7xl">
        {/* ── Top: brand + link columns ── */}
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-[15px] leading-relaxed text-foreground">
              Turnpike Analyst is the modern, intuitive way to migrate, automate &amp; protect your enterprise content.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-xl border border-border text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="border-t border-border pt-5">
              <h3 className="text-[15px] font-bold tracking-tight text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                    {link.badge && (
                      <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                        {link.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Giant outlined wordmark ── */}
        <div className="mt-14 overflow-hidden" aria-hidden>
          <div
            className="w-full select-none text-center font-black leading-[0.8]"
            style={{
              fontFamily: "'Archivo', 'Inter', system-ui, sans-serif",
              fontSize: "clamp(3.5rem, 15.8vw, 13rem)",
              letterSpacing: "-0.01em",
              color: "transparent",
              WebkitTextStroke: "1.5px var(--border)",
              WebkitTextFillColor: "transparent",
              maskImage: "linear-gradient(to bottom, #000 48%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 48%, transparent 100%)",
            }}
          >
            TURNPIKE
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 flex flex-col gap-5 border-t border-border pt-6 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <p>© {year} Turnpike Analyst / Enterprise content, migrated &amp; protected.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-5 text-xs sm:text-sm">
              <Link to="/faq" className="transition-colors hover:text-foreground">
                Security
              </Link>
              <Link to="/faq" className="transition-colors hover:text-foreground">
                Terms of service
              </Link>
              <Link to="/faq" className="transition-colors hover:text-foreground">
                Privacy policy
              </Link>
            </div>
            <span className="hidden h-3.5 w-px bg-border sm:inline-block" aria-hidden="true" />
            <a
              href="https://www.ulmind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-[13px] font-medium text-foreground/90 transition-all hover:text-foreground"
            >
              <span className="opacity-80 transition-opacity group-hover:opacity-100">
                Designed and Developed by
              </span>
              <img
                src="/assets/ulmind.png"
                alt="Ulmind"
                className="h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 sm:h-11"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
