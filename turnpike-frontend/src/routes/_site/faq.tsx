import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, HelpCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { apiClient as api } from "@turnpike/shared/api/client";

export const Route = createFileRoute("/_site/faq")({
  component: FAQPage,
});

function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await api.get("/content/faqs");
      return res.data;
    }
  });

  return (
    <main className="min-h-screen bg-muted/40 relative pb-24">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-36">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">FAQ</span>
        </div>
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm border border-primary/20">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">Answers to Your Most Common Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Find the answers you need about our services, processes, and technologies.</p>
        </div>
        <div className="bg-card rounded-[2rem] shadow-xl shadow-slate-200/50 border border-border p-6 sm:p-10">
          <div className="space-y-4">
            {isLoading ? <div className="text-center py-10">Loading FAQs...</div> : faqs.map((faq: any, index: number) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq._id} className="border border-border rounded-2xl overflow-hidden transition-colors hover:border-primary/20">
                  <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-6 text-left bg-card focus:outline-none">
                    <span className="text-lg font-bold text-foreground pr-8">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-primary text-primary-foreground rotate-180' : 'bg-border text-muted-foreground'}`}>
                      <ChevronRight className={`w-5 h-5 ${isOpen ? '-rotate-90' : 'rotate-90'}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="p-6 pt-0 text-muted-foreground leading-relaxed">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

