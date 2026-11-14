import { useState, useMemo, useEffect, useRef } from "react";
import { Server, Cloud, Database, Cog, Zap, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import FlexCarousel, { type FlexCarouselItem } from "@/components/ui/FlexCarousel";

// High-resolution visual proxy URLs for enterprise ecosystem cases
const IMAGES = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120544_94be5de4-0f4f-494c-bb78-c532290040a6.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120601_5c6e4705-b992-4227-9dff-9b000351c283.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120619_7bc65416-a3d7-4e8c-9929-743f233378fe.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120627_b40a97b0-c5fa-408c-a77e-dc8fa44f8584.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120635_515cde41-2dc6-48ce-a236-088a5bc74ca8.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120645_5a1170c6-145b-477b-abd2-f8620acccd8d.png&w=1920&q=85",
];

export interface ClientCaseItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  category: string;
  metric: string;
  tags: string[];
}

const ALL_CLIENT_CASES: ClientCaseItem[] = [
  {
    src: IMAGES[0],
    alt: "Tier-1 Global Investment Bank",
    title: "85M Records Migrated from FileNet P8 to Hybrid Cloud",
    subtitle: "Zero downtime transition with 100% cryptographic hash parity verification and automated AWS FileNet deployment.",
    category: "Platforms",
    metric: "85M Docs",
    tags: ["IBM FileNet P8", "AWS", "Hash Parity", "Zero Loss"]
  },
  {
    src: IMAGES[1],
    alt: "Silicon Valley AI Research Lab",
    title: "Autonomous Agent P8 Infrastructure Operations",
    subtitle: "24/7 self-healing FileNet site reliability operator integrating watsonx.ai for automated triage and incident resolution.",
    category: "Cloud",
    metric: "99.99% SLA",
    tags: ["Agent P8", "watsonx.ai", "Self-Healing", "Kubernetes"]
  },
  {
    src: IMAGES[2],
    alt: "Multinational Healthcare & Pharma",
    title: "21 CFR Part 11 Regulated Documentum Vault",
    subtitle: "FDA GxP audit-trail preservation and automated clinical trial master files across hybrid OpenText architectures.",
    category: "Platforms",
    metric: "100% Compliant",
    tags: ["OpenText", "FDA 21 CFR", "GxP Audit", "Pharma"]
  },
  {
    src: IMAGES[3],
    alt: "Fortune 50 Financial Services",
    title: "High-Throughput Real-time Ingestion Engine",
    subtitle: "Event-driven document ingestion processing 4M records daily with sub-second SLA on Kafka & Azure Service Bus.",
    category: "Automation",
    metric: "4M Docs/Day",
    tags: ["Apache Kafka", "Azure", "Sub-Second SLA", "Fintech"]
  },
  {
    src: IMAGES[4],
    alt: "European Telecoms Operator",
    title: "Multi-Region Red Hat OpenShift Modernisation",
    subtitle: "Active-active high-availability ECM cluster deployment with zero failover penalty and automated disaster recovery.",
    category: "Cloud",
    metric: "99.999% HA",
    tags: ["OpenShift", "Red Hat", "Active-Active", "Zero Failover"]
  },
  {
    src: IMAGES[5],
    alt: "Global Energy & Infrastructure",
    title: "Enterprise SharePoint & Box Governance",
    subtitle: "15 Petabytes of unstructured documents synchronized with immutable legal hold policies and NERC CIP controls.",
    category: "Database",
    metric: "15 PB Synced",
    tags: ["SharePoint", "Box", "NERC CIP", "Legal Hold"]
  },
  {
    src: "/services/ecm-content-migration.jpg",
    alt: "Global Banking Group",
    title: "Petabyte-Scale Content Archival Architecture",
    subtitle: "Cryptographic WORM storage vault satisfying SEC Rule 17a-4 and FINRA compliance with instant audit indexing.",
    category: "Platforms",
    metric: "SEC 17a-4",
    tags: ["WORM Storage", "FINRA", "Banking Vault", "Immutable"]
  },
  {
    src: "/services/agent-p8-operations.jpg",
    alt: "Autonomous Enterprise Operations",
    title: "Agent P8 Self-Healing Telemetry Cluster",
    subtitle: "Autonomous telemetry agents monitoring CPE, ICN, DB2 and LDAP connections with automated corrective execution.",
    category: "Automation",
    metric: "Sub-Second",
    tags: ["Autonomous Ops", "ServiceNow", "Jira Sync", "DB2"]
  },
  {
    src: "/services/zero-trust-cybersecurity.jpg",
    alt: "Defense & Critical Infrastructure",
    title: "CMMC Level 3 Zero-Trust Security Perimeter",
    subtitle: "Air-gapped GovCloud perimeter enforcement for ITAR defense engineering files with hardware-backed KMS encryption.",
    category: "Cloud",
    metric: "CMMC Level 3",
    tags: ["GovCloud", "ITAR", "Air-Gapped", "Hardware KMS"]
  },
  {
    src: "/services/cognitive-document-capture.jpg",
    alt: "Fintech Settlement Clearinghouse",
    title: "Cognitive Multi-Modal OCR & Document Pipeline",
    subtitle: "Zero-shot visual layout recognition processing 10,000 invoices per minute with automated accounting reconciliation.",
    category: "Automation",
    metric: "10K Docs/Min",
    tags: ["Multi-Modal AI", "OCR", "Zero-Shot", "Reconciliation"]
  }
];

