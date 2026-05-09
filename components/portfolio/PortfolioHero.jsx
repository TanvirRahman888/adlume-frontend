import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PortfolioHero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B0F0]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
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
              Our Portfolio
            </p>
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Creative Work That Helps Brands{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Get Noticed.
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Explore our recent designs, campaigns, websites, and landing pages
            created to help businesses build trust, attract attention, and grow
            online.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full px-8 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #0080E0, #00B0F0)",
              }}
            >
              <span className="absolute inset-0 translate-y-full bg-linear-to-r from-[#F08000] to-[#F0B000] transition duration-300 group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight size={18} />
              </span>
            </Link>

            <Link
              href="https://wa.me/8801761784780?text=Hello%20Adlume%20Media%2C%20I%20want%20to%20discuss%20a%20new%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center rounded-full border px-8 text-sm font-black transition duration-300 hover:-translate-y-1 hover:text-[#00B0F0]"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}