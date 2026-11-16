export interface DynamicServiceData {
  heroImage: string;
  whyItMatters: {
    title: string;
    description: string;
    icon: string; // We'll map this to lucide icons in the component
  }[];
  offerings: {
    title: string;
    description: string;
    img: string;
  }[];
  process?: {
    title: string;
    description: string;
  }[];
  comparison?: {
    feature: string;
    us: string;
    typical: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  industries?: {
    name: string;
    icon: string;
  }[];
  industryIntro?: string;
}

import { SERVICE_EXTRAS } from "./services-dynamic-extra";

// A dictionary of highly-tailored custom content for top services.
const CUSTOM_SERVICES: Record<string, DynamicServiceData> = {
  "digital-content-migration": {
    heroImage: "/illustrations/service-content-migration.jpg",
    whyItMatters: [
      {
        title: "Zero-Downtime Cuts",
        description: "Move petabytes of data using JAMES WEBB servers with parallel processing, eliminating offline windows.",
        icon: "Database"
      },
      {
        title: "Checksum Integrity",
        description: "100% cryptographic hashing ensures no bit is flipped during migration.",
        icon: "Shield"
      },
      {
        title: "Compliance Preserved",
        description: "All audit trails, metadata mapping, and legacy folder schemas remain intact.",
        icon: "CheckCircle2"
      }
    ],
    offerings: [
      { title: "Cloud Sync", description: "Azure and AWS rapid ingestion for ECM workloads.", img: "/images/cloud.png" },
      { title: "Legacy Sunset", description: "Safely retire FileNet, OpenText, and Documentum platforms.", img: "/images/engineering.png" },
      { title: "Data Validation", description: "Automated QA testing for metadata post-migration.", img: "/images/cybersecurity.png" }
    ]
  },
  "digital-content-capture": {
    heroImage: "/illustrations/service-content-capture.jpg",
    whyItMatters: [
      {
        title: "Cognitive AI OCR",
        description: "Extract data from unstructured documents with high accuracy using Kofax & ABBYY engines.",
        icon: "Scan"
      },
      {
        title: "Automated Routing",
        description: "Instantly route recognized forms into SAP and Oracle workflows.",
        icon: "Workflow"
      },
      {
        title: "Error Reduction",
        description: "Minimize manual entry, freeing up resources for higher-value analytical work.",
        icon: "Activity"
      }
    ],
    offerings: [
      { title: "Invoice Processing", description: "Automated AP workflows and PO matching.", img: "/images/ai.png" },
      { title: "Mailroom Automation", description: "Digital ingestion of physical mail directly into CRM.", img: "/images/uiux.png" },
      { title: "Handwriting NLP", description: "Decipher complex cursive forms seamlessly.", img: "/images/cybersecurity.png" }
    ]
  },
  "managed-services": {
    heroImage: "/illustrations/service-managed-services.jpg",
    whyItMatters: [
      {
        title: "24/7 SLA Support",
        description: "Our NOC provides round-the-clock monitoring and remediation.",
        icon: "Clock"
      },
      {
        title: "Proactive Patching",
        description: "Prevent vulnerabilities before they are exploited.",
        icon: "Shield"
      },
      {
        title: "L3 Engineering",
        description: "Direct access to Tier 3 certified ECM architects.",
        icon: "Cpu"
      }
    ],
    offerings: [
      { title: "Infrastructure Health", description: "Continuous tuning for maximum application throughput.", img: "/images/engineering.png" },
      { title: "Disaster Recovery", description: "RTO/RPO SLA-backed data mirroring operations.", img: "/images/cloud.png" },
      { title: "Incident Management", description: "ITIL aligned ticket resolution workflows.", img: "/images/uiux.png" }
    ]
  },
  "aerospace-defense": {
    heroImage: "/illustrations/industry-aerospace.jpg",
    whyItMatters: [
      {
        title: "Mission-Critical Reliability",
        description: "In aerospace and defense, failure is not an option. Our systems are built with multi-layered redundancies and strict compliance standards to ensure 99.999% uptime.",
        icon: "ShieldCheck"
      },
      {
        title: "Advanced Threat Detection",
        description: "We deploy state-of-the-art AI monitoring to proactively identify and neutralize vulnerabilities before they can be exploited by hostile actors.",
        icon: "Radar"
      },
      {
        title: "Secure Supply Chain",
        description: "End-to-end cryptographic verification ensures that every component and data packet remains uncompromised from manufacturing to deployment.",
        icon: "Lock"
      }
    ],
    offerings: [
      {
        title: "Tactical Systems Integration",
        description: "We seamlessly merge legacy defense systems with modern cloud infrastructure, ensuring interoperability without sacrificing security protocols.",
        img: "/images/generic_1.png"
      },
      {
        title: "Satellite Data Analytics",
        description: "Process and analyze massive streams of telemetry and geospatial data in real-time, turning raw signals into actionable intelligence.",
        img: "/images/uiux.png"
      },
      {
        title: "Autonomous Fleet Control",
        description: "Develop secure command-and-control interfaces for unmanned aerial vehicles (UAVs) with zero-latency failover mechanisms.",
        img: "/images/engineering.png"
      }
    ]
  },
  "cybersecurity": {
    heroImage: "/images/cybersecurity.png",
    whyItMatters: [
      {
        title: "Zero Trust Architecture",
        description: "Never trust, always verify. We implement micro-segmentation and strict identity verification to ensure your internal network is as secure as the perimeter.",
        icon: "Fingerprint"
      },
      {
        title: "Regulatory Compliance",
        description: "Stay ahead of HIPAA, GDPR, and SOC2 requirements. We automate compliance reporting so you can focus on growth instead of audits.",
        icon: "FileCheck"
      },
      {
        title: "Rapid Incident Response",
        description: "When seconds count, our automated playbooks instantly isolate breaches, drastically reducing dwell time and potential data loss.",
        icon: "Siren"
      }
    ],
    offerings: [
      {
        title: "Penetration Testing",
        description: "Our ethical hackers simulate real-world attacks against your infrastructure, identifying hidden vulnerabilities before malicious actors do.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Endpoint Security",
        description: "Secure your remote workforce with next-generation antivirus (NGAV) and endpoint detection and response (EDR) solutions.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Threat Intelligence",
        description: "Leverage global threat feeds and machine learning to predict and block zero-day exploits specific to your industry.",
        img: "/images/ai.png"
      }
    ]
  },
  "artificial-intelligence": {
    heroImage: "/images/ai.png",
    whyItMatters: [
      {
        title: "Operational Efficiency",
        description: "Automate repetitive tasks and complex decision-making processes, freeing your human talent to focus on high-value strategic work.",
        icon: "Cpu"
      },
      {
        title: "Predictive Analytics",
        description: "Stop guessing. We build models that forecast market trends, customer churn, and inventory needs with stunning accuracy.",
        icon: "LineChart"
      },
      {
        title: "Hyper-Personalization",
        description: "Deliver unique experiences to millions of users simultaneously. AI models dynamically adapt your product to individual user behavior.",
        icon: "Users"
      }
    ],
    offerings: [
      {
        title: "Custom LLM Training",
        description: "We fine-tune Large Language Models on your proprietary corporate data, creating an internal AI brain that securely understands your business.",
        img: "/images/cloud.png"
      },
      {
        title: "Computer Vision Systems",
        description: "Automate quality control, security monitoring, and spatial analysis using advanced image recognition neural networks.",
        img: "/images/generic_1.png"
      },
      {
        title: "AI Integration Strategy",
        description: "Don't just bolt on AI. We architect a holistic integration plan that seamlessly embeds machine intelligence into your existing workflows.",
        img: "/images/uiux.png"
      }
    ]
  },
  "cloud": {
    heroImage: "/images/cloud.png",
    whyItMatters: [
      {
        title: "Infinite Scalability",
        description: "Never worry about traffic spikes again. Our auto-scaling architectures dynamically provision resources exactly when you need them.",
        icon: "ArrowUpRight"
      },
      {
        title: "Cost Optimization",
        description: "Stop paying for idle servers. We restructure your workloads into serverless and containerized deployments to slash infrastructure bills.",
        icon: "DollarSign"
      },
      {
        title: "Global Reliability",
        description: "Achieve true high availability with multi-region deployments, ensuring your services stay online even during regional outages.",
        icon: "Globe"
      }
    ],
    offerings: [
      {
        title: "Cloud Migration",
        description: "Seamlessly transition your legacy monolithic applications into agile, cloud-native microservices with zero downtime.",
        img: "/images/engineering.png"
      },
      {
        title: "DevOps Automation",
        description: "We build fully automated CI/CD pipelines, turning software deployment from a stressful event into a boring, routine button click.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Infrastructure as Code",
        description: "Manage your entire cloud environment using version-controlled code, ensuring perfectly reproducible and documented infrastructure.",
        img: "/images/ai.png"
      }
    ]
  },
  "retail": {
    heroImage: "/images/cloud.png",
    whyItMatters: [
      {
        title: "Omnichannel Conversions",
        description: "Seamlessly connect your physical and digital storefronts to deliver a unified shopping experience that drives loyalty and higher average order values.",
        icon: "ShoppingCart"
      },
      {
        title: "Inventory Optimization",
        description: "Use predictive AI to manage your supply chain in real-time, drastically reducing stockouts and minimizing excess warehousing costs.",
        icon: "TrendingDown"
      },
      {
        title: "Frictionless Checkout",
        description: "Every millisecond counts. We optimize payment gateways and UX flows to eliminate cart abandonment and maximize finalized transactions.",
        icon: "Zap"
      }
    ],
    offerings: [
      {
        title: "E-Commerce Platform Modernization",
        description: "Migrate from rigid legacy systems to headless commerce architectures, giving you the flexibility to adapt to rapid market changes.",
        img: "/images/generic_1.png"
      },
      {
        title: "Customer Data Platforms (CDP)",
        description: "Aggregate customer touchpoints into a single source of truth, enabling hyper-personalized marketing and targeted product recommendations.",
        img: "/images/uiux.png"
      },
      {
        title: "Supply Chain Visibility",
        description: "Implement end-to-end tracking systems that give you and your customers real-time updates from the warehouse to the front door.",
        img: "/images/engineering.png"
      }
    ]
  },
  "healthcare": {
    heroImage: "/images/cybersecurity.png",
    whyItMatters: [
      {
        title: "Patient Outcomes",
        description: "Intuitive digital health portals ensure patients stay engaged with their care plans, directly improving long-term health results.",
        icon: "Heart"
      },
      {
        title: "HIPAA Compliance",
        description: "Security is non-negotiable. Our architectures guarantee total data encryption and strict access controls to protect sensitive medical records.",
        icon: "ShieldCheck"
      },
      {
        title: "Interoperability",
        description: "Break down data silos. We build systems that seamlessly share critical patient information between disparate EHR and clinical systems.",
        icon: "Activity"
      }
    ],
    offerings: [
      {
        title: "Telehealth Platforms",
        description: "Develop secure, high-definition video consultation applications that expand your care reach while maintaining clinical quality.",
        img: "/images/ai.png"
      },
      {
        title: "Patient Portals",
        description: "Empower patients with self-service tools for appointment scheduling, prescription refills, and instant access to test results.",
        img: "/images/cloud.png"
      },
      {
        title: "Medical AI Diagnostics",
        description: "Integrate machine learning models that assist clinicians in rapidly analyzing medical imaging and identifying early warning signs.",
        img: "/images/generic_1.png"
      }
    ]
  },
  "banking": {
    heroImage: "/images/uiux.png",
    whyItMatters: [
      {
        title: "Digital-First Trust",
        description: "Modern banking relies on flawless digital experiences. A clunky app destroys consumer trust, while a seamless one builds lifelong loyalty.",
        icon: "Landmark"
      },
      {
        title: "Fraud Prevention",
        description: "Deploy advanced predictive algorithms that identify and block suspicious transactions in milliseconds without disrupting valid customer activity.",
        icon: "ShieldAlert"
      },
      {
        title: "Operational Scale",
        description: "Move away from monolithic core banking systems toward agile microservices that allow you to launch new financial products in days, not years.",
        icon: "BarChart"
      }
    ],
    offerings: [
      {
        title: "Neobanking Applications",
        description: "Design and build native mobile banking applications with intuitive UX, bringing branch-level services directly to your customers' pockets.",
        img: "/images/engineering.png"
      },
      {
        title: "Open Banking APIs",
        description: "Develop secure, compliant API architectures that allow your institution to seamlessly integrate with the rapidly growing fintech ecosystem.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Core System Modernization",
        description: "De-risk your digital transformation by incrementally migrating away from legacy mainframes to cloud-native, real-time ledger systems.",
        img: "/images/ai.png"
      }
    ]
  },
  "design-experience": {
    heroImage: "/images/cloud.png",
    whyItMatters: [
      {
        title: "User Retention",
        description: "A frictionless interface isn't just aesthetic; it's a retention engine that prevents users from abandoning your platform for competitors.",
        icon: "Users"
      },
      {
        title: "Brand Perception",
        description: "Your digital experience is your brand. We design pixel-perfect, accessible interfaces that build implicit trust from the first click.",
        icon: "Paintbrush"
      },
      {
        title: "Omnichannel Consistency",
        description: "Deliver a seamless journey whether your customers are on mobile, desktop, or interacting with a physical kiosk.",
        icon: "Smartphone"
      }
    ],
    offerings: [
      {
        title: "UI/UX Design Systems",
        description: "Build scalable, component-based design systems that ensure absolute visual consistency across your entire product ecosystem.",
        img: "/images/generic_1.png"
      },
      {
        title: "User Research & Testing",
        description: "Stop guessing. We conduct rigorous A/B testing and user interviews to ensure every design decision is backed by hard data.",
        img: "/images/uiux.png"
      },
      {
        title: "Customer Journey Mapping",
        description: "Identify pain points and optimize the end-to-end flow to maximize conversions and user satisfaction.",
        img: "/images/engineering.png"
      }
    ]
  },
  "engineering": {
    heroImage: "/images/cybersecurity.png",
    whyItMatters: [
      {
        title: "Technical Debt Reduction",
        description: "We write clean, modular code that scales, saving you from expensive rebuilds and massive maintenance costs down the line.",
        icon: "Wrench"
      },
      {
        title: "High Availability",
        description: "Our architectures are designed for fault tolerance, ensuring your systems remain online during peak loads and unexpected outages.",
        icon: "Server"
      },
      {
        title: "Rapid Feature Delivery",
        description: "Implement robust CI/CD pipelines that allow your teams to ship secure, tested code to production multiple times a day.",
        icon: "Rocket"
      }
    ],
    offerings: [
      {
        title: "Custom Software Development",
        description: "Build bespoke, enterprise-grade applications tailored exactly to your unique operational requirements and business logic.",
        img: "/images/ai.png"
      },
      {
        title: "Microservices Architecture",
        description: "Deconstruct monolithic legacy applications into agile, independent microservices for unparalleled scalability and team velocity.",
        img: "/images/cloud.png"
      },
      {
        title: "Quality Assurance & Testing",
        description: "Implement comprehensive automated testing suites that catch regressions before they ever reach your users.",
        img: "/images/generic_1.png"
      }
    ]
  },
  "business-process": {
    heroImage: "/images/uiux.png",
    whyItMatters: [
      {
        title: "Operational Efficiency",
        description: "Eliminate bottlenecks and redundant manual tasks, radically reducing operational overhead and accelerating turnaround times.",
        icon: "Workflow"
      },
      {
        title: "Error Reduction",
        description: "Automated workflows perform exactly as programmed 100% of the time, eliminating human error in critical data entry and processing.",
        icon: "ShieldCheck"
      },
      {
        title: "Resource Reallocation",
        description: "Free your top talent from repetitive administrative tasks, allowing them to focus on high-value strategic initiatives.",
        icon: "Users"
      }
    ],
    offerings: [
      {
        title: "Robotic Process Automation (RPA)",
        description: "Deploy intelligent software bots that perfectly mimic human interactions with legacy systems, automating your back-office tasks.",
        img: "/images/engineering.png"
      },
      {
        title: "Business Process Mapping",
        description: "We audit your current operations, identify inefficiencies, and design optimized workflows tailored for automation.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Intelligent Document Processing",
        description: "Use cognitive AI to extract, classify, and process unstructured data from invoices, forms, and contracts instantly.",
        img: "/images/ai.png"
      }
    ]
  },
  "data-analytics": {
    heroImage: "/images/cloud.png",
    whyItMatters: [
      {
        title: "Actionable Insights",
        description: "Transform raw data into a strategic asset. We build dashboards that give executives real-time visibility into business performance.",
        icon: "BarChart"
      },
      {
        title: "Predictive Modeling",
        description: "Stop looking in the rearview mirror. Use historical data to forecast trends, anticipate customer churn, and predict supply chain issues.",
        icon: "LineChart"
      },
      {
        title: "Data Governance",
        description: "Ensure your data is accurate, secure, and compliant. We establish single-source-of-truth architectures that eliminate data silos.",
        icon: "Database"
      }
    ],
    offerings: [
      {
        title: "Modern Data Warehouse",
        description: "Implement scalable cloud architectures like Snowflake or BigQuery to centralize your enterprise data securely.",
        img: "/images/generic_1.png"
      },
      {
        title: "Business Intelligence Dashboards",
        description: "Develop intuitive Tableau or PowerBI visualizations that democratize data access across your entire organization.",
        img: "/images/uiux.png"
      },
      {
        title: "Machine Learning Operations (MLOps)",
        description: "Operationalize your AI models, ensuring they remain accurate and deployable at scale across production environments.",
        img: "/images/engineering.png"
      }
    ]
  },
  "infrastructure": {
    heroImage: "/images/cybersecurity.png",
    whyItMatters: [
      {
        title: "Zero Downtime",
        description: "Modern businesses can't afford outages. We engineer robust, multi-region architectures that guarantee continuous availability.",
        icon: "Server"
      },
      {
        title: "Disaster Recovery",
        description: "Hope is not a strategy. We implement automated backup and failover systems so your data is instantly recoverable under any circumstances.",
        icon: "ShieldAlert"
      },
      {
        title: "Cost Control",
        description: "Stop paying for idle hardware. We optimize your infrastructure topology to ensure you only pay for the exact compute power you need.",
        icon: "DollarSign"
      }
    ],
    offerings: [
      {
        title: "Managed IT Services",
        description: "Offload the burden of daily maintenance. Our 24/7 NOC monitors, patches, and secures your entire infrastructure stack.",
        img: "/images/ai.png"
      },
      {
        title: "Network Architecture",
        description: "Design and deploy high-throughput, low-latency enterprise networks built explicitly for a distributed, global workforce.",
        img: "/images/cloud.png"
      },
      {
        title: "Datacenter Optimization",
        description: "Modernize your on-premise hardware with virtualization and hyper-converged infrastructure (HCI) to maximize efficiency.",
        img: "/images/generic_1.png"
      }
    ]
  },
  "business-solutions": {
    heroImage: "/images/uiux.png",
    whyItMatters: [
      {
        title: "Unified Operations",
        description: "Break down department silos. We integrate your ERP, CRM, and HR systems into a single, cohesive digital nervous system.",
        icon: "Layers"
      },
      {
        title: "Real-Time Analytics",
        description: "When your systems talk to each other, you gain instant visibility into cash flow, inventory, and customer satisfaction across the entire enterprise.",
        icon: "BarChart"
      },
      {
        title: "Process Automation",
        description: "Stop manual data entry. Integrated business solutions automatically trigger workflows across different departments without human intervention.",
        icon: "Workflow"
      }
    ],
    offerings: [
      {
        title: "ERP Implementation",
        description: "Seamlessly deploy tier-1 systems like SAP, Oracle, or Microsoft Dynamics tailored precisely to your operational nuances.",
        img: "/images/engineering.png"
      },
      {
        title: "CRM Optimization",
        description: "Supercharge your sales teams by customizing Salesforce or HubSpot to automatically score leads and track pipeline health.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Custom API Integrations",
        description: "Connect legacy proprietary software with modern SaaS applications using secure, high-throughput middleware.",
        img: "/images/ai.png"
      }
    ]
  },
  "consulting": {
    heroImage: "/images/cloud.png",
    whyItMatters: [
      {
        title: "Strategic Clarity",
        description: "Technology without a strategy is just an expense. We align your digital investments directly with your core business objectives.",
        icon: "Target"
      },
      {
        title: "Risk Mitigation",
        description: "Avoid multi-million dollar mistakes. Our veteran consultants vet architectures and vendors before you commit to a platform.",
        icon: "ShieldCheck"
      },
      {
        title: "Change Management",
        description: "The best software fails if people won't use it. We drive organizational adoption through targeted training and transition planning.",
        icon: "Users"
      }
    ],
    offerings: [
      {
        title: "Digital Transformation Roadmaps",
        description: "We audit your current state and plot a pragmatic, multi-year technological roadmap to modernize your entire enterprise.",
        img: "/images/generic_1.png"
      },
      {
        title: "IT Architecture Assessment",
        description: "Identify performance bottlenecks, security vulnerabilities, and scalability limits in your current infrastructure.",
        img: "/images/uiux.png"
      },
      {
        title: "Vendor Selection & RFI",
        description: "We cut through the marketing noise to help you select the right enterprise software platforms for your specific needs.",
        img: "/images/engineering.png"
      }
    ]
  },
  "sustainability": {
    heroImage: "/images/cybersecurity.png",
    whyItMatters: [
      {
        title: "Carbon Reduction",
        description: "Optimize your datacenter usage and supply chain logistics to drastically reduce your corporate carbon footprint.",
        icon: "Leaf"
      },
      {
        title: "ESG Compliance",
        description: "Stay ahead of stringent environmental regulations. We build dashboards that automate your ESG reporting for stakeholders.",
        icon: "FileCheck"
      },
      {
        title: "Resource Efficiency",
        description: "Sustainability is profitable. By optimizing energy usage and reducing material waste, you directly improve your bottom line.",
        icon: "TrendingDown"
      }
    ],
    offerings: [
      {
        title: "Green IT Architecture",
        description: "Migrate workloads to carbon-neutral cloud providers and optimize code efficiency to reduce server power consumption.",
        img: "/images/ai.png"
      },
      {
        title: "Supply Chain Emissions Tracking",
        description: "Implement blockchain and IoT sensors to track and verify Scope 3 emissions across your entire global supply chain.",
        img: "/images/cloud.png"
      },
      {
        title: "Smart Building Automation",
        description: "Deploy IoT ecosystems that intelligently manage HVAC and lighting to minimize energy waste in your physical offices.",
        img: "/images/generic_1.png"
      }
    ]
  },
  "talent-cloud": {
    heroImage: "/images/uiux.png",
    whyItMatters: [
      {
        title: "On-Demand Expertise",
        description: "Access elite, pre-vetted engineers and consultants exactly when you need them, without the overhead of full-time hiring.",
        icon: "Users"
      },
      {
        title: "Elastic Scaling",
        description: "Instantly spin your team up or down based on project demands, ensuring you never carry unnecessary payroll.",
        icon: "ArrowUpRight"
      },
      {
        title: "Specialized Skills",
        description: "Need a niche AI researcher or an AS400 legacy expert for just three months? Our Talent Cloud bridges your specific skill gaps immediately.",
        icon: "Target"
      }
    ],
    offerings: [
      {
        title: "Dedicated Pods",
        description: "Deploy an entire, cohesive agile team (Scrum Master, UX, Devs, QA) that integrates directly into your organization.",
        img: "/images/engineering.png"
      },
      {
        title: "Staff Augmentation",
        description: "Seamlessly embed our senior engineers into your existing internal teams to accelerate your current delivery sprints.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Executive Interim Placement",
        description: "Bridge leadership transitions with our veteran fractional CTOs and CIOs who can steer your technology strategy through turbulence.",
        img: "/images/ai.png"
      }
    ]
  },
  "insurance": {
    heroImage: "/images/hero_insurance_1786220854416.png",
    whyItMatters: [
      {
        title: "Risk Modeling",
        description: "Harness big data and AI to instantly calculate dynamic premiums based on real-time behavioral metrics rather than static demographics.",
        icon: "Database"
      },
      {
        title: "Claims Automation",
        description: "Eliminate days of manual processing. We implement intelligent OCR to automatically parse, verify, and approve standard claims in seconds.",
        icon: "ScanLine"
      },
      {
        title: "Customer Retention",
        description: "Modern policyholders demand digital self-service. We build intuitive portals that allow customers to manage policies without calling support.",
        icon: "Smartphone"
      }
    ],
    offerings: [
      {
        title: "Core System Transformation",
        description: "Migrate away from legacy mainframes (like Guidewire or Duck Creek) to agile, cloud-native architectures.",
        img: "/images/cloud.png"
      },
      {
        title: "Fraud Detection AI",
        description: "Deploy neural networks that flag anomalous claims and uncover organized fraud rings before payouts occur.",
        img: "/images/generic_1.png"
      },
      {
        title: "Agent Portals",
        description: "Equip your brokers with modern CRMs and quoting tools that drastically reduce their time-to-sale.",
        img: "/images/uiux.png"
      }
    ]
  },
  "professional-services": {
    heroImage: "/images/hero_professional_1786220868325.png",
    whyItMatters: [
      {
        title: "Billable Utilization",
        description: "Maximize revenue by implementing resource management tools that ensure your top consultants are never sitting idle.",
        icon: "TrendingDown"
      },
      {
        title: "Knowledge Management",
        description: "Stop reinventing the wheel. We build centralized, AI-searchable repositories so your teams can leverage past IP for new clients instantly.",
        icon: "BrainCircuit"
      },
      {
        title: "Client Transparency",
        description: "Provide your clients with secure, real-time dashboards showcasing project status, deliverables, and billing.",
        icon: "LayoutDashboard"
      }
    ],
    offerings: [
      {
        title: "Professional Services Automation (PSA)",
        description: "Deploy end-to-end platforms that unify project management, time tracking, and invoicing into one single source of truth.",
        img: "/images/engineering.png"
      },
      {
        title: "Collaboration Portals",
        description: "Build secure extranets where your consultants and clients can securely share documents and track milestones.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Practice Analytics",
        description: "Implement BI dashboards that give partners instant visibility into practice profitability and pipeline health.",
        img: "/images/ai.png"
      }
    ]
  },
  "public-sector": {
    heroImage: "/images/hero_public_sector_1786220879240.png",
    whyItMatters: [
      {
        title: "Citizen Engagement",
        description: "Modernize government services with intuitive digital portals that make it easy for citizens to pay taxes, renew licenses, and access information.",
        icon: "Users"
      },
      {
        title: "Cost Efficiency",
        description: "Taxpayer money matters. We optimize legacy government systems to drastically reduce maintenance overhead and administrative waste.",
        icon: "DollarSign"
      },
      {
        title: "Data Security & Compliance",
        description: "Implement FedRAMP-compliant architectures that ensure classified citizen data remains impenetrable to foreign state actors.",
        icon: "ShieldCheck"
      }
    ],
    offerings: [
      {
        title: "Digital Identity Systems",
        description: "Build secure, unified login portals that allow citizens to access all state or federal services with a single credential.",
        img: "/images/cloud.png"
      },
      {
        title: "Legacy System Modernization",
        description: "Safely migrate decades-old mainframe databases into agile, cloud-native environments with zero disruption to public services.",
        img: "/images/generic_1.png"
      },
      {
        title: "Smart City IoT Integration",
        description: "Connect traffic grids, public transit, and emergency services into a unified analytics dashboard for proactive city management.",
        img: "/images/uiux.png"
      }
    ]
  },
  "education": {
    heroImage: "/images/hero_education_1786220893121.png",
    whyItMatters: [
      {
        title: "Hybrid Learning Experiences",
        description: "Education is no longer confined to the classroom. We build robust LMS platforms that support high-definition synchronous and asynchronous learning.",
        icon: "GraduationCap"
      },
      {
        title: "Student Retention",
        description: "Use predictive analytics to identify at-risk students early based on engagement metrics, allowing for proactive academic intervention.",
        icon: "TrendingDown"
      },
      {
        title: "Administrative Automation",
        description: "Automate enrollment, grading workflows, and alumni outreach to dramatically reduce overhead for faculty and staff.",
        icon: "Workflow"
      }
    ],
    offerings: [
      {
        title: "Custom LMS Development",
        description: "Design bespoke Learning Management Systems tailored to your specific curriculum structure and pedagogical approach.",
        img: "/images/engineering.png"
      },
      {
        title: "Campus Mobility Apps",
        description: "Provide students with a unified mobile app for course registration, campus navigation, and digital ID access.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "EdTech AI Integration",
        description: "Deploy AI tutors and automated essay grading algorithms that provide students with instant, personalized feedback 24/7.",
        img: "/images/ai.png"
      }
    ]
  },
  "life-sciences-pharma": {
    heroImage: "/images/hero_life_sciences_1786220903658.png",
    whyItMatters: [
      {
        title: "Accelerated Drug Discovery",
        description: "Utilize high-performance computing and machine learning to rapidly simulate molecular interactions, cutting years off R&D timelines.",
        icon: "Activity"
      },
      {
        title: "Clinical Trial Optimization",
        description: "Deploy decentralized trial platforms that widen your patient pool, track real-world data, and drastically reduce dropout rates.",
        icon: "Stethoscope"
      },
      {
        title: "FDA & GxP Compliance",
        description: "Maintain absolute auditability. Our systems enforce strict version control and electronic signatures required for regulatory submissions.",
        icon: "FileCheck"
      }
    ],
    offerings: [
      {
        title: "Bioinformatics Platforms",
        description: "Engineer massive data pipelines capable of processing and analyzing petabytes of genomic sequencing data in the cloud.",
        img: "/images/cloud.png"
      },
      {
        title: "Supply Chain Serialization",
        description: "Implement blockchain track-and-trace systems to combat counterfeiting and ensure compliance with the Drug Supply Chain Security Act.",
        img: "/images/generic_1.png"
      },
      {
        title: "eTMF & Document Management",
        description: "Deploy secure Electronic Trial Master File systems that streamline global collaboration while maintaining strict regulatory compliance.",
        img: "/images/uiux.png"
      }
    ]
  },
  "medical-devices": {
    heroImage: "/images/hero_medical_devices_1786220914143.png",
    whyItMatters: [
      {
        title: "IoT Connectivity",
        description: "Transform standalone hardware into connected ecosystems. We build secure cloud backends that ingest real-time telemetry from medical devices globally.",
        icon: "Wifi"
      },
      {
        title: "Software as a Medical Device (SaMD)",
        description: "Navigate complex FDA regulations. We engineer compliant software applications that diagnose, treat, or monitor patients directly.",
        icon: "Stethoscope"
      },
      {
        title: "Over-the-Air (OTA) Updates",
        description: "Ensure your devices are always running the latest, most secure firmware without requiring expensive physical maintenance or recalls.",
        icon: "RefreshCw"
      }
    ],
    offerings: [
      {
        title: "Device Telemetry Dashboards",
        description: "Provide clinicians with real-time, actionable insights streamed directly from pacemakers, insulin pumps, or diagnostic imaging machines.",
        img: "/images/engineering.png"
      },
      {
        title: "Regulatory Compliance Engineering",
        description: "Build software under strict ISO 13485 and IEC 62304 standards, guaranteeing your product passes regulatory scrutiny.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Embedded Systems Security",
        description: "Harden your physical devices against malicious intrusions using advanced hardware-level cryptography and zero-trust firmware.",
        img: "/images/ai.png"
      }
    ]
  },
  "industrial-process-manufacturing": {
    heroImage: "/images/hero_manufacturing_1786220927949.png",
    whyItMatters: [
      {
        title: "Industry 4.0 Integration",
        description: "Bridge the gap between your physical factory floor and digital analytics, creating a unified, intelligent manufacturing environment.",
        icon: "Cpu"
      },
      {
        title: "Predictive Maintenance",
        description: "Stop fixing things after they break. IoT sensors and machine learning predict equipment failures weeks before they happen, eliminating unplanned downtime.",
        icon: "Wrench"
      },
      {
        title: "Yield Optimization",
        description: "Use advanced algorithms to perfectly calibrate raw material inputs, dramatically reducing waste and maximizing production yield.",
        icon: "TrendingUp"
      }
    ],
    offerings: [
      {
        title: "Digital Twin Technology",
        description: "Create perfect virtual replicas of your physical factories to simulate layout changes and stress-test production loads without risking capital.",
        img: "/images/cloud.png"
      },
      {
        title: "Supply Chain Command Center",
        description: "Implement real-time tracking of raw materials and finished goods from global suppliers directly to your end distributors.",
        img: "/images/generic_1.png"
      },
      {
        title: "Automated Quality Control",
        description: "Deploy high-speed computer vision systems that identify microscopic manufacturing defects faster and more accurately than human inspectors.",
        img: "/images/uiux.png"
      }
    ]
  },
  "engineering-construction-operations": {
    heroImage: "/images/hero_construction_1786220943552.png",
    whyItMatters: [
      {
        title: "Project Visibility",
        description: "Eliminate cost overruns. We build centralized dashboards that track labor, materials, and timelines in real-time across multiple global megaprojects.",
        icon: "Eye"
      },
      {
        title: "BIM Integration",
        description: "Seamlessly connect Building Information Modeling (BIM) data with your ERP systems to automate procurement directly from architectural blueprints.",
        icon: "Building"
      },
      {
        title: "Jobsite Safety Analytics",
        description: "Deploy AI-powered camera systems that automatically detect safety violations and prevent accidents before they occur.",
        icon: "ShieldAlert"
      }
    ],
    offerings: [
      {
        title: "Construction Management Platforms",
        description: "Deploy robust field service applications that allow foremen to update schedules, request materials, and log hours directly from their tablets.",
        img: "/images/engineering.png"
      },
      {
        title: "Drone Survey Analytics",
        description: "Process aerial photogrammetry data to track earthwork progress, volumetric measurements, and precise topographical mapping.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Subcontractor Portals",
        description: "Streamline bidding, compliance tracking, and invoicing with secure digital portals tailored specifically for your subcontractor network.",
        img: "/images/ai.png"
      }
    ]
  },
  "natural-resources": {
    heroImage: "/images/hero_natural_resources_1786220953861.png",
    whyItMatters: [
      {
        title: "Asset Tracking",
        description: "Deploy ruggedized IoT sensors to track the location, health, and utilization of heavy machinery deep within remote environments.",
        icon: "MapPin"
      },
      {
        title: "Environmental Compliance",
        description: "Automate the collection and reporting of air, water, and soil quality metrics to ensure strict adherence to local and federal environmental regulations.",
        icon: "Leaf"
      },
      {
        title: "Remote Operations",
        description: "Control critical infrastructure from thousands of miles away using highly secure, ultra-low-latency satellite and 5G networks.",
        icon: "Radio"
      }
    ],
    offerings: [
      {
        title: "Geospatial Mapping (GIS)",
        description: "Analyze massive satellite and geological datasets to optimize extraction sites and minimize environmental impact.",
        img: "/images/cloud.png"
      },
      {
        title: "Autonomous Equipment Control",
        description: "Develop the software infrastructure required to safely operate autonomous haul trucks and drills in highly hazardous environments.",
        img: "/images/generic_1.png"
      },
      {
        title: "Commodity Trading Dashboards",
        description: "Integrate real-time global market data with your localized production metrics to optimize selling and hedging strategies.",
        img: "/images/uiux.png"
      }
    ]
  },
  "oil-gas": {
    heroImage: "/images/hero_oil_gas_1786220964588.png",
    whyItMatters: [
      {
        title: "Pipeline Integrity",
        description: "Use advanced acoustic and pressure sensors coupled with machine learning to instantly detect microscopic leaks before they cause ecological disasters.",
        icon: "Activity"
      },
      {
        title: "Yield Optimization",
        description: "Optimize refining processes using digital twins that simulate chemical reactions, maximizing the output of high-margin petroleum products.",
        icon: "TrendingUp"
      },
      {
        title: "Workforce Safety",
        description: "Deploy wearable IoT devices that monitor worker vitals, hazardous gas exposure, and precise location during dangerous offshore operations.",
        icon: "HardHat"
      }
    ],
    offerings: [
      {
        title: "Upstream Analytics",
        description: "Process massive seismic data sets using cloud computing to dramatically increase the accuracy of exploratory drilling.",
        img: "/images/engineering.png"
      },
      {
        title: "Midstream SCADA Modernization",
        description: "Upgrade legacy Supervisory Control and Data Acquisition systems with modern, cyber-secure, and cloud-connected architectures.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Downstream Supply Chain",
        description: "Implement predictive algorithms that optimize the routing of tanker fleets and manage strategic reserves based on fluctuating global demand.",
        img: "/images/ai.png"
      }
    ]
  },
  "utilities": {
    heroImage: "/images/hero_utilities_1786220979156.png",
    whyItMatters: [
      {
        title: "Smart Grid Management",
        description: "Dynamically balance the integration of unpredictable renewable energy sources (solar, wind) with traditional baseload generation.",
        icon: "Zap"
      },
      {
        title: "Demand Response",
        description: "Implement AI systems that automatically incentivize consumers to reduce energy usage during peak load events, preventing brownouts.",
        icon: "Activity"
      },
      {
        title: "Cyber-Physical Security",
        description: "Protect critical national infrastructure. We harden utility control systems against state-sponsored ransomware and grid-manipulation attacks.",
        icon: "ShieldCheck"
      }
    ],
    offerings: [
      {
        title: "Advanced Metering Infrastructure (AMI)",
        description: "Deploy and manage the massive data lakes required to process real-time usage data from millions of smart meters simultaneously.",
        img: "/images/cloud.png"
      },
      {
        title: "Outage Management Systems",
        description: "Build automated dispatch platforms that pinpoint outage locations instantly and dynamically route field crews for the fastest restoration.",
        img: "/images/generic_1.png"
      },
      {
        title: "Customer Experience Portals",
        description: "Provide end-users with intuitive dashboards showing their granular energy consumption, historical billing, and carbon footprint reduction.",
        img: "/images/uiux.png"
      }
    ]
  },
  "consumer-packaged-goods": {
    heroImage: "/images/hero_cpg_1786220991475.png",
    whyItMatters: [
      {
        title: "Direct-to-Consumer (DTC)",
        description: "Bypass traditional retail channels. We build scalable ecommerce platforms that allow CPG brands to sell directly to their end consumers.",
        icon: "ShoppingCart"
      },
      {
        title: "Demand Forecasting",
        description: "Use machine learning to predict highly volatile consumer trends, ensuring you manufacture exactly what the market wants, when it wants it.",
        icon: "LineChart"
      },
      {
        title: "Supply Chain Agility",
        description: "React instantly to global disruptions. We provide end-to-end visibility so you can reroute raw materials before production is impacted.",
        icon: "Truck"
      }
    ],
    offerings: [
      {
        title: "Omnichannel Commerce",
        description: "Unify your B2B wholesale distribution and B2C direct sales into a single, cohesive headless commerce architecture.",
        img: "/images/engineering.png"
      },
      {
        title: "Consumer Data Platforms",
        description: "Aggregate purchasing behavior and social sentiment into a 360-degree view of your customer for hyper-targeted marketing.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Automated Warehousing",
        description: "Integrate warehouse management systems (WMS) with robotic fulfillment hardware for lightning-fast, error-free order processing.",
        img: "/images/ai.png"
      }
    ]
  },
  "consumer-electronics": {
    heroImage: "/images/cloud.png",
    whyItMatters: [
      {
        title: "Connected Ecosystems",
        description: "Consumers don't buy devices; they buy ecosystems. We engineer the cloud infrastructure that allows your hardware to seamlessly talk to each other.",
        icon: "Wifi"
      },
      {
        title: "Firmware Lifecycle",
        description: "Securely push Over-The-Air (OTA) updates to millions of devices simultaneously, extending product lifespan and patching zero-day vulnerabilities.",
        icon: "RefreshCw"
      },
      {
        title: "Time-to-Market",
        description: "Accelerate hardware development cycles by simulating component integration and thermal dynamics using advanced digital twin models.",
        icon: "Rocket"
      }
    ],
    offerings: [
      {
        title: "IoT Cloud Backends",
        description: "Build massively scalable architectures capable of ingesting and processing petabytes of telemetry data from consumer smart devices.",
        img: "/images/generic_1.png"
      },
      {
        title: "Companion App Development",
        description: "Design intuitive, high-performance iOS and Android applications that serve as the control center for your physical hardware.",
        img: "/images/uiux.png"
      },
      {
        title: "Hardware Security Modules",
        description: "Implement silicon-level cryptography and secure boot processes to prevent device tampering and reverse engineering.",
        img: "/images/engineering.png"
      }
    ]
  },
  "automotive": {
    heroImage: "/images/cybersecurity.png",
    whyItMatters: [
      {
        title: "Software-Defined Vehicles",
        description: "The car is now a computer on wheels. We build the secure, real-time operating systems required for next-generation mobility.",
        icon: "Cpu"
      },
      {
        title: "Autonomous Systems",
        description: "Process massive streams of LIDAR and visual data with zero latency, enabling safe and reliable advanced driver-assistance systems (ADAS).",
        icon: "Eye"
      },
      {
        title: "Supply Chain Resilience",
        description: "Gain real-time visibility deep into your tiered supplier network, preventing single points of failure in semiconductor and battery sourcing.",
        icon: "Link"
      }
    ],
    offerings: [
      {
        title: "In-Vehicle Infotainment (IVI)",
        description: "Develop rich, responsive digital cockpit experiences using Android Automotive and custom embedded Linux platforms.",
        img: "/images/ai.png"
      },
      {
        title: "Connected Car Cloud",
        description: "Engineer V2X (Vehicle-to-Everything) infrastructure, allowing fleets to communicate with smart city grids and other vehicles in real-time.",
        img: "/images/cloud.png"
      },
      {
        title: "Manufacturing Automation",
        description: "Integrate industrial robotics with AI-driven quality assurance to maximize the throughput of your assembly lines.",
        img: "/images/generic_1.png"
      }
    ]
  },
  "transportation-services": {
    heroImage: "/images/uiux.png",
    whyItMatters: [
      {
        title: "Route Optimization",
        description: "Use advanced combinatorial algorithms to dynamically route fleets in real-time, drastically reducing fuel consumption and delivery times.",
        icon: "Map"
      },
      {
        title: "Predictive Maintenance",
        description: "Keep your assets on the road. IoT sensors monitor engine health and predict mechanical failures before they cause costly breakdowns.",
        icon: "Wrench"
      },
      {
        title: "Last-Mile Efficiency",
        description: "Solve the most expensive leg of logistics. We build platforms that orchestrate gig-economy drivers, drones, and autonomous delivery bots.",
        icon: "Package"
      }
    ],
    offerings: [
      {
        title: "Fleet Management Platforms",
        description: "Deploy comprehensive dashboards tracking vehicle telemetry, driver behavior, and regulatory compliance (ELD) across your entire network.",
        img: "/images/engineering.png"
      },
      {
        title: "Supply Chain Orchestration",
        description: "Integrate deeply with global shipping APIs to provide customers with Amazon-level visibility into their freight tracking.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Mobility as a Service (MaaS)",
        description: "Build unified booking platforms that allow consumers to seamlessly plan and pay for multimodal journeys (train, ride-share, scooter) in one app.",
        img: "/images/ai.png"
      }
    ]
  },
  "media-info-services": {
    heroImage: "/images/cloud.png",
    whyItMatters: [
      {
        title: "Content Monetization",
        description: "Implement flexible paywalls, dynamic subscription models, and targeted programmatic advertising to maximize revenue per user.",
        icon: "DollarSign"
      },
      {
        title: "Hyper-Personalization",
        description: "Use machine learning to curate highly personalized content feeds, dramatically increasing session duration and user retention.",
        icon: "Users"
      },
      {
        title: "High-Concurrency Delivery",
        description: "Ensure flawless playback during major live events. We engineer resilient CDN architectures capable of serving millions of concurrent streams.",
        icon: "PlayCircle"
      }
    ],
    offerings: [
      {
        title: "OTT Video Platforms",
        description: "Develop custom streaming applications across web, mobile, and smart TV ecosystems (Roku, tvOS, Android TV).",
        img: "/images/generic_1.png"
      },
      {
        title: "Digital Publishing CMS",
        description: "Migrate legacy newsrooms to headless CMS architectures, allowing journalists to publish content omni-channel instantly.",
        img: "/images/uiux.png"
      },
      {
        title: "Digital Rights Management (DRM)",
        description: "Implement studio-grade encryption protocols to protect your high-value IP from piracy and unauthorized distribution.",
        img: "/images/engineering.png"
      }
    ]
  },
  "platforms-software-products": {
    heroImage: "/images/cybersecurity.png",
    whyItMatters: [
      {
        title: "Rapid Prototyping",
        description: "Turn ideas into revenue faster. We utilize agile methodologies to build and test MVPs, allowing you to validate market fit before scaling.",
        icon: "Rocket"
      },
      {
        title: "Multi-Tenant Architecture",
        description: "Build secure, scalable SaaS foundations that logically isolate customer data while sharing underlying compute resources to maximize margins.",
        icon: "Layers"
      },
      {
        title: "Product-Led Growth",
        description: "Engineer viral loops and frictionless onboarding flows directly into your software, turning your product into your best sales engine.",
        icon: "TrendingUp"
      }
    ],
    offerings: [
      {
        title: "Full-Stack SaaS Development",
        description: "From react frontends to Kubernetes backends, we build complete, enterprise-grade software products ready for hyper-growth.",
        img: "/images/ai.png"
      },
      {
        title: "API Monetization",
        description: "Expose your core product functionality as secure, metered APIs, opening up entirely new B2B revenue channels.",
        img: "/images/cloud.png"
      },
      {
        title: "Platform Refactoring",
        description: "Rescue legacy software from technical bankruptcy. We incrementally rewrite monolithic codebases into agile microservices without downtime.",
        img: "/images/generic_1.png"
      }
    ]
  },
  "semiconductors": {
    heroImage: "/images/uiux.png",
    whyItMatters: [
      {
        title: "Yield Analytics",
        description: "In fab environments, a 1% yield increase is worth millions. We deploy AI to correlate microscopic defects with specific manufacturing parameters.",
        icon: "Cpu"
      },
      {
        title: "Design Automation",
        description: "Accelerate silicon development. We build the cloud infrastructure required to run massive Electronic Design Automation (EDA) workloads.",
        icon: "Zap"
      },
      {
        title: "IP Protection",
        description: "Your designs are your lifeblood. We implement military-grade cybersecurity protocols to protect proprietary schematics from state-sponsored theft.",
        icon: "ShieldCheck"
      }
    ],
    offerings: [
      {
        title: "Fab Automation Systems",
        description: "Integrate robotics and material handling systems with central MES (Manufacturing Execution Systems) for fully automated wafer processing.",
        img: "/images/engineering.png"
      },
      {
        title: "HPC Cloud Migration",
        description: "Burst your simulation and verification workloads into the public cloud seamlessly, drastically reducing time-to-tapeout.",
        img: "/images/cybersecurity.png"
      },
      {
        title: "Supply Chain Orchestration",
        description: "Gain real-time visibility into complex global supply networks, from raw polysilicon sourcing to final outsourced assembly and test (OSAT).",
        img: "/images/ai.png"
      }
    ]
  },
  "digital-content-migration-dup": {
    heroImage: "/illustrations/service-content-migration.jpg",
    whyItMatters: [
      {
        title: "Zero Data Loss",
        description: "Content is your most valuable asset. We guarantee 100% fidelity during migrations, ensuring no metadata, SEO routing, or media is ever orphaned.",
        icon: "ShieldCheck"
      },
      {
        title: "Seamless Transitions",
        description: "Downtime costs money. We execute complex multi-terabyte migrations in the background, cutting over instantly without disrupting your users.",
        icon: "ArrowRightLeft"
      },
      {
        title: "Architecture Modernization",
        description: "Migration is the perfect time to upgrade. We restructure your bloated legacy content into agile, headless CMS frameworks.",
        icon: "Database"
      }
    ],
    offerings: [
      {
        title: "Legacy CMS Extraction",
        description: "Automated extraction of articles, images, and complex nested data from aging systems like Drupal 7, Sitecore, or proprietary monolithic platforms.",
        img: "/images/generic_1.png"
      },
      {
        title: "Data Cleansing & Mapping",
        description: "We don't just move garbage. We use AI to programmatically clean HTML, standardize metadata, and map old taxonomy to your new structured schemas.",
        img: "/images/uiux.png"
      },
      {
        title: "SEO Preservation",
        description: "Maintain your hard-earned search rankings. We generate comprehensive 301 redirect maps to ensure Google instantly recognizes your new architecture.",
        img: "/images/engineering.png"
      }
    ]
  }
};


// Fallback content pools for dynamic procedural generation
const HERO_IMAGES = [
  "/images/generic_1.png",
  "/images/uiux.png",
  "/images/engineering.png",
  "/images/cybersecurity.png",
  "/images/ai.png",
  "/images/cloud.png"
];

const UNSPLASH_IMAGES = [
  "/images/generic_1.png",
  "/images/uiux.png",
  "/images/engineering.png",
  "/images/cybersecurity.png",
  "/images/ai.png",
  "/images/cloud.png"
];

const MATTERS_POOL = [
  { title: "Market Acceleration", icon: "Rocket", descTpl: "Leveraging {{TITLE}} allows you to bypass traditional bottlenecks, dramatically accelerating your speed-to-market and competitive advantage." },
  { title: "Cost Efficiency", icon: "TrendingDown", descTpl: "Modern {{TITLE}} solutions identify operational waste and streamline workflows, directly improving your bottom line margins." },
  { title: "Scalable Foundation", icon: "Layers", descTpl: "We don't just build for today. Our {{TITLE}} architectures are designed to seamlessly support your growth for the next decade." },
  { title: "Data-Driven Decisions", icon: "BarChart", descTpl: "Transform intuition into certainty. {{TITLE}} integrations provide real-time visibility into the metrics that matter most." },
  { title: "Risk Mitigation", icon: "ShieldAlert", descTpl: "In an unpredictable market, {{TITLE}} provides the robust frameworks necessary to protect your assets and ensure business continuity." },
  { title: "Customer Retention", icon: "Heart", descTpl: "Excellent {{TITLE}} directly translates to better user experiences, turning casual customers into loyal brand advocates." },
];

const OFFERING_TPL_POOL = [
  { title: "Strategic {{TITLE}} Consulting", descTpl: "Our experts audit your current processes and map out a comprehensive {{TITLE}} roadmap aligned strictly with your business objectives." },
  { title: "Custom {{TITLE}} Development", descTpl: "Off-the-shelf rarely fits perfectly. We engineer bespoke {{TITLE}} solutions tailored exactly to your operational quirks and needs." },
  { title: "{{TITLE}} Modernization", descTpl: "Legacy systems slowing you down? We inject modern {{TITLE}} paradigms into your aging infrastructure with zero downtime." },
  { title: "Continuous {{TITLE}} Support", descTpl: "Deployment is just day one. We provide ongoing {{TITLE}} optimization, ensuring your systems evolve alongside the market." },
  { title: "Enterprise {{TITLE}} Integration", descTpl: "We break down data silos, securely connecting your new {{TITLE}} systems with the legacy software your teams already rely on." }
];

const PROCESS_POOL = [
  { title: "Discovery & Strategy", descTpl: "We dive deep into your unique business requirements to align our {{TITLE}} approach with your overarching goals." },
  { title: "Architecture Design", descTpl: "Our senior architects map out a scalable, secure, and robust blueprint for your {{TITLE}} implementation." },
  { title: "Agile Execution", descTpl: "We operate in rapid sprints, delivering transparent updates and iterative {{TITLE}} improvements every week." },
  { title: "Quality Assurance", descTpl: "Rigorous automated and manual testing ensures your {{TITLE}} product operates flawlessly under extreme loads." },
  { title: "Launch & Scale", descTpl: "Seamless deployment into production, followed by continuous monitoring and optimization of your {{TITLE}} ecosystem." },
  { title: "Requirements Engineering", descTpl: "We collaborate with your stakeholders to define exact technical specifications for your {{TITLE}} systems." },
  { title: "Prototyping & Validation", descTpl: "We rapidly build functional prototypes to validate our {{TITLE}} assumptions before writing a single line of production code." },
  { title: "Integration Planning", descTpl: "We map out a comprehensive API and middleware strategy to connect your new {{TITLE}} solution with existing legacy software." },
  { title: "Security & Compliance Audit", descTpl: "Our infosec team ensures the {{TITLE}} architecture complies with all relevant industry regulations and security best practices." },
  { title: "Post-Launch Optimization", descTpl: "After go-live, we continuously monitor performance metrics to fine-tune your {{TITLE}} infrastructure for maximum ROI." }
];

const COMPARISON_POOL = [
  { feature: "Speed to Market", us: "Weeks, not months", typical: "6-12 Months" },
  { feature: "Architecture", us: "Cloud-native & highly scalable", typical: "Monolithic & rigid" },
  { feature: "Team Expertise", us: "Senior specialists & domain experts", typical: "Junior generalists" },
  { feature: "Code Quality", us: "Automated QA & strict standards", typical: "Manual, error-prone" },
  { feature: "Post-Launch Support", us: "Dedicated SLA-backed maintenance", typical: "Ad-hoc & slow" },
  { feature: "Security Posture", us: "Zero-trust principles", typical: "Basic perimeter defense" },
  { feature: "UX/UI Design", us: "User-tested & accessible", typical: "Template-driven" },
  { feature: "Pricing Model", us: "Transparent milestones", typical: "Unpredictable hourly billing" }
];

const FAQ_POOL = [
  { question: "How long does a typical {{TITLE}} engagement take?", answer: "Depending on scope, our initial delivery cycles range from 4 to 8 weeks, prioritizing rapid value realization." },
  { question: "Do you provide ongoing support for {{TITLE}}?", answer: "Absolutely. We offer dedicated SLA-backed maintenance packages to ensure continuous optimization." },
  { question: "What industries do you specialize in for {{TITLE}}?", answer: "We have deep expertise across Healthcare, Finance, E-commerce, and Public Sector verticals." },
  { question: "How do you handle data security during a {{TITLE}} project?", answer: "Security is baked in from day one. We adhere to zero-trust principles and maintain strict compliance with global data privacy regulations." },
  { question: "Can you integrate {{TITLE}} with our existing legacy systems?", answer: "Yes. We specialize in non-disruptive modernization, seamlessly bridging new solutions with your current infrastructure." },
  { question: "What is your pricing structure for {{TITLE}}?", answer: "We offer transparent, milestone-based pricing to ensure you only pay for tangible deliverables and value." },
  { question: "Will we own the intellectual property for the {{TITLE}} solution?", answer: "Yes, upon project completion and final payment, you retain 100% ownership of all custom source code and IP." },
  { question: "How do you ensure the {{TITLE}} system scales as we grow?", answer: "We utilize cloud-native microservices architectures that automatically scale resources based on traffic and demand." }
];

// Simple deterministic hash based on a string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
export const INDUSTRIES_POOL = [
  { name: "E-Commerce", icon: "ShoppingCart" },
  { name: "Healthcare", icon: "Activity" },
  { name: "Fintech", icon: "Landmark" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Logistics", icon: "Truck" },
  { name: "Manufacturing", icon: "Factory" },
  { name: "Real Estate", icon: "Building" },
  { name: "Defense", icon: "Shield" },
  { name: "Telecommunications", icon: "Radio" },
  { name: "Energy", icon: "Zap" },
  { name: "Retail", icon: "Store" },
  { name: "Agriculture", icon: "Sprout" },
  { name: "Automotive", icon: "Car" },
  { name: "Media", icon: "Video" }
];

export function getServiceDynamicData(slug: string, title: string, industriesPool: {name: string, icon: string}[] = []): DynamicServiceData {
  // Normalize alias slugs
  const normalizedSlug =
    slug === "artificial-augmented-intelligence" || slug === "agent-p8-autonomous"
      ? "artificial-intelligence"
      : slug === "filenet-to-cloud-migration"
      ? "digital-content-migration"
      : slug === "cognitive-document-capture"
      ? "digital-content-capture"
      : slug === "zero-trust-cybersecurity"
      ? "cybersecurity"
      : slug;

  // Procedural Generation for all other services
  const hash = hashString(normalizedSlug);
  
  // Pick hero image
  const heroImage = HERO_IMAGES[hash % HERO_IMAGES.length];
  
  // Pick 3 unique whyItMatters
  const whyItMatters = [];
  const mattersUsed = new Set<number>();
  let wAttempt = 0;
  while(whyItMatters.length < Math.min(3, MATTERS_POOL.length)) {
    const idx = (hash + wAttempt) % MATTERS_POOL.length;
    if (!mattersUsed.has(idx)) {
      mattersUsed.add(idx);
      const m = MATTERS_POOL[idx];
      whyItMatters.push({
        title: m.title,
        icon: m.icon,
        description: m.descTpl.replace(/\{\{TITLE\}\}/g, title)
      });
    }
    wAttempt++;
  }

  // Pick 3 unique offerings
  const offerings = [];
  const offeringsUsed = new Set<number>();
  let oAttempt = 0;
  while(offerings.length < Math.min(3, OFFERING_TPL_POOL.length)) {
    const idx = (hash + oAttempt) % OFFERING_TPL_POOL.length;
    if (!offeringsUsed.has(idx)) {
      offeringsUsed.add(idx);
      const o = OFFERING_TPL_POOL[idx];
      const imgIdx = (hash + oAttempt) % UNSPLASH_IMAGES.length;
      offerings.push({
        title: o.title.replace(/\{\{TITLE\}\}/g, title),
        description: o.descTpl.replace(/\{\{TITLE\}\}/g, title),
        img: UNSPLASH_IMAGES[imgIdx]
      });
    }
    oAttempt++;
  }

  const process = [];
  const processUsed = new Set<number>();
  let pAttempt = 0;
  while(process.length < Math.min(5, PROCESS_POOL.length)) {
    const idx = (hash + pAttempt) % PROCESS_POOL.length;
    if (!processUsed.has(idx)) {
      processUsed.add(idx);
      const p = PROCESS_POOL[idx];
      process.push({
        title: p.title,
        description: p.descTpl.replace(/\{\{TITLE\}\}/g, title)
      });
    }
    pAttempt++;
  }

  const comparison = [];
  const compUsed = new Set<number>();
  let cAttempt = 0;
  while(comparison.length < Math.min(5, COMPARISON_POOL.length)) {
    const idx = (hash + cAttempt) % COMPARISON_POOL.length;
    if (!compUsed.has(idx)) {
      compUsed.add(idx);
      comparison.push({ ...COMPARISON_POOL[idx] });
    }
    cAttempt++;
  }

  const faqs = [];
  const faqUsed = new Set<number>();
  let fAttempt = 0;
  while(faqs.length < Math.min(5, FAQ_POOL.length)) {
    const idx = (hash + fAttempt) % FAQ_POOL.length;
    if (!faqUsed.has(idx)) {
      faqUsed.add(idx);
      const f = FAQ_POOL[idx];
      faqs.push({
        question: f.question.replace(/\{\{TITLE\}\}/g, title),
        answer: f.answer.replace(/\{\{TITLE\}\}/g, title)
      });
    }
    fAttempt++;
  }

  const industries = [];
  const activePool = industriesPool.length > 0 ? industriesPool : INDUSTRIES_POOL;
  const industriesUsed = new Set<number>();
  let iAttempt = 0;
  while(industries.length < Math.min(4, activePool.length)) {
    const idx = (hash + iAttempt) % activePool.length;
    if (!industriesUsed.has(idx)) {
      industriesUsed.add(idx);
      const item = activePool[idx];
      industries.push({
        name: typeof item === 'string' ? item : ((item as any).title || (item as any).name),
        icon: typeof item === 'string' ? "Briefcase" : ((item as any).icon || "Briefcase")
      });
    }
    iAttempt++;
  }

  const generated: DynamicServiceData = {
    heroImage,
    whyItMatters,
    offerings,
    process,
    comparison,
    faqs,
    industries
  };

  // Check if we have specific extra data (like process, faqs, etc.) for this slug
  const extras = SERVICE_EXTRAS[normalizedSlug] || SERVICE_EXTRAS[slug];

  if (CUSTOM_SERVICES[normalizedSlug] || CUSTOM_SERVICES[slug]) {
    return {
      ...generated,
      ...(CUSTOM_SERVICES[normalizedSlug] || CUSTOM_SERVICES[slug]),
      ...(extras || {})
    };
  }

  return {
    ...generated,
    ...(extras || {})
  };
}

