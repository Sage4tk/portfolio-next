"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = ["work", "about", "skills", "contact"] as const;

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(3,3,3,0.8)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "64px",
            }}
          >
            {/* Logo */}
            <span
              className="font-mono"
              style={{ color: "var(--text)", fontSize: "0.85rem", letterSpacing: "0.05em" }}
            >
              <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
              timothy<span style={{ color: "var(--accent)" }}>.</span>dev
            </span>

            {/* Desktop links */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
              className="nav-desktop-links"
            >
              {NAV_LINKS.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="nav-link"
                  style={{ textTransform: "capitalize" }}
                >
                  {section}
                </a>
              ))}
            </div>

            {/* Burger button — mobile only */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="nav-burger"
              style={{
                display: "none",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "var(--text)",
                  transition: "transform 0.25s, opacity 0.25s",
                  transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "var(--text)",
                  transition: "opacity 0.25s",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "var(--text)",
                  transition: "transform 0.25s, opacity 0.25s",
                  transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="nav-mobile-drawer"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 49,
          background: "rgba(3,3,3,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      >
        {NAV_LINKS.map((section, i) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={handleLinkClick}
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 4rem)",
              color: "var(--text)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              padding: "0.5rem 1rem",
              transition: "color 0.2s",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              transitionDelay: open ? `${i * 60}ms` : "0ms",
              transitionProperty: "opacity, transform, color",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
            }}
          >
            {section}
          </a>
        ))}
      </div>
    </>
  );
}
