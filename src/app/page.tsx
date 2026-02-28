import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import ClientAnimations from "@/components/ClientAnimations";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

const SKILLS = [
  { name: "React", abbr: "⚛", color: "#61dafb", category: "Frontend" },
  { name: "Next.js", abbr: "▲", color: "#ffffff", category: "Frontend" },
  { name: "TypeScript", abbr: "TS", color: "#3178c6", category: "Language" },
  { name: "React Native", abbr: "RN", color: "#61dafb", category: "Mobile" },
  { name: "Tailwind CSS", abbr: "TW", color: "#38bdf8", category: "Styling" },
  { name: "Node.js", abbr: "⬢", color: "#6cc24a", category: "Backend" },
  { name: "Firebase", abbr: "🔥", color: "#ffca28", category: "Backend" },
  { name: "Supabase", abbr: "⚡", color: "#3ecf8e", category: "Backend" },
  { name: "AWS", abbr: "☁", color: "#ff9900", category: "Cloud" },
  { name: "Google Cloud", abbr: "G", color: "#4285f4", category: "Cloud" },
  { name: "SQL", abbr: "SQL", color: "#00758f", category: "Database" },
  { name: "NoSQL", abbr: "{}", color: "#4db33d", category: "Database" },
];

const ABOUT_FACTS = [
  { label: "Based in", value: "Dubai, UAE 🇦🇪" },
  { label: "Experience", value: "3+ Years" },
  { label: "Featured in", value: "Gitex & Gulf News" },
  { label: "Focus", value: "Web & Mobile" },
];

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)" }}>
      <ClientAnimations />

      {/* ── Navigation ──────────────────────────────────── */}
      <NavBar />

      {/* ── Hero ────────────────────────────────────────── */}
      <Hero />

      {/* ── Featured Work ───────────────────────────────── */}
      <ProjectsSection />

      {/* ── About ───────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: "8rem 1.5rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "1rem" }}>
            <span className="section-label">Who I Am</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* Statement */}
            <div>
              <h2
                className="font-display reveal"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  lineHeight: 1.0,
                  color: "var(--text)",
                  marginBottom: "2rem",
                  letterSpacing: "0.02em",
                }}
              >
                I BUILD
                <br />
                DIGITAL
                <br />
                <span className="text-gradient">EXPERIENCES</span>
                <br />
                THAT MATTER.
              </h2>

              <p
                className="reveal"
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                  maxWidth: "42ch",
                }}
              >
                I&apos;m a passionate developer with 3 years of experience
                crafting beautiful, performant web and mobile applications. My
                work has been featured at prestigious events like{" "}
                <strong style={{ color: "var(--text)" }}>Gitex</strong> and
                covered by{" "}
                <strong style={{ color: "var(--text)" }}>Gulf News</strong>,
                demonstrating real impact in the tech industry.
              </p>

              <p
                className="reveal"
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                  maxWidth: "42ch",
                  marginTop: "1.25rem",
                }}
              >
                I believe great software isn&apos;t just functional — it&apos;s
                elegant, fast, and a pleasure to use. Every line of code I write
                reflects that philosophy.
              </p>
            </div>

            {/* Fact grid */}
            <div>
              <div
                className="reveal-group"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1px",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {ABOUT_FACTS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="reveal"
                    style={{
                      padding: "1.75rem",
                      background: "var(--surface)",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ color: "var(--text)", fontWeight: 500 }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured in badges */}
              <div className="reveal" style={{ marginTop: "1.5rem" }}>
                <div
                  className="font-mono"
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: "0.75rem",
                  }}
                >
                  As seen in
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {["Gitex Global", "Gulf News"].map((badge) => (
                    <span
                      key={badge}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "0.375rem 0.875rem",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        color: "var(--text)",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--accent)",
                          display: "inline-block",
                        }}
                      />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────── */}
      <section
        id="skills"
        style={{
          padding: "8rem 1.5rem",
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "1rem" }}>
            <span className="section-label">Expertise</span>
          </div>
          <h2
            className="font-display reveal"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--text)",
              marginBottom: "3.5rem",
              letterSpacing: "0.02em",
            }}
          >
            TECHNOLOGIES I WORK WITH
          </h2>

          <div
            className="reveal-group"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {SKILLS.map(({ name, abbr, color, category }) => (
              <div key={name} className="reveal">
                <div className="skill-card" data-tilt>
                  {/* Category badge */}
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--muted)",
                      marginBottom: "0.875rem",
                    }}
                  >
                    {category}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      color: color,
                      marginBottom: "0.875rem",
                      fontFamily: "var(--font-space-mono), monospace",
                    }}
                  >
                    {abbr}
                  </div>

                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      color: "var(--text)",
                    }}
                  >
                    {name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech marquee */}
          <div
            className="reveal"
            style={{
              marginTop: "4rem",
              overflow: "hidden",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              padding: "1.25rem 0",
            }}
          >
            <div
              className="animate-marquee"
              style={{
                display: "flex",
                gap: "3rem",
                width: "max-content",
                alignItems: "center",
              }}
            >
              {[...SKILLS, ...SKILLS].map(({ name, color }, i) => (
                <span
                  key={`${name}-${i}`}
                  className="font-mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: color,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: "8rem 1.5rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "1rem" }}>
            <span className="section-label">Get In Touch</span>
          </div>
          <h2
            className="font-display reveal"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              lineHeight: 1.0,
              color: "var(--text)",
              marginBottom: "1.5rem",
              letterSpacing: "0.02em",
            }}
          >
            LET&apos;S BUILD
            <br />
            <span className="text-gradient">SOMETHING</span>
            <br />
            TOGETHER.
          </h2>
          <p
            className="reveal"
            style={{
              color: "var(--muted)",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            Have a project in mind? I&apos;d love to hear about it. Send me a
            message and let&apos;s discuss how I can help bring your ideas to
            life.
          </p>
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2.5rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
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
                className="nav-link font-mono"
                style={{ fontSize: "0.75rem" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
