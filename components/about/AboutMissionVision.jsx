import { Eye, Target } from "lucide-react";

const items = [
  {
    title: "Our Mission",
    description:
      "To help businesses grow online through creative marketing, clear strategy, smart advertising, and conversion-focused digital solutions.",
    icon: Target,
    color: "#0080E0",
  },
  {
    title: "Our Vision",
    description:
      "To become a trusted digital growth partner for brands that want to build visibility, generate leads, and create long-term online success.",
    icon: Eye,
    color: "#F08000",
  },
];

export default function AboutMissionVision() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-4xl border p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl md:p-8"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in srgb, var(--card) 92%, transparent)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100"
                  style={{ background: `${item.color}22` }}
                />

                <div className="relative">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-3xl transition duration-300 group-hover:scale-110"
                    style={{
                      color: item.color,
                      background: `${item.color}18`,
                    }}
                  >
                    <Icon size={32} strokeWidth={2.4} />
                  </div>

                  <h3 className="mt-7 text-2xl font-black">{item.title}</h3>

                  <p
                    className="mt-4 text-base leading-8"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}