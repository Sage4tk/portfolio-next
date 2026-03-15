export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes ld-scan {
          0%   { top: -2px; opacity: 0.8; }
          100% { top: 100%; opacity: 0.2; }
        }
        @keyframes ld-progress {
          0%   { width: 0%;   opacity: 1; }
          85%  { width: 95%;  opacity: 1; }
          95%  { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes ld-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes ld-glow {
          0%, 100% {
            filter: drop-shadow(0 0 18px rgba(184,255,71,0.45))
                    drop-shadow(0 0 50px rgba(184,255,71,0.12));
          }
          50% {
            filter: drop-shadow(0 0 32px rgba(184,255,71,0.75))
                    drop-shadow(0 0 80px rgba(184,255,71,0.25));
          }
        }
        @keyframes ld-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes ld-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes ld-bracket {
          from { width: 0; height: 0; opacity: 0; }
          to   { width: 22px; height: 22px; opacity: 1; }
        }
        @keyframes ld-dots {
          0%   { width: 0; }
          100% { width: 1.4em; }
        }
        @keyframes ld-accent-line {
          from { width: 0; opacity: 0; }
          to   { width: 48px; opacity: 1; }
        }

        .ld-monogram {
          animation:
            ld-glow    2.8s ease-in-out infinite,
            ld-fade-up 0.5s ease 0.05s both;
        }
        .ld-accent-line {
          animation: ld-accent-line 0.5s ease 0.35s both;
        }
        .ld-subtitle {
          animation: ld-fade-up 0.5s ease 0.45s both;
        }
        .ld-progress-wrap {
          animation: ld-fade-up 0.5s ease 0.6s both;
        }
        .ld-bottom-label {
          animation: ld-fade-up 0.5s ease 0.85s both;
        }
        .ld-scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(184,255,71,0.5) 30%,
            rgba(71,184,255,0.4) 70%,
            transparent 100%
          );
          animation: ld-scan 2.8s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
        .ld-progress-bar {
          height: 100%;
          border-radius: 1px;
          background: linear-gradient(
            90deg,
            #b8ff47 0%, #47b8ff 50%, #b8ff47 100%
          );
          background-size: 400px 100%;
          animation:
            ld-progress 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite,
            ld-shimmer  1.4s linear infinite;
        }
        .ld-cursor-bar {
          display: inline-block;
          width: 2px;
          height: 0.9em;
          background: #b8ff47;
          margin-left: 5px;
          vertical-align: middle;
          border-radius: 1px;
          animation: ld-blink 0.85s step-end infinite;
        }
        .ld-dots-anim {
          display: inline-block;
          overflow: hidden;
          width: 0;
          vertical-align: bottom;
          animation: ld-dots 1.4s steps(4, end) infinite;
          white-space: nowrap;
        }
        /* corner brackets */
        .ld-br-tl {
          border-top:  1.5px solid rgba(184,255,71,0.45);
          border-left: 1.5px solid rgba(184,255,71,0.45);
          animation: ld-bracket 0.6s ease 0.1s both;
        }
        .ld-br-tr {
          border-top:   1.5px solid rgba(184,255,71,0.45);
          border-right: 1.5px solid rgba(184,255,71,0.45);
          animation: ld-bracket 0.6s ease 0.2s both;
        }
        .ld-br-bl {
          border-bottom: 1.5px solid rgba(184,255,71,0.45);
          border-left:   1.5px solid rgba(184,255,71,0.45);
          animation: ld-bracket 0.6s ease 0.3s both;
        }
        .ld-br-br {
          border-bottom: 1.5px solid rgba(184,255,71,0.45);
          border-right:  1.5px solid rgba(184,255,71,0.45);
          animation: ld-bracket 0.6s ease 0.4s both;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg, #030303)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot-grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Radial vignette — darkens edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 35%, var(--bg, #030303) 100%)",
          }}
        />

        {/* Accent glow behind monogram */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(184,255,71,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Horizontal scan line */}
        <div className="ld-scan-line" />

        {/* Corner brackets */}
        <div style={{ position: "absolute", top: 32, left: 32 }}>
          <div className="ld-br-tl" style={{ width: 22, height: 22 }} />
        </div>
        <div style={{ position: "absolute", top: 32, right: 32 }}>
          <div className="ld-br-tr" style={{ width: 22, height: 22 }} />
        </div>
        <div style={{ position: "absolute", bottom: 32, left: 32 }}>
          <div className="ld-br-bl" style={{ width: 22, height: 22 }} />
        </div>
        <div style={{ position: "absolute", bottom: 32, right: 32 }}>
          <div className="ld-br-br" style={{ width: 22, height: 22 }} />
        </div>

        {/* ── Main centred content ── */}
        <div
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          {/* Monogram */}
          <div
            className="font-display ld-monogram"
            style={{
              fontSize: "clamp(88px, 14vw, 144px)",
              lineHeight: 1,
              background:
                "linear-gradient(135deg, #b8ff47 0%, #47b8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.06em",
              marginBottom: 10,
              userSelect: "none",
            }}
          >
            TT
          </div>

          {/* Thin accent rule */}
          <div
            className="ld-accent-line"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, var(--accent, #b8ff47), transparent)",
              margin: "0 auto 22px",
            }}
          />

          {/* Status row */}
          <div
            className="font-mono ld-subtitle"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--muted, #666)",
              textTransform: "uppercase",
              marginBottom: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            LOADING
            <span className="ld-dots-anim">...</span>
            <span className="ld-cursor-bar" />
          </div>

          {/* Progress track */}
          <div className="ld-progress-wrap" style={{ width: 200, margin: "0 auto" }}>
            <div
              style={{
                width: "100%",
                height: 1,
                background: "var(--border, rgba(255,255,255,0.07))",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <div className="ld-progress-bar" />
            </div>
          </div>
        </div>

        {/* Bottom watermark */}
        <div
          className="font-mono ld-bottom-label"
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 9,
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.1)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          PORTFOLIO · TTIMB · DUBAI
        </div>
      </div>
    </>
  );
}
