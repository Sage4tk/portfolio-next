import { getFeaturedProjects } from "@/services/projectService";
import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsSection() {
  let projects: Project[];

  try {
    projects = await getFeaturedProjects();
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    projects = [];
  }

  if (projects.length === 0) {
    return (
      <section
        id="work"
        style={{
          padding: "8rem 1.5rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "1rem" }}>
            <span className="section-label">Featured Work</span>
          </div>
          <h2
            className="font-display reveal"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--text)",
              marginBottom: "4rem",
              letterSpacing: "0.02em",
            }}
          >
            SELECTED PROJECTS
          </h2>
          <div
            className="reveal"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "4rem",
              textAlign: "center",
              background: "var(--surface)",
            }}
          >
            <div
              className="font-mono"
              style={{
                color: "var(--muted)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Coming Soon
            </div>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              Exciting projects are being prepared for showcase.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      style={{
        padding: "8rem 1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div className="reveal" style={{ marginBottom: "1rem" }}>
              <span className="section-label">Featured Work</span>
            </div>
            <h2
              className="font-display reveal"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--text)",
                letterSpacing: "0.02em",
              }}
            >
              SELECTED PROJECTS
            </h2>
          </div>

          <Link
            href="/projects"
            className="reveal btn-outline"
            style={{ fontSize: "0.8rem" }}
          >
            View All
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div
          className="reveal-group"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="reveal"
              style={{ transitionDelay: `${idx * 0.06}s` }}
            >
            <Link
              href={`/projects/${project.id}`}
              className="project-card"
              data-tilt
              style={{
                display: "block",
                textDecoration: "none",
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
                    style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, rgba(184,255,71,0.08) 0%, rgba(71,184,255,0.08) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="font-display"
                      style={{
                        fontSize: "3rem",
                        color: "var(--muted-2)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {project.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Overlay on hover */}
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
                {/* Tech tags */}
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}
                >
                  {project.techStack.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="tech-tag">+{project.techStack.length - 3}</span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "0.5rem",
                    transition: "color 0.2s",
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
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--accent)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
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
                    style={{ transition: "transform 0.2s" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
