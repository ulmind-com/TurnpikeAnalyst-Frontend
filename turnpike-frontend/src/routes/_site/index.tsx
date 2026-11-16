import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpen, Bot, GraduationCap, Rocket, Sparkles, Star, Award, FileCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { CountUp } from "@turnpike/shared/components/premium/count-up";
import { GlassCard } from "@turnpike/shared/components/premium/glass-card";
import { AnimatedStatBand } from "@/components/site/animated-stat-band";
import { ServicesExplorer } from "@/components/site/services-explorer";
import { BendGallery } from "@/components/site/bend-gallery";

import { CapabilityGrid } from "@/components/site/capability-grid";
import { FeatureSpotlight } from "@/components/site/feature-spotlight";
import { HeroAJ } from "@/components/site/hero-aj";
import { IndustryGrid } from "@/components/site/industry-grid";

import { TechStackExplorer } from "@/components/site/tech-stack-explorer";
import { Reveal, ScrollZoom } from "@/components/site/parallax";
import {
  PremiumCard,
  PremiumCardSkeleton,
  ServiceCard,
  humanise,
} from "@/components/site/premium-card";
import { DarkFeatureSpotlight } from "@/components/site/dark-feature-spotlight";
import { FlagshipStack } from "@/components/site/flagship-stack";
import { RotatingClaims } from "@/components/site/rotating-claims";
import { HighlightWord, Section, SectionHeading } from "@/components/site/section";
import { ConnectedStatBand, StatBand } from "@/components/site/stat-band";
import { TestimonialCarousel } from "@/components/site/testimonial-carousel";
import { WaveDivider } from "@/components/site/wave-divider";
import { WhyChoose } from "@/components/site/why-choose";
import { OnboardingBlogCards } from "@/components/site/onboarding-blog-cards";
import { Button } from "@turnpike/shared/components/ui/button";
import { Input } from "@turnpike/shared/components/ui/input";
import { Label } from "@turnpike/shared/components/ui/label";
import { Textarea } from "@turnpike/shared/components/ui/textarea";
import {
  AWARDS,
  CAPABILITIES,
  COUNTERS,
  DEPARTMENTS,
  FLAGSHIPS,
  HERO_CLAIMS,
  TECH_STACK,
  TESTIMONIALS,
  WHY_CHOOSE,
} from "@/content/site-content";

import {
  usePublicBlogs,
  usePublicCourses,
  usePublicServices,
  useBookCall,
  usePublicTestimonials,
  usePublicAwards,
  usePublicHomepage,
} from "@turnpike/shared/hooks/use-public-api";

