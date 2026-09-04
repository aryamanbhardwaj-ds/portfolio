"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 3, suffix: "", label: "Analytics Internships" },
  { value: 1, suffix: "M+", label: "Records Analyzed" },
  { value: 40, suffix: "%", label: "Manual Effort Reduced" },
  { value: 20, suffix: "+", label: "Tools & Technologies" },
];

const JOURNEY = [
  {
    year: "2021 — 2025",
    title: "Foundation in Data Science",
    description:
      "Studied B.Sc. Data Science & Analytics at Sharda University — built the SQL, Python, and statistics foundation.",
  },
  {
    year: "Dec 2024 — Apr 2025",
    title: "HC Robotics — Data Analyst Intern",
    description:
      "Built production ETL pipelines for 200+ units into PostgreSQL, automated reporting, and improved monitoring accuracy by 25%.",
  },
  {
    year: "Jun — Jul 2025",
    title: "DRDO — Project Analyst Intern",
    description:
      "Evaluated and benchmarked 6 BI platforms, delivering executive procurement recommendations for secure, air-gapped analytics deployment.",
  },
  {
    year: "Jan 2026 — Present",
    title: "Brillica Services — Data Analyst Intern",
    description:
      "Applying Databricks, PySpark, and Delta Lake to 1M+ record analytics across insurance, FMCG, and telecom; driving pricing-tier decisions with interactive dashboards.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll(".stat-value");
        statEls.forEach((el) => {
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
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Stats cards reveal
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          }
        );
      }

      // Timeline items reveal
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-48">
      <div className="section-container">
        <SectionHeading
          eyebrow="About Me"
          title="From Curiosity to Craft"
          subtitle="A data analyst passionate about turning raw, complex data into actionable intelligence and strategic business decisions."
        />

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-32">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-card glass-card p-6 md:p-8 text-center group"
            >
              <span
                className="stat-value block text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                data-value={stat.value}
                data-suffix={stat.suffix}
                style={{ fontFamily: "var(--font-display)" }}
              >
                0{stat.suffix}
              </span>
              <span className="text-xs md:text-sm text-ash tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Journey Timeline */}
        <div className="mb-8">
          <span
            className="text-ember text-xs font-medium tracking-[0.3em] uppercase block mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Journey
          </span>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Animated line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-iron">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-ember origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {JOURNEY.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-item relative flex items-start gap-8 ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } pl-12 md:pl-0`}
              >
                {/* Content */}
                <div className={`md:w-[calc(50%-30px)] ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="glass-card p-6 md:p-8">
                    <span
                      className="text-ember text-sm font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-bold text-white mt-2 mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-ash leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-ember border-2 border-void z-10" />

                {/* Spacer for other side */}
                <div className="hidden md:block md:w-[calc(50%-30px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
