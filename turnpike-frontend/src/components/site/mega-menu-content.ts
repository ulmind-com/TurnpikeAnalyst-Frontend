import { 
  AppWindow, BrainCircuit, Workflow, Briefcase, Cloud, Shield, Database, 
  Paintbrush, Megaphone, Wrench, Server, Leaf, Users, 
  Plane, Car, Building2, Smartphone, GraduationCap, HardHat, 
  Stethoscope, Factory, ShieldCheck, Pill, Tv, Activity,
  TreePine, Fuel, MonitorPlay, BriefcaseBusiness, Landmark,
  ShoppingCart, Cpu, Truck, Lightbulb, 
  Files, ScanLine, Headset, Presentation, GraduationCap as GradCap,
  MapPin, Headphones, Mail, Settings, Globe, Radio, Zap
} from "lucide-react";

export const MEGA_MENUS = {
  services: {
    categories: [
      {
        name: "DESIGN & EXPERIENCE",
        items: [
          { title: "Design & Experience", description: "UI/UX & Omnichannel design", icon: Paintbrush, href: "/services/design-experience" },
          { title: "Digital Marketing & Interaction", description: "SEO & brand strategies", icon: Megaphone, href: "/services/digital-marketing-interaction" }
        ]
      },
      {
        name: "PRODUCT & ENGINEERING",
        items: [
          { title: "Engineering", description: "Microservices & systems", icon: Wrench, href: "/services/engineering" },
          { title: "Infrastructure", description: "Managed support & SLAs", icon: Server, href: "/services/infrastructure" }
        ]
      },
      {
        name: "AI & AUTOMATION",
        items: [
          { title: "Artificial & Augmented Intelligence", description: "Watsonx AI & LLM", icon: BrainCircuit, href: "/services/artificial-augmented-intelligence" },
          { title: "Business Process", description: "BPM & intelligent RPA", icon: Workflow, href: "/services/business-process" },
          { title: "Data & Analytics", description: "BI platforms & Snowflake", icon: Database, href: "/services/data-analytics" }
        ]
      },
      {
        name: "GROW & SCALE",
        items: [
          { title: "Business Solutions", description: "CRM & ERP content", icon: Briefcase, href: "/services/business-solutions" },
          { title: "Cloud", description: "AWS & Azure transformation", icon: Cloud, href: "/services/cloud" },
          { title: "Consulting", description: "Strategic advisory", icon: Lightbulb, href: "/services/consulting" },
          { title: "Cybersecurity", description: "Zero-trust & compliance", icon: Shield, href: "/services/cybersecurity" },
          { title: "Sustainability", description: "Green datacenter optimization", icon: Leaf, href: "/services/sustainability" },
          { title: "Talent Cloud", description: "On-demand expert talent", icon: Users, href: "/services/talent-cloud" }
        ]
      }
    ],
    featured: {
      title: "AI & LLM Integration",
      description: "A seamless user experience is at the heart of every successful digital health product. Our design team crafts interfaces that convert.",
      linkText: "Explore AI Services",
      href: "/services/artificial-augmented-intelligence",
      stats: [
        { value: "850+", label: "Products built" },
        { value: "300+", label: "Clients served" },
        { value: "15+", label: "Countries" },
        { value: "ISO 9001", label: "Certified" }
      ],
      buttonText: "Schedule a Free Consultation"
    }
  },
  industries: {
    categories: [
      {
        name: "FINANCE & PROFESSIONAL",
        items: [
          { title: "Banking", description: "Digital transformation", icon: Landmark, href: "/services/banking" },
          { title: "Insurance", description: "Policy management", icon: ShieldCheck, href: "/services/insurance" },
          { title: "Professional Services", description: "Consulting & advisory", icon: BriefcaseBusiness, href: "/services/professional-services" },
          { title: "Public Sector", description: "Government solutions", icon: Building2, href: "/services/public-sector" },
          { title: "Education", description: "EdTech platforms", icon: GraduationCap, href: "/services/education" }
        ]
      },
      {
        name: "HEALTH & LIFE SCIENCES",
        items: [
          { title: "Healthcare", description: "Patient portals", icon: Stethoscope, href: "/services/healthcare" },
          { title: "Life Sciences & Pharma", description: "Clinical trial data", icon: Pill, href: "/services/life-sciences-pharma" },
          { title: "Medical Devices", description: "IoT & device management", icon: Activity, href: "/services/medical-devices" }
        ]
      },
      {
        name: "INDUSTRIAL & RESOURCES",
        items: [
          { title: "Industrial & Process Manufacturing", description: "Supply chain ops", icon: Factory, href: "/services/industrial-process-manufacturing" },
          { title: "Engineering Construction & Operations", description: "Project management", icon: HardHat, href: "/services/engineering-construction-operations" },
          { title: "Natural Resources", description: "Resource planning", icon: TreePine, href: "/services/natural-resources" },
          { title: "Oil & Gas", description: "Energy analytics", icon: Fuel, href: "/services/oil-gas" },
          { title: "Utilities", description: "Grid management", icon: Zap, href: "/services/utilities" }
        ]
      },
      {
        name: "CONSUMER & TRANSPORT",
        items: [
          { title: "Retail", description: "E-commerce & omnichannel", icon: ShoppingCart, href: "/services/retail" },
          { title: "Consumer Packaged Goods", description: "Inventory & distribution", icon: Truck, href: "/services/consumer-packaged-goods" },
          { title: "Consumer Electronics", description: "Smart home integrations", icon: Smartphone, href: "/services/consumer-electronics" },
          { title: "Automotive", description: "Connected vehicles", icon: Car, href: "/services/automotive" },
          { title: "Aerospace & Defense", description: "Secure comms", icon: Plane, href: "/services/aerospace-defense" },
          { title: "Transportation & Services", description: "Logistics systems", icon: Globe, href: "/services/transportation-services" },
          { title: "Media & Info Services", description: "Content delivery", icon: Radio, href: "/services/media-info-services" },
          { title: "Platforms & Software Products", description: "SaaS architecture", icon: MonitorPlay, href: "/services/platforms-software-products" },
          { title: "Semiconductors", description: "Supply chain analytics", icon: Cpu, href: "/services/semiconductors" }
        ]
      }
    ],
    featured: {
      title: "Transforming Healthcare",
      description: "Discover how we modernize legacy healthcare infrastructure with zero-downtime ECM migrations and Watsonx AI.",
      linkText: "Explore Industry Solutions",
      href: "/services/healthcare",
      stats: [
        { value: "50M+", label: "Records Migrated" },
        { value: "99.9%", label: "Uptime" },
        { value: "HIPAA", label: "Compliant" },
        { value: "Tier 1", label: "Hospitals" }
      ],
      buttonText: "Talk to an Industry Expert"
    }
  },
  digitalContent: {
    categories: [
      {
        name: "ENTERPRISE CONTENT",
        items: [
          { title: "Digital Content Migration", description: "High-speed JAMES WEBB", icon: Files, href: "/services/digital-content-migration" },
          { title: "Digital Content Capture", description: "Cognitive Kofax & AI OCR", icon: ScanLine, href: "/services/digital-content-capture" },
          { title: "Managed Services", description: "24/7 SLA infrastructure support", icon: Headset, href: "/services/managed-services" }
        ]
      }
    ],
    featured: {
      title: "JAMES WEBB Server",
      description: "High-speed, zero-downtime ECM Content & Metadata Migration Server for FileNet & OpenText architectures.",
      linkText: "Learn about JAMES WEBB",
      href: "/services/digital-content-migration",
      stats: [
        { value: "PB-Scale", label: "Multi-threaded" },
        { value: "Zero", label: "Downtime Cutover" },
        { value: "100%", label: "Checksum Logic" },
        { value: "24/7", label: "SLA Support" }
      ],
      buttonText: "Explore Solution"
    }
  },
  training: {
    categories: [
      {
        name: "ACADEMY",
        items: [
          { title: "Show Me All Available Training", description: "Browse our complete course catalog", icon: Presentation, href: "/training" },
          { title: "Become an instructor", description: "Join our expert teaching team", icon: GradCap, href: "/contact?topic=instructor" }
        ]
      }
    ],
    featured: {
      title: "Master Enterprise ECM",
      description: "Level up your team's skills with our certified IBM FileNet P8 Architecture & Advanced ECM Mastery course.",
      linkText: "View Course Catalog",
      href: "/training",
      stats: [
        { value: "40+", label: "Hours of Content" },
        { value: "Expert", label: "Instructors" },
        { value: "Cert.", label: "Preparation" },
        { value: "1500+", label: "Graduates" }
      ],
      buttonText: "Enroll Today"
    }
  },
  contactUs: {
    categories: [
      {
        name: "COMPANY",
        items: [
          { title: "Our Clients", description: "See who we work with", icon: Users, href: "/our-clients" },
          { title: "FAQ", description: "Frequently asked questions", icon: Headphones, href: "/faq" },
          { title: "Career", description: "Join our growing team", icon: Briefcase, href: "/career" }
        ]
      }
    ],
    featured: {
      title: "We're Here to Help",
      description: "Whether you need a full enterprise migration or just have a quick question, our expert engineering team is ready.",
      linkText: "Visit Support Portal",
      href: "/contact",
      stats: [
        { value: "24/7", label: "Global Support" },
        { value: "< 8hr", label: "Response SLA" },
        { value: "98%", label: "CSAT Score" },
        { value: "3", label: "Global HQs" }
      ],
      buttonText: "Contact Us Now"
    }
  }
};
