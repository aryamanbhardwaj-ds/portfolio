"use client";

import { useState } from "react";
import Image from "next/image";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: "FMCG Sales Analytics — Databricks Medallion Architecture",
    description:
      "End-to-end Databricks pipeline implementing the Medallion Architecture (Bronze → Silver → Gold) with full and incremental load patterns in PySpark and Spark SQL, serving revenue, channel, and top-product KPIs.",
    tech: ["Databricks", "PySpark", "Delta Lake", "Spark SQL", "SQL"],
    github: "https://github.com/aryamanbhardwaj-ds/fmcg-sales-analytics-databricks",
    image: "/images/fmcg-databricks-dashboard.png",
  },
  {
    title: "Insurance Portfolio Analysis — PySpark + Databricks",
    description:
      "Simulated and analyzed a large-scale insurance portfolio (1M+ records) using PySpark and Spark SQL on Databricks. Performed claim modeling, loss ratio analysis, and future liability estimation to evaluate portfolio profitability and risk exposure.",
    tech: ["PySpark", "Databricks", "Spark SQL", "Python", "Data Simulation"],
    github: "https://github.com/aryamanbhardwaj-ds/insurance-policy-simulation-analysis",
    image: "/images/insurance.png",
  },
  {
    title: "Bakingo Operations Analysis — Business Loss Diagnostics",
    description:
      "End-to-end analysis of a D2C bakery dataset (1,200 orders) to identify operational inefficiencies and financial leakages. Discovered 7 key business problems including high discount loss, spoilage, delivery delays, and low repeat rate, with actionable fixes.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    github: "https://github.com/aryamanbhardwaj-ds/bakingo-operations-analysis",
    image: "/images/bakingo.png",
  },
  {
    title: "Customer Churn Analysis — SQL + Power BI",
    description:
      "Analyzed telecom customer churn using SQL and built an interactive Power BI dashboard. Identified churn drivers across tenure, contract type, and services, enabling targeted retention strategies.",
    tech: ["SQL", "Power BI", "Data Analysis", "Dashboarding"],
    github: "https://github.com/aryamanbhardwaj-ds/customer-churn-analysis",
    image: "/images/churn.png",
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      {/* Dynamic ambient background glow */}
      <div
        className="absolute top-1/3 -left-48 w-96 h-96 rounded-full opacity-25 pointer-events-none blur-[140px] transition-all duration-700"
        style={{
          backgroundColor:
            hoveredIndex !== null ? "var(--ember)" : "rgba(160, 42, 34, 0.2)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Minimal Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">
              Featured Work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Selected Projects
          </h2>
        </div>

        {/* Upgraded Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group flex flex-col rounded-2xl border border-white/10 p-4 sm:p-5 bg-obsidian hover:border-white/30 transition-all duration-500 shadow-2xl cursor-pointer"
            >
              {/* 16:9 Image Frame */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                <Image
                  src={project.image}
                  alt={`${project.title} — project cover`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Glowing gradient hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(160, 42, 34, 0.35) 0%, transparent 75%)",
                  }}
                />

                {/* External Link Overlay Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md p-2.5 sm:p-3 rounded-full text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Project Title & Description & Tech Badge Pills */}
              <div className="mt-5 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-ember transition-colors leading-snug tracking-tight">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-sm text-ash line-clamp-3 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-4 pt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-silver font-mono tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
