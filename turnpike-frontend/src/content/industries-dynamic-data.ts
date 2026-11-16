export interface IndustryTrend {
  title: string;
  description: string;
  icon: string;
}

export interface IndustryProblem {
  title: string;
  description: string;
  icon: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface TechStackItem {
  name: string;
  icon: string;
}

export interface IndustryDynamicData {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  trends: IndustryTrend[];
  problems: IndustryProblem[];
  solutions: IndustrySolution[];
  techStack: TechStackItem[];
  whyUs: IndustryTrend[];
  faqs: IndustryFAQ[];
}

export const getIndustryDynamicData = (slug: string, title: string): IndustryDynamicData => {
  switch (slug) {
    case 'banking-financial-services':
    case 'fintech-banking':
    case 'banking':
      return {
        heroHeadline: "Digital Transformation for Modern Banking & Finance",
        heroSubheadline: "Secure, compliant, and frictionless digital experiences that drive growth and customer loyalty in the modern financial sector.",
        heroImage: "/illustrations/industry-banking.jpg",
        trends: [
          { title: "Open Banking", description: "Leveraging APIs to create connected financial ecosystems.", icon: "Unplug" },
          { title: "AI in Risk", description: "Advanced machine learning models for real-time fraud detection.", icon: "ShieldAlert" },
          { title: "Embedded Finance", description: "Integrating financial services directly into non-financial platforms.", icon: "Layers" }
        ],
        problems: [
          { title: "Legacy Infrastructure", description: "Outdated core banking systems slowing down innovation and feature deployment.", icon: "Database" },
          { title: "Regulatory Compliance", description: "Constantly shifting data privacy laws and financial regulations (GDPR, PSD2).", icon: "Scale" },
          { title: "Customer Retention", description: "Friction in onboarding and digital experiences driving users to neobanks.", icon: "Users" }
        ],
        solutions: [
          { title: "Core Banking Modernization", description: "We migrate and refactor monolithic financial systems into agile microservices architectures.", icon: "RefreshCw", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
          { title: "Secure Mobile Banking Apps", description: "Award-winning iOS and Android banking applications built with security-first principles.", icon: "Smartphone", image: "https://images.unsplash.com/photo-1616803140344-6682afb13cda?auto=format&fit=crop&q=80&w=800" },
          { title: "Automated Compliance Tools", description: "AI-driven RegTech solutions that automatically monitor transactions and flag anomalies.", icon: "ShieldCheck", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" }
        ],
        techStack: [
          { name: "Kafka", icon: "Activity" },
          { name: "Kubernetes", icon: "Box" },
          { name: "AWS", icon: "Cloud" },
          { name: "PostgreSQL", icon: "Database" }
        ],
        whyUs: [
          { title: "Security First", description: "We build to exact PCI-DSS and SOC2 compliance standards.", icon: "Lock" },
          { title: "Fintech Experts", description: "Our engineers have delivered platforms processing billions in volume.", icon: "Briefcase" },
          { title: "Zero Downtime", description: "Fault-tolerant architectures ensuring 99.999% availability.", icon: "Activity" }
        ],
        faqs: [
          { question: "How do you handle PCI compliance?", answer: "Security is integrated from day one. We utilize tokenization, encryption at rest and in transit, and strictly adhere to PCI-DSS standards throughout the development lifecycle." },
          { question: "Can you integrate with legacy mainframes?", answer: "Yes, we specialize in building modern API wrappers around legacy AS/400 and mainframe systems, allowing modern frontends to safely interact with core banking." }
        ]
      };

    case 'healthcare':
    case 'healthcare-life-sciences':
      return {
        heroHeadline: "Next-Generation Healthcare Technology Solutions",
        heroSubheadline: "From patient portals to complex EHR integrations, we build HIPAA-compliant software that improves patient outcomes and operational efficiency.",
        heroImage: "/illustrations/industry-healthcare.jpg",
        trends: [
          { title: "Telemedicine", description: "Virtual care platforms bridging the gap between patients and providers.", icon: "Video" },
          { title: "IoMT Devices", description: "Internet of Medical Things collecting real-time patient vitals.", icon: "Activity" },
          { title: "AI Diagnostics", description: "Machine learning assisting in radiology and early disease detection.", icon: "Brain" }
        ],
        problems: [
          { title: "Data Interoperability", description: "Siloed health records across different hospital networks and EHR vendors.", icon: "Link" },
          { title: "Strict Compliance", description: "Navigating complex HIPAA, HITRUST, and GDPR regulations.", icon: "FileKey" },
          { title: "Patient Engagement", description: "Poor user experiences in patient portals leading to low adoption rates.", icon: "UserX" }
        ],
        solutions: [
          { title: "Custom EHR & EMR Systems", description: "Tailored electronic health records that integrate seamlessly with existing hospital workflows.", icon: "ClipboardList", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" },
          { title: "Patient Portals & Telehealth", description: "Secure, accessible web and mobile platforms for appointments, records, and virtual visits.", icon: "Laptop", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" },
          { title: "Medical IoT Integration", description: "Connecting wearable devices and clinical sensors to centralized monitoring dashboards.", icon: "ActivitySquare", image: "https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=800" }
        ],
        techStack: [
          { name: "FHIR", icon: "Link" },
          { name: "HL7", icon: "MessageSquare" },
          { name: "Azure Health", icon: "Cloud" },
          { name: "Python AI", icon: "Code" }
        ],
        whyUs: [
          { title: "HIPAA Compliant", description: "Every line of code and infrastructure choice is built for compliance.", icon: "Shield" },
          { title: "Interoperability Focus", description: "Deep expertise with HL7, FHIR, and SMART on FHIR standards.", icon: "Network" },
          { title: "Patient-Centric UI", description: "Award-winning accessible designs tailored for diverse patient demographics.", icon: "Heart" }
        ],
        faqs: [
          { question: "Are your solutions HIPAA compliant?", answer: "Absolutely. We utilize BAA agreements with cloud providers, encrypt all PHI at rest and in transit, and implement rigorous access controls and audit logging." },
          { question: "Do you integrate with Epic or Cerner?", answer: "Yes, we have extensive experience building applications that interface with major EHR systems like Epic, Cerner, and Allscripts using HL7 and FHIR APIs." }
        ]
      };

    case 'ecommerce-retail':
    case 'retail':
      return {
        heroHeadline: "Award-Winning E-Commerce & Retail Software",
        heroSubheadline: "Custom online stores, headless commerce development, mobile commerce apps, and AI-powered retail solutions for brands worldwide.",
        heroImage: "/illustrations/industry-retail.jpg",
        trends: [
          { title: "Headless Commerce", description: "Decoupling front-end and back-end for blazing fast omnichannel experiences.", icon: "Layout" },
          { title: "AI Personalization", description: "Hyper-personalized product recommendations driven by behavioral data.", icon: "Sparkles" },
          { title: "Social Commerce", description: "Frictionless checkout natively within social media platforms.", icon: "Share2" }
        ],
        problems: [
          { title: "Slow Load Times", description: "Even a 1-second delay can drop conversions by 7%. Monolithic platforms are slowing brands down.", icon: "Clock" },
          { title: "Inventory Sync Issues", description: "Disconnects between physical POS, warehouses, and the digital storefront leading to stockouts.", icon: "PackageX" },
          { title: "High Cart Abandonment", description: "Clunky checkout processes and poor mobile optimization driving customers away.", icon: "ShoppingCart" }
        ],
        solutions: [
          { title: "Headless Storefronts", description: "Next.js and Shopify Plus integrations for sub-second page loads and bespoke design.", icon: "Zap", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800" },
          { title: "Omnichannel Retail Systems", description: "Unified inventory and POS systems bridging the gap between brick-and-mortar and digital.", icon: "Store", image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=800" },
          { title: "Mobile Commerce Apps", description: "Native iOS and Android shopping apps that maximize LTV and push-notification engagement.", icon: "Smartphone", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800" }
        ],
        techStack: [
          { name: "Shopify Plus", icon: "ShoppingBag" },
          { name: "Next.js", icon: "Globe" },
          { name: "Stripe", icon: "CreditCard" },
          { name: "Algolia", icon: "Search" }
        ],
        whyUs: [
          { title: "Conversion Focused", description: "Our UX decisions are driven by data, heatmaps, and A/B testing.", icon: "TrendingUp" },
          { title: "Performance Obsessed", description: "We target 99+ Core Web Vitals for maximum SEO and conversion impact.", icon: "Gauge" },
          { title: "Scalable Architecture", description: "Infrastructure designed to handle Black Friday traffic spikes effortlessly.", icon: "Server" }
        ],
        faqs: [
          { question: "Do you work with Shopify or custom platforms?", answer: "Both. We often build Headless Shopify experiences using Next.js for the frontend and Shopify Plus for the backend, offering the best of bespoke design and robust commerce capabilities." },
          { question: "How do you handle inventory sync?", answer: "We build middleware and custom integrations connecting your ERP, POS, and storefront to ensure real-time inventory accuracy across all channels." }
        ]
      };

    case 'aerospace-defense':
      return {
        heroHeadline: "Secure & Scalable Tech for Aerospace & Defense",
        heroSubheadline: "Mission-critical software, secure communications, and advanced analytics designed for zero-failure environments.",
        heroImage: "/illustrations/industry-aerospace.jpg",
        trends: [
          { title: "Space Tech Evolution", description: "Commercialization of low-Earth orbit and advanced satellite networks.", icon: "Rocket" },
          { title: "Autonomous Systems", description: "AI-driven autonomous flight and unmanned tactical vehicles.", icon: "Cpu" },
          { title: "Cyber Warfare Defense", description: "Proactive AI threat hunting and zero-trust architectures.", icon: "Shield" }
        ],
        problems: [
          { title: "Supply Chain Vulnerability", description: "Opaque global supply chains creating security and delivery risks.", icon: "Link" },
          { title: "Extreme Compliance", description: "Navigating ITAR, FedRAMP, and DoD security mandates.", icon: "FileText" },
          { title: "Legacy Tech Obsolescence", description: "Decades-old mainframes struggling to support modern warfare data.", icon: "Database" }
        ],
        solutions: [
          { title: "Secure Communication Networks", description: "Encrypted, low-latency communication platforms for tactical environments.", icon: "Radio", image: "https://images.unsplash.com/photo-1544605910-1845bb02be55?auto=format&fit=crop&q=80&w=800" },
          { title: "Defense Supply Chain Analytics", description: "Blockchain and AI solutions for complete part traceability.", icon: "Search", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800" },
          { title: "FedRAMP Cloud Migration", description: "Secure lift-and-shift of defense applications to GovCloud environments.", icon: "Cloud", image: "https://images.unsplash.com/photo-1614064641913-a520faff3be2?auto=format&fit=crop&q=80&w=800" }
        ],
        techStack: [
          { name: "GovCloud", icon: "Cloud" },
          { name: "Rust", icon: "Code" },
          { name: "Kafka", icon: "Activity" },
          { name: "Palantir Foundry", icon: "Database" }
        ],
        whyUs: [
          { title: "Cleared Personnel", description: "Engineers with required security clearances for sensitive projects.", icon: "UserCheck" },
          { title: "Zero-Trust Native", description: "Security built into the fabric, not bolted on after.", icon: "Lock" },
          { title: "Mission Tested", description: "Proven track record in high-stakes defense deployments.", icon: "Award" }
        ],
        faqs: [
          { question: "Are your systems ITAR compliant?", answer: "Yes, all data handling, storage, and personnel access protocols meet or exceed ITAR and CMMC requirements." },
          { question: "Do you work with legacy DoD systems?", answer: "We specialize in securely modernizing legacy architectures while maintaining 100% operational uptime during transition." }
        ]
      };

    case 'automotive':
      return {
        heroHeadline: "Driving the Future of Automotive Mobility",
        heroSubheadline: "From connected vehicle platforms to autonomous driving data pipelines, we engineer software for the next generation of transport.",
        heroImage: "/illustrations/industry-automotive.jpg",
        trends: [
          { title: "Software-Defined Vehicles", description: "Cars evolving into edge-computing devices receiving OTA updates.", icon: "Car" },
          { title: "EV Ecosystems", description: "Smart grid integration and dynamic charging network apps.", icon: "Zap" },
          { title: "Digital Retailing", description: "Direct-to-consumer digital showrooms and VR vehicle exploration.", icon: "Store" }
        ],
        problems: [
          { title: "Data Overload", description: "Managing petabytes of telemetry data generated by connected fleets.", icon: "Database" },
          { title: "Fragmented UX", description: "Disconnect between in-car infotainment and mobile companion apps.", icon: "Smartphone" },
          { title: "OTA Update Failures", description: "High failure rates and security risks in over-the-air vehicle updates.", icon: "Wifi" }
        ],
        solutions: [
          { title: "Connected Car Platforms", description: "Scalable cloud architectures to ingest, process, and act on vehicle telemetry.", icon: "Wifi", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" },
          { title: "In-Cabin Infotainment UI", description: "Beautiful, distraction-free interfaces for next-gen dashboard displays.", icon: "Monitor", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800" },
          { title: "EV Charging Management", description: "Mobile apps and backend systems for smart charging and billing.", icon: "BatteryCharging", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800" }
        ],
        techStack: [
          { name: "C++", icon: "Code" },
          { name: "MQTT", icon: "Radio" },
          { name: "AWS IoT", icon: "Cloud" },
          { name: "Flutter", icon: "Smartphone" }
        ],
        whyUs: [
          { title: "Auto Standards", description: "Compliance with ISO 26262 and automotive cybersecurity engineering.", icon: "Shield" },
          { title: "Edge Computing", description: "Experts in deploying AI models directly to edge devices in vehicles.", icon: "Cpu" },
          { title: "Omnichannel Teams", description: "Bridging hardware integration with consumer-facing mobile apps.", icon: "Users" }
        ],
        faqs: [
          { question: "How do you handle real-time vehicle data?", answer: "We utilize high-throughput message brokers like Kafka and MQTT to ingest and process telemetry data with millisecond latency." },
          { question: "Can you build cross-platform companion apps?", answer: "Absolutely. We use frameworks like Flutter and React Native to build feature-rich mobile apps that control vehicle functions securely." }
        ]
      };

    case 'education':
    case 'education-edtech':
      return {
        heroHeadline: "Empowering Modern Education with EdTech",
        heroSubheadline: "Scalable learning management systems, immersive virtual classrooms, and AI-driven student success platforms.",
        heroImage: "/illustrations/industry-education.jpg",
        trends: [
          { title: "AI Tutors", description: "Personalized learning paths guided by generative AI.", icon: "Brain" },
          { title: "Micro-Credentials", description: "Blockchain-verified digital badges and skill tracking.", icon: "Award" },
          { title: "Immersive Learning", description: "AR and VR experiences for complex subject visualization.", icon: "Glasses" }
        ],
        problems: [
          { title: "Low Engagement", description: "Passive learning platforms resulting in high student drop-off rates.", icon: "UserMinus" },
          { title: "Data Silos", description: "SIS, LMS, and assessment tools failing to communicate.", icon: "Database" },
          { title: "Accessibility", description: "Software that fails to meet WCAG standards for disabled students.", icon: "Eye" }
        ],
        solutions: [
          { title: "Custom LMS Development", description: "Intuitive, gamified learning platforms tailored to your curriculum.", icon: "BookOpen", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800" },
          { title: "Student Analytics Dashboards", description: "Predictive models that identify at-risk students before they fail.", icon: "BarChart", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800" },
          { title: "Virtual Classrooms", description: "High-fidelity video streaming with interactive whiteboards and polls.", icon: "Video", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" }
        ],
        techStack: [
          { name: "WebRTC", icon: "Video" },
          { name: "Moodle/Canvas APIs", icon: "Code" },
          { name: "React", icon: "Layout" },
          { name: "Python AI", icon: "Brain" }
        ],
        whyUs: [
          { title: "Pedagogical Design", description: "UX that aligns with modern learning science and cognitive load theory.", icon: "Book" },
          { title: "FERPA Compliant", description: "Strict data privacy controls protecting student information.", icon: "Shield" },
          { title: "WCAG 2.1 AA", description: "Commitment to 100% accessible educational software.", icon: "Check" }
        ],
        faqs: [
          { question: "Are your platforms accessible?", answer: "Yes, accessibility is a core pillar. We strictly follow WCAG 2.1 AA guidelines, ensuring screen reader compatibility and keyboard navigation." },
          { question: "Can you integrate with our existing SIS?", answer: "We build custom middleware to seamlessly sync data between your new tools and legacy Student Information Systems (SIS)." }
        ]
      };

    case 'insurance':
      return {
        heroHeadline: "Next-Gen InsurTech Solutions",
        heroSubheadline: "Automate claims, detect fraud with AI, and deliver seamless digital policies to modern consumers.",
        heroImage: "/illustrations/industry-insurance.jpg",
        trends: [
          { title: "Telematics Pricing", description: "Usage-based insurance driven by IoT and mobile data.", icon: "Activity" },
          { title: "Automated Claims", description: "AI-powered photo damage assessment for instant payouts.", icon: "Camera" },
          { title: "Embedded Insurance", description: "Offering policies directly at the point of sale (e.g., flights, cars).", icon: "Layers" }
        ],
        problems: [
          { title: "Manual Underwriting", description: "Slow, error-prone manual reviews delaying policy issuance.", icon: "FileText" },
          { title: "Fraudulent Claims", description: "Undetected fraud costing billions annually.", icon: "AlertTriangle" },
          { title: "Poor Customer UX", description: "Complex, jargon-heavy portals confusing policyholders.", icon: "UserX" }
        ],
        solutions: [
          { title: "AI Fraud Detection", description: "Machine learning models that analyze historical claims for anomalies.", icon: "ShieldAlert", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
          { title: "Digital Policy Portals", description: "Sleek mobile apps where users can manage policies and file claims in minutes.", icon: "Smartphone", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" },
          { title: "Automated Underwriting Engines", description: "Rules-based systems for instant risk assessment and pricing.", icon: "Settings", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" }
        ],
        techStack: [
          { name: "TensorFlow", icon: "Brain" },
          { name: "Kubernetes", icon: "Box" },
          { name: "Java Spring", icon: "Code" },
          { name: "React Native", icon: "Smartphone" }
        ],
        whyUs: [
          { title: "Regulatory Experts", description: "Deep understanding of state and federal insurance regulations.", icon: "Scale" },
          { title: "Data Privacy", description: "Rigorous PII protection protocols and SOC2 compliance.", icon: "Lock" },
          { title: "Rapid Prototyping", description: "Launch new InsurTech products in weeks, not years.", icon: "Rocket" }
        ],
        faqs: [
          { question: "How accurate is AI fraud detection?", answer: "Our models typically reduce false positives by 30% compared to legacy rules engines, learning continuously from new claim data." },
          { question: "Can we migrate from Guidewire?", answer: "Yes, we assist in modernizing and extracting data from legacy systems like Guidewire to custom microservices architectures." }
        ]
      };

    case 'consumer-electronics':
    case 'consumer-electronics-appliances':
      return {
        heroHeadline: "Smart Consumer Electronics & IoT Innovation",
        heroSubheadline: "From smart home devices to wearables — we build connected experiences that delight end users and scale globally.",
        heroImage: "/illustrations/industry-consumer-electronics.jpg",
        trends: [
          { title: "Smart Home Integration", description: "Voice-controlled and app-connected devices becoming mainstream.", icon: "Home" },
          { title: "Wearable Tech", description: "Smartwatches and fitness bands with real-time health monitoring.", icon: "Watch" },
          { title: "Edge AI on Device", description: "On-device intelligence reducing latency and cloud dependency.", icon: "Cpu" }
        ],
        problems: [
          { title: "Fragmented Ecosystems", description: "Devices from different brands fail to interoperate seamlessly.", icon: "Unplug" },
          { title: "Firmware Security", description: "IoT devices often ship with poor security defaults.", icon: "ShieldAlert" },
          { title: "Short Product Cycles", description: "Intense pressure to ship features faster than competitors.", icon: "Timer" }
        ],
        solutions: [
          { title: "IoT Platform Development", description: "Unified cloud backends that manage thousands of connected devices reliably.", icon: "Cloud", image: "" },
          { title: "Companion App Engineering", description: "Polished iOS and Android apps delivering intuitive control of hardware.", icon: "Smartphone", image: "" },
          { title: "Firmware OTA Updates", description: "Secure over-the-air update pipelines ensuring devices stay patched.", icon: "Download", image: "" }
        ],
        techStack: [
          { name: "MQTT", icon: "Wifi" }, { name: "AWS IoT", icon: "Cloud" }, { name: "React Native", icon: "Smartphone" }, { name: "C/C++", icon: "Code" }
        ],
        whyUs: [
          { title: "Hardware + Software", description: "Rare ability to bridge firmware and cloud-native application layers.", icon: "Cpu" },
          { title: "Security First", description: "Every device integration is hardened against known IoT attack vectors.", icon: "Lock" },
          { title: "Scale Ready", description: "Architectures designed to handle millions of concurrent device connections.", icon: "BarChart" }
        ],
        faqs: [
          { question: "Can you integrate with Alexa and Google Home?", answer: "Yes, we build certified skills and actions for all major voice ecosystems." },
          { question: "Do you support Matter protocol?", answer: "Yes, we have experience implementing the Matter smart home standard for seamless interoperability." }
        ]
      };

    case 'consumer-packaged-goods':
    case 'cpg':
      return {
        heroHeadline: "Digital Supply Chain & CPG Innovation",
        heroSubheadline: "From production to shelf — we digitize every link of your supply chain for speed, visibility and scale.",
        heroImage: "/illustrations/industry-cpg.jpg",
        trends: [
          { title: "D2C Commerce", description: "Brands selling directly to consumers via owned digital channels.", icon: "ShoppingBag" },
          { title: "Demand Forecasting AI", description: "ML models reducing overstock and out-of-stock incidents dramatically.", icon: "BarChart2" },
          { title: "Sustainable Packaging", description: "Digital product passports tracking packaging material lifecycle.", icon: "Leaf" }
        ],
        problems: [
          { title: "Supply Chain Visibility", description: "Lack of real-time tracking across multi-tier supplier networks.", icon: "Eye" },
          { title: "Inventory Waste", description: "Poor demand sensing leads to excess stock and write-offs.", icon: "Trash2" },
          { title: "Retailer Data Silos", description: "Disconnected POS and retail analytics preventing brand insight.", icon: "Database" }
        ],
        solutions: [
          { title: "Supply Chain Control Tower", description: "Real-time dashboards aggregating supplier, logistics and inventory data.", icon: "Monitor", image: "" },
          { title: "D2C eCommerce Platforms", description: "Custom storefronts with subscription, loyalty and personalization engines.", icon: "ShoppingCart", image: "" },
          { title: "Trade Promotion Analytics", description: "AI-driven optimization of promotional spend across retail channels.", icon: "TrendingUp", image: "" }
        ],
        techStack: [
          { name: "SAP", icon: "Database" }, { name: "Snowflake", icon: "Cloud" }, { name: "Shopify Plus", icon: "ShoppingCart" }, { name: "Python", icon: "Code" }
        ],
        whyUs: [
          { title: "Supply Chain Experts", description: "Deep operational knowledge across FMCG, food & beverage, and personal care.", icon: "Award" },
          { title: "Retailer Integration", description: "Pre-built connectors for Walmart, Target, Amazon Vendor Central.", icon: "Link" },
          { title: "Speed to Market", description: "Launch D2C stores in 8 weeks with our accelerator framework.", icon: "Rocket" }
        ],
        faqs: [
          { question: "Can you help us reduce stockouts?", answer: "Yes, our demand sensing models have reduced stockouts by up to 40% for similar brands." },
          { question: "Do you integrate with ERP systems?", answer: "Yes, we build connectors for SAP, Oracle and Microsoft Dynamics 365." }
        ]
      };

    case 'engineering-construction-operations':
    case 'engineering-construction':
    case 'construction':
      return {
        heroHeadline: "Digital Transformation for Engineering & Construction",
        heroSubheadline: "BIM, project management platforms and IoT site monitoring — we digitize construction from blueprint to handover.",
        heroImage: "/illustrations/industry-engineering-construction.jpg",
        trends: [
          { title: "BIM Adoption", description: "Building Information Modelling becoming mandatory on major infrastructure projects.", icon: "Layers" },
          { title: "Construction Robotics", description: "Autonomous machines for hazardous tasks like bricklaying and demolition.", icon: "Cpu" },
          { title: "Smart Site IoT", description: "Sensor networks monitoring structural health and worker safety in real time.", icon: "Activity" }
        ],
        problems: [
          { title: "Project Overruns", description: "70% of megaprojects exceed budget and schedule due to poor coordination.", icon: "AlertTriangle" },
          { title: "Fragmented Data", description: "Drawings, RFIs and change orders spread across email and spreadsheets.", icon: "FileText" },
          { title: "Safety Incidents", description: "Construction remains the highest-fatality industry globally.", icon: "ShieldAlert" }
        ],
        solutions: [
          { title: "Project Management Platforms", description: "Custom PMC portals with schedule, cost and quality dashboards.", icon: "LayoutDashboard", image: "" },
          { title: "BIM Integration Tools", description: "Middleware bridging Revit, Navisworks and site data for single source of truth.", icon: "Layers", image: "" },
          { title: "Worker Safety Wearables", description: "Smart helmets and vests with fall detection and geo-fencing alerts.", icon: "UserCheck", image: "" }
        ],
        techStack: [
          { name: "Autodesk Forge", icon: "Box" }, { name: "Procore API", icon: "Code" }, { name: "Azure IoT", icon: "Cloud" }, { name: "React", icon: "Layers" }
        ],
        whyUs: [
          { title: "Domain Experience", description: "Engineers who have worked on live civil and commercial construction projects.", icon: "HardHat" },
          { title: "Offline-First Design", description: "Apps that work on-site without cellular connectivity.", icon: "Wifi" },
          { title: "Regulatory Compliance", description: "Platforms built to OSHA, CDM and ISO 19650 standards.", icon: "Scale" }
        ],
        faqs: [
          { question: "Can you integrate with Procore or Aconex?", answer: "Yes, we have built production integrations with both platforms and their APIs." },
          { question: "Do you build drone inspection software?", answer: "Yes, we build computer vision pipelines for automated drone survey analysis." }
        ]
      };

    case 'industrial-process-manufacturing':
    case 'industrial-manufacturing':
    case 'manufacturing':
      return {
        heroHeadline: "Industry 4.0 Solutions for Manufacturing Excellence",
        heroSubheadline: "Smart factories, predictive maintenance and connected assembly lines — we engineer the plant of the future.",
        heroImage: "/illustrations/industry-industrial-manufacturing.jpg",
        trends: [
          { title: "Predictive Maintenance", description: "AI sensors detecting equipment failure weeks before breakdown occurs.", icon: "Activity" },
          { title: "Digital Twins", description: "Virtual replicas of physical plant for simulation and optimization.", icon: "Copy" },
          { title: "Cobots on the Floor", description: "Collaborative robots working alongside human operators safely.", icon: "Cpu" }
        ],
        problems: [
          { title: "Unplanned Downtime", description: "Equipment failures costing manufacturers $50B+ annually.", icon: "AlertTriangle" },
          { title: "Quality Defects", description: "Manual inspection missing micro-defects that escape to field.", icon: "XCircle" },
          { title: "Data Fragmentation", description: "PLC, SCADA and ERP systems unable to communicate with each other.", icon: "Database" }
        ],
        solutions: [
          { title: "MES & SCADA Integration", description: "Unified manufacturing execution platforms connecting shop floor to top floor.", icon: "Server", image: "" },
          { title: "Computer Vision QC", description: "Camera-based defect detection systems running at line speed.", icon: "Eye", image: "" },
          { title: "Predictive Analytics", description: "ML pipelines on sensor data forecasting failures with 90%+ accuracy.", icon: "TrendingUp", image: "" }
        ],
        techStack: [
          { name: "Ignition SCADA", icon: "Activity" }, { name: "Azure IoT Hub", icon: "Cloud" }, { name: "Python ML", icon: "Code" }, { name: "Grafana", icon: "BarChart" }
        ],
        whyUs: [
          { title: "OT/IT Expertise", description: "Rare ability to bridge operational and information technology domains.", icon: "Cpu" },
          { title: "Zero-Downtime Deployment", description: "Live production migrations with no manufacturing interruption.", icon: "CheckCircle" },
          { title: "Standards Compliance", description: "ISA-95, IEC 62443 and ISO 9001 compliant solutions.", icon: "Scale" }
        ],
        faqs: [
          { question: "Can you integrate with our legacy PLC systems?", answer: "Yes, we use OPC-UA and MQTT bridges to connect legacy PLCs to modern cloud platforms." },
          { question: "How long to implement a predictive maintenance solution?", answer: "A typical deployment from sensor data collection to live alerts takes 10–14 weeks." }
        ]
      };

    case 'life-sciences-pharma':
    case 'life-sciences':
    case 'pharma':
      return {
        heroHeadline: "Technology Accelerating Life Sciences Innovation",
        heroSubheadline: "From clinical trials to pharmacovigilance — we build validated, compliant software that brings therapies to market faster.",
        heroImage: "/illustrations/industry-life-sciences.jpg",
        trends: [
          { title: "AI Drug Discovery", description: "Generative AI reducing the compound screening phase from years to months.", icon: "Brain" },
          { title: "Decentralized Trials", description: "Remote patient monitoring enabling trials without physical site visits.", icon: "Activity" },
          { title: "Real-World Evidence", description: "Post-market surveillance data improving therapy outcomes and label updates.", icon: "BarChart" }
        ],
        problems: [
          { title: "Clinical Data Silos", description: "Trial data trapped in disparate EDC systems preventing cross-study insights.", icon: "Database" },
          { title: "Regulatory Compliance", description: "FDA 21 CFR Part 11, EMA GCP and ICH requirements adding complexity.", icon: "Scale" },
          { title: "Patient Recruitment", description: "70% of trials fail to recruit on time, delaying approvals by years.", icon: "Users" }
        ],
        solutions: [
          { title: "Clinical Data Management Systems", description: "Custom EDC and CDMS platforms with full 21 CFR Part 11 audit trails.", icon: "FileText", image: "" },
          { title: "Patient Recruitment Apps", description: "AI-matching platforms connecting eligible patients with open trials.", icon: "UserCheck", image: "" },
          { title: "Pharmacovigilance Automation", description: "NLP pipelines processing adverse event reports at scale.", icon: "ShieldAlert", image: "" }
        ],
        techStack: [
          { name: "SAS", icon: "BarChart" }, { name: "Python", icon: "Code" }, { name: "AWS GovCloud", icon: "Cloud" }, { name: "HL7 FHIR", icon: "Activity" }
        ],
        whyUs: [
          { title: "GxP Validated", description: "All our life sciences software follows GAMP 5 validation methodology.", icon: "CheckCircle" },
          { title: "Regulatory Affairs Support", description: "In-house experts who understand FDA submissions and IMPD requirements.", icon: "Award" },
          { title: "Data Security", description: "HIPAA-compliant infrastructure with end-to-end encryption.", icon: "Lock" }
        ],
        faqs: [
          { question: "Are your systems FDA 21 CFR Part 11 compliant?", answer: "Yes, all our clinical systems include electronic signature workflows and immutable audit trails." },
          { question: "Can you integrate with Medidata Rave?", answer: "Yes, we build API integrations with Medidata, Veeva Vault and other major CTMS platforms." }
        ]
      };

    case 'media-info-services':
    case 'media-information-services':
    case 'media':
      return {
        heroHeadline: "Digital Media & Content Technology Solutions",
        heroSubheadline: "From OTT streaming platforms to AI content tools — we engineer media technology that captures and monetizes audiences.",
        heroImage: "/illustrations/industry-media.jpg",
        trends: [
          { title: "Streaming Wars", description: "OTT platforms competing on content recommendation and UX quality.", icon: "Play" },
          { title: "AI Content Generation", description: "Generative AI accelerating post-production and localization workflows.", icon: "Brain" },
          { title: "First-Party Data", description: "Media companies building owned audience data platforms post-cookie.", icon: "Database" }
        ],
        problems: [
          { title: "Content Monetization", description: "Declining ad revenues forcing new subscription and hybrid models.", icon: "DollarSign" },
          { title: "Piracy & DRM", description: "Unauthorized redistribution of premium content eroding revenue.", icon: "ShieldAlert" },
          { title: "Multi-Platform Distribution", description: "Publishing to web, mobile, TV and social simultaneously is complex.", icon: "Layers" }
        ],
        solutions: [
          { title: "OTT Platform Engineering", description: "Scalable video streaming platforms with adaptive bitrate and DRM.", icon: "Play", image: "" },
          { title: "Content Management Systems", description: "Headless CMS built for media workflows, publishing queues and multi-locale.", icon: "FileText", image: "" },
          { title: "Audience Analytics", description: "Real-time dashboards tracking engagement, churn and content ROI.", icon: "BarChart", image: "" }
        ],
        techStack: [
          { name: "AWS MediaConvert", icon: "Video" }, { name: "Cloudfront CDN", icon: "Cloud" }, { name: "React", icon: "Code" }, { name: "Elasticsearch", icon: "Search" }
        ],
        whyUs: [
          { title: "Streaming Expertise", description: "Deployed video platforms serving millions of concurrent viewers.", icon: "Wifi" },
          { title: "CMS Migration", description: "Migrated 10M+ content assets from legacy CMS to headless architectures.", icon: "Database" },
          { title: "Rights Management", description: "Complex licensing and geo-restriction workflows built in.", icon: "Lock" }
        ],
        faqs: [
          { question: "Can you build a Netflix-like platform?", answer: "Yes, we can build scalable OTT platforms with recommendation engines, transcoding and multi-DRM support." },
          { question: "Do you support DAM integrations?", answer: "Yes, we integrate with Bynder, Widen, Cloudinary and other leading Digital Asset Management platforms." }
        ]
      };

    case 'medical-devices':
      return {
        heroHeadline: "Cutting-Edge Software for Medical Device Innovation",
        heroSubheadline: "FDA-cleared software development for diagnostics, wearables and remote patient monitoring devices.",
        heroImage: "/illustrations/industry-medical-devices.jpg",
        trends: [
          { title: "Software as Medical Device", description: "SaMD gaining traction for AI-based diagnostics and decision support.", icon: "Brain" },
          { title: "Remote Patient Monitoring", description: "Chronic disease management shifting from clinic to home.", icon: "Activity" },
          { title: "Minimally Invasive Tech", description: "Robotics-assisted surgical systems reducing recovery times.", icon: "Cpu" }
        ],
        problems: [
          { title: "FDA 510(k) Delays", description: "Software submissions frequently rejected for insufficient clinical evidence.", icon: "Clock" },
          { title: "Interoperability Gaps", description: "Devices unable to share data with hospital EHR systems.", icon: "Unplug" },
          { title: "Cybersecurity Vulnerabilities", description: "Connected medical devices targeted by ransomware attacks.", icon: "ShieldAlert" }
        ],
        solutions: [
          { title: "SaMD Development & Validation", description: "IEC 62304 and FDA-compliant software development with design history files.", icon: "FileText", image: "" },
          { title: "HL7 FHIR Integration", description: "Seamless EHR interoperability connecting devices to Epic, Cerner and Allscripts.", icon: "Activity", image: "" },
          { title: "Medical Cybersecurity", description: "SBOM, penetration testing and post-market surveillance for connected devices.", icon: "Lock", image: "" }
        ],
        techStack: [
          { name: "IEC 62304", icon: "Scale" }, { name: "HL7 FHIR", icon: "Activity" }, { name: "C/C++", icon: "Code" }, { name: "Azure Health", icon: "Cloud" }
        ],
        whyUs: [
          { title: "FDA Submission Experience", description: "Supported multiple 510(k) and De Novo submissions successfully.", icon: "Award" },
          { title: "IEC 62304 Compliant", description: "Full software lifecycle documentation for Class II and III devices.", icon: "CheckCircle" },
          { title: "Interoperability Specialists", description: "Deep expertise in FHIR, DICOM and HL7 v2 standards.", icon: "Link" }
        ],
        faqs: [
          { question: "Do you develop IEC 62304 compliant software?", answer: "Yes, our medical device software follows IEC 62304 Class B and C processes with full traceability." },
          { question: "Can you help with FDA 510(k) submissions?", answer: "Yes, we prepare software documentation packages including SRS, SDS and hazard analysis for 510(k) submissions." }
        ]
      };

    case 'natural-resources':
      return {
        heroHeadline: "Smart Technology for Natural Resource Management",
        heroSubheadline: "From mineral exploration to environmental compliance — we digitize natural resource operations for efficiency and sustainability.",
        heroImage: "/illustrations/industry-natural-resources.jpg",
        trends: [
          { title: "Remote Sensing Analytics", description: "Satellite and drone imagery processed by AI for exploration and monitoring.", icon: "Satellite" },
          { title: "ESG Reporting", description: "Automated sustainability reporting meeting SEC and TCFD requirements.", icon: "Leaf" },
          { title: "Digital Mine Operations", description: "Autonomous vehicles and real-time ore grade control in mining.", icon: "Cpu" }
        ],
        problems: [
          { title: "Environmental Compliance", description: "Growing regulatory scrutiny on emissions, water usage and land rehabilitation.", icon: "Scale" },
          { title: "Remote Operations", description: "Managing assets in inaccessible locations with unreliable connectivity.", icon: "MapPin" },
          { title: "Price Volatility", description: "Commodity price swings requiring agile operational cost management.", icon: "TrendingDown" }
        ],
        solutions: [
          { title: "Asset Management Platforms", description: "Centralized dashboards for monitoring geographically distributed assets.", icon: "Monitor", image: "" },
          { title: "Environmental Monitoring Systems", description: "Real-time sensor networks for air, water and soil quality compliance.", icon: "Activity", image: "" },
          { title: "Geospatial Data Platforms", description: "GIS-integrated tools for exploration data management and visualization.", icon: "Map", image: "" }
        ],
        techStack: [
          { name: "ESRI ArcGIS", icon: "Map" }, { name: "AWS", icon: "Cloud" }, { name: "Python", icon: "Code" }, { name: "Tableau", icon: "BarChart" }
        ],
        whyUs: [
          { title: "Remote Operations Expertise", description: "Offline-capable systems engineered for operations in the field.", icon: "Wifi" },
          { title: "Environmental Focus", description: "ESG data pipelines and automated sustainability report generation.", icon: "Leaf" },
          { title: "Geospatial Capability", description: "Full-stack GIS and satellite imagery analysis capability.", icon: "Map" }
        ],
        faqs: [
          { question: "Do you support offline operation in remote mines?", answer: "Yes, our platforms are designed offline-first, syncing when connectivity is available." },
          { question: "Can you automate ESG reporting?", answer: "Yes, we build pipelines that aggregate operational data into GRI, SASB and TCFD report formats automatically." }
        ]
      };

    case 'oil-gas':
    case 'oil-and-gas':
    case 'energy':
      return {
        heroHeadline: "Intelligent Technology for Oil, Gas & Energy",
        heroSubheadline: "From upstream exploration to downstream distribution — we build the digital infrastructure powering the energy transition.",
        heroImage: "/illustrations/industry-oil-gas.jpg",
        trends: [
          { title: "Energy Transition", description: "O&G majors pivoting portfolios toward renewables and carbon capture.", icon: "Leaf" },
          { title: "Digital Oilfield", description: "Connected sensors and AI optimizing reservoir and production decisions.", icon: "Activity" },
          { title: "Carbon Accounting", description: "Real-time emissions tracking integrated into operational dashboards.", icon: "BarChart" }
        ],
        problems: [
          { title: "Asset Integrity Risk", description: "Aging infrastructure with corrosion and failure risk across pipelines.", icon: "AlertTriangle" },
          { title: "Price Cycle Volatility", description: "Operations must remain profitable across wide commodity price swings.", icon: "TrendingDown" },
          { title: "Regulatory Reporting", description: "Complex environmental and safety reporting across multiple jurisdictions.", icon: "Scale" }
        ],
        solutions: [
          { title: "Pipeline Monitoring Systems", description: "IoT sensor networks detecting leaks, corrosion and pressure anomalies.", icon: "Activity", image: "" },
          { title: "Reservoir Simulation Software", description: "Digital twin models for production forecasting and reserve optimization.", icon: "Server", image: "" },
          { title: "HSE Compliance Platforms", description: "Automated health, safety and environment reporting and incident management.", icon: "ShieldCheck", image: "" }
        ],
        techStack: [
          { name: "OSIsoft PI", icon: "Activity" }, { name: "Azure Digital Twins", icon: "Cloud" }, { name: "Python", icon: "Code" }, { name: "Power BI", icon: "BarChart" }
        ],
        whyUs: [
          { title: "SCADA Integration", description: "Connectors for Honeywell, Yokogawa and other leading DCS/SCADA platforms.", icon: "Cpu" },
          { title: "Hazardous Environment Design", description: "Intrinsically safe hardware specifications for Zone 1 and Zone 2 areas.", icon: "ShieldAlert" },
          { title: "Energy Transition Ready", description: "Platforms built to support both hydrocarbon and renewable asset portfolios.", icon: "Leaf" }
        ],
        faqs: [
          { question: "Can you integrate with our SCADA/DCS systems?", answer: "Yes, we build OPC-UA and REST connectors for all major industrial automation platforms." },
          { question: "Do you support methane monitoring?", answer: "Yes, we build sensor networks and reporting dashboards compliant with EPA Subpart W methane reporting." }
        ]
      };

    default:
      // Deterministic hash based on slug to pick random items consistently
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash);
      }
      // Simple pseudo-random generator based on hash
      const random = () => {
        const x = Math.sin(hash++) * 10000;
        return x - Math.floor(x);
      };

      const fallbackTrends = [
        { title: "Digital Disruption", description: "Accelerated adoption of cloud-native and mobile-first strategies.", icon: "Zap" },
        { title: "Data-Driven Decisions", description: "Leveraging analytics and ML for predictive operational insights.", icon: "BarChart" },
        { title: "Process Automation", description: "Streamlining manual processes to reduce costs and errors.", icon: "Cpu" },
        { title: "Customer Centricity", description: "Hyper-personalization at scale across all digital touchpoints.", icon: "Users" },
        { title: "Edge Computing", description: "Processing data closer to the source for real-time responsiveness.", icon: "Activity" },
        { title: "Sustainability Tech", description: "Integrating ESG metrics and green infrastructure solutions.", icon: "Leaf" }
      ].sort(() => random() - 0.5);

      const fallbackProblems = [
        { title: "Legacy Tech Debt", description: "Outdated systems preventing agile responses to market changes.", icon: "AlertTriangle" },
        { title: "Operational Inefficiency", description: "Disconnected tools leading to manual data entry and silos.", icon: "Scissors" },
        { title: "Security Threats", description: "Increasingly sophisticated cyber attacks targeting proprietary data.", icon: "ShieldAlert" },
        { title: "Talent Shortages", description: "Struggling to hire and retain specialized engineering talent.", icon: "UserMinus" },
        { title: "Regulatory Complexity", description: "Constantly evolving compliance requirements slowing down releases.", icon: "Scale" }
      ].sort(() => random() - 0.5);

      const fallbackSolutions = [
        { title: `Custom ${title} Software`, description: "Bespoke applications designed around your exact business logic and workflows.", icon: "Code", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
        { title: "Cloud Migration & Architecture", description: "Secure, scalable transition of legacy infrastructure to modern cloud environments.", icon: "Cloud", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
        { title: "Intelligent Workflows", description: "Automated pipelines that eliminate manual tasks and accelerate delivery.", icon: "Workflow", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
        { title: "Data Engineering Lakes", description: "Centralized analytics platforms turning raw data into strategic assets.", icon: "Database", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" }
      ].sort(() => random() - 0.5);

      return {
        heroHeadline: `Transformative Digital Solutions for ${title}`,
        heroSubheadline: `We engineer premium, scalable technology tailored specifically to the unique challenges and opportunities within the ${title} sector.`,
        heroImage: "/illustrations/industry-general.jpg",
        trends: fallbackTrends.slice(0, 3),
        problems: fallbackProblems.slice(0, 3),
        solutions: fallbackSolutions.slice(0, 3),
        techStack: [
          { name: "React", icon: "Code" },
          { name: "Node.js", icon: "Server" },
          { name: "AWS", icon: "Cloud" },
          { name: "Docker", icon: "Box" }
        ],
        whyUs: [
          { title: "Industry Expertise", description: "Deep understanding of sector-specific regulatory and operational nuances.", icon: "Award" },
          { title: "Agile Delivery", description: "Rapid prototyping and iterative development for faster time-to-market.", icon: "FastForward" },
          { title: "Enterprise Security", description: "Military-grade encryption and compliance built into the foundation.", icon: "Lock" }
        ],
        faqs: [
          { question: `Do you have experience in ${title}?`, answer: "Yes, our cross-functional teams have delivered transformative solutions across this sector, bringing best practices from both within and outside the industry." },
          { question: "How long does a typical project take?", answer: "Project timelines vary based on scope, but we typically launch an initial MVP within 12-16 weeks, followed by iterative enhancements." }
        ]
      };
  }
};

