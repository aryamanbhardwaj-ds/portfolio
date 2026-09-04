"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/aryamanbhardwaj-ds", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aryamanbhardwaj-ds/", icon: "https://api.iconify.design/simple-icons:linkedin.svg?color=%23ffffff" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(".contact-animate");
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:aryamannbhardwaj0001@gmail.com?subject=Portfolio Inquiry from ${formState.name}&body=${encodeURIComponent(formState.message)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ fontFamily: "var(--font-poppins), sans-serif", contain: "paint" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] md:w-[800px] h-[400px] max-w-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(252,107,47,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section Heading styled in Poppins */}
        <div className="mb-16 md:mb-24 text-center">
          <span
            className="text-ember text-xs font-semibold tracking-[0.25em] uppercase block mb-4"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Get in Touch
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Let&apos;s Create Something Extraordinary
          </h2>
          <p
            className="mt-4 md:mt-6 text-base md:text-lg text-ash max-w-xl mx-auto leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s build something amazing together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 min-w-0">
          {/* Contact info card */}
          <div
            className="contact-animate glass-card p-6 sm:p-8 md:p-10 flex flex-col justify-between min-w-0 max-w-full overflow-hidden"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            <div>
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Contact Details
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">Email</p>
                    <a
                      href="mailto:aryamannbhardwaj0001@gmail.com"
                      className="text-xs sm:text-sm text-white hover:text-ember transition-colors font-medium break-all block"
                      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    >
                      aryamannbhardwaj0001@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">Phone</p>
                    <a
                      href="tel:+919315066387"
                      className="text-sm text-white hover:text-ember transition-colors font-medium"
                      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    >
                      +91 93150 66387
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.777.978-.953 1.179-.176.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.8-1.5-1.788-1.676-2.089-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.239-.244-.588-.493-.509-.678-.519l-.578-.01c-.2 0-.526.075-.802.376s-1.054 1.03-1.054 2.511c0 1.48 1.079 2.91 1.23 3.111.15.2 2.124 3.243 5.146 4.548.719.311 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.95.56 3.77 1.53 5.31L2 22l4.82-1.51c1.48.88 3.2 1.39 5.22 1.39 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2zm0 18.25c-1.73 0-3.34-.49-4.72-1.35l-.34-.21-2.86.9.92-2.79-.23-.37a8.216 8.216 0 0 1-1.26-4.41c0-4.56 3.71-8.27 8.27-8.27s8.27 3.71 8.27 8.27c0 4.56-3.71 8.27-8.27 8.27z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">WhatsApp</p>
                    <a
                      href="https://wa.me/919315066387"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-ember transition-colors font-medium"
                      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    >
                      +91 93150 66387
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">Location</p>
                    <p className="text-sm text-white font-medium">Dehradun, Uttarakhand, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5 shrink-0 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="absolute inset-1 rounded-full border border-emerald-400/50 animate-ping" />
                  </span>
                  <div>
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">Availability</p>
                    <p className="text-sm text-green-400 font-medium">Open to opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs text-ash uppercase tracking-wider mb-4 font-semibold">Socials</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-ember/40 hover:bg-white/10 transition-all duration-300 group"
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    data-magnetic
                    title={link.label}
                  >
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="w-4 h-4 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-animate glass-card p-6 sm:p-8 md:p-10 space-y-6 min-w-0 max-w-full"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            <div>
              <label htmlFor="contact-name" className="text-xs text-ash uppercase tracking-wider block mb-2 font-semibold">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-iron focus:outline-none focus:border-ember/50 transition-colors"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-xs text-ash uppercase tracking-wider block mb-2 font-semibold">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-iron focus:outline-none focus:border-ember/50 transition-colors"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs text-ash uppercase tracking-wider block mb-2 font-semibold">
                Message
              </label>
              <textarea
                id="contact-message"
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-iron focus:outline-none focus:border-ember/50 transition-colors resize-none"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <MagneticButton type="submit" variant="primary" className="w-full !py-3.5 group">
              <span style={{ fontFamily: "var(--font-poppins), sans-serif" }} className="flex items-center justify-center gap-2.5 font-semibold text-sm tracking-wide text-white">
                Send Message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </MagneticButton>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        className="section-container relative z-10"
        style={{
          marginTop: "160px",
          paddingTop: "36px",
          paddingBottom: "40px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          fontFamily: "var(--font-poppins), sans-serif",
        }}
      >
        <div className="flex items-center justify-start text-left">
          <p className="text-xs text-ash" suppressHydrationWarning>
            © {new Date().getFullYear()} Aryaman Bhardwaj. Crafted with passion.
          </p>
        </div>
      </div>
    </section>
  );
}
