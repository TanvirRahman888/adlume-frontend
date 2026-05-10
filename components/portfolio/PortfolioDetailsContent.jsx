import { CheckCircle2, Target, TrendingUp } from "lucide-react";

const highlights = [
  {
    title: "Creative Direction",
    description:
      "Designed with a clean, professional, and audience-focused creative direction.",
    icon: Target,
    color: "#0080E0",
  },
  {
    title: "Brand Presentation",
    description:
      "Built to help the business present its offer clearly and attract attention.",
    icon: CheckCircle2,
    color: "#00B0F0",
  },
  {
    title: "Growth Focused",
    description:
      "Created to support visibility, engagement, trust, and customer action.",
    icon: TrendingUp,
    color: "#F08000",
  },
];

export default function PortfolioDetailsContent({ project }) {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div
          className="overflow-hidden rounded-4xl border p-6 md:p-8 lg:p-10"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--card) 90%, transparent)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
                Project Overview
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                About This Project
              </h2>

              <p
                className="mt-5 text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                {project.description ||
                  "This project was created to support the client’s brand visibility, professional presentation, and digital marketing goals."}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--card)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100"
                      style={{ background: `${item.color}25` }}
                    />

                    <div className="relative">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110"
                        style={{
                          color: item.color,
                          background: `${item.color}18`,
                        }}
                      >
                        <Icon size={28} strokeWidth={2.5} />
                      </div>

                      <h3 className="mt-6 text-lg font-black">{item.title}</h3>

                      <p
                        className="mt-3 text-sm leading-7"
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
        </div>
      </div>
    </section>
  );
}