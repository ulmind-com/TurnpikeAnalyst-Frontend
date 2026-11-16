import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

import { useSubscribe } from "@turnpike/shared/hooks/use-public-api";
import { Button } from "@turnpike/shared/components/ui/button";
import { Input } from "@turnpike/shared/components/ui/input";
import { cn } from "@turnpike/shared/lib/utils";

export function NewsletterCTA({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribe();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    subscribe.mutate(email, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        setEmail("");
      }
    });
  };

  return (
    <section className={cn("relative overflow-hidden bg-primary/5 py-24 sm:py-32", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-xl lg:max-w-lg"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Newsletter
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get all latest content delivered to your email a few times a month. 
              Updates and news about all categories will send to you.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-grow">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 w-full rounded-2xl border-border/50 bg-background/50 pl-12 pr-4 text-base backdrop-blur transition-colors focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary shadow-sm"
                    placeholder="Enter your email"
                    required
                    disabled={subscribe.isPending || success}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={subscribe.isPending || success}
                  className="group relative h-14 w-full overflow-hidden rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:shadow-primary/25 sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {success ? (
                      <>
                        <CheckCircle2 className="size-5" /> Subscribed
                      </>
                    ) : (
                      <>
                        Subscribe <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                </Button>
              </div>
              {subscribe.isError && (
                <p className="mt-3 text-sm text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