export function TechStackExplorer({ stack }: { stack?: { category: string; items: string[] }[] }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedCase, setSelectedCase] = useState<ClientCaseItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return ALL_CLIENT_CASES;
    return ALL_CLIENT_CASES.filter(
      (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const carouselItems: FlexCarouselItem[] = useMemo(() => {
    return filteredItems.map((item) => ({
      src: item.src,
      alt: item.alt,
      title: item.title,
      subtitle: `${item.alt} • ${item.metric}`
    }));
  }, [filteredItems]);

  const activeCase = filteredItems[activeIdx] || filteredItems[0];

  // Scroll Runway tracking: Page scroll drives carousel smoothly from right-to-left
  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    let animId: number;

    const onScroll = () => {
      const rect = runway.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = rect.height - vh;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [filteredItems.length]);

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "platforms": return <Server className="size-3.5" />;
      case "cloud": return <Cloud className="size-3.5" />;
      case "database": return <Database className="size-3.5" />;
      case "automation": return <Cog className="size-3.5" />;
      default: return <Zap className="size-3.5" />;
    }
  };

  return (
    <div
      ref={runwayRef}
      id="clients-runway"
      className="relative w-full bg-transparent select-none"
      style={{
        // Runway height gives vertical scroll distance to traverse all cards right-to-left
        height: `${(1 + filteredItems.length * 0.35) * 100}vh`,
      }}
    >
      {/* ── Sticky Viewport Scene: Stays pinned while scrolling through all cards ── */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100lvh] overflow-hidden flex flex-col justify-between py-6 px-4 z-10">
        
        {/* ── Section Header (Clean, Transparent, Bold) ── */}
        <div className="max-w-4xl mx-auto px-4 text-center shrink-0 pt-2 sm:pt-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2 shadow-xs">
            <Sparkles className="size-3.5 text-primary animate-pulse" />
            <span>PROVEN AT PETABYTE SCALE</span>
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Our clients include 150 global brands and <span className="text-primary underline decoration-dashed decoration-primary/40 underline-offset-8">Silicon Valley</span> founders
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed hidden sm:block">
            Every major ECM, integration and cloud platform we migrate, integrate and operate. Scroll through verified enterprise deployments.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            {["All", "Platforms", "Cloud", "Automation", "Database"].map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveIdx(0);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/15"
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── React Bits <FlexCarousel /> 3D Liquid Glass Component Driven by Scroll ── */}
        <div className="w-full flex-1 min-h-[360px] max-h-[580px] relative my-auto">
          <FlexCarousel
            items={carouselItems}
            scrollProgress={scrollProgress}
            preset="liquid"
            intro="none"
            cardHeight={0.48}
            gap={14}
            radius={16}
            squeeze={0.2}
            focusOnClick={true}
            captions={true}
            autoplay={false}
            captureWheel={false}
            onChange={(idx) => setActiveIdx(idx)}
            onSelect={(idx) => {
              const item = filteredItems[idx];
              if (item) setSelectedCase(item);
            }}
          />
        </div>

        {/* ── Active Deployment Info Strip & Scroll Progress ── */}
        <div className="max-w-4xl w-full mx-auto px-4 pb-2 sm:pb-4 shrink-0 flex flex-col gap-2">
          {activeCase && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-black/8 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <CheckCircle2 className="size-3.5" />
                  {activeCase.metric}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-foreground">
                    {activeCase.alt}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1 max-w-md">
                    {activeCase.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedCase(activeCase)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
                >
                  <span>Case Specs</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── Case Study Detail Modal ── */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-background dark:bg-neutral-950 p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 grid size-9 place-items-center rounded-full bg-black/5 dark:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="size-3.5" />
                {selectedCase.category}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                Verified Production SLA
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2">
              {selectedCase.title}
            </h3>

            <p className="text-sm font-semibold text-primary mb-3">
              Client: {selectedCase.alt} • {selectedCase.metric}
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {selectedCase.subtitle}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCase.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-muted text-muted-foreground border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground font-mono">
                Cryptographic Audit: 100% Pass
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedCase(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <span>Deploy Similar Architecture</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
