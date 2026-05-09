import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B0F0]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in srgb, var(--card) 80%, transparent)",
              }}
            >
              <Sparkles size={16} className="text-[#00B0F0]" />
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
                About Adlume Media
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              Helping Brands Get{" "}
              <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
                Seen, Clicked, and Chosen.
              </span>
            </h1>

            <p
              className="mt-6 max-w-2xl text-justify text-base leading-8 md:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              Adlume Media is a digital marketing agency focused on helping
              businesses build visibility, attract the right audience, generate
              leads, and grow with smart online strategies.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full px-8 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(90deg, #0080E0, #00B0F0)",
                }}
              >
                <span className="absolute inset-0 translate-y-full bg-linear-to-r from-[#F08000] to-[#F0B000] transition duration-300 group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center gap-2">
                  Work With Us
                  <ArrowRight size={18} />
                </span>
              </Link>

              <Link
                href="/services"
                className="inline-flex h-13 items-center justify-center rounded-full border px-8 text-sm font-black transition duration-300 hover:-translate-y-1 hover:text-[#00B0F0]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                }}
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-4xl border p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--card) 90%, transparent)",
              boxShadow: "0 24px 80px rgba(0, 128, 224, 0.1)",
            }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00B0F0]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F08000]/20 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F08000]">
                Our Focus
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight">
                Strategy, creativity, and data working together.
              </h2>

              <p
                className="mt-5 text-sm text-justify leading-7 md:text-base"
                style={{ color: "var(--text-muted)" }}
              >
                We combine creative content, paid ads, branding, websites,
                landing pages, AI Automation, and local business optimization
                to help brands grow with purpose.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Digital Marketing",
                  "Social Media Growth",
                  "AI Automation",
                  "Website Design",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border p-4 text-sm font-black"
                    style={{
                      borderColor: "var(--border)",
                      background:
                        "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}