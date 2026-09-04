"use client";

import { useMemo } from "react";
import SectionHeading from "./SectionHeading";
import DriftWall, { DriftWallItem } from "./DriftWall";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const SKILLS: Skill[] = [
  // Languages & Databases
  { name: "SQL", icon: "https://api.iconify.design/tabler:database.svg?color=%23336791", category: "Languages & Databases" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", category: "Languages & Databases" },
  { name: "Microsoft SQL Server", icon: "https://cdn.simpleicons.org/microsoftsqlserver/CC292B", category: "Languages & Databases" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", category: "Languages & Databases" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", category: "Languages & Databases" },
  { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/150458", category: "Languages & Databases" },
  { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy/013243", category: "Languages & Databases" },
  { name: "DAX", icon: "https://api.iconify.design/carbon:data-analytics.svg?color=%23FC6B2F", category: "Languages & Databases" },
  { name: "Spark SQL", icon: "https://api.iconify.design/simple-icons:apachespark.svg?color=%23E25A1C", category: "Languages & Databases" },

  // BI & Reporting
  { name: "Power BI", icon: "https://api.iconify.design/simple-icons:powerbi.svg?color=%23F2C811", category: "BI & Reporting" },
  { name: "Tableau", icon: "https://cdn.simpleicons.org/tableau/E97627", category: "BI & Reporting" },
  { name: "Advanced Excel", icon: "https://api.iconify.design/simple-icons:microsoftexcel.svg?color=%23107C41", category: "BI & Reporting" },

  // Data Engineering & Cloud
  { name: "Databricks", icon: "https://cdn.simpleicons.org/databricks/FF3621", category: "Data Engineering & Cloud" },
  { name: "PySpark", icon: "https://api.iconify.design/simple-icons:apachespark.svg?color=%23E25A1C", category: "Data Engineering & Cloud" },
  { name: "Delta Lake", icon: "https://api.iconify.design/carbon:data-lake.svg?color=%2300ADD8", category: "Data Engineering & Cloud" },
  { name: "ETL/ELT", icon: "https://api.iconify.design/carbon:data-refinery.svg?color=%23A02A22", category: "Data Engineering & Cloud" },
  { name: "Google BigQuery", icon: "https://cdn.simpleicons.org/googlebigquery/669DF6", category: "Data Engineering & Cloud" },

  // Tools
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", category: "Tools" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff", category: "Tools" },
];

export default function Skills() {
  const driftWallItems: DriftWallItem[] = useMemo(() => {
    return SKILLS.map((skill) => ({
      image: "/images/skill-tile-bg.png",
      title: skill.name,
      icon: skill.icon,
    }));
  }, []);

  return (
    <section id="skills" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionHeading
          eyebrow="Skills & Arsenal"
          title="Technical Stack"
          subtitle="Technologies and tools I use to build scalable data pipelines, perform deep analytics, and surface executive dashboards."
          align="center"
        />

        {/* DriftWall 3D animated skills container - full screen full bleed */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen overflow-hidden -translate-x-12 sm:-translate-x-16">
          <DriftWall
            items={driftWallItems}
            columns={6}
            tileWidth={210}
            tileHeight={138}
            gap={20}
            tilt={14}
            turn={-16}
            perspective={1000}
            depth={100}
            speed={40}
            direction="up"
            variance={0.4}
            parallax={0.6}
            lift={65}
            fade={0.4}
            dim={0.6}
            overlayColor="#050505"
          />
        </div>
      </div>
    </section>
  );
}
