import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

export default function PortfolioDetailsHero({ project }) {
  if (!project) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B0F0]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-black text-[#0080E0] transition duration-300 hover:text-[#F08000]"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Link>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
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
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                {project.category}
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              {project.title}
            </h1>

            <p
              className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {project.description ||
                "A creative project designed to help the brand look professional, attract attention, and support digital growth."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoBox label="Category" value={project.category} />
              <InfoBox
                label="Client"
                value={project.clientName || "Adlume Media Client"}
              />
            </div>

            {project.projectUrl && (
              <Link
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
              >
                Visit Project
                <ExternalLink size={17} />
              </Link>
            )}
          </div>

          <div
            className="relative overflow-hidden rounded-4xl border p-3"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--card) 90%, transparent)",
              boxShadow: "0 24px 80px rgba(0, 128, 224, 0.1)",
            }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00B0F0]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F08000]/20 blur-3xl" />

            <div className="relative aspect-6/4 w-full overflow-hidden rounded-3xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBox({ label, value }) {
  return (
    <div
      className="rounded-3xl border p-5"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--card) 80%, transparent)",
      }}
    >
      <p
        className="text-xs font-black uppercase tracking-[0.18em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>

      <p className="mt-2 text-base font-black">{value}</p>
    </div>
  );
}