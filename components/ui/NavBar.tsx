"use client";
import { useState, useEffect } from "react";
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
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            listStyle: "none",
          }}
        >
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
              style={{
                background: "none",
                border: "1px solid rgba(0,212,255,0.3)",
                borderRadius: 6, padding: "6px",
                cursor: "pointer", color: "var(--cyan)",
              }}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              top: 64, right: 0, bottom: 0,
              width: "75vw", maxWidth: 320,
              background: "rgba(5,13,26,0.97)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(0,212,255,0.12)",
              padding: "32px 24px",
              display: "flex", flexDirection: "column", gap: 24,
              zIndex: 99,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text)", fontSize: 18, fontWeight: 600,
                  textAlign: "left", padding: "8px 0",
                  borderBottom: "1px solid rgba(0,212,255,0.08)",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </button>
            ))}
            <a
              href={personalInfo.resume}
              download="Sivaprasath_V_Resume.pdf"
              className="btn-primary"
              style={{ marginTop: 8 }}
              onClick={() => setOpen(false)}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
