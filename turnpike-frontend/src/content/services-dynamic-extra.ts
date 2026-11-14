import type { DynamicServiceData } from "./services-dynamic-data";

type ExtraData = Pick<DynamicServiceData, 'industryIntro' | 'process' | 'comparison' | 'faqs'>;

export const SERVICE_EXTRAS: Record<string, ExtraData> = {
  "cloud": {
    industryIntro: "Cloud infrastructure needs vary wildly—from healthcare data residency requirements to extreme latency demands in fintech. We build cloud architectures that respect your sector's exact rules.",
    process: [
      { title: "Cloud Readiness Assessment", description: "We analyze your on-premise workloads to identify dependencies and define a secure path to the cloud." },
      { title: "Architecture Design", description: "Our cloud architects design a multi-zone, highly available environment using AWS, Azure, or GCP best practices." },
      { title: "Migration & Deployment", description: "We migrate databases and applications with near-zero downtime, using containerization for maximum portability." },
      { title: "Security & Compliance Hardening", description: "We enforce strict IAM policies, encrypt data at rest/transit, and align with SOC2/HIPAA standards." },
      { title: "FinOps & Optimization", description: "Post-launch, we implement aggressive cost-optimization strategies to ensure you only pay for what you use." }
    ],
    comparison: [
      { feature: "Cloud Lock-in", us: "Cloud-agnostic (Kubernetes based)", typical: "Proprietary lock-in" },
      { feature: "Migration Downtime", us: "Near-zero (Blue/Green)", typical: "Weekend-long outages" },
      { feature: "Cost Optimization", us: "Proactive FinOps included", typical: "Ignored post-launch" },
      { feature: "Security", us: "Zero-trust by default", typical: "Basic perimeter defense" },
      { feature: "Support", us: "24/7 SLA-backed monitoring", typical: "Ticketing system delays" }
    ],
    faqs: [
      { question: "Which cloud provider do you recommend?", answer: "We remain vendor-neutral. We recommend AWS, Azure, or GCP based strictly on your existing tech stack and compliance needs." },
      { question: "Will migration disrupt our operations?", answer: "No. We use Blue/Green deployment strategies and database replication to ensure a seamless cutover." },
      { question: "How do you handle cloud security?", answer: "We implement Zero Trust architecture, KMS encryption, and automated vulnerability scanning out of the box." },
      { question: "Can you reduce our current AWS/Azure bill?", answer: "Absolutely. Our FinOps audits typically uncover 20-40% in infrastructure savings through right-sizing and spot instances." },
      { question: "Do you offer managed cloud services?", answer: "Yes. Our 24/7 NOC can monitor, patch, and maintain your cloud infrastructure indefinitely." }
    ]
  },
  "artificial-intelligence": {
    industryIntro: "AI isn't a one-size-fits-all magic wand. A retail recommendation engine operates completely differently than a healthcare diagnostic model. We tailor AI models to your exact domain.",
    process: [
      { title: "Data Discovery & Cleansing", description: "We audit your proprietary data lakes, ensuring data is clean, structured, and unbiased for training." },
      { title: "Model Selection", description: "We choose the optimal architecture—from fine-tuned LLMs to custom Convolutional Neural Networks (CNNs)." },
      { title: "Training & Fine-Tuning", description: "We train the models securely on your private infrastructure so your corporate IP never leaks." },
      { title: "MLOps Integration", description: "We wrap the models in robust APIs and deploy them into your existing software workflows." },
      { title: "Continuous Learning", description: "We implement feedback loops that allow the AI to become smarter and more accurate over time." }
    ],
    comparison: [
      { feature: "Data Privacy", us: "Private, on-prem/VPC training", typical: "Sends data to public APIs" },
      { feature: "Model Accuracy", us: "Fine-tuned on your specific data", typical: "Generic, off-the-shelf prompts" },
      { feature: "Deployment", us: "Scalable MLOps pipelines", typical: "Manual, fragile notebooks" },
      { feature: "IP Ownership", us: "You own the weights and code", typical: "SaaS vendor lock-in" },
      { feature: "Explainability", us: "Transparent decision tracking", typical: "Black-box outputs" }
    ],
    faqs: [
      { question: "Will my proprietary data be used to train public AI?", answer: "Never. We build isolated AI environments (VPCs) ensuring your data and IP remain 100% confidential." },
      { question: "Do we need a massive dataset to start?", answer: "Not necessarily. Pre-trained foundational models allow us to achieve high accuracy with surprisingly small amounts of fine-tuning data." },
      { question: "Can you integrate AI into our legacy CRM/ERP?", answer: "Yes. We build custom middleware APIs that allow legacy systems to interface directly with modern AI models." },
      { question: "How do you prevent AI hallucinations?", answer: "We implement strict Retrieval-Augmented Generation (RAG) pipelines and guardrails to ensure factual accuracy." },
      { question: "What is the ROI on AI implementation?", answer: "While variable, our clients typically see a 30-50% reduction in manual processing costs within the first quarter." }
    ]
  },
  "cybersecurity": {
    industryIntro: "Threat landscapes are industry-specific. Banks face organized financial syndicates, while healthcare faces ransomware. We design threat matrices based on your exact adversaries.",
    process: [
      { title: "Vulnerability Assessment", description: "We conduct comprehensive penetration testing against your networks, applications, and APIs." },
      { title: "Threat Modeling", description: "We map out attack vectors specific to your industry and prioritize remediation based on risk." },
      { title: "Zero Trust Implementation", description: "We enforce strict IAM, MFA, and micro-segmentation across your entire corporate network." },
      { title: "Automated Compliance", description: "We configure dashboards that continuously monitor your adherence to SOC2, GDPR, or HIPAA." },
      { title: "Incident Response Planning", description: "We establish automated playbooks and a 24/7 SOC to instantly isolate any potential breaches." }
    ],
    comparison: [
      { feature: "Approach", us: "Proactive threat hunting", typical: "Reactive alert monitoring" },
      { feature: "Architecture", us: "Zero Trust Network Access (ZTNA)", typical: "Castle-and-moat (VPN)" },
      { feature: "Compliance", us: "Automated evidence collection", typical: "Manual spreadsheet audits" },
      { feature: "Penetration Testing", us: "Manual, logic-based hacking", typical: "Automated scanner reports" },
      { feature: "Response Time", us: "Automated playbook isolation", typical: "Manual analyst intervention" }
    ],
    faqs: [
      { question: "Do you offer 24/7 monitoring?", answer: "Yes, our Security Operations Center (SOC) provides around-the-clock threat detection and response." },
      { question: "Can you help us achieve SOC2 compliance?", answer: "Absolutely. We architect your infrastructure to meet SOC2 standards and assist with the audit process." },
      { question: "What happens if we get breached?", answer: "Our automated playbooks instantly isolate affected systems, while our incident response team neutralizes the threat." },
      { question: "Do you train our employees?", answer: "Yes. We conduct simulated phishing campaigns and security awareness training to fortify your human firewall." },
      { question: "Is your penetration testing manual or automated?", answer: "We use automated tools for baseline coverage, but rely heavily on manual, logic-based hacking by certified professionals." }
    ]
  },
  "healthcare": {
    industryIntro: "Healthcare software requires a delicate balance between absolute security (HIPAA) and seamless patient usability. We build systems that satisfy both compliance officers and frustrated patients.",
    process: [
      { title: "Compliance Audit", description: "We start by ensuring all planned architectures align with HIPAA, HITECH, and FDA requirements." },
      { title: "Interoperability Mapping", description: "We design FHIR/HL7 interfaces to seamlessly connect with existing EHRs like Epic or Cerner." },
      { title: "Patient-Centric UX Design", description: "We prototype accessible, intuitive interfaces designed for all demographics and technical skill levels." },
      { title: "Secure Development", description: "Code is written with end-to-end encryption, ensuring PHI is protected both at rest and in transit." },
      { title: "Rigorous QA & Deployment", description: "We conduct extensive usability and security testing before a phased rollout into clinical environments." }
    ],
    comparison: [
      { feature: "Compliance", us: "Native HIPAA & FHIR compliance", typical: "Bolted-on security" },
      { feature: "EHR Integration", us: "Deep Epic/Cerner expertise", typical: "Superficial API knowledge" },
      { feature: "User Experience", us: "Patient-tested accessibility", typical: "Clunky, complex forms" },
      { feature: "Data Security", us: "End-to-end PHI encryption", typical: "Basic database security" },
      { feature: "Scalability", us: "Cloud-native telehealth ready", typical: "On-premise legacy bound" }
    ],
    faqs: [
      { question: "Are your solutions HIPAA compliant?", answer: "100%. We sign BAAs and implement strict access controls, audit logs, and encryption for all PHI." },
      { question: "Can you integrate with our EHR system?", answer: "Yes, we have extensive experience building FHIR and HL7 v2/v3 interfaces for Epic, Cerner, and Athenahealth." },
      { question: "Do you build patient-facing mobile apps?", answer: "Yes. We build native iOS and Android apps for telemedicine, prescription management, and appointment scheduling." },
      { question: "How do you ensure app accessibility for elderly patients?", answer: "We strictly adhere to WCAG 2.1 AA standards, utilizing large tap targets, high contrast, and screen-reader support." },
      { question: "Can you implement AI for diagnostics?", answer: "Yes, we deploy machine learning models as clinical decision support systems, ensuring they meet FDA software guidelines." }
    ]
  },
  "banking": {
    industryIntro: "Financial institutions need military-grade security combined with consumer-grade user experiences. We build fintech platforms that convert users while mitigating systemic risks.",
    process: [
      { title: "Regulatory Gap Analysis", description: "We map your desired architecture against stringent PCI-DSS and regional banking regulations." },
      { title: "Microservices Design", description: "We architect scalable ledger and transactional systems that don't rely on fragile legacy mainframes." },
      { title: "Security & Identity Engineering", description: "We implement biometric MFA and adaptive risk-based authentication to prevent account takeovers." },
      { title: "High-Frequency Testing", description: "We simulate extreme transaction volumes to ensure your core systems won't fail under load." },
      { title: "Phased Rollout", description: "We launch services incrementally using dark launching and feature flags to mitigate deployment risk." }
    ],
    comparison: [
      { feature: "Modernization", us: "Incremental, risk-free strangulation", typical: "High-risk 'big bang' migrations" },
      { feature: "UX/UI", us: "Consumer-app grade design", typical: "Clunky enterprise interfaces" },
      { feature: "Security", us: "Biometric & adaptive MFA", typical: "Basic SMS 2FA" },
      { feature: "Scalability", us: "Real-time event streaming (Kafka)", typical: "Nightly batch processing" },
      { feature: "API Ecosystem", us: "Open Banking ready", typical: "Closed, proprietary APIs" }
    ],
    faqs: [
      { question: "Can you modernize our core banking system?", answer: "Yes, we use the 'strangler fig' pattern to slowly migrate legacy mainframe logic to modern microservices without downtime." },
      { question: "Are your systems PCI-DSS compliant?", answer: "Yes, we architect systems that minimize PCI scope via tokenization and strict compliance controls." },
      { question: "Do you build Neobanking apps?", answer: "Yes, we build complete mobile banking experiences from the ground up, including onboarding, KYC, and daily banking." },
      { question: "How do you handle real-time fraud detection?", answer: "We deploy ML models that analyze transaction metadata in milliseconds to block fraudulent transfers before they clear." },
      { question: "Can we integrate with third-party fintechs?", answer: "Absolutely. We build secure Open Banking APIs that allow you to seamlessly partner with the broader fintech ecosystem." }
    ]
  }
};
