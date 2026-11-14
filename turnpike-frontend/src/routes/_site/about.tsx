import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import React, { useRef, useState } from "react";

import { cn } from "@turnpike/shared/lib/utils";
import { AwardsStrip } from "@/components/site/awards-strip";
import { JourneyTimeline } from "@/components/site/journey-timeline";
import { Section, SectionHeading } from "@/components/site/section";
import { CounterBand, StatBand } from "@/components/site/stat-band";
import { WaveDivider } from "@/components/site/wave-divider";
import { FloatingParticles } from "@/components/site/floating-particles";
import { Button } from "@turnpike/shared/components/ui/button";
import {
  JOURNEY,
  LEADERSHIP,
} from "@/content/site-content";
import { usePublicStats, usePublicAwards } from "@turnpike/shared/hooks/use-public-api";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Turnpike Analyst — ECM, ETL & ESB Specialists" },
      {
        name: "description",
        content:
          "Two decades of enterprise content migration, integration and automation. Our story, mission, leadership and the milestones behind Turnpike Analyst.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "About Turnpike Analyst — ECM, ETL & ESB Specialists" },
      {
        property: "og:description",
        content:
          "Engineering-led ECM migration, automation and enablement for regulated organisations worldwide.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

// Helper component for staggered text reveal effect
const AnimatedText = ({ text, className, as: Component = "h1" }: { text: string; className?: string; as?: any }) => {
  const lines = text.split('\\n');

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.02 } },
      }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, wordIndex) => (
            <span key={`${lineIndex}-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${wordIndex}-${charIndex}`}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
};

