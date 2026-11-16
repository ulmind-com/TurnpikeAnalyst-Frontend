import { Link } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import React from "react";
import { NavigationMenuContent, NavigationMenuLink } from "@turnpike/shared/components/ui/navigation-menu";

interface CategoryItem {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

interface Category {
  name: string;
  items: CategoryItem[];
}

interface Stat {
  value: string;
  label: string;
}

interface Featured {
  title: string;
  description: string;
  linkText: string;
  href: string;
  stats: Stat[];
  buttonText: string;
}

interface MegaMenuData {
  categories: Category[];
  featured: Featured;
}

export function MegaMenuDropdown({ data }: { data: MegaMenuData }) {
  return (
    <NavigationMenuContent>
      <div className="flex w-[90vw] max-w-[1100px] bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
        {/* Left Column (Categories) */}
        <div className="w-[65%] p-6 lg:p-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {data.categories.flatMap(cat => cat.items).sort((a, b) => a.title.localeCompare(b.title)).map((item, i) => (
              <NavigationMenuLink asChild key={i}>
                <Link
                  to={item.href}
                  className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-primary/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 mt-0.5">
                    <h4 className="text-[13px] font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">{item.description}</p>
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </div>

        {/* Right Column (Featured Panel) */}
        <div className="w-[35%] bg-muted/30 p-6 lg:p-8 flex flex-col border-l border-border/50">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6">MOST POPULAR RIGHT NOW</h3>
          
          <div className="mb-6 aspect-[16/7] w-full overflow-hidden rounded-xl bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] relative shadow-inner">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
               <Trophy className="h-8 w-8 mb-2 opacity-80" />
               <span className="font-semibold text-sm tracking-wide">Featured Solution</span>
            </div>
          </div>
          
          <h4 className="text-lg font-bold text-foreground mb-2">{data.featured.title}</h4>
          <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
            {data.featured.description}
          </p>
          
          <NavigationMenuLink asChild>
            <Link to={data.featured.href} className="text-[13px] font-semibold text-primary hover:underline flex items-center gap-1 mb-8">
              {data.featured.linkText} <ArrowRight className="h-4 w-4" />
            </Link>
          </NavigationMenuLink>
          
          <div className="mt-auto">
            {/* Dark Stats Metrics Card */}
            <div className="bg-zinc-950 text-zinc-50 rounded-xl p-5 mb-6 shadow-xl border border-zinc-800">
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                {data.featured.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-lg font-extrabold flex items-center gap-2 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <NavigationMenuLink asChild>
              <Link to={data.featured.href} className="group flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:-translate-y-0.5">
                {data.featured.buttonText} 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </NavigationMenuLink>
          </div>
        </div>
      </div>
    </NavigationMenuContent>
  );
}
