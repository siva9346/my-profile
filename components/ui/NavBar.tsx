"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/lib/data";

const NAV_ITEMS = [
  { label: "About",      href: "#section-about"      },
  { label: "Skills",     href: "#section-skills"     },
  { label: "Experience", href: "#section-experience" },
  { label: "Projects",   href: "#section-projects"   },
  { label: "Education",  href: "#section-education"  },
  { label: "Contact",    href: "#section-contact"    },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    // Slight delay lets the overlay animate out before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Full-screen overlay portal — rendered directly into document.body so it
  // sits in the root stacking context and nothing can paint over it except
  // the custom cursor (z-index 99999).
  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav-overlay"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(5,13,26,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Top bar inside overlay */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderBottom: "1px solid rgba(0,212,255,0.08)",
          }}>
            <span
              className="logo-gradient"
              style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "var(--font-space)" }}
            >
              SV
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                background: "none",
                border: "1px solid rgba(0,212,255,0.3)",
                borderRadius: 6,
                padding: 6,
                cursor: "pointer",
                color: "var(--cyan)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation links — vertically centered */}
          <nav
            aria-label="Mobile navigation"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%", padding: "0 24px" }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.055, duration: 0.28, ease: "easeOut" }}
                onClick={() => handleNav(item.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text)",
                  fontSize: "clamp(22px,5vw,28px)",
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                  fontFamily: "var(--font-space)",
                  padding: "14px 32px",
                  width: "100%",
                  maxWidth: 360,
                  textAlign: "center",
                  borderRadius: 10,
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--cyan)";
                  e.currentTarget.style.background = "rgba(0,212,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.background = "none";
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Resume CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.28, ease: "easeOut" }}
            style={{ marginTop: 32, padding: "0 24px", width: "100%", maxWidth: 408 }}
          >
            <a
              href={personalInfo.resume}
              download="Sivaprasath_V_Resume.pdf"
              className="btn-primary"
              style={{ width: "100%", maxWidth: "100%" }}
              onClick={() => setOpen(false)}
            >
              Download Resume
            </a>
          </motion.div>

          {/* Subtle grid decoration */}
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,212,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,102,255,0.04) 0%, transparent 50%)",
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(5,13,26,0.92)" : "rgba(5,13,26,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
          transition: "background 0.3s",
        }}
      >
        <nav
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,60px)",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              className="logo-gradient"
              style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "var(--font-space)" }}
            >
              SV
            </span>
          </Link>

          {/* Desktop links */}
          <ul style={{ display: "flex", alignItems: "center", gap: 32, listStyle: "none" }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href} style={{ display: "none" }} className="nav-desktop-item">
                <button
                  onClick={() => handleNav(item.href)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-muted)", fontSize: 14, fontWeight: 500,
                    letterSpacing: "0.02em", transition: "color 0.2s", padding: "4px 0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="nav-desktop-item" style={{ display: "none" }}>
              <a
                href={personalInfo.resume}
                download="Sivaprasath_V_Resume.pdf"
                className="btn-outline"
                style={{ minWidth: 100, height: 36, fontSize: 13 }}
              >
                Resume
              </a>
            </li>

            {/* Mobile hamburger */}
            <li className="nav-mobile-btn">
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                style={{
                  background: "none",
                  border: "1px solid rgba(0,212,255,0.3)",
                  borderRadius: 6,
                  padding: 6,
                  cursor: "pointer",
                  color: "var(--cyan)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Menu size={20} />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Overlay rendered via portal into document.body — escapes all parent
          stacking contexts, guaranteed to cover the entire viewport. */}
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
