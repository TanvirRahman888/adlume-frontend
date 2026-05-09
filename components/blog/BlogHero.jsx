import { Sparkles } from "lucide-react";

export default function BlogHero() {
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
              Adlume Blog
            </p>
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Insights to Help Your Brand{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Grow Online.
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Read practical tips about digital marketing, social media, paid ads,
            branding, websites, lead generation, and local business growth.
          </p>
        </div>
      </div>
    </section>
  );
}