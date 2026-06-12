"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { personalInfo } from "@/lib/data";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const GHIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LIIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const inp: React.CSSProperties = { width: "100%", background: "rgba(7,18,36,0.55)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 8, padding: "13px 15px", color: "var(--text)", fontSize: 14, outline: "none", transition: "border-color 0.2s" };

  return (
    <section id="section-contact" style={{ minHeight: "100vh", background: "transparent", padding: "clamp(60px,8vw,100px) clamp(24px,8vw,120px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ marginBottom: 56 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 12, marginBottom: 10 }}>06 / Contact</p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>Get In Touch</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 14, maxWidth: 500 }}>Open to full-time roles, freelance projects, and interesting AI collaborations.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56 }} className="contact-grid">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: <Mail size={17} />,   label: "Email",    value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
              { icon: <Phone size={17} />,  label: "Phone",    value: personalInfo.phone,    href: `tel:${personalInfo.phone.replace(/\s/g,"")}` },
              { icon: <MapPin size={17} />, label: "Location", value: personalInfo.location, href: "" },
            ].map((c) => (
              <motion.div key={c.label} variants={staggerItem} className="glass-card" style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ color: "var(--cyan)" }}>{c.icon}</div>
                <div>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.label}</p>
                  {c.href ? <a href={c.href} style={{ color: "var(--text)", fontSize: 13, textDecoration: "none" }} onMouseEnter={(e)=>(e.currentTarget.style.color="var(--cyan)")} onMouseLeave={(e)=>(e.currentTarget.style.color="var(--text)")}>{c.value}</a>
                          : <p style={{ color: "var(--text)", fontSize: 13 }}>{c.value}</p>}
                </div>
              </motion.div>
            ))}
            <motion.div variants={staggerItem} style={{ display: "flex", gap: 10 }}>
              {[{href:personalInfo.github, Icon: GHIcon, label:"GitHub"},{href:personalInfo.linkedin, Icon: LIIcon, label:"LinkedIn"}].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="glass-card"
                  style={{ padding: "9px 18px", display: "flex", alignItems: "center", gap: 7, color: "var(--text-muted)", textDecoration: "none", fontSize: 12, fontWeight: 500, transition: "color 0.2s" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color="var(--cyan)")} onMouseLeave={(e)=>(e.currentTarget.style.color="var(--text-muted)")}>
                  <s.Icon />{s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.form variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
            onSubmit={(e) => { e.preventDefault(); window.location.href=`mailto:${personalInfo.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}`; }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input type="text" placeholder="Your Name" required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} style={inp} onFocus={(e)=>(e.currentTarget.style.borderColor="rgba(0,212,255,0.5)")} onBlur={(e)=>(e.currentTarget.style.borderColor="rgba(0,212,255,0.15)")} />
            <input type="email" placeholder="Your Email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} style={inp} onFocus={(e)=>(e.currentTarget.style.borderColor="rgba(0,212,255,0.5)")} onBlur={(e)=>(e.currentTarget.style.borderColor="rgba(0,212,255,0.15)")} />
            <textarea placeholder="Your Message" required rows={5} value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} style={{...inp,resize:"vertical",minHeight:110}} onFocus={(e)=>(e.currentTarget.style.borderColor="rgba(0,212,255,0.5)")} onBlur={(e)=>(e.currentTarget.style.borderColor="rgba(0,212,255,0.15)")} />
            <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}><Send size={15} /> Send Message</button>
          </motion.form>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 80, paddingTop: 28, borderTop: "1px solid rgba(0,212,255,0.07)" }}>
        <p style={{ color: "var(--text-muted)", fontSize: 12 }}>© 2026 Sivaprasath V. All rights reserved.</p>
      </div>

    </section>
  );
}
