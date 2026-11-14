import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Users, Globe, Shield, Landmark, ShoppingCart, Plane } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { apiClient as api } from "@turnpike/shared/api/client";

export const Route = createFileRoute("/_site/our-clients")({
  component: OurClientsPage,
});

const ICON_MAP: Record<string, any> = {
  Globe, Shield, Landmark, ShoppingCart, Plane, Users
};

function OurClientsPage() {
  const { data: allCategories = [], isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("/content/clients");
      return res.data;
    }
  });

  return (
    <main className="min-h-screen bg-white relative pb-24">
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-36">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-900">Our Clients</span>
        </div>
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">We Have <span className="text-primary">Worked Together!</span></h1>
        </div>
          {isLoading ? (
            <div className="text-center py-10 col-span-full">Loading clients...</div>
          ) : (
            allCategories.map((category: any, catIdx: number) => (
              <div key={catIdx} className="mb-20 col-span-full">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-wider">
                    {category.category}
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(category.clients || []).map((client: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="bg-[#fff8f9] hover:bg-[#7bc299] rounded-[2.5rem] h-48 p-8 flex items-center justify-center text-center group transition-all duration-300 cursor-default shadow-sm hover:shadow-xl hover:-translate-y-2 border border-slate-100 hover:border-[#7bc299]"
                    >
                      {client.img ? (
                        <img 
                          src={client.img} 
                          alt={client.name} 
                          className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            let domainMatch = client.img.match(/clearbit\.com\/(.+)/);
                            if (!domainMatch) domainMatch = client.img.match(/icon\.horse\/icon\/(.+)/);
                            
                            if (domainMatch && !target.dataset.triedGoogle) {
                              target.dataset.triedGoogle = "true";
                              target.src = `https://www.google.com/s2/favicons?domain=${domainMatch[1]}&sz=128`;
                            } else if (domainMatch && !target.dataset.triedDuck) {
                              target.dataset.triedDuck = "true";
                              target.src = `https://icons.duckduckgo.com/ip3/${domainMatch[1]}.ico`;
                            } else if (!target.src.includes('ui-avatars')) {
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=ffffff&color=7bc299&size=128`;
                            }
                          }}
                        />
                      ) : (
                        <Globe className="w-16 h-16 text-slate-300 group-hover:text-white transition-colors duration-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
          <div className="col-span-full flex justify-center mt-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group cursor-pointer border border-slate-800 hover:bg-slate-800 transition-colors shadow-sm hover:shadow-xl hover:-translate-y-1 transform duration-300 w-full max-w-sm">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Become a Partner</h3>
            <Link to="/contact" className="text-sm font-bold text-primary hover:text-white transition-colors flex items-center gap-1">Contact us <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    </main>
  );
}

