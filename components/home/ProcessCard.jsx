import { ArrowRight } from "lucide-react";

export default function ProcessCard({
  number,
  title,
  description,
  icon: Icon,
  color = "#0080E0",
  showArrow = true,
}) {
  return (
    <div
      className="group relative flex h-full min-h-70 flex-col overflow-hidden rounded-4xl border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100"
        style={{ background: `${color}22` }}
      />

      <div className="relative flex h-full flex-col">
        <div
          className="mb-7 flex h-20 w-20 flex-col items-center justify-center rounded-3xl transition duration-300 group-hover:scale-110"
          style={{
            background:
              "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
          }}
        >
          <span className="text-sm font-black" style={{ color }}>
            {number}
          </span>

          <div
            className="mt-2 flex h-10 w-10 items-center justify-center rounded-full border"
            style={{
              borderColor: `${color}55`,
              background: `${color}10`,
              color,
            }}
          >
            <Icon size={22} strokeWidth={2.5} />
          </div>
        </div>

        <h3 className="text-xl font-black leading-snug transition duration-300 group-hover:text-[#00B0F0]">
          {title}
        </h3>

        <p
          className="mt-4 text-sm leading-7"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>

      </div>
    </div>
  );
}