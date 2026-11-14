import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useSubmitSupportTicket } from '@turnpike/shared/hooks/use-api';
import { CheckCircle, AlertCircle, Loader2, Send, Headphones, Clock, Shield } from 'lucide-react';

export const Route = createFileRoute('/_site/software-support')({
  component: SoftwareSupportComponent,
});

function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(value * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}</span>;
}

function SoftwareSupportComponent() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useSubmitSupportTicket();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.first_name.trim()) e.first_name = 'First name is required';
    if (!form.last_name.trim()) e.last_name = 'Last name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    mutation.mutate(form, {
      onSuccess: () => setSubmitted(true),
    });
  };

  const inputClass = (field: string) =>
    `w-full bg-white border ${errors[field] ? 'border-red-400 ring-1 ring-red-300' : 'border-emerald-100'} rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#10B981] outline-none shadow-sm transition-all`;

  return (
    <main className="min-h-screen bg-[#ecfdf5] text-slate-900 overflow-hidden relative pb-32">
      {/* Background Shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-10 lg:left-32 top-1/3 w-32 h-32 bg-[#FFD166] rounded-full mix-blend-multiply opacity-30 blur-md"
      />
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute right-10 lg:right-32 top-1/4 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-[#118AB2] opacity-30 mix-blend-multiply"
        style={{ transform: 'rotate(15deg)' }}
      />
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-[radial-gradient(#10b981_4px,transparent_4px)] bg-[size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            <Headphones className="w-4 h-4" />
            Software Support
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            Say hello, on our support
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our dedicated support team is ready to help. Fill in the form below and we'll get back to you within 8 business hours.
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-500">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-500" /> 8-hour SLA response</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> Enterprise-grade support</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 99.9% resolution rate</span>
          </div>
        </div>

        {/* Form card */}
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-8 lg:p-12 rounded-3xl border border-emerald-100 shadow-xl">
          {submitted ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Ticket Submitted!</h2>
              <p className="text-slate-600 mb-2 text-lg">
                Thanks <strong>{form.first_name}</strong>! We've received your support request.
              </p>
              <p className="text-slate-500 mb-8">
                Our team will respond to <strong>{form.email}</strong> within 8 business hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ first_name: '', last_name: '', email: '', subject: '', message: '' }); }}
                className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-3 px-8 rounded-full transition-all hover:scale-105"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6 bg-transparent">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="First Name *"
                    className={inputClass('first_name')}
                  />
                  {errors.first_name && <p className="text-red-500 text-sm mt-1 ml-2">{errors.first_name}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Last Name *"
                    className={inputClass('last_name')}
                  />
                  {errors.last_name && <p className="text-red-500 text-sm mt-1 ml-2">{errors.last_name}</p>}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject *"
                  className={inputClass('subject')}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1 ml-2">{errors.subject}</p>}
              </div>

              <div>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message * (describe your issue in detail)"
                  className={`${inputClass('message')} rounded-2xl resize-none`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1 ml-2">{errors.message}</p>}
              </div>

              {mutation.isError && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">Failed to submit. Please try again or email us directly at support@turnpikeanalyst.com</p>
                </div>
              )}

              <div className="pt-4 text-left">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="inline-flex items-center gap-3 bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 tracking-wide shadow-md hover:shadow-lg"
                >
                  {mutation.isPending ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Submit Ticket</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#8338EC] rounded-2xl p-10 text-center text-white shadow-xl hover:-translate-y-2 transition-transform">
            <div className="text-4xl font-bold mb-3"><AnimatedCounter value={25} />+</div>
            <div className="text-sm font-semibold tracking-widest uppercase opacity-90">Total Products</div>
          </motion.div>
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#0096FF] rounded-2xl p-10 text-center text-white shadow-xl hover:-translate-y-2 transition-transform">
            <div className="text-4xl font-bold mb-3"><AnimatedCounter value={571} />+</div>
            <div className="text-sm font-semibold tracking-widest uppercase opacity-90">Happy Users</div>
          </motion.div>
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#FF4D85] rounded-2xl p-10 text-center text-white shadow-xl hover:-translate-y-2 transition-transform">
            <div className="text-4xl font-bold mb-3"><AnimatedCounter value={24} />K</div>
            <div className="text-sm font-semibold tracking-widest uppercase opacity-90">Happy Moments</div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
