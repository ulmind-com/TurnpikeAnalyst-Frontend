import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePublicService } from "@turnpike/shared/hooks/use-public-api";
import { getServiceDynamicData } from "@/content/services-dynamic-data";
import { MEGA_MENUS } from "@/components/site/mega-menu-content";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_PREFIX } from "@turnpike/shared/constants/config";

export const Route = createFileRoute("/_site/services/$slug")({
  head: () => ({
    meta: [
      { title: "Service detail — Turnpike Analyst" },
    ],
  }),
  component: ServiceDetailPage,
});

// Helper to render Lucide Icons dynamically from a string name
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.Zap;
  return <IconComponent className={className} />;
};

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = usePublicService(slug);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const { data: industriesPool } = useQuery({
    queryKey: ["industries-pool"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}${API_PREFIX}/content/industries`);
      if (!res.ok) return [];
      return res.json();
    }
  });

  if (service.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <div className="animate-pulse h-16 w-16 rounded-full bg-primary/20" />
      </div>
    );
  }

  const title = service.data?.title || slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const shortDesc = service.data?.short_description || `Explore our industry-leading solutions for ${title}. We provide cutting edge technology and support to help your business thrive.`;
  const hasSections = service.data?.sections && service.data.sections.length > 0;
  
  // Get our unique content for this specific service!
  const dynamicData = getServiceDynamicData(slug, title, industriesPool || []);
  const tabs = dynamicData?.offerings || [];
  const currentTab = tabs[activeTab] || tabs[0];

  const isIndustry = MEGA_MENUS.industries.categories.some(category => 
    category.items.some(item => item.href === `/services/${slug}`)
  );


  return (
    <main className="min-h-screen bg-card">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="relative mx-auto max-w-[1400px]">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-12">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <LucideIcons.ChevronRight className="h-4 w-4" />
            <Link to="/" className="hover:text-primary transition-colors">
              {isIndustry ? 'Industries' : 'Services'}
            </Link>
            <LucideIcons.ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{title}</span>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* The service's own title, with nothing appended. The previous
                  hardcoded " That Converts Users Into Customers." suffix was
                  attached to all sixteen services, including the compliance
                  and cybersecurity ones, where it read as nonsense. */}
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground mb-6 sm:text-5xl lg:text-[3.75rem]">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {shortDesc ||
                  `Specialist delivery for ${title.toLowerCase()} — scoped, staffed and run by practitioners who have done it in regulated environments.`}
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:-translate-y-0.5">
                Request a Free Consultation
                <div className="bg-card rounded-full p-1.5 ml-2">
                  <LucideIcons.ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="relative w-full max-w-2xl mx-auto aspect-square lg:aspect-auto lg:h-[500px]">
              <img src={dynamicData.heroImage} alt={`${title} Illustration`} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Scraped Sections Layout */}
      {hasSections ? (
        <div className="bg-card">
          {/* Intro text section */}
          {service.data?.sections?.[0] && !service.data.sections[0].heading && (
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
              <div className="relative mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold tracking-wide uppercase mb-6">
                  <LucideIcons.Info className="w-4 h-4" />
                  Overview
                </div>
                <div
                  className="text-slate-200 text-xl leading-relaxed space-y-4 [&_h1]:text-white [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_p]:text-slate-300 [&_p]:leading-relaxed [&_a]:text-primary [&_strong]:text-white [&_ul]:list-none [&_ul]:space-y-2 [&_li]:text-slate-300 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['▸'] [&_li]:before:text-primary"
                  dangerouslySetInnerHTML={{ __html: service.data.sections[0].text }}
                />
              </div>
            </section>
          )}

          {/* Remaining sections as styled cards */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
            <div className="mx-auto max-w-[1400px]">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full text-primary text-sm font-bold tracking-wide uppercase mb-6 bg-primary/10">
                  What We Do
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  How We Deliver <span className="text-primary">{title}</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.data?.sections?.filter((s, i) => i > 0 || s.heading).map((section, idx) => (
                  <div key={idx} className="bg-card rounded-3xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <LucideIcons.Layers className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    {section.heading && (
                      <h3 className="text-xl font-bold text-foreground mb-4">{section.heading}</h3>
                    )}
                    <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          {/* Full Description Section */}
          {service.data?.full_description && (
            <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

              <div className="relative mx-auto max-w-[1400px]">
                <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
                  {/* Left: styled description */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold tracking-wide uppercase mb-6">
                      <LucideIcons.Info className="w-4 h-4" />
                      Overview
                    </div>
                    <div
                      className="text-slate-200 text-lg leading-relaxed space-y-4 [&_h1]:text-white [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:text-slate-300 [&_p]:leading-relaxed [&_a]:text-primary [&_strong]:text-white [&_ul]:list-none [&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-slate-300 [&_li]:before:content-['▸'] [&_li]:before:text-primary [&_li]:before:flex-shrink-0 [&_li]:before:mt-0.5"
                      dangerouslySetInnerHTML={{ __html: service.data.full_description }}
                    />
                  </div>

                  {/* Right: feature highlights card */}
                  <div className="lg:sticky lg:top-24">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                          <LucideIcons.Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Key Capabilities</h3>
                      </div>
                      <div className="space-y-4">
                        {dynamicData.whyItMatters.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                              <DynamicIcon name={point.icon} className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-white text-sm">{point.title}</p>
                              <p className="text-slate-400 text-sm mt-1 leading-relaxed">{point.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <Link to="/contact" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/30">
                          Get a Free Consultation
                          <LucideIcons.ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Why it Matters Section - DYNAMIC */}
          <section className="py-24 bg-muted/40 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">
              <div className="text-center mb-20">
                <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full text-primary text-sm font-bold tracking-wide uppercase mb-6 bg-primary/10">
                  Why {title} Matters
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Why Does {title} Directly Impact Your Business Revenue?
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-12 lg:gap-20 max-w-6xl mx-auto">
                {dynamicData.whyItMatters.map((point, idx) => (
                  <div key={idx} className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center mb-6 bg-card shadow-sm hover:scale-110 transition-transform">
                      <DynamicIcon name={point.icon} className="h-10 w-10 text-primary stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tabs Section - DYNAMIC */}
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">
              <div className="text-center mb-20">
                <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full text-primary text-sm font-bold tracking-wide uppercase mb-6 bg-primary/10">
                  Service Offerings
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  What {title} Services Does Turnpike Offer?
                </h2>
              </div>

              <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
                <div className="flex flex-col gap-1 border-l-2 border-border pl-6">
                  {tabs.map((tab, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`text-left px-4 py-4 text-lg font-bold transition-all relative ${
                        activeTab === idx ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {activeTab === idx && (
                        <motion.div layoutId="tab-indicator" className="absolute -left-[26px] top-0 bottom-0 w-[4px] bg-primary rounded-r-full" />
                      )}
                      {tab.title}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <AnimatePresence mode="wait">
                    {currentTab && (
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid sm:grid-cols-[400px_1fr] gap-10 items-center"
                      >
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                          <img src={currentTab.img} alt={currentTab.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-6">{currentTab.title}</h3>
                          <p className="text-muted-foreground leading-relaxed font-medium mb-10">
                            {currentTab.description}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <Link
                              to="/contact"
                              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-float transition-colors hover:bg-primary/90"
                            >
                              Book a discovery call
                              <LucideIcons.ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                              to="/contact"
                              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                            >
                              Talk to a specialist
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* Process Timeline Section */}
          {dynamicData.process && (
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
              <div className="mx-auto max-w-[1400px]">
                <div className="text-center mb-20">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full text-primary text-sm font-bold tracking-wide uppercase mb-6 bg-primary/10">
                    How We Work
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Our Proven {title} Process
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-12 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-border hidden md:block" />
                  
                  {dynamicData.process.map((step, idx) => (
                    <div key={idx} className="relative flex flex-col md:flex-row gap-8 md:gap-12 group">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary font-bold text-2xl">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center pt-2">
                        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed font-medium text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Comparison Section */}
          {dynamicData.comparison && (
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="mx-auto max-w-[1400px] relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    Why Choose Turnpike for {title}?
                  </h2>
                  <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Where this engagement differs from a generalist supplier — in what gets
                    reconciled, what gets signed off, and who is accountable when an auditor asks.
                  </p>
                </div>

                <div className="max-w-5xl mx-auto bg-slate-800/50 rounded-3xl border border-slate-700 overflow-hidden backdrop-blur-sm">
                  <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-700 bg-slate-800/80 p-6 sm:p-8">
                    <div className="font-semibold text-slate-400 text-sm uppercase tracking-wider">
                      Capability
                    </div>
                    <div className="font-semibold text-primary text-lg text-center">Turnpike Analyst</div>
                    <div className="font-semibold text-slate-500 text-lg text-center">
                      Generalist supplier
                    </div>
                  </div>
                  <div className="divide-y divide-slate-700/50">
                    {dynamicData.comparison.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_1fr_1fr] p-6 sm:p-8 items-center hover:bg-slate-700/30 transition-colors">
                        <div className="font-medium text-slate-300 pr-4">{row.feature}</div>
                        <div className="font-bold text-white text-center flex flex-col items-center gap-2">
                          <LucideIcons.CheckCircle2 className="h-6 w-6 text-primary" />
                          <span>{row.us}</span>
                        </div>
                        <div className="font-medium text-slate-500 text-center flex flex-col items-center gap-2">
                          <LucideIcons.XCircle className="h-6 w-6 text-slate-600" />
                          <span>{row.typical}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Industries Section */}
          <section className="py-24 bg-muted/40 px-4 sm:px-6 lg:px-8 border-t border-border">

            <div className="relative mx-auto max-w-[1400px]">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full text-primary text-sm font-bold tracking-wide uppercase mb-6 bg-primary/10">
                  Industries We Serve
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Which <span className="text-primary">Industry</span> Do You Need {title} For?
                </h2>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {dynamicData.industryIntro || `Every industry has its own user expectations, compliance requirements and design conventions. We bring sector-specific thinking to every brief — so your ${title} feels built for your users.`}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {(dynamicData.industries || []).map((ind, i) => {
                  const IconComponent = (LucideIcons as any)[ind.icon] || LucideIcons.Briefcase;
                  return (
                  <div key={i} className="bg-card rounded-3xl p-10 flex flex-col items-center justify-center gap-6 shadow-sm border border-border hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group hover:-translate-y-1">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="h-10 w-10 text-primary stroke-[1.5]" />
                    </div>
                    <span className="font-bold text-foreground text-lg">{ind.name}</span>
                  </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          {dynamicData.faqs && (
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
              <div className="mx-auto max-w-[800px]">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {dynamicData.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-border rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-left bg-card hover:bg-muted/40 transition-colors"
                      >
                        <span className="font-bold text-foreground text-lg pr-8">{faq.question}</span>
                        <LucideIcons.ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 overflow-hidden"
                          >
                            <p className="pb-6 text-muted-foreground font-medium leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
