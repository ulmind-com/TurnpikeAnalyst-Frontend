import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * WhatsApp number in international format WITHOUT the "+" or spaces
 * (e.g. 919876543210 for +91 98765 43210). Leave empty to hide the
 * WhatsApp button entirely — better no button than a link to a wrong number.
 */
const WHATSAPP_NUMBER = "";
const WHATSAPP_PREFILL = "Hi Turnpike Analyst, I have a question about your services.";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.257.59 4.46 1.712 6.403L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.234 1.588h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.8-12.805-12.8zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.388-.23-4.003 1.05 1.07-3.9-.253-.4a10.56 10.56 0 0 1-1.62-5.63c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.108 7.52 3.12a10.56 10.56 0 0 1 3.115 7.52c0 5.865-4.77 10.635-10.64 10.635zm5.83-7.96c-.32-.16-1.89-.93-2.183-1.037-.293-.107-.507-.16-.72.16-.213.32-.826 1.037-1.013 1.25-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.59-1.894-1.777-2.214-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.094 1.306 3.307.16.213 2.256 3.444 5.466 4.83.764.33 1.36.527 1.824.674.767.244 1.464.21 2.016.127.615-.092 1.89-.773 2.156-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" />
    </svg>
  );
}

/** Floating helpers: scroll-to-top (bottom-left) and a WhatsApp enquiry
 * button (bottom-right, below the support-chat launcher). */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`
    : null;

  return (
    <>
      {/* Scroll-to-top, kept on the opposite corner so it never collides
          with the WhatsApp + chatbot stack on the right. */}
      <AnimatePresence>
        {visible ? (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full border border-border/60 bg-background/70 text-primary backdrop-blur-xl shadow-[0_16px_36px_-20px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* WhatsApp — bottom of the right-hand stack; the chatbot launcher
          (in SupportChat) sits directly above it. */}
      {waHref ? (
        <motion.a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_36px_-16px_rgba(37,211,102,0.8)]"
        >
          <WhatsAppGlyph className="size-7" />
        </motion.a>
      ) : null}
    </>
  );
}
