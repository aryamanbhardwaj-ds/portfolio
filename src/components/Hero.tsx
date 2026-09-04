"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import GhostCursor from "./GhostCursor";
import TextPressure from "./TextPressure";
import HeroScene from "./HeroScene";

gsap.registerPlugin(ScrollTrigger);

const DUST_PARTICLES = [
  { size: 2.1, isEmber: true, top: 12, left: 8, duration: 6.2, delay: 0 },
  { size: 1.5, isEmber: false, top: 25, left: 82, duration: 7.4, delay: 0.6 },
  { size: 2.8, isEmber: false, top: 40, left: 15, duration: 5.8, delay: 1.2 },
  { size: 1.2, isEmber: true, top: 58, left: 91, duration: 8.1, delay: 1.8 },
  { size: 2.4, isEmber: false, top: 72, left: 24, duration: 6.9, delay: 2.4 },
  { size: 1.8, isEmber: false, top: 18, left: 64, duration: 5.5, delay: 3.0 },
  { size: 2.6, isEmber: true, top: 84, left: 45, duration: 7.8, delay: 3.6 },
  { size: 1.4, isEmber: false, top: 33, left: 37, duration: 6.1, delay: 4.2 },
  { size: 2.2, isEmber: false, top: 67, left: 78, duration: 8.5, delay: 4.8 },
  { size: 1.6, isEmber: true, top: 50, left: 6, duration: 5.2, delay: 5.4 },
  { size: 2.5, isEmber: false, top: 28, left: 95, duration: 7.1, delay: 6.0 },
  { size: 1.3, isEmber: false, top: 88, left: 12, duration: 6.6, delay: 6.6 },
  { size: 2.0, isEmber: true, top: 15, left: 48, duration: 8.0, delay: 7.2 },
  { size: 1.7, isEmber: false, top: 44, left: 71, duration: 5.9, delay: 7.8 },
  { size: 2.3, isEmber: false, top: 79, left: 58, duration: 7.3, delay: 8.4 },
  { size: 1.1, isEmber: true, top: 62, left: 31, duration: 6.4, delay: 9.0 },
  { size: 2.7, isEmber: false, top: 92, left: 84, duration: 8.3, delay: 9.6 },
  { size: 1.9, isEmber: false, top: 38, left: 52, duration: 5.6, delay: 10.2 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const nameBackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  /* ──────────────────────────────────────────────
     ENTRY ANIMATIONS (staggered GSAP timeline)
     ────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.0 });

      // 1 · Background spotlight fades in
      tl.fromTo(
        spotlightRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 2, ease: "expo.out" },
        0
      );

      // 4 · Headline reveals line by line (pop-in effect)
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        tl.fromTo(
          lines,
          { y: 40, scale: 0.85, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.0,
            stagger: 0.14,
            ease: "back.out(1.8)",
          },
          0.7
        );
      }

      // 5 · Availability badge fades in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.8, ease: "expo.out" },
        0.8
      );

      // 6 · Paragraph fades in
      tl.fromTo(
        paraRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
        1.1
      );

      // 7 · CTA buttons scale into view
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.85, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.7)" },
        1.3
      );

      // 7b · Mobile bottom elements fade in
      const mobileFades = document.querySelectorAll(".mobile-hero-fade");
      if (mobileFades.length) {
        tl.fromTo(
          mobileFades,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" },
          1.2
        );
      }

      // 8 · Dust particles appear
      if (particlesRef.current) {
        const dots = particlesRef.current.querySelectorAll(".dust");
        tl.fromTo(
          dots,
          { opacity: 0 },
          { opacity: 1, duration: 2, stagger: 0.06, ease: "power2.out" },
          1.0
        );
      }

      // 9 · Scroll indicator
      tl.fromTo(
        scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        1.8
      );

      /* ── SCROLL ANIMATIONS ── */

      // Spotlight changes on scroll
      gsap.to(spotlightRef.current, {
        opacity: 0.3,
        y: -60,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Entire hero fades into next section
      gsap.to(sectionRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "75% top",
          end: "100% top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  /* ──────────────────────────────────────────────
     MOUSE INTERACTION
     ────────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;

      // Spotlight follows cursor (softened intensity)
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: x * 40,
          y: y * 25,
          duration: 1.5,
          ease: "power2.out",
        });
      }

      // Dust particles react (softened intensity)
      if (particlesRef.current) {
        const dots = particlesRef.current.querySelectorAll(".dust");
        dots.forEach((d, i) => {
          gsap.to(d, {
            x: x * (2 + i * 0.8),
            y: y * (1.5 + i * 0.6),
            duration: 1.8 + i * 0.08,
            ease: "power2.out",
          });
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ──────────────────────────────────────────────
     RENDER
     ────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen h-screen h-[100svh] overflow-hidden"
      style={{ background: "#111111" }}
    >
      {/* ── React Bits Ghost Cursor Effect (Desktop only — disabled on touch/mobile to prevent WebKit canvas seams and GPU overhead) ── */}
      <div className="hidden md:block pointer-events-none">
        <GhostCursor
          color="#FC6B2F"
          brightness={0.75}
          edgeIntensity={0}
          trailLength={35}
          inertia={0.4}
          grainIntensity={0.025}
          bloomStrength={0.08}
          bloomRadius={0.8}
          bloomThreshold={0.04}
          fadeDelayMs={800}
          fadeDurationMs={1200}
          zIndex={10}
        />
      </div>

      {/* ── 3D Central Core, Orbital Rings & Floating Particles ── */}
      <HeroScene />

      {/* ── Grain / noise texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
        aria-hidden="true"
      />

      {/* ── Soft vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, #111111 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Radial spotlight behind 3D core (Vibrant Orange Secondary Accent Glow) ── */}
      <div
        ref={spotlightRef}
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none opacity-0 z-[6]"
        style={{
          background:
            "radial-gradient(circle, rgba(252,107,47,0.15) 0%, rgba(252,107,47,0.04) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* ── Floating dust particles ── */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none z-[8]"
        aria-hidden="true"
      >
        {DUST_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="dust absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.isEmber
                ? "rgba(252,107,47,0.5)"
                : "rgba(255,255,255,0.2)",
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          HERO CONTENT
          Mobile (< md): Normal vertical flex flow without overlaps.
          Desktop (md+): Absolute editorial placement.
         ════════════════════════════════════════════════════════════════ */}
      <div className="relative md:static z-[30] w-full min-h-screen h-[100vh] h-[100svh] flex flex-col justify-between px-5 sm:px-8 pt-20 sm:pt-24 pb-6 md:block md:min-h-0 md:h-auto md:p-0 pointer-events-none">
        {/* 1. TOP / EYEBROW — AVAILABILITY TAG */}
        <div
          ref={badgeRef}
          className="relative md:absolute md:top-24 md:left-14 lg:left-20 z-[40] opacity-0 flex items-center justify-center md:justify-start gap-2.5 pointer-events-auto shrink-0 pt-2 md:pt-0"
        >
          <span className="w-[7px] h-[7px] rounded-full bg-ember animate-pulse" />
          <span
            className="text-[10px] sm:text-[11px] text-[#B5B5B5] tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Turning Data Into Decisions.
          </span>
        </div>

        {/* 2. CENTER — ARYAMAN NAME & RED HEADLINE */}
        <div
          ref={nameBackRef}
          className="relative md:absolute md:top-[38%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[25] pointer-events-none select-none w-full flex flex-col items-center justify-center my-auto py-2 md:my-0 md:py-0 px-2"
          aria-hidden="true"
        >
          <div className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[540px] lg:max-w-[780px] h-[82px] sm:h-[105px] md:h-[160px] lg:h-[225px] relative flex items-center justify-center md:scale-y-[1.15] transform-gpu drop-shadow-[0_0_35px_rgba(252,107,47,0.3)]">
            <TextPressure
              text="ARYAMAN"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="rgba(255, 255, 255, 0.88)"
              minFontSize={20}
            />
          </div>

          {/* Headline footer text clearly spaced below ARYAMAN */}
          <div ref={headlineRef} className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 text-center z-[20] px-2 max-w-[90vw] md:max-w-none">
            <p
              className="hero-line text-[10px] sm:text-[11px] md:text-[clamp(0.72rem,1.08vw,0.88rem)] font-bold md:font-extrabold tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase text-ember drop-shadow-[0_0_20px_rgba(252,107,47,0.7)]"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              Data Analyst — Turning Raw Data into Business Decisions
            </p>
          </div>
        </div>

        {/* 3 & 4. BOTTOM GROUP — SUBLINE PARAGRAPH & CTA BUTTONS */}
        <div className="relative md:static w-full flex flex-col items-center md:block shrink-0 gap-3 md:gap-0 pb-1 md:pb-0 pointer-events-none">
          {/* Subline paragraph */}
          <div
            ref={paraRef}
            className="relative md:absolute md:top-[74%] md:left-14 lg:left-20 z-[40] max-w-[340px] sm:max-w-[380px] md:max-w-[380px] lg:max-w-[420px] opacity-0 text-center md:text-left pointer-events-auto"
          >
            <p
              className="text-[12px] sm:text-[13px] md:text-[14px] text-[#B5B5B5] leading-[1.6] md:leading-[1.8] font-normal tracking-wide"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              Data Analyst turning raw data into actionable insights and strategic business decisions using SQL, Python, Power BI, and Databricks.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="relative md:absolute md:bottom-[12%] md:right-14 lg:right-20 z-[40] opacity-0 flex flex-row md:flex-col items-center justify-center md:items-end gap-3 pointer-events-auto mt-2 md:mt-0"
          >
            <MagneticButton
              href="#projects"
              variant="primary"
              className="!rounded-full !px-5 sm:!px-7 !py-3 sm:!py-3.5 !text-[12px] sm:!text-[13px] !tracking-wide group shadow-[0_0_25px_rgba(160,42,34,0.4)]"
            >
              <span className="flex items-center gap-2 sm:gap-3">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-void/30 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 11L11 1M11 1H3M11 1V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Explore Work →
              </span>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              variant="outline"
              className="!rounded-full !px-5 sm:!px-6 !py-2.5 sm:!py-3 !text-[11px] sm:!text-[12px] !border-white/15"
            >
              Let&apos;s Talk →
            </MagneticButton>
          </div>
        </div>

        {/* 5. SCROLL INDICATOR */}
        <div
          ref={scrollIndRef}
          className="relative md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-[45] flex flex-col items-center gap-1.5 md:gap-2 opacity-0 shrink-0 mt-2 md:mt-0 pointer-events-auto"
        >
          <span
            className="text-[8px] md:text-[9px] text-[#B5B5B5]/60 tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-4 md:h-6 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
            <div
              className="absolute w-full h-3 bg-ember/60"
              style={{
                animation: "reveal-up 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom fade to void ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-[50]"
        style={{
          background: "linear-gradient(to top, var(--void) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
