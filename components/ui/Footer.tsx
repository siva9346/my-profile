"use client";

import { Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer
      className="py-10 text-center"
      style={{ borderTop: "1px solid rgba(0,212,255,0.08)", background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-5">
        <div className="flex items-center gap-5">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "#3A5570" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3A5570")}
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "#3A5570" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3A5570")}
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "#3A5570" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3A5570")}
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
        <p style={{ color: "#3A5570", fontSize: "14px" }}>
          © 2026 <span style={{ color: "#6B8CAE" }}>{personalInfo.name}</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
