import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Briefcase, MapPin, CheckCircle2, Globe2, Users, Laptop, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { apiClient as api } from "@turnpike/shared/api/client";

export const Route = createFileRoute("/_site/career")({
  component: CareerPage,
});

const perks = [
  { icon: Globe2, title: "Global Experience", desc: "Work with top-tier international clients and gain exposure to global markets and enterprise solutions." },
  { icon: Users, title: "Awesome Team", desc: "Join a diverse group of highly skilled professionals who are passionate about innovation and collaboration." },
  { icon: Laptop, title: "Work From Anywhere", desc: "Enjoy the freedom and flexibility of a remote-first culture, allowing you to work from wherever you're most productive." },
  { icon: Clock, title: "Flexible Hours", desc: "We believe in work-life balance. Manage your own schedule to meet your goals in a way that works for you." }
];

const process = [
  { step: 1, title: "CV Submission", desc: "Submit your CV or resume through our online portal if you meet our requirements." },
  { step: 2, title: "Phone Screening", desc: "After looking at your CV you will be invited for a telephone interview." },
  { step: 3, title: "Skill Assessment", desc: "Take a skills and knowledge assessment." },
  { step: 4, title: "Final Interview", desc: "Final interview with our CEO and HR executive." }
];

function CareerPage() {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await api.get("/content/jobs");
      return res.data;
    }
  });

  return (
    <main className="min-h-screen bg-muted/40 relative pb-24">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-36">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">Career</span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              We are hiring
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">
              Ready to Do the <span className="text-primary">Best Work</span> of Your Life?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Working at Turnpike Analyst means joining a team of visionaries. Discover your potential and build the future of enterprise software with us.
            </p>
            <a href="#openings" className="inline-flex items-center justify-center gap-2 bg-foreground hover:bg-primary text-primary-foreground font-bold py-4 px-8 rounded-full transition-colors text-lg shadow-xl shadow-slate-900/20 hover:shadow-primary/30">
              View Open Positions <ChevronRight className="w-5 h-5" />
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl transform translate-x-8 translate-y-8 -z-10"></div>
            <img src="/career_hero.jpg" alt="Teamwork and Career Growth" className="w-full h-auto rounded-3xl shadow-2xl border border-white/50 object-cover aspect-[4/3] lg:aspect-square" />
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="bg-card py-24 relative z-10 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">Perks & <span className="text-primary">Benefits</span></h2>
            <p className="text-lg text-muted-foreground">We take care of our team so they can focus on delivering excellence. Here is what you can expect when you join us.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div key={idx} className="bg-muted/40 rounded-[2rem] p-8 border border-border hover:border-primary/20 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-card shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-1 group-hover:shadow-md transition-all">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{perk.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="py-24 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">Current <span className="text-primary">Openings</span></h2>
          <p className="text-lg text-muted-foreground">Find your next role and help us shape the future.</p>
        </div>
        
        <div className="grid gap-6">
          {isLoading ? (
            <div className="text-center py-20 text-muted-foreground text-lg flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-border border-t-primary rounded-full animate-spin"></div>
              Loading open positions...
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-card rounded-3xl p-12 text-center border border-border shadow-sm">
              <div className="w-20 h-20 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-muted-foreground/60" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No Openings Right Now</h3>
              <p className="text-muted-foreground max-w-md mx-auto">We are not actively hiring for any specific roles at the moment, but we are always looking for great talent. Feel free to send your resume!</p>
              <Link to="/contact" className="inline-block mt-8 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold py-3 px-8 rounded-full transition-colors">Contact Us</Link>
            </div>
          ) : jobs.map((job: any) => (
            <div key={job._id} className="bg-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              <div className="pl-4">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{job.type}</span>
                  {job.req && <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wide">{job.req}</span>}
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 pr-8">{job.title}</h3>
                <div className="flex items-center text-muted-foreground font-medium"><MapPin className="w-4 h-4 mr-1" /> {job.location}</div>
              </div>
              <Link to="/contact" className="shrink-0 bg-border group-hover:bg-primary text-foreground group-hover:text-primary-foreground font-bold py-4 px-10 rounded-full transition-all text-center whitespace-nowrap shadow-sm group-hover:shadow-xl group-hover:shadow-primary/30">
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-24 bg-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">Recruitment Process</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">We have a streamlined, transparent process to ensure we find the best fit for our team while respecting your time.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-0.5 bg-slate-800 -z-0"></div>
            
            {process.map(p => (
              <div key={p.step} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center mb-6 shadow-xl relative group cursor-default">
                  <div className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-2xl font-black text-slate-500 group-hover:text-white relative z-10 transition-colors">0{p.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

