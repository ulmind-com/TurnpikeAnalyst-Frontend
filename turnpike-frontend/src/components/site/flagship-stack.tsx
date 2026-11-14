import React, { useState } from "react";
import { ScrollStack, ScrollStackItem } from "@/components/ui/ScrollStack";
import { Button } from "@turnpike/shared/components/ui/button";
import {
  Bot,
  Database,
  FileText,
  ShieldCheck,
  Zap,
  Cloud,
  Network,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Server
} from "lucide-react";

interface FlagshipCardData {
  id: string;
  eyebrow: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  title: string;
  body: string;
  gradient: string;
  bullets: { title: string; body: string }[];
  tags: string[];
  metric: string;
  metricLabel: string;
  ctaText: string;
}

const FLAGSHIP_STACK_CARDS: FlagshipCardData[] = [
  {
    id: "agent-p8",
    eyebrow: "Agent P8 • Autonomous Operator",
    badgeIcon: <Bot className="size-3.5" />,
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "Goodbye, IBM FileNet P8 administrator",
    body: "Agent P8 is an AI-powered operator that monitors and manages the entire IBM FileNet P8 suite across every OS, cloud (AWS, Azure) and database (DB2, Oracle, PostgreSQL). It gives real-time visibility into CPE, ICN, BAW, BAI, RPA, LDAP and application servers — detecting issues, applying intelligent fixes and raising tickets in ServiceNow or Jira automatically.",
    gradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    bullets: [
      {
        title: "24/7 Virtual Site Reliability Engineer",
        body: "Real-time automated detection, diagnosis and self-healing before users experience downtime."
      },
      {
        title: "Natural Language Configuration",
        body: "Automatic class creation, object store indexing, and document lifecycle rules via chat interface."
      },
      {
        title: "Bidirectional ITSM Synchronization",
        body: "Instant automated ticket creation, triage, remediation logging, and closure in ServiceNow & Jira."
      }
    ],
    tags: ["IBM FileNet P8", "watsonx.ai", "Kubernetes", "ServiceNow", "DB2 / Oracle"],
    metric: "99.99%",
    metricLabel: "Automated Ticket Resolution Rate",
    ctaText: "Request Agent P8 Demo"
  },
  {
    id: "james-webb",
    eyebrow: "James Webb Server • Universal Migration",
    badgeIcon: <Database className="size-3.5" />,
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    title: "Universal ECM migration, any platform to any platform",
    body: "JAMES WEBB Server migrates content and metadata from any ECM platform to any other — regardless of vendor or format. Whether moving off FileNet, OpenText, SharePoint, Documentum, or Alfresco, it delivers a secure, structured and lossless migration tailored to your industry and deployment model.",
    gradient: "from-blue-500/15 via-indigo-500/5 to-transparent",
    bullets: [
      {
        title: "25+ Native Direct API Connectors",
        body: "Lossless extraction directly from source databases and binary stores without intermediate staging."
      },
      {
        title: "Full Permission & Version Fidelity",
        body: "Exact retention of multi-version document trees, custom property schemas, and complex ACL security."
      },
      {
        title: "Cryptographic Chain of Custody",
        body: "Automated SHA-256 byte-by-byte verification ensuring zero dropped records and auditable reconciliation."
      }
    ],
    tags: ["FileNet to Cloud", "Documentum", "SharePoint", "OpenText", "Lossless ETL"],
    metric: "85M+",
    metricLabel: "Records Migrated with Zero Loss",
    ctaText: "View Migration Architecture"
  },
  {
    id: "cognitive-capture",
    eyebrow: "Cognitive AI • Document Intelligence",
    badgeIcon: <FileText className="size-3.5" />,
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    title: "Cognitive multi-modal document capture & processing",
    body: "Eliminate manual data entry and brittle legacy OCR templates. Our multi-modal AI engine ingests structured, semi-structured, and handwriting-heavy documents at scale — parsing complex invoices, clinical trial forms, and customs declarations with 99.8% precision.",
    gradient: "from-purple-500/15 via-violet-500/5 to-transparent",
    bullets: [
      {
        title: "Zero-Shot Layout Analysis",
        body: "Vision LLMs understand tabular line-items, checkboxes, stamps, and signatures in any format."
      },
      {
        title: "Human-in-the-Loop Active Learning",
        body: "Confidence-scored exception routing that trains custom extraction models on edge cases in real time."
      },
      {
        title: "High-Throughput Sub-Second Ingestion",
        body: "Distributed pipeline processing over 10,000 pages per minute with automated webhook callbacks."
      }
    ],
    tags: ["Vision LLM", "Datacap Upgrade", "Automated OCR", "Active Learning"],
    metric: "10K / min",
    metricLabel: "Document Extraction Throughput",
    ctaText: "Explore Cognitive Capture"
  },
  {
    id: "zero-trust",
    eyebrow: "Cybersecurity • CMMC & 21 CFR",
    badgeIcon: <ShieldCheck className="size-3.5" />,
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    title: "Air-gapped zero-trust perimeter & regulatory vaults",
    body: "Hardened security perimeters designed for defense, aerospace, healthcare, and financial institutions. We implement cryptographic WORM compliance, role-based boundary separation, micro-segmentation, and immutable audit ledgers across hybrid cloud architectures.",
    gradient: "from-cyan-500/15 via-teal-500/5 to-transparent",
    bullets: [
      {
        title: "CMMC Level 3 & ITAR Enforcement",
        body: "GovCloud air-gapped container architectures satisfying strict Department of Defense requirements."
      },
      {
        title: "FDA 21 CFR Part 11 Validation",
        body: "Electronic signatures, cryptographic tamper-evidence, and validated GxP clinical trail master files."
      },
      {
        title: "Immutable WORM Storage",
        body: "SEC Rule 17a-4 and SOC2 Type II compliance guaranteeing zero unauthorized modifications or deletion."
      }
    ],
    tags: ["CMMC Level 3", "21 CFR Part 11", "SEC 17a-4", "WORM Storage", "Air-Gapped"],
    metric: "100%",
    metricLabel: "Audit Trail Cryptographic Parity",
    ctaText: "Review Security Architecture"
  },
  {
    id: "realtime-ingestion",
    eyebrow: "Streaming Data • Sub-Second SLA",
    badgeIcon: <Zap className="size-3.5" />,
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    title: "High-throughput real-time streaming ingestion engine",
    body: "High-frequency event pipelines built for tier-1 investment banks and global telecom operators. Decoupled microservice collectors process massive streaming document payloads with sub-millisecond latency and guaranteed exactly-once delivery semantics.",
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    bullets: [
      {
        title: "Distributed Streaming Bus",
        body: "Apache Kafka and Pulsar message brokers handling millions of concurrent events without message loss."
      },
      {
        title: "Dynamic Kubernetes Auto-Scaling",
        body: "KEDA-powered elastic worker pools scaling horizontally in seconds based on real-time backlog depth."
      },
      {
        title: "In-Flight PII Masking & Sanitization",
        body: "Automated cryptographic masking of sensitive personal records before storage in downstream data lakes."
      }
    ],
    tags: ["Apache Kafka", "KEDA", "Kubernetes", "10M+ Events/Day", "Sub-Millisecond"],
    metric: "10M+",
    metricLabel: "Daily Ingestion Event Volume",
    ctaText: "See Streaming Specs"
  },
  {
    id: "cloud-modernization",
    eyebrow: "Cloud Native • Active-Active HA",
    badgeIcon: <Cloud className="size-3.5" />,
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    title: "Multi-region Red Hat OpenShift & cloud modernization",
    body: "Transform legacy monolithic ECM deployments into elastic, cloud-native containerized platforms. We migrate mission-critical content workloads to Red Hat OpenShift, AWS EKS, and Azure AKS with zero downtime and automated cross-region disaster recovery.",
    gradient: "from-rose-500/15 via-pink-500/5 to-transparent",
    bullets: [
      {
        title: "Active-Active Multi-Region High Availability",
        body: "Synchronized geo-distributed clusters with automated traffic failover under 30 seconds."
      },
      {
        title: "GitOps Declarative CI/CD Pipelines",
        body: "Continuous delivery using ArgoCD, Helm charts, and automated regression testing harnesses."
      },
      {
        title: "FinOps Compute Optimization",
        body: "40%+ cloud infrastructure spend reduction via container bin-packing and automated spot instances."
      }
    ],
    tags: ["Red Hat OpenShift", "AWS EKS", "Azure AKS", "ArgoCD", "99.999% HA"],
    metric: "99.999%",
    metricLabel: "Active-Active Uptime Guarantee",
    ctaText: "Plan Cloud Migration"
  },
  {
    id: "enterprise-rag",
    eyebrow: "Enterprise RAG • Private Intelligence",
    badgeIcon: <Network className="size-3.5" />,
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    title: "Private knowledge graph & permission-aware RAG",
    body: "Turn disconnected enterprise content silos into an authoritative, private knowledge graph. Ground enterprise LLMs on your proprietary ECM documents with strict permission-aware retrieval, hybrid dense-sparse vector search, and zero data leakage.",
    gradient: "from-indigo-500/15 via-blue-500/5 to-transparent",
    bullets: [
      {
        title: "Permission-Aware Access Filtering",
        body: "Real-time ACL mapping ensuring AI models only surface information the asking user is authorized to see."
      },
      {
        title: "Hybrid Vector + Knowledge Graph Retrieval",
        body: "Combined semantic vector similarity with Neo4j entity relationships for hallucinations-free responses."
      },
      {
        title: "100% Air-Gapped Private Deployment",
        body: "Run state-of-the-art open weights (Ollama, vLLM) on your own secure VPC or on-premises servers."
      }
    ],
    tags: ["Private RAG", "Knowledge Graph", "Neo4j", "Ollama / vLLM", "Zero Leakage"],
    metric: "0%",
    metricLabel: "Data Leakage / Air-Gapped",
    ctaText: "Explore Private AI"
  }
];

