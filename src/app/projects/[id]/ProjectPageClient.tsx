"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ClientAnimations from "@/components/ClientAnimations";

interface ProjectPageClientProps {
  project: Project;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const router = useRouter();
  const [contactOpen, setContactOpen] = useState(false);

  const formattedDate = project.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(project.createdAt))
    : null;

  const updatedDate =
    project.updatedAt &&
    project.createdAt &&
    new Date(project.updatedAt).getTime() !== new Date(project.createdAt).getTime()
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }).format(new Date(project.updatedAt))
      : null;

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <ClientAnimations />

      {/* ── Nav ─────────────────────────────────────────── */}
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
          background: "rgba(3,3,3,0.85)",
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
            {/* Breadcrumb */}
            <div
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                className="nav-link"
              >
                timothy.dev
              </Link>
              <span style={{ color: "var(--muted-2)" }}>/</span>
              <Link
                href="/projects"
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                className="nav-link"
              >
                projects
              </Link>
              <span style={{ color: "var(--muted-2)" }}>/</span>
              <span
                style={{
                  color: "var(--text)",
                  maxWidth: "160px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {project.title}
              </span>
            </div>

            <button
              onClick={() => router.push("/projects")}
              className="btn-outline"
              style={{
                fontSize: "0.8rem",
                padding: "0.5rem 1.25rem",
                border: "1px solid var(--border)",
              }}
            >
              <svg
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All Projects
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "64px",
          position: "relative",
          overflow: "hidden",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Background image or gradient */}
        {project.imageUrl ? (
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
              style={{ filter: "brightness(0.35)" }}
            />
          </div>
        ) : (
          <div
            className="grid-bg"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(184,255,71,0.04) 0%, rgba(71,184,255,0.04) 100%)",
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, var(--bg) 0%, rgba(3,3,3,0.6) 40%, rgba(3,3,3,0.1) 100%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
            width: "100%",
          }}
        >
          {/* Category / type label */}
          <div className="animate-fade-up delay-1" style={{ marginBottom: "1.25rem" }}>
            <span className="section-label">Project</span>
          </div>

          {/* Title */}
          <h1
            className="font-display animate-fade-up delay-2"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              marginBottom: "2rem",
              maxWidth: "900px",
            }}
          >
            {project.title.toUpperCase()}
          </h1>

          {/* Tech stack */}
          <div
            className="animate-fade-up delay-3"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
          >
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────── */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 1.5rem 8rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
          }}
        >
          {/* Left: Description + Links */}
          <div style={{ maxWidth: "720px" }}>
            <div className="reveal" style={{ marginBottom: "0.75rem" }}>
              <span className="section-label">Overview</span>
            </div>

            <div
              className="reveal"
              style={{
                color: "var(--muted)",
                lineHeight: 1.9,
                fontSize: "1.05rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {project.description}
            </div>

            {/* Action buttons */}
            {(project.liveUrl || project.githubUrl) && (
              <div
                className="reveal"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.875rem",
                  marginTop: "2.5rem",
                }}
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    View Live Site
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Project metadata card */}
          <div className="reveal">
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                overflow: "hidden",
                maxWidth: "720px",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--muted)",
                  }}
                >
                  Project Details
                </span>
              </div>

              {/* Rows */}
              <div>
                {/* Tech stack */}
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderBottom: "1px solid var(--border)",
                    display: "grid",
                    gridTemplateColumns: "130px 1fr",
                    gap: "1rem",
                    alignItems: "start",
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--muted)",
                      paddingTop: "2px",
                    }}
                  >
                    Tech Stack
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date created */}
                {formattedDate && (
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      borderBottom: "1px solid var(--border)",
                      display: "grid",
                      gridTemplateColumns: "130px 1fr",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--muted)",
                      }}
                    >
                      Created
                    </span>
                    <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>
                      {formattedDate}
                    </span>
                  </div>
                )}

                {/* Date updated */}
                {updatedDate && (
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      borderBottom: "1px solid var(--border)",
                      display: "grid",
                      gridTemplateColumns: "130px 1fr",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--muted)",
                      }}
                    >
                      Updated
                    </span>
                    <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>
                      {updatedDate}
                    </span>
                  </div>
                )}

                {/* Hosting */}
                {project.websiteLocation && (
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      display: "grid",
                      gridTemplateColumns: "130px 1fr",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--muted)",
                      }}
                    >
                      Hosted On
                    </span>
                    <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>
                      {project.websiteLocation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── CTA ───────────────────────────────────────── */}
          <div className="reveal" style={{ maxWidth: "720px" }}>
            <div
              style={{
                padding: "3rem",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--surface)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, var(--accent), transparent)",
                }}
              />

              <div className="section-label" style={{ marginBottom: "1.25rem" }}>
                Work Together
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  lineHeight: 1.0,
                  letterSpacing: "0.02em",
                  marginBottom: "1rem",
                }}
              >
                LIKE WHAT YOU SEE?
                <br />
                <span className="text-gradient">LET&apos;S TALK.</span>
              </h3>

              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                  fontSize: "0.95rem",
                }}
              >
                I&apos;m always open to exciting new projects and opportunities.
                Let&apos;s build something great together.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
                <button
                  onClick={() => setContactOpen(true)}
                  className="btn-primary"
                >
                  Get In Touch
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => router.push("/#work")}
                  className="btn-outline"
                >
                  More Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2.5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            className="font-mono"
            style={{ color: "var(--muted)", fontSize: "0.75rem" }}
          >
            © 2025 Timothy Zack Timbol
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="nav-link font-mono"
                style={{ fontSize: "0.75rem" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Contact Modal ────────────────────────────────── */}
      {contactOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "1.5rem",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setContactOpen(false);
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              maxWidth: "540px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "2.5rem",
              position: "relative",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent-2))",
                borderRadius: "8px 8px 0 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2rem",
              }}
            >
              <div>
                <div className="section-label" style={{ marginBottom: "0.5rem" }}>
                  Contact
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.75rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  GET IN TOUCH
                </h3>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "0.375rem",
                  color: "var(--muted)",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <ContactForm />
          </div>
        </div>
      )}
    </div>
  );
}