import { BookCallDialog } from "@/components/shared/book-call-dialog";
import { useConsultants, Consultant } from "@turnpike/shared/api/services/consultants.api";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Turnpike Analyst — Enterprise Content & Automation Partner" },
      {
        name: "description",
        content:
          "Enterprise content migration, intelligent automation, and practitioner-led training for regulated organisations. Explore services, products and the academy.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Turnpike Analyst — Enterprise Content & Automation Partner" },
      {
        property: "og:description",
        content:
          "ECM migration, automation and training delivered by practitioners. Book a discovery call with Turnpike Analyst.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });

function HomePage() {
  const services = usePublicServices();
  const courses = usePublicCourses();
  const blogs = usePublicBlogs();
  const testimonialsQuery = usePublicTestimonials();
  const awardsQuery = usePublicAwards();
  const homepageQuery = usePublicHomepage();
  const hp = homepageQuery.data;
  const { data: consultants } = useConsultants(true);
  const navigate = useNavigate();

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | undefined>();

  const handleBook = (c: Consultant) => {
    setSelectedConsultant(c);
    setBookModalOpen(true);
  };

  return (
    <main className="flex flex-col">
      {!hp?.hidden_sections?.includes("hero") && <div style={{ order: hp?.section_order?.indexOf("hero") ?? 0 }}>
        <HeroAJ hero={hp?.hero} claims={hp?.hero_claims} />
        {(hp?.hero_claims?.length || HERO_CLAIMS.length > 0) && (
          <RotatingClaims items={hp?.hero_claims?.length ? hp.hero_claims : HERO_CLAIMS} />
        )}
      </div>}

      {!hp?.hidden_sections?.includes("stats") && <div style={{ order: hp?.section_order?.indexOf("stats") ?? 1 }}><PlatformStats
        serviceCount={services.data?.length ?? 16}
        productCount={hp?.platform_stats?.product_value ?? 2}
        courseCount={courses.data?.length ?? 4}
        labels={hp?.platform_stats}
      /></div>}

      {!hp?.hidden_sections?.includes("technology") && <div id="platforms" style={{ order: hp?.section_order?.indexOf("technology") ?? 2 }} className="relative w-full bg-transparent">
        <TechStackExplorer stack={hp?.tech_stack?.length ? hp.tech_stack : TECH_STACK} heading={hp?.tech_heading} />
      </div>}

      {!hp?.hidden_sections?.includes("services") && <div id="services" style={{ order: hp?.section_order?.indexOf("services") ?? 3 }} className="relative w-full bg-[#0a0a0b] text-[#f4f1ea]">
        <ServicesExplorer
          services={services.data ?? []}
          loading={services.isLoading}
          eyebrow={hp?.services_heading?.eyebrow || undefined}
          title={hp?.services_heading?.title || undefined}
        />
      </div>}

      <div style={{ order: 50 }}><WaveDivider variant="wave" /></div>

      {!hp?.hidden_sections?.includes("industries") && <div id="industries" style={{ order: hp?.section_order?.indexOf("industries") ?? 4 }} className="relative w-full bg-white text-[#111111]"><IndustryGrid cards={hp?.industries} heading={hp?.industries_heading} leadText={hp?.industries_lead_text} /></div>}

      <div style={{ order: 50 }}><WaveDivider variant="curve" /></div>

      {!hp?.hidden_sections?.includes("flagships") && <div id="flagships" style={{ order: hp?.section_order?.indexOf("flagships") ?? 5 }} className="relative w-full pt-16 lg:pt-24 pb-0 bg-transparent">
        <div id="agent-p8" />
        <div id="james-webb" />
        <FlagshipStack
          flagships={hp?.flagships?.length ? hp.flagships : undefined}
          onBookConsultant={() => {
            if (consultants?.length) {
              handleBook(consultants[0]);
            } else {
              handleBook({
                _id: "james-webb",
                name: "James Webb",
                role_description: "Enterprise content management & automation specialist.",
                avatar_url: "https://ui-avatars.com/api/?name=James+Webb&background=10b981&color=fff&size=256",
                calendly_url: "",
                is_active: true,
              });
            }
          }}
        />
      </div>}

      {!hp?.hidden_sections?.includes("consultants") && consultants?.length ? (
        <Section id="consultants" style={{ order: hp?.section_order?.indexOf("consultants") ?? 6 }}>
          <SectionHeading
            eyebrow={hp?.consultants_heading?.eyebrow || "Our Team"}
            title={hp?.consultants_heading?.title || "Meet Our Consultants"}
            description={hp?.consultants_heading?.description || "Industry practitioners ready to help you navigate complex digital transformation."}
          />
          {consultants.map((consultant) => (
            <div key={consultant._id} className="mx-auto max-w-4xl mt-8 rounded-2xl bg-card border border-border p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm transition-colors hover:border-primary/50">
              <div className="relative size-32 shrink-0 rounded-full overflow-hidden border-2 border-primary/30 group">
                <img src={consultant.avatar_url} alt={consultant.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{consultant.name}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {consultant.role_description}
                </p>
                <Button className="mt-4" onClick={() => handleBook(consultant)}>Contact Me To Book Your Slot</Button>
              </div>
            </div>
          ))}
        </Section>
      ) : null}

      <div style={{ order: 50 }}><WaveDivider variant="ribbon" /></div>

      {!hp?.hidden_sections?.includes("why") && <div id="why-us" style={{ order: hp?.section_order?.indexOf("why") ?? 7 }} className="relative w-full bg-transparent">
        <WhyChoose
          items={hp?.why_choose?.length ? hp.why_choose : WHY_CHOOSE}
          heading={hp?.why_heading}
          ctaLabel={hp?.why_cta_label}
          onCta={scrollToContact}
        />
      </div>}

      <div style={{ order: 50 }}><WaveDivider variant="peaks" /></div>
      
      {!hp?.hidden_sections?.includes("awards") && <Section id="awards" className="py-16" style={{ order: hp?.section_order?.indexOf("awards") ?? 8 }}>
        <SectionHeading
          eyebrow={hp?.awards_heading?.eyebrow || "Excellence"}
          title={hp?.awards_heading?.title || "Recent Awards & Certifications"}
          description={hp?.awards_heading?.description || "Recognised by industry leaders for our commitment to quality, security, and innovation."}
        />
        <div className="mt-12">
          <BendGallery items={awardsQuery.data?.length ? awardsQuery.data : AWARDS} />
        </div>
      </Section>}

      <div style={{ order: 50 }}><WaveDivider variant="peaks" /></div>

      {!hp?.hidden_sections?.includes("reviews") && <Section id="reviews" style={{ order: hp?.section_order?.indexOf("reviews") ?? 9 }}>
        <SectionHeading
          eyebrow={hp?.reviews_heading?.eyebrow || "Read more reviews"}
          title={hp?.reviews_heading?.title || "Driving technology for leading brands"}
          description={hp?.reviews_heading?.description || "Programme leaders describe what changed after the migration completed."}
        />
        <TestimonialCarousel items={testimonialsQuery.data?.length ? testimonialsQuery.data : TESTIMONIALS} />
      </Section>}

      <div style={{ order: 50 }}><WaveDivider variant="ribbon" /></div>

      {!hp?.hidden_sections?.includes("insights") && <section id="insights" style={{ order: hp?.section_order?.indexOf("insights") ?? 10 }}>
        <OnboardingBlogCards blogs={blogs.data ?? []} loading={blogs.isLoading} heading={hp?.insights_heading} />
      </section>}

      {!hp?.hidden_sections?.includes("capabilities") && (
        <Section id="capabilities" style={{ order: hp?.section_order?.indexOf("capabilities") ?? 11 }}>
          <CapabilityGrid items={hp?.capabilities?.length ? hp.capabilities : CAPABILITIES} />
        </Section>
      )}

      {!hp?.hidden_sections?.includes("counters") && hp?.counters?.length ? (
        <Section id="counters" className="py-16" style={{ order: hp?.section_order?.indexOf("counters") ?? 12 }}>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(hp.counters.length ? hp.counters : COUNTERS).map((c, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur-xl">
                  <p className="font-display text-4xl font-semibold tracking-tight text-primary">
                    <CountUp value={c.value} />{c.suffix}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <BookCallDialog
        open={bookModalOpen}
        onOpenChange={setBookModalOpen}
        consultant={selectedConsultant}
      />
    </main>
  );
}

function PlatformStats({
  serviceCount,
  productCount,
  courseCount,
  labels,
}: {
  serviceCount: number;
  productCount?: number;
  courseCount: number;
  labels?: { service_label?: string; product_label?: string; course_label?: string };
}) {
  return (
    <section className="relative px-5 pt-14 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <ScrollZoom from={0.96} to={1.04}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: labels?.service_label || "Service capabilities", value: serviceCount },
              { label: labels?.product_label || "Platform products", value: productCount ?? 2 },
              { label: labels?.course_label || "Academy courses", value: courseCount },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="rounded-[2rem] border border-border/60 bg-card/60 p-2 shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)] backdrop-blur-xl"
              >
                <div className="rounded-[1.6rem] border border-border/40 bg-card/75 p-7 text-center backdrop-blur-2xl">
                  <p className="font-display text-4xl font-semibold tracking-tight text-primary">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollZoom>
      </div>
    </section>
  );
}
