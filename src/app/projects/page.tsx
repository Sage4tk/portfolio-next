"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjects } from "@/services/projectService";
import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import ClientAnimations from "@/components/ClientAnimations";

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
            <Link href="/" style={{ textDecoration: "none" }}>
              <span
                className="font-mono"
                style={{
                  color: "var(--text)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                }}
              >
                <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                timothy<span style={{ color: "var(--accent)" }}>.</span>dev
              </span>
            </Link>

            <button
              onClick={() => router.push("/")}
              className="btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem", border: "1px solid var(--border)" }}
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
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* ── Header ──────────────────────────────────────── */}
      <section
        className="grid-bg"
        style={{
          paddingTop: "140px",
          paddingBottom: "5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(184,255,71,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
          <div className="animate-fade-up delay-1" style={{ marginBottom: "1.25rem" }}>
            <span className="section-label">Portfolio</span>
          </div>

          <h1
            className="font-display animate-fade-up delay-2"
            style={{
              fontSize: "clamp(4rem, 12vw, 8.5rem)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              marginBottom: "2rem",
            }}
          >
            ALL
            <br />
            <span className="text-gradient">PROJECTS.</span>
          </h1>

          <div
            className="animate-fade-up delay-3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {!loading && (
              <span
                className="font-mono"
                style={{
                  color: "var(--muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {projects.length} {projects.length === 1 ? "project" : "projects"}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem 8rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {loading ? (
            // Dark skeleton
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    opacity: 1 - i * 0.1,
                  }}
                >
                  <div
                    style={{
                      height: "220px",
                      background: "var(--surface-2)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
                        animation: "marquee 1.5s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.375rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {[60, 80, 50].map((w, j) => (
                        <div
                          key={j}
                          style={{
                            height: "20px",
                            width: `${w}px`,
                            background: "var(--surface-2)",
                            borderRadius: "3px",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        height: "20px",
                        background: "var(--surface-2)",
                        borderRadius: "4px",
                        marginBottom: "0.625rem",
                      }}
                    />
                    <div
                      style={{
                        height: "14px",
                        background: "var(--surface-2)",
                        borderRadius: "4px",
                        width: "70%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            // Empty state
            <div
              style={{
                textAlign: "center",
                padding: "6rem 2rem",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--surface)",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "var(--muted-2)",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                }}
              >
                NO PROJECTS YET.
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  marginBottom: "2rem",
                  fontSize: "0.95rem",
                }}
              >
                Projects will appear here as they are added.
              </p>
              <button onClick={() => router.push("/")} className="btn-primary">
                Back to Portfolio
              </button>
            </div>
          ) : (
            // Projects list — use animate-fade-up (not reveal) because cards render
            // after async fetch; the IntersectionObserver runs before data loads.
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="project-card"
                    style={{ display: "block", textDecoration: "none" }}
                    onMouseMove={(e) => {
                      const card = e.currentTarget as HTMLAnchorElement;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
                      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
                      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.transform =
                        "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        height: "220px",
                        overflow: "hidden",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(135deg, rgba(184,255,71,0.06) 0%, rgba(71,184,255,0.06) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            className="font-display"
                            style={{ fontSize: "3.5rem", color: "var(--muted-2)", letterSpacing: "0.05em" }}
                          >
                            {project.title.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(3,3,3,0.7) 0%, transparent 50%)",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div style={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.375rem",
                          marginBottom: "0.875rem",
                        }}
                      >
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="tech-tag">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          color: "var(--text)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {project.title}
                      </h3>

                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: "0.875rem",
                          lineHeight: 1.7,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {project.description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "var(--accent)",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            fontFamily: "var(--font-space-mono), monospace",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          View Project
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M5 12h14M12 5l7 7-7 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        {project.createdAt && (
                          <span
                            className="font-mono"
                            style={{ color: "var(--muted)", fontSize: "0.65rem" }}
                          >
                            {new Date(project.createdAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "short" }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
          <button
            onClick={() => router.push("/")}
            className="nav-link font-mono"
            style={{
              fontSize: "0.75rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            ← Portfolio
          </button>
        </div>
      </footer>
    </div>
  );
}