function FortmindzHero() {
  return (
    <section className="relative min-h-screen bg-[#333333] pt-12 pb-32 overflow-hidden flex flex-col justify-center">
      {/* Dot Pattern Background on Left */}
      <div 
        className="absolute top-0 left-0 w-1/3 h-full pointer-events-none opacity-60" 
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />
      
      {/* Orange Accents on Edges */}
      <div className="absolute top-[20%] left-0 w-8 h-48 bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] rounded-r-md shadow-lg" />
      <div className="absolute bottom-0 right-0 w-48 h-24 bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] rounded-tl-xl shadow-lg" />
      
      {/* White Diagonal Line Top Right */}
      <div className="absolute top-12 right-24 w-1 h-40 bg-white rotate-45 transform origin-top opacity-80" />
      
      {/* White Horizontal Line Bottom Left */}
      <div className="absolute bottom-16 left-16 w-56 h-1 bg-white opacity-80" />

      <div className="container mx-auto max-w-7xl px-5 sm:px-8 relative z-10 flex flex-col items-center">
        
        {/* Top Left White Card containing Pill (Removed) */}

        {/* Laptop Frame Mockup & Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-5xl z-10 mt-20 lg:mt-16"
        >
          {/* Laptop Screen Frame */}
          <div className="relative bg-[#1A1A1A] rounded-t-3xl p-3 pb-6 shadow-2xl border-x-4 border-t-4 border-slate-700">
             <div className="bg-black w-full rounded-xl overflow-hidden relative border border-slate-800">
               <img 
                 src="/images/fortmindz_hero_placeholder_1785519062799.png" 
                 alt="Team working" 
                 className="w-full aspect-[16/10] object-cover opacity-90" 
               />
             </div>
          </div>
          {/* Laptop Base/Keyboard Deck */}
          <div className="relative h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded-b-2xl rounded-t-sm w-[104%] -ml-[2%] shadow-2xl flex justify-center z-20">
             <div className="w-1/4 h-2 bg-slate-200 mt-0 rounded-b-md shadow-inner" />
          </div>
        </motion.div>

        {/* Wide Orange Card Overlapping Laptop */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative -mt-16 w-full max-w-6xl bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] rounded-[2.5rem] shadow-2xl p-10 md:p-16 z-30 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16">
            
            {/* Left Column: Heading */}
            <div className="w-full md:w-5/12 flex items-center justify-center md:justify-start">
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                The engineering<br />solution your<br />team deserves.
              </h1>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-[2px] bg-slate-900/15 rounded-full" />
            <div className="md:hidden h-[2px] w-full bg-slate-900/15 rounded-full" />

            {/* Right Column: Paragraph */}
            <div className="w-full md:w-7/12 flex items-center">
              <p className="text-xl sm:text-2xl font-medium text-slate-900/90 leading-relaxed">
                Turnpike saves you time and money on migrations, integrations, platform operations and so much more. Start your free trial!
              </p>
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function MouseTiltCard({ item, index }: { item: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        opacity: { duration: 0.8, delay: index * 0.2 },
        y: { type: "spring", damping: 25, stiffness: 120, delay: index * 0.2 }
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative rounded-[2.5rem] bg-card p-12 lg:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 hover:shadow-[0_40px_100px_-20px_color-mix(in_oklab,var(--brand-cyan)_30%,transparent)] transition-all duration-300"
    >
      <div style={{ transform: "translateZ(50px)" }} className="absolute -top-8 -right-8 flex size-20 items-center justify-center rounded-full bg-[linear-gradient(140deg,var(--brand-cyan),var(--primary))] text-primary-foreground shadow-[0_10px_30px_-5px_var(--brand-cyan)] border-[8px] border-background transition-transform duration-300">
        {item.icon}
      </div>
      
      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="mb-6 text-3xl font-bold tracking-tight text-foreground">{item.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

function AboutPage() {
  const statsQuery = usePublicStats();
  const awardsQuery = usePublicAwards();
  const counters = statsQuery.data?.slice(0, 4).map(c => ({ ...c, value: Number(c.value) })) ?? [];

  return (
    <div className="relative w-full overflow-clip bg-background">
      <FloatingParticles />
      <div className="relative z-10">
        <FortmindzHero />

      {/* Fortmindz Style Mission & Vision - Infographic Redesign */}
      <section className="relative w-full bg-white py-24 overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 max-w-7xl">
          
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-light font-display text-slate-700 uppercase tracking-widest"
            >
              Our Mission & Vision
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-6 mx-auto w-24 h-1 bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] rounded-full"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full mb-24 max-w-5xl mx-auto rounded-[1rem] overflow-hidden shadow-lg border border-border/40 bg-slate-900"
          >
             <img src="/images/high_speed_data_beams.png" alt="Digital Architecture" className="w-full h-auto max-h-[500px] object-cover opacity-90" />
             
             {/* Dynamic Data Streams Overlay */}
             <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
               {/* Scanner Line */}
               <motion.div 
                 animate={{ left: ["-30%", "130%"] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent skew-x-[-15deg]"
               />

               {/* Data Packet 1 (Diagonal Right-Down) */}
               <motion.div
                 animate={{ left: ["-5%", "105%"], top: ["10%", "85%"] }}
                 transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 0 }}
                 className="absolute size-1.5 sm:size-2 rounded-full bg-brand-cyan shadow-[0_0_15px_5px_var(--brand-cyan)]"
               />
               
               {/* Data Packet 2 (Diagonal Left-Up) */}
               <motion.div
                 animate={{ left: ["105%", "-5%"], top: ["80%", "20%"] }}
                 transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 1 }}
                 className="absolute size-2 sm:size-2.5 rounded-full bg-white shadow-[0_0_15px_5px_white]"
               />

               {/* Data Packet 3 (Steep Diagonal Right-Down) */}
               <motion.div
                 animate={{ left: ["20%", "85%"], top: ["-5%", "105%"] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
                 className="absolute size-1.5 sm:size-2 rounded-full bg-[var(--primary)] shadow-[0_0_15px_5px_var(--primary)]"
               />

               {/* Data Packet 4 (Horizontal-ish Left) */}
               <motion.div
                 animate={{ left: ["105%", "-5%"], top: ["45%", "65%"] }}
                 transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 0.5 }}
                 className="absolute size-1.5 sm:size-2 rounded-full bg-brand-cyan shadow-[0_0_12px_4px_var(--brand-cyan)]"
               />

               {/* Data Packet 5 (Fast Burst) */}
               <motion.div
                 animate={{ left: ["-5%", "105%"], top: ["60%", "30%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 3 }}
                 className="absolute size-1 sm:size-1.5 rounded-full bg-white shadow-[0_0_10px_3px_white]"
               />
               
               {/* Pulsing Core Node */}
               <motion.div
                 animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-[48%] left-[52%] size-2.5 sm:size-3 rounded-full bg-brand-cyan shadow-[0_0_20px_6px_var(--brand-cyan)]"
               />
               
               {/* Pulsing Edge Node */}
               <motion.div
                 animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute top-[28%] left-[25%] size-2 rounded-full bg-[var(--primary)] shadow-[0_0_15px_5px_var(--primary)]"
               />
             </div>
          </motion.div>

          {/* Infographic Overlapping Circles */}
          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-[550px] py-10">
            
            {/* Circle 1: Mission (Large Blue/Cyan) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              whileHover={{ zIndex: 30, scale: 1.04, transition: { duration: 0.4, ease: "easeOut" } }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="group relative z-20 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] shadow-[0_20px_50px_-15px_var(--brand-cyan)] flex flex-col items-center justify-center p-8 sm:p-14 text-center text-white cursor-pointer transition-shadow hover:shadow-[0_30px_60px_-15px_var(--brand-cyan)]"
            >
              <div className="mb-4 sm:mb-6 flex size-12 sm:size-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-inner">
                <Target className="size-6 sm:size-8" />
              </div>
              <h3 className="mb-3 sm:mb-5 text-2xl sm:text-3xl font-bold tracking-wider uppercase">Our Mission</h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/95">
                To make platform modernisation accessible to every organisation that depends on its content — whether you are retiring a legacy archive, consolidating four repositories into one, or automating an estate that runs 24/7. Every engagement is a commitment to deliver something measurable, not a deck.
              </p>
            </motion.div>

            {/* Circle 2: Vision (Light Gray) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              whileHover={{ zIndex: 30, scale: 1.04, transition: { duration: 0.4, ease: "easeOut" } }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
              className="group relative z-10 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full bg-[#F3F4F6] shadow-xl flex flex-col items-center justify-center p-6 sm:p-12 text-center border-[8px] border-white md:-ml-28 mt-[-80px] md:mt-0 cursor-pointer transition-shadow hover:shadow-2xl"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                <Eye className="size-6 sm:size-7" />
              </div>
              <h3 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-bold tracking-wider uppercase text-slate-800">Our Vision</h3>
              <p className="text-[12px] sm:text-[14px] leading-relaxed text-slate-600">
                To be the content and automation partner enterprises trust at every stage — from assessment to migration, from migration to autonomous operations. We want to be known for the outcomes our clients achieve: cleaner data, lower run cost and platforms their own teams can operate.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <WaveDivider variant="curve" />

      <Section>
        <SectionHeading
          eyebrow="Our story"
          title="Our digital journey"
          description="From a handful of ECM practitioners to a platform business shipping vendor-neutral migration and autonomous operations tooling."
        />
        <JourneyTimeline items={JOURNEY} />
      </Section>

      <WaveDivider variant="ribbon" />

      <Section className="bg-card/10">
        <SectionHeading
          eyebrow="Our leaders"
          title="Leadership team"
          description="Strategic vision, technical depth and operational discipline across every engagement."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((person, index) => (
            <LeadershipCard key={person.name} person={person} index={index} />
          ))}
        </div>
      </Section>

      <WaveDivider variant="peaks" />

      <Section>
        <SectionHeading
          eyebrow="Milestones"
          title="Our impact in numbers"
          description="Two decades of delivery across regulated industries, measured the only way that matters."
        />
        <CounterBand items={counters} />
      </Section>

      <WaveDivider variant="wave" />

      <Section className="bg-card/10">
        <SectionHeading
          eyebrow="Awards & recognition"
          title="Recognised by the industry we serve"
          description="Independent recognition for migration delivery, automation and enablement."
        />
        <AwardsStrip items={awardsQuery.data ?? []} />
      </Section>
      </div>
    </div>
  );
}

function LeadershipCard({ person, index }: { person: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1, 
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="group relative rounded-[2rem] border border-white/50 bg-white/45 p-2 backdrop-blur-xl shadow-[0_18px_50px_-26px_color-mix(in_oklab,var(--primary)_45%,transparent)] hover:shadow-[0_25px_60px_-20px_color-mix(in_oklab,var(--brand-cyan)_40%,transparent)] transition-all h-[260px] cursor-pointer"
    >
      <div className="relative h-full w-full rounded-[1.6rem] border border-white/40 bg-card/60 p-6 text-center backdrop-blur-2xl transition-colors duration-300 hover:bg-card/80 overflow-hidden">
        
        {/* 4 Corner Dots (appear when open) */}
        <motion.div animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute top-4 left-4 size-1.5 rounded-full bg-brand-cyan/60" />
        <motion.div animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute top-4 right-4 size-1.5 rounded-full bg-brand-cyan/60" />
        <motion.div animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute bottom-4 left-4 size-1.5 rounded-full bg-brand-cyan/60" />
        <motion.div animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute bottom-4 right-4 size-1.5 rounded-full bg-brand-cyan/60" />

        {/* State A: Avatar & Name (Default) */}
        <motion.div 
           animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -20 : 0, scale: isOpen ? 0.9 : 1, filter: isOpen ? "blur(4px)" : "blur(0px)" }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
           className={`absolute inset-0 flex flex-col items-center justify-center p-6 ${isOpen ? 'pointer-events-none' : ''}`}
        >
          <span className="font-display grid size-24 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-2xl font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105">
            {person.initials}
          </span>
          <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-foreground text-center">
            {person.name}
          </h3>
        </motion.div>

        {/* State B: Name & Role (On Hover/Click) */}
        <motion.div 
           animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20, scale: isOpen ? 1 : 0.9, filter: isOpen ? "blur(0px)" : "blur(4px)" }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
           className={`absolute inset-0 flex flex-col items-center justify-center p-6 ${!isOpen ? 'pointer-events-none' : ''}`}
        >
          <h3 className="font-display text-2xl font-bold tracking-tight text-foreground text-center">{person.name}</h3>
          <div className="mt-4 h-0.5 w-12 bg-brand-cyan/40 rounded-full" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-medium text-center">{person.role}</p>
        </motion.div>

      </div>
    </motion.div>
  );
}
