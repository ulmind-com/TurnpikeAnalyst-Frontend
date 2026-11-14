import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, PhoneCall, Mail, ChevronDown, CheckCircle2, Globe, Headset, MessageSquare, Briefcase, Building2, ExternalLink } from "lucide-react";
import { Input } from "@turnpike/shared/components/ui/input";
import { Label } from "@turnpike/shared/components/ui/label";
import { Textarea } from "@turnpike/shared/components/ui/textarea";
import { Button } from "@turnpike/shared/components/ui/button";
import { toast } from "sonner";
import { CONTACT_PHONE } from "@/content/site-content";
import { bookCall } from "@turnpike/shared/api/services/leads.api";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { MEGA_MENUS } from "@/components/site/mega-menu-content";

type ContactSearch = { service?: string };

export const Route = createFileRoute("/_site/contact")({
  component: ContactPage,
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    service: search.service as string | undefined,
  }),
});

function ContactPage() {
  const search = Route.useSearch();
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    subject: search.service || "",
    industry: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const servicesList = MEGA_MENUS.services.categories.flatMap(c => c.items);
  const industriesList = MEGA_MENUS.industries.categories.flatMap(c => c.items);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<typeof form> = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format.";
    
    const finalSubject = [form.subject && form.subject !== 'None' ? `Service: ${form.subject}` : '', form.industry && form.industry !== 'None' ? `Industry: ${form.industry}` : ''].filter(Boolean).join(" | ");
    if (!finalSubject) newErrors.subject = "Please select a Service or Industry.";

    if (!form.message.trim()) newErrors.message = "Message is required.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setPending(true);
    bookCall({
      full_name: `${form.first_name} ${form.last_name}`,
      email: form.email,
      phone: form.phone,
      company: form.job_title,
      subject: finalSubject,
      message: form.message,
    }).then(() => {
      setPending(false);
      toast.success("Message sent successfully. We'll be in touch shortly.");
      setForm({ first_name: "", last_name: "", email: "", phone: "", job_title: "", subject: search.service || "", industry: "", message: "" });
    }).catch(() => {
      setPending(false);
      toast.error("Could not submit right now. Please try again.");
    });
  };

  const field = (key: keyof typeof form) => ({
    id: key,
    value: form[key],
    onChange: (event: { target: { value: string } }) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  return (
    <main className="min-h-screen bg-muted/40 relative pb-24 font-sans">
      <style>{`
        .phone-input-container {
          --PhoneInputCountryFlag-borderColor: transparent;
        }
        .phone-input-container .PhoneInputCountry {
          padding-left: 1rem;
          padding-right: 0.5rem;
          margin-right: 0;
          border-right: 1px solid #e2e8f0;
        }
        .PhoneInputInput {
          background: transparent;
          border: none;
          color: #0f172a;
          outline: none;
          margin-left: 0.75rem;
          width: 100%;
          font-size: 0.875rem;
        }
        .PhoneInputInput::placeholder {
          color: #94a3b8;
        }
        .fm-input {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          height: 48px;
          padding-left: 1rem;
          transition: all 0.3s ease;
        }
        .fm-input:focus {
          border-color: var(--color-primary, #10b981);
          box-shadow: 0 0 0 1px var(--color-primary, #10b981);
          background-color: #ffffff;
        }
        .fm-label {
          color: #334155;
          font-weight: 500;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-muted/40 border-b border-border">

        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-8">
                <a href="/" className="hover:text-primary transition-colors">Home</a>
                <span className="h-4 w-4 opacity-50 flex items-center justify-center">›</span>
                <span className="text-foreground">Contact</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
                Let's Build Something <span className="text-primary">Exceptional</span> Together
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Share your project details and our team will get back to you within 24 hours. We're ready to engineer your next big breakthrough.
              </p>
            </div>

            {/* Right Illustration */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-[3rem] transform rotate-3 scale-105" />
              <img 
                src="/images/contact_support_illustration.png" 
                alt="Customer Support Team"
                className="relative z-10 w-full max-w-[450px] drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
          
          {/* Left Column: Value Props */}
          <div className="pt-4 sticky top-32">
            <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">Tell Us What You're Building</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              Whether you need a custom software solution, mobile app, cloud infrastructure, UI/UX design, AI integration, or a dedicated development team — we're here to help transform your ideas into scalable digital products.
            </p>

            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ChevronDown className="w-5 h-5 text-primary -rotate-90" />
                </div>
                <span className="text-foreground font-medium">Expert Consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ChevronDown className="w-5 h-5 text-primary -rotate-90" />
                </div>
                <span className="text-foreground font-medium">Proven Results</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ChevronDown className="w-5 h-5 text-primary -rotate-90" />
                </div>
                <span className="text-foreground font-medium">Scalable Solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ChevronDown className="w-5 h-5 text-primary -rotate-90" />
                </div>
                <span className="text-foreground font-medium">Full Transparency</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-card rounded-2xl shadow-xl shadow-slate-200/50 p-8 sm:p-12 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-8">Let's Connect</h3>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="fm-label">First Name <span className="text-red-500">*</span></Label>
                  <Input {...field("first_name")} placeholder="Your First Name" className="fm-input" />
                  {errors.first_name && <p className="text-xs text-red-500 mt-1">{errors.first_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="fm-label">Last Name</Label>
                  <Input {...field("last_name")} placeholder="Your Last Name" className="fm-input" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="fm-label">Email <span className="text-red-500">*</span></Label>
                  <Input type="email" {...field("email")} placeholder="your.email@example.com" className="fm-input" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="fm-label">Mobile Number</Label>
                  <div className="fm-input p-0 flex items-center overflow-hidden h-12">
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={form.phone}
                      onChange={(v) => {
                        setForm(prev => ({ ...prev, phone: v || "" }));
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      className="w-full phone-input-container h-full"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_title" className="fm-label">Company / Job Title</Label>
                <Input {...field("job_title")} placeholder="Your Company Name" className="fm-input" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <Label htmlFor="subject" className="fm-label">Required Service</Label>
                  <div className="relative">
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, subject: e.target.value }));
                        if (errors.subject) setErrors(prev => ({ ...prev, subject: undefined }));
                      }}
                      className="w-full fm-input appearance-none pr-10 cursor-pointer text-foreground/80 bg-muted/40"
                    >
                      <option value="" disabled hidden>Select Service</option>
                      <option value="None">None</option>
                      {servicesList.map((service, idx) => (
                        <option key={idx} value={service.href.split('/').pop() || service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="industry" className="fm-label">Required Industry</Label>
                  <div className="relative">
                    <select
                      id="industry"
                      value={form.industry}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, industry: e.target.value }));
                        if (errors.subject) setErrors(prev => ({ ...prev, subject: undefined }));
                      }}
                      className="w-full fm-input appearance-none pr-10 cursor-pointer text-foreground/80 bg-muted/40"
                    >
                      <option value="" disabled hidden>Select Industry</option>
                      <option value="None">None</option>
                      {industriesList.map((ind, idx) => (
                        <option key={idx} value={ind.href.split('/').pop() || ind.title}>
                          {ind.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="fm-label">Requirements <span className="text-red-500">*</span></Label>
                <Textarea {...field("message")} placeholder="Briefly describe your project requirements, goals, or challenges..." className="fm-input py-4 min-h-[140px] resize-y bg-muted/40" />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                The information you provide will be used only to respond to your inquiry and discuss your requirements. By submitting this form, you consent to being contacted via email or phone.
              </p>

              <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 font-bold rounded-lg shadow-lg shadow-primary/25 transition-all mt-6">
                {pending ? "Submitting..." : "Send Message"}
              </Button>
            </form>
          </div>

        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-foreground font-bold mb-2">General Enquiries</h4>
            <a href={`tel:${CONTACT_PHONE}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">{CONTACT_PHONE}</a>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-foreground font-bold mb-2">Send your Resume</h4>
            <a href="mailto:careers@turnpikeanalyst.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">careers@turnpikeanalyst.com</a>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-foreground font-bold mb-2">Sales Email</h4>
            <a href="mailto:sales@turnpikeanalyst.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">sales@turnpikeanalyst.com</a>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-foreground font-bold mb-2">General Email</h4>
            <a href="mailto:info@turnpikeanalyst.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">info@turnpikeanalyst.com</a>
          </div>
        </div>
      </div>

    </main>
  );
}
