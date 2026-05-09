import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServiceDetailsHero({ service }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div
              className="inline-flex items-center gap-3 rounded-full border px-5 py-2"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in srgb, var(--card) 80%, transparent)",
              }}
            >
              <CheckCircle2 size={17} className="text-[#00B0F0]" />
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                {service.title}
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              {service.heroTitle}
            </h1>

            <p
              className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {service.heroDescription}
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
                  Get Free Consultation
                  <ArrowRight size={18} />
                </span>
              </Link>

              <Link
                href={`https://wa.me/8801761784780?text=${encodeURIComponent(
                  `Hello Adlume Media, I am interested in your ${service.title} service. Please share the details.`,
                )}`}
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

          <div
            className="relative overflow-hidden rounded-4xl border p-8"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 90%, transparent)",
              boxShadow: "0 24px 80px rgba(0, 128, 224, 0.1)",
            }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00B0F0]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F08000]/20 blur-3xl" />

            <div className="relative h-65 w-full overflow-hidden rounded-3xl sm:h-80 lg:h-95">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain"
              />
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
              {service.features.slice(0, 4).map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border p-4 text-sm font-black"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
