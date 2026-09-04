"use client";

import { useEffect, useRef } from "react";
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

const CERTIFICATIONS = [
  {
    title: "Foundations of Data Science",
    issuer: "Google (Coursera)",
    year: "2025",
  },
  {
    title: "Deloitte Australia Data Analytics Job Simulation",
    issuer: "Forage",
    year: "2025",
  },
];

const ACHIEVEMENTS = [
  { value: 3, suffix: "", label: "Analytics Internships" },
  { value: 1, suffix: "M+", label: "Records Analyzed" },
  { value: 40, suffix: "%", label: "Manual Effort Reduced" },
  { value: 20, suffix: "+", label: "Tools & Technologies" },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const achieveRef = useRef<HTMLDivElement>(null);

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

        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24">
          {/* Degree */}
          {EDUCATION.map((edu, i) => (
            <div key={i} className="edu-card glass-card p-8 md:col-span-2">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs text-ember tracking-widest uppercase font-medium mb-2 block" style={{ fontFamily: "var(--font-display)" }}>
                    {edu.type}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-ash">{edu.detail}</p>
                </div>
                <span className="text-xs text-ash tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                  {edu.year}
                </span>
              </div>
            </div>
          ))}

          {/* Certifications */}
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="edu-card glass-card p-6 group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-ember transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {cert.title}
                  </h4>
                  <p className="text-xs text-ash">{cert.issuer}</p>
                </div>
                <span className="text-xs text-ash">{cert.year}</span>
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
    </section>
  );
}
