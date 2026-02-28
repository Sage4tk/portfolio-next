"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Full Stack Developer",
  "Mobile Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), 1200);
      return () => clearTimeout(t);
    }

    if (!isDeleting && displayed === current) {
      setIsPaused(true);
      setIsDeleting(true);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const speed = isDeleting ? 40 : 70;
    const t = setTimeout(() => {
      setDisplayed(
        isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, isDeleting, isPaused, roleIndex]);

  return (
    <span className="font-mono text-[var(--accent)] text-xl md:text-2xl tracking-wide">
      {displayed}
      <span className="animate-blink">_</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center grid-bg overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(184,255,71,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Accent corner lines */}
      <div
        className="absolute top-24 right-8 md:right-16 opacity-30 pointer-events-none"
        aria-hidden
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M120 0 L120 120 L0 120" stroke="rgba(184,255,71,0.4)" strokeWidth="1" />
          <path d="M100 0 L100 100 L0 100" stroke="rgba(184,255,71,0.2)" strokeWidth="1" />
        </svg>
      </div>
      <div
        className="absolute bottom-24 left-8 md:left-16 opacity-30 pointer-events-none"
        aria-hidden
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M0 80 L0 0 L80 0" stroke="rgba(71,184,255,0.4)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left: Main content */}
          <div>
            {/* Status badge */}
            <div className="animate-fade-up delay-1 mb-8">
              <span className="status-badge">
                <span className="status-dot" />
                Available for opportunities
              </span>
            </div>

            {/* Location */}
            <div className="animate-fade-up delay-2 mb-4">
              <span className="font-mono text-[var(--muted)] text-sm tracking-widest uppercase">
                Dubai, UAE{" "}
                <img
                  src="https://flagcdn.com/w20/ae.png"
                  alt="UAE"
                  width="16"
                  height="12"
                  className="inline-block ml-1 rounded-sm"
                  style={{ verticalAlign: "middle" }}
                />
              </span>
            </div>

            {/* Name — massive display */}
            <h1
              className="font-display animate-fade-up delay-3"
              style={{
                fontSize: "clamp(4rem, 12vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "0.02em",
                color: "var(--text)",
              }}
            >
              TIMOTHY
              <br />
              <span className="text-gradient">TIMBOL.</span>
            </h1>

            {/* Typewriter role */}
            <div className="animate-fade-up delay-5 mt-6 mb-10">
              <TypewriterRole />
            </div>

            {/* Bio */}
            <p
              className="animate-fade-up delay-6 text-[var(--muted)] leading-relaxed max-w-xl mb-10"
              style={{ fontSize: "1rem" }}
            >
              3 years crafting digital experiences — featured in{" "}
              <span style={{ color: "var(--text)" }}>Gitex</span> &amp;{" "}
              <span style={{ color: "var(--text)" }}>Gulf News</span>. I turn
              complex problems into clean, scalable solutions.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-7 flex flex-wrap gap-4">
              <a href="#work" className="btn-primary">
                View My Work
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="btn-outline">
                Get In Touch
              </a>
            </div>

            {/* Social links */}
            <div className="animate-fade-up delay-8 flex gap-6 mt-10">
              {[
                { label: "GitHub", href: "https://github.com/Sage4tk" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/timothy-zack-timbol-90b5271b6/",
                },
                { label: "Instagram", href: "https://www.instagram.com/cactusz4ck" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-xs"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Stats block */}
          <div className="hidden lg:flex flex-col gap-1 animate-fade-up delay-6">
            <div
              className="grad-border-card p-8"
              style={{ background: "var(--surface)", minWidth: "220px" }}
            >
              <div className="space-y-8">
                <div>
                  <div className="counter-number">
                    <span data-counter="3" data-counter-suffix="+">0</span>
                  </div>
                  <div className="font-mono text-[var(--muted)] text-xs tracking-widest uppercase mt-1">
                    Years Experience
                  </div>
                </div>
                <hr className="divider" />
                <div>
                  <div className="counter-number">
                    <span data-counter="10" data-counter-suffix="+">0</span>
                  </div>
                  <div className="font-mono text-[var(--muted)] text-xs tracking-widest uppercase mt-1">
                    Projects Shipped
                  </div>
                </div>
                <hr className="divider" />
                <div>
                  <div className="counter-number">
                    <span data-counter="2" data-counter-suffix="x">0</span>
                  </div>
                  <div className="font-mono text-[var(--muted)] text-xs tracking-widest uppercase mt-1">
                    Press Features
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats row (mobile) */}
        <div className="lg:hidden mt-12 grid grid-cols-3 gap-4 animate-fade-up delay-9">
          {[
            { value: "3", suffix: "+", label: "Years Exp." },
            { value: "10", suffix: "+", label: "Projects" },
            { value: "2", suffix: "x", label: "Press Features" },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-display text-4xl"
                style={{ color: "var(--text)" }}
              >
                <span data-counter={value} data-counter-suffix={suffix}>
                  0
                </span>
              </div>
              <div className="font-mono text-[var(--muted)] text-xs tracking-widest uppercase mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="animate-fade-up delay-10 mt-16 flex items-center gap-3">
          <div
            className="w-px h-10 animate-float"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-[var(--muted)] text-xs tracking-widest uppercase">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
