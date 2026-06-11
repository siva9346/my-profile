"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        background: scrolled ? "rgba(5,13,26,0.88)" : "rgba(5,13,26,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-heading font-extrabold text-xl logo-gradient tracking-tight"
        >
          SV
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="relative text-sm font-medium transition-colors duration-200 group"
                style={{ color: activeSection === href ? "#00D4FF" : "#6B8CAE" }}
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                  style={{
                    width: activeSection === href ? "100%" : "0%",
                    background: "linear-gradient(90deg, #00D4FF, #0099CC)",
                    boxShadow: "0 0 6px rgba(0,212,255,0.6)",
                  }}
                />
              </button>
            </li>
          ))}
        </ul>

        <a
          href={personalInfo.resumeUrl}
          download
          className="hidden md:inline-flex btn-teal font-heading"
          style={{ minWidth: "140px", height: "42px", fontSize: "14px" }}
        >
          Resume
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden text-[#E8F4FD] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: "rgba(5,13,26,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(0,212,255,0.1)",
            }}
            className="fixed top-0 right-0 h-screen w-72 z-[60] flex flex-col pt-20 px-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-[#6B8CAE] hover:text-[#00D4FF]"
            >
              <X size={22} />
            </button>
            <ul className="flex flex-col gap-6 mb-8">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-lg font-medium w-full text-left transition-colors duration-200"
                    style={{ color: activeSection === href ? "#00D4FF" : "#6B8CAE" }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-teal font-heading"
              style={{ width: "100%", height: "50px", fontSize: "15px" }}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
