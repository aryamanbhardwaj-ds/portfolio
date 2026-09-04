"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/lib/smooth-scroll";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import StaggeredMenu from "@/components/StaggeredMenu";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Scroll progress bar */}
      {!isLoading && <ScrollProgress />}

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navigation — StaggeredMenu stacked on left side */}
      {!isLoading && (
        <StaggeredMenu
          position="left"
          items={[
            { label: "Projects", ariaLabel: "Go to Projects section", link: "#projects" },
            { label: "Experience", ariaLabel: "Go to Experience section", link: "#experience" },
            { label: "Contact", ariaLabel: "Go to Contact section", link: "#contact" },
          ]}
          socialItems={[
            { label: "GitHub", link: "https://github.com/aryamanbhardwaj-ds" },
            { label: "LinkedIn", link: "https://www.linkedin.com/in/aryamanbhardwaj-ds/" },
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          colors={["#0d0d0f", "#1e1e24"]}
          accentColor="#A02A22"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#A02A22"
        />
      )}

      {/* Main content */}
      <SmoothScroll>
        <main>
          {/* Hero — cinematic editorial section */}
          <Hero />

          <Introduction />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
