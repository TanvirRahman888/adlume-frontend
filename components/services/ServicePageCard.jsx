import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ServicePageCard({
  title,
  description,
  icon,
  href = "/services",
  points = [],
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-97.5 flex-col overflow-hidden rounded-4xl border p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--card) 92%, transparent)",
        boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
      }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00B0F0]/0 blur-3xl transition duration-300 group-hover:bg-[#00B0F0]/25" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F08000]/0 blur-3xl transition duration-300 group-hover:bg-[#F08000]/20" />

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#00B0F0] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-[#F08000] to-transparent" />
      </div>

      <div className="relative flex h-full flex-col">
        <div
          className="mb-7 flex h-20 w-20 items-center justify-center rounded-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background:
              "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
            boxShadow: "0 16px 45px rgba(0, 128, 224, 0.08)",
          }}
        >
          {icon ? (
            <Image
              src={icon}
              alt={title}
              width={64}
              height={64}
              className="h-14 w-14 object-contain"
            />
          ) : (
            <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-[#0080E0] to-[#F08000]" />
          )}
        </div>

        <h3 className="text-2xl font-black leading-snug transition duration-300 group-hover:text-[#00B0F0]">
          {title}
        </h3>

        <p
          className="mt-4 text-sm leading-7"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>

        <div className="mt-6 grid gap-3">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <CheckCircle2
                size={17}
                className="mt-1 shrink-0 text-[#00B0F0]"
              />
              <p
                className="text-sm leading-6"
                style={{ color: "var(--text-muted)" }}
              >
                {point}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <div className="h-1.5 w-14 rounded-full bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] transition duration-300 group-hover:w-24" />
        </div>
      </div>
    </Link>
  );
}