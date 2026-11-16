/** Static marketing content that the platform API does not expose. */

export const HERO_CLAIMS = [
  {
    title: "Empowering Innovation With Artificial Intelligence",
    body: "JAMES WEBB Server enables seamless migration between any ECM platforms — FileNet, OpenText, Documentum and SharePoint — with secure, automated transfers of content and metadata across on-premises, cloud or hybrid estates.",
  },
  {
    title: "The Global Leader in ECM & Data Migration",
    body: "Turnpike Analyst is a global leader in ECM, ETL and ESB solutions. Our tooling and deep expertise enable lossless ECM-to-ECM migrations that modernise content platforms, unify data and optimise performance.",
  },
  {
    title: "Machine Learning: Unlocking Intelligent Insights",
    body: "Advanced platforms that combine powerful AI capability with intuitive interfaces — delivering actionable insight, smarter automation and measurable operational impact across every industry we serve.",
  },
] as const;

export const TECH_STACK = [
  {
    category: "Platforms",
    items: ["IBM FileNet P8", "OpenText", "Documentum", "SharePoint", "Hyland OnBase", "Nuxeo", "Box"]
  },
  {
    category: "Cloud",
    items: ["AWS", "Azure", "Kubernetes", "RHOCP"]
  },
  {
    category: "Database",
    items: ["Oracle", "MS SQL Server", "PostgreSQL"]
  },
  {
    category: "Languages",
    items: ["Java", "Python", "Node.js"]
  },
  {
    category: "Automation",
    items: ["MuleSoft", "Datacap", "Kofax"]
  }
];

export const CAPABILITIES = [
  {
    icon: "briefcase",
    title: "Business Consultancy",
    body: "Estate discovery, platform assessment and a migration business case your board can sign off on — grounded in the real state of your content systems.",
  },
  {
    icon: "code",
    title: "Business Development",
    body: "Custom engineering around your ECM core: connectors, ingestion pipelines, viewers and workflow services built to your governance standards.",
  },
  {
    icon: "search",
    title: "Search & Findability",
    body: "Metadata modelling, indexing strategy and search tuning so migrated content stays discoverable, auditable and defensible after cutover.",
  },
  {
    icon: "users",
    title: "Business Management",
    body: "Programme governance, role-based access design and lifecycle policy management across every repository in scope.",
  },
  {
    icon: "megaphone",
    title: "Adoption & Enablement",
    body: "Change programmes, playbooks and practitioner training that get real users onto the new platform, not just the data.",
  },
  {
    icon: "flask",
    title: "Usability & Assurance",
    body: "Reconciliation harnesses, fidelity testing and usability validation — every object, version and permission verified against source.",
  },
] as const;

export const FLAGSHIPS = [
  {
    id: "agent-p8",
    eyebrow: "Agent P8",
    title: "Goodbye, IBM FileNet P8 administrator",
    body: "Agent P8 is an AI-powered operator that monitors and manages the entire IBM FileNet P8 suite across every supported operating system, cloud (AWS, Azure) and database (DB2, Oracle, PostgreSQL). It gives real-time visibility into CPE, ICN, BAW, BAI, RPA, LDAP and any supported application server — detecting issues, applying intelligent fixes and raising tickets in ServiceNow or Jira automatically.",
    bullets: [
      { title: "24/7 virtual engineer with an optional chat interface", body: "Always active and monitoring the state of your infrastructure." },
      { title: "Automatic detection, diagnosis and remediation", body: "Self-healing capabilities that resolve issues before users notice." },
      { title: "Class creation and object store configuration on request", body: "Instantly translate natural language into platform configurations." },
      { title: "Native ServiceNow and Jira integration", body: "Automated ticket generation, updating, and closure." },
    ],
    cta: "Request an Agent P8 demo",
  },
  {
    id: "james-webb",
    eyebrow: "James Webb Server",
    title: "Universal ECM migration, any platform to any platform",
    body: "JAMES WEBB Server migrates content and metadata from any ECM platform to any other — regardless of vendor or format. Whether you are moving off FileNet, OpenText, SharePoint or Documentum, it delivers a secure, structured and lossless migration tailored to your industry and deployment model.",
    bullets: [
      { title: "Vendor-neutral source and target connectors", body: "Direct native API connections to over 25 enterprise content management platforms for lossless extraction without intermediate mapping." },
      { title: "Full metadata, version and permission fidelity", body: "Preserve the exact document history, security models, and custom metadata properties during transit to ensure total compliance." },
      { title: "On-premises, cloud and hybrid deployment models", body: "Run the migration engine exactly where your data is—fully containerized, scalable, and compliant with strict data sovereignty laws." },
      { title: "Auditable reconciliation reporting at every stage", body: "Cryptographic hashing and chain-of-custody reporting guarantees every single record is accounted for and verifiable." },
    ],
    cta: "View price plans",
  },
] as const;

