"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    institution: "Sharda University — Greater Noida, India",
    detail: "B.Sc. in Data Science & Analytics",
    year: "Jul 2021 — Jul 2025",
    type: "Degree",
  },
];

interface Certification {
  title: string;
  issuer: string;
  year?: string;
  url?: string;
  code?: string;
  image: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: "Data Analytics Master Program",
    issuer: "Brillica Services",
    year: "September 2026",
    url: "https://credentials.brillicaservices.com/verify/69240b879a08d09e19ad6bab",
    image: "/images/certificates/brillica-data-analytics-master-program.png",
  },
  {
    title: "Foundations of Data Science",
    issuer: "Google (via Coursera)",
    year: "June 2026",
    url: "https://www.coursera.org/account/accomplishments/verify/ODCSP6N4JWTW",
    image: "/images/certificates/google-foundations-data-science.png",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia (via Forage)",
    year: "June 2026",
    url: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a292dc34de3917a9219bcae_1781094766821_completion_certificate.pdf",
    image: "/images/certificates/deloitte-forage-data-analytics.png",
  },
  {
    title: "Business Analytics with Excel",
    issuer: "Microsoft (via Simplilearn SkillUp)",
    code: "10332648",
    image: "/images/certificates/microsoft-business-analytics-excel.png",
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    image: "/images/certificates/outskill-generative-ai-mastermind.png",
  },
  {
    title: "Training Certificate: Analytical Software Tools — Trends, Development & Literature Insights",
    issuer: "DRDO, Institute for Systems Studies & Analyses, Ministry of Defence",
    image: "/images/certificates/drdo-training-certificate.png",
  },
  {
    title: "Summer Internship Certificate",
    issuer: "HOBIT (Hub of Big Innovations and Technology)",
    image: "/images/certificates/hobit-internship-certificate.png",
  },
];

const ACHIEVEMENTS = [
  { value: 4, suffix: "", label: "Analytics Internships" },
  { value: 1, suffix: "M+", label: "Records Analyzed" },
  { value: 40, suffix: "%", label: "Manual Effort Reduced" },
  { value: 20, suffix: "+", label: "Tools & Technologies" },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const achieveRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Keyboard accessibility and body scroll lock for lightbox
  useEffect(() => {
    if (!selectedCert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCert]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards reveal
      const cards = document.querySelectorAll(".edu-card");
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Achievement counters
      if (achieveRef.current) {
        const counters = achieveRef.current.querySelectorAll(".achieve-value");
        counters.forEach((el) => {
          const endValue = parseInt(el.getAttribute("data-value") || "0");
          const suffix = el.getAttribute("data-suffix") || "";
          const obj = { value: 0 };

          gsap.to(obj, {
            value: endValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.value)}${suffix}`;
            },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative py-32 md:py-48">
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionHeading
          eyebrow="Education & Achievements"
          title="Foundation"
          subtitle="Formal education, certifications, and milestones that shaped my expertise."
        />

        {/* Degree */}
        <div className="mb-12 md:mb-16">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="edu-card glass-card p-8 rounded-2xl border border-white/10">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span
                    className="text-xs text-ember tracking-widest uppercase font-semibold mb-2 block"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {edu.type}
                  </span>
                  <h3
                    className="text-xl md:text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-ash">{edu.detail}</p>
                </div>
                <span className="text-xs text-ash tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono">
                  {edu.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Subheading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">
              Certifications
            </span>
          </div>
          <h3
            className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Verified Credentials & Training
          </h3>
        </div>

        {/* Certifications Grid: 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-24">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              onClick={() => setSelectedCert(cert)}
              className="edu-card group flex flex-col rounded-2xl border border-white/10 p-4 sm:p-5 bg-obsidian hover:border-white/30 transition-all duration-500 shadow-2xl cursor-pointer"
            >
              {/* Fixed 4:3 Aspect Certificate Image Container with light neutral background */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-100 border border-black/5 flex items-center justify-center">
                <Image
                  src={cert.image}
                  alt={`${cert.title} — certificate preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2.5 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Light gradient hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(160, 42, 34, 0.15) 0%, transparent 75%)",
                  }}
                />

                {/* Zoom indicator overlay badge */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md p-2 rounded-full text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg pointer-events-none">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="mt-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h4
                      className="text-base font-bold text-white group-hover:text-ember transition-colors leading-snug tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cert.title}
                    </h4>
                    {cert.year && (
                      <span className="text-xs text-ash shrink-0 font-mono">{cert.year}</span>
                    )}
                  </div>
                  <p className="text-xs text-ash leading-relaxed">{cert.issuer}</p>
                </div>

                {/* Verify Link or Certificate Code */}
                {(cert.url || cert.code) && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between flex-wrap gap-2">
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs text-ember hover:underline font-medium transition-all"
                      >
                        <span>Verify Certificate</span>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M1 11L11 1M11 1H3M11 1V9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                    {cert.code && (
                      <span className="text-xs text-ash font-mono">
                        Code: <span className="text-white font-semibold">{cert.code}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div ref={achieveRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.label} className="edu-card glass-card p-6 text-center">
              <span
                className="achieve-value block text-2xl md:text-3xl font-bold text-ember mb-2"
                data-value={a.value}
                data-suffix={a.suffix}
                style={{ fontFamily: "var(--font-display)" }}
              >
                0{a.suffix}
              </span>
              <span className="text-xs text-ash">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          {/* Visible Close Button */}
          <button
            type="button"
            onClick={() => setSelectedCert(null)}
            aria-label="Close certificate lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-200 z-10 cursor-pointer shadow-xl hover:scale-105"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Lightbox Card Container */}
          <div
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] max-h-[75vh] rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl border border-white/20 flex items-center justify-center">
              <Image
                src={selectedCert.image}
                alt={`${selectedCert.title} — full certificate`}
                fill
                sizes="(max-width: 1024px) 95vw, 1100px"
                className="object-contain p-3 sm:p-6"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center max-w-xl px-4">
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 leading-snug">
                {selectedCert.title}
              </h4>
              <p className="text-xs sm:text-sm text-ash">
                {selectedCert.issuer}
                {selectedCert.year ? ` • ${selectedCert.year}` : ""}
                {selectedCert.code ? ` • Code: ${selectedCert.code}` : ""}
              </p>
              {selectedCert.url && (
                <div className="mt-3">
                  <a
                    href={selectedCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-ember hover:underline font-semibold"
                  >
                    <span>Verify credential on official site</span>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 11L11 1M11 1H3M11 1V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
