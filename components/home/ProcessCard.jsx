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
    <div className="relative flex items-start gap-4 rounded-3xl border p-5 transition duration-300 hover:-translate-y-2 hover:shadow-xl lg:border-0 lg:p-0 lg:hover:translate-y-0 lg:hover:shadow-none"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="relative shrink-0">
        <div
          className="flex h-20 w-20 flex-col items-center justify-center rounded-full shadow-lg"
          style={{
            background: "var(--background-secondary)",
            boxShadow: `0 18px 45px ${color}22`,
          }}
        >
          <span className="text-sm font-black" style={{ color }}>
            {number}
          </span>

          <div
            className="mt-2 flex h-10 w-10 items-center justify-center rounded-full border"
            style={{
              borderColor: `${color}55`,
              color,
              background: `${color}10`,
            }}
          >
            <Icon size={22} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <div className="min-w-0 pt-3">
        <h3 className="text-base font-black">{title}</h3>

        <p
          className="mt-3 max-w-52.5 text-sm leading-6"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      </div>

      {showArrow && (
        <div className="hidden flex-1 items-center justify-end pt-8 lg:flex">
          <ArrowRight
            size={26}
            strokeWidth={2.4}
            className="opacity-80"
            style={{ color: "#0080E0" }}
          />
        </div>
      )}
    </div>
  );
}