export const COUNTERS = [
  { label: "Years Experience", value: 20, suffix: "+" },
  { label: "Countries Covered", value: 15, suffix: "+" },
  { label: "Recent Projects", value: 140, suffix: "" },
  { label: "Succeeded Projects", value: 3, suffix: "K+" },
] as const;

export const IMPACT_STATS = [
  { value: "50+", label: "In-house experts" },
  { value: "500+", label: "Awards in 20 years" },
  { value: "700+", label: "Clients worldwide" },
  { value: "150+", label: "Five-star reviews" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Budget vs Quality Trade-offs",
    body: "Every startup and SMB faces the same tension: building quickly and cheaply creates technical debt that slows you down later. Building perfectly takes too long. We find the exact right balance."
  },
  {
    title: "Finding the Right Technical Partner",
    body: "Most early-stage companies lack the internal technical expertise to evaluate what they are being told about technology choices, timelines and estimates. We provide transparent, honest engineering."
  },
  {
    title: "Scaling from MVP to Product",
    body: "The architecture that works for your first 100 users often fails at 10,000. Building for scale from day one adds cost. We build modular systems that scale intelligently when you need them to."
  }
] as const;

export const JOURNEY = [
  {
    year: "2005",
    title: "Founded on the shop floor",
    body: "Started as a handful of ECM practitioners doing the migrations nobody else would take on.",
  },
  {
    year: "2013",
    title: "ETL and ESB practice",
    body: "Expanded beyond content into integration — data pipelines and enterprise service bus delivery.",
  },
  {
    year: "2019",
    title: "Cloud and container era",
    body: "Moved regulated estates onto Azure, AWS and Red Hat OpenShift without breaking compliance.",
  },
  {
    year: "2023",
    title: "JAMES WEBB Server",
    body: "Released a vendor-neutral migration engine covering any ECM source and any ECM target.",
  },
  {
    year: "2025",
    title: "Agent P8 and applied AI",
    body: "Autonomous platform operations arrive — AI that watches, diagnoses and fixes FileNet estates.",
  },
] as const;

export const LEADERSHIP = [
  { name: "Operations Leadership", role: "Delivery & Programme Governance", initials: "OL" },
  { name: "Engineering Leadership", role: "Migration Platform Architecture", initials: "EL" },
  { name: "Information Security", role: "Compliance & Data Governance", initials: "IS" },
  { name: "Academy Leadership", role: "Practitioner Training & Enablement", initials: "AL" },
] as const;

export const AWARDS = [
  { title: "ECM Modernisation Partner", body: "Recognised for large-scale regulated migration delivery." },
  { title: "Automation Excellence", body: "Awarded for autonomous platform operations with Agent P8." },
  { title: "Cloud Transformation", body: "Honoured for hybrid and cloud-native ECM programmes." },
  { title: "Training Provider of the Year", body: "For practitioner-led enablement across enterprise teams." },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "They moved 40 million objects off Image Services without a single reconciliation exception. The audit team signed off first time.",
    name: "Programme Director",
    role: "Global insurance group",
  },
  {
    quote:
      "Agent P8 has replaced an entire on-call rota. Incidents get diagnosed and closed before our team even opens the console.",
    name: "Head of Platform Operations",
    role: "Retail banking",
  },
  {
    quote:
      "The training was the difference. Six weeks after cutover our own people were running the estate end to end.",
    name: "Director of Information Management",
    role: "Public sector agency",
  },
] as const;

export const DEPARTMENTS = [
  {
    value: "TECHNICAL_TEAM",
    title: "Technical Team",
    body: "Architecture, migration scoping, connectors and platform troubleshooting.",
  },
  {
    value: "MANAGEMENT_TEAM",
    title: "Management Team",
    body: "Commercials, programme governance, contracts and partnership enquiries.",
  },
  {
    value: "HELP_DESK",
    title: "Help Desk",
    body: "Existing customers with live incidents, licensing or account questions.",
  },
] as const;

export const CONTACT_PHONE = "+91 9088195298";
