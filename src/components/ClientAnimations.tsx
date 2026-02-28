"use client";

import { useEffect } from "react";

export default function ClientAnimations() {
  useEffect(() => {
    // ── Custom Cursor ──────────────────────────────────────────
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let rafId: number;

    let hasMovedOnce = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";

      // Show cursors after first real mouse position is known
      if (!hasMovedOnce) {
        hasMovedOnce = true;
        dot.classList.add("is-visible");
        ring.classList.add("is-visible");
      }
    };

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    animateCursor();

    // Cursor grow on interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-grow]").forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
        el.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
      });
    };

    addHoverListeners();

    // ── Scroll Reveal ──────────────────────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });

    // ── Animated Counters ──────────────────────────────────────
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseFloat(el.dataset.counter || "0");
            const suffix = el.dataset.counterSuffix || "";
            const isFloat = target % 1 !== 0;
            const duration = 1200;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = target * eased;

              el.textContent = isFloat
                ? current.toFixed(1) + suffix
                : Math.floor(current) + suffix;

              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("[data-counter]").forEach((el) => {
      counterObserver.observe(el);
    });

    // ── Tilt effect on project cards ───────────────────────────
    const tiltCards = document.querySelectorAll<HTMLElement>("[data-tilt]");

    tiltCards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
      };

      const onLeave = () => {
        card.style.transform =
          "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      if (document.body.contains(dot)) document.body.removeChild(dot);
      if (document.body.contains(ring)) document.body.removeChild(ring);
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}