interface FlagshipOverride {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  bullets?: { title: string; body: string }[];
  cta?: string;
}

export function FlagshipStack({
  onBookConsultant,
  flagships,
}: {
  onBookConsultant?: () => void;
  /** CMS text overrides, merged by index over the built-in card artwork. */
  flagships?: FlagshipOverride[];
}) {
  const [completed, setCompleted] = useState(false);

  const cards: FlagshipCardData[] = FLAGSHIP_STACK_CARDS.map((card, i) => {
    const o = flagships?.[i];
    if (!o) return card;
    return {
      ...card,
      eyebrow: o.eyebrow || card.eyebrow,
      title: o.title || card.title,
      body: o.body || card.body,
      bullets: o.bullets?.length ? o.bullets : card.bullets,
      ctaText: o.cta || card.ctaText,
    };
  });

  return (
    <div className="relative w-full py-8">
      {/* ── Section Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          <Layers className="size-3.5" />
          <span>FLAGSHIP INNOVATIONS &amp; OPERATORS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Proprietary Platforms <span className="text-primary">Engineered</span> for Scale
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          From AI-powered autonomous FileNet administrators to universal migration engines and air-gapped zero-trust vaults — scroll through our flagship systems below.
        </p>

        {/* Scroll Hint */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-muted-foreground/80 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full">
          <span>↓ SCROLL TO STACK CARDS</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          REACT BITS: <ScrollStack /> Full Screen Window Stack
         ══════════════════════════════════════════════════════ */}
      <div className="relative w-full bg-transparent">
        <ScrollStack
          itemDistance={120}
          itemStackDistance={22}
          stackPosition="12vh"
          itemScale={0.03}
          baseScale={0.88}
          dimAmount={0.14}
          blurAmount={0}
          tiltAmount={0}
          rotationAmount={0}
          holdDistance={160}
          smoothScroll={false}
          snap={false}
          useWindowScroll={true}
          onStackComplete={() => setCompleted(true)}
          className="w-full bg-transparent"
        >
          {cards.map((card, index) => (
            <ScrollStackItem
              key={card.id}
              itemClassName="!p-0 border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl bg-white dark:bg-[#121318]"
            >
              <div className={`relative w-full h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br ${card.gradient}`}>
                
                {/* Top Row: Eyebrow Badge + Metric Callout */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${card.badgeColor}`}>
                    {card.badgeIcon}
                    <span>{card.eyebrow}</span>
                  </span>

                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-foreground">
                      {card.metric}
                    </span>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      {card.metricLabel}
                    </p>
                  </div>
                </div>

                {/* Main Headline & Description */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-4xl">
                    {card.body}
                  </p>
                </div>

                {/* 3 Key Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {card.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 backdrop-blur-xs flex flex-col justify-start"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-1">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span className="line-clamp-1">{bullet.title}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug line-clamp-3">
                        {bullet.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom Row: Tags + CTA Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-black/5 dark:bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-foreground/80 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>

              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}

