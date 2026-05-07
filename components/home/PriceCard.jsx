import Link from "next/link";
import { Check } from "lucide-react";

export default function PriceCard({
  title,
  subtitle,
  price,
  period,
  features = [],
  icon: Icon,
  color = "#0080E0",
  popular = false,
  buttonText = "Choose Plan",
  whatsappMessage,
}) {
  const whatsappHref = `https://wa.me/8801761784780?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <div
      className={`group relative flex h-full min-h-106.25 flex-col overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-2 ${
        popular ? "scale-[1.01]" : ""
      }`}
      style={{
        borderColor: popular ? "#00B0F0" : "var(--border)",
        background: "var(--card)",
        boxShadow: popular
          ? "0 24px 70px rgba(0, 176, 240, 0.28)"
          : "0 20px 60px rgba(0, 128, 224, 0)",
      }}
    >
      {popular && (
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-xl bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-5 py-2 text-xs font-black uppercase text-white">
          Most Popular
        </div>
      )}

      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#00B0F0]/0 blur-3xl transition duration-300 group-hover:bg-[#00B0F0]/20" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-[#F08000]/0 blur-3xl transition duration-300 group-hover:bg-[#F08000]/20" />

      <div className="relative flex h-full flex-col pt-7">
        <div className="flex items-center gap-4">
          <div
            className="flex h-15 w-15 items-center justify-center rounded-full border transition duration-300 group-hover:scale-110"
            style={{
              borderColor: color,
              color,
              background: `${color}12`,
            }}
          >
            <Icon size={30} strokeWidth={2.3} />
          </div>

          <div>
            <h3
              className="text-xl font-black transition duration-300"
              style={{ color }}
            >
              {title}
            </h3>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--text-muted)" }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-end gap-2">
            <h4 className="text-5xl font-black leading-none">{price}</h4>

            {period && (
              <p
                className="pb-1 text-sm font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                / {period}
              </p>
            )}
          </div>
        </div>

        <div
          className="my-6 h-px w-full"
          style={{ background: "var(--border)" }}
        />

        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full"
                style={{ background: color }}
              >
                <Check size={13} strokeWidth={3} className="text-[#000513]" />
              </span>

              <span className="text-sm leading-6">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl border text-sm font-black transition duration-300 hover:scale-[1.03]"
            style={{
              borderColor: color,
              color: popular ? "#FFFFFF" : color,
              background: popular
                ? "linear-gradient(90deg, #0080E0, #0077FF)"
                : "transparent",
              boxShadow: popular ? `0 18px 45px ${color}35` : "none",
            }}
          >
            <span
              className="absolute inset-0 translate-y-full transition duration-300 group-hover/btn:translate-y-0"
              style={{
                background: popular
                  ? "linear-gradient(90deg, #F08000, #F0B000)"
                  : `linear-gradient(90deg, ${color}, #00B0F0)`,
              }}
            />

            <span className="absolute left-[-40%] top-0 h-full w-1/3 skew-x-[-20deg] bg-white/30 opacity-0 transition duration-500 group-hover/btn:left-[120%] group-hover/btn:opacity-100" />

            <span
              className="relative z-10 transition duration-300 group-hover/btn:text-white"
              style={{
                color: popular ? "#FFFFFF" : undefined,
              }}
            >
              {buttonText}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
