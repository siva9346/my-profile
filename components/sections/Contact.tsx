"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { fadeUp, slideLeft, slideRight, viewportConfig } from "@/lib/animations";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    window.open(`mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  const contactItems = [
    { icon: Mail,  label: "Email",    value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: "Phone",    value: personalInfo.phone,    href: `tel:+916385599822` },
    { icon: MapPin,label: "Location", value: personalInfo.location, href: "#" },
  ];

  return (
    <section id="contact" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-medium text-xs tracking-[0.25em] uppercase mb-3 text-center"
          style={{ color: "#00D4FF" }}
        >
          Get In Touch
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-extrabold text-center mb-4 heading-gradient"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.02em" }}
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="text-center max-w-xl mx-auto mb-14 text-base"
          style={{ color: "#6B8CAE" }}
        >
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewportConfig}
            className="space-y-5"
          >
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 glass-card p-4 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
                >
                  <Icon size={16} style={{ color: "#00D4FF" }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "#3A5570" }}>{label}</p>
                  <p className="text-sm transition-colors duration-200" style={{ color: "#E8F4FD" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#E8F4FD")}
                  >
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social row */}
            <div className="flex gap-3 pt-1">
              {[
                { href: personalInfo.linkedin, Icon: LinkedInIcon, label: "LinkedIn" },
                { href: personalInfo.github,   Icon: GitHubIcon,   label: "GitHub" },
                { href: `mailto:${personalInfo.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    border: "1px solid rgba(0,212,255,0.18)",
                    color: "#6B8CAE",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00D4FF";
                    e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6B8CAE";
                    e.currentTarget.style.borderColor = "rgba(0,212,255,0.18)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={slideRight} initial="hidden" whileInView="visible" viewport={viewportConfig}
          >
            <form onSubmit={handleSubmit} className="glass-card p-7 space-y-5" noValidate>
              {sent && (
                <div
                  className="text-sm px-4 py-3 rounded-lg"
                  style={{ color: "#4ade80", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}
                >
                  Message composed! Your email client should open automatically.
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name"  id="name"  placeholder="Your name"      value={form.name}    error={errors.name}    onChange={(v) => { setForm({...form,name:v});    setErrors({...errors,name:""}); }} />
                <Field label="Email" id="email" type="email" placeholder="your@email.com" value={form.email}   error={errors.email}   onChange={(v) => { setForm({...form,email:v});   setErrors({...errors,email:""}); }} />
              </div>
              <Field label="Subject" id="subject" placeholder="What's this about?" value={form.subject} error={errors.subject} onChange={(v) => { setForm({...form,subject:v}); setErrors({...errors,subject:""}); }} />
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider mb-1.5 text-left" style={{ color: "#6B8CAE" }}>
                  Message
                </label>
                <textarea
                  id="message" rows={5} placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => { setForm({...form,message:e.target.value}); setErrors({...errors,message:""}); }}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                  style={{
                    background: "rgba(5,13,26,0.8)",
                    border: errors.message ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(0,212,255,0.12)",
                    color: "#E8F4FD",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00D4FF")}
                  onBlur={(e) => (e.target.style.borderColor = errors.message ? "rgba(239,68,68,0.5)" : "rgba(0,212,255,0.12)")}
                />
                {errors.message && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.message}</p>}
              </div>
              <button type="submit" className="btn-teal w-full font-heading">
                <Send size={15} /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string; id: string; type?: string; placeholder: string;
  value: string; error?: string; onChange: (v: string) => void;
}
function Field({ label, id, type = "text", placeholder, value, error, onChange }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wider mb-1.5 text-left" style={{ color: "#6B8CAE" }}>
        {label}
      </label>
      <input
        type={type} id={id} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
        style={{
          background: "rgba(5,13,26,0.8)",
          border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(0,212,255,0.12)",
          color: "#E8F4FD",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#00D4FF")}
        onBlur={(e) => (e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(0,212,255,0.12)")}
      />
      {error && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{error}</p>}
    </div>
  );
}
