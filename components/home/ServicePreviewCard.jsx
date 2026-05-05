import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicePreviewCard({
  icon,
  title,
  description,
  href = "/services",
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-97.5 flex-col overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-2"
      style={{
        borderColor: "var(--border)",
        background: "var(--card)",
        boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#00B0F0]/0 blur-3xl transition duration-300 group-hover:bg-[#00B0F0]/20" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-[#F08000]/0 blur-3xl transition duration-300 group-hover:bg-[#F08000]/20" />

      <div className="relative flex h-full flex-col">
        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl transition group-hover:scale-110"
          style={{
            borderColor: "var(--border)",
            background:
              "color-mix(in srgb, var(--background-secondary) 70%, transparent)",
          }}
        >
          {icon ? (
            <Image
              src={icon}
              alt={title}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="h-full w-full rounded-2xl bg-linear-to-br from-[#0080E0] to-[#F08000]" />
          )}
        </div>

        <h3 className="text-xl font-black transition duration-300 group-hover:text-[#00B0F0]">
          {title}
        </h3>

        <p
          className="mt-3 text-sm leading-7"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>

        <div className="mt-auto pt-6">
          <div className="inline-flex items-center gap-2 text-sm font-black text-[#F08000] transition duration-300 group-hover:gap-3 group-hover:text-[#00B0F0]">
            View Details
            <ArrowRight
              size={18}
              className="transition duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}