import { BarChart3, Handshake, Lightbulb, Target } from "lucide-react";

const features = [
  {
    title: "Result Focused",
    description:
      "We focus on actions that bring real results, not just vanity metrics.",
    icon: Target,
    color: "#0080E0",
  },
  {
    title: "Creative Strategy",
    description:
      "Creative ideas combined with smart strategy to grow your brand.",
    icon: Lightbulb,
    color: "#F0B000",
  },
  {
    title: "Transparent Reporting",
    description:
      "Clear reports so you always know how your business is performing.",
    icon: BarChart3,
    color: "#00B0F0",
  },
  {
    title: "Client Satisfaction",
    description:
      "Your success is our priority. We work together to achieve your goals.",
    icon: Handshake,
    color: "#F08000",
  },
];

export default function WhyChooseUs() {
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
            background:
              "color-mix(in srgb, var(--card) 88%, transparent)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.45fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0080E0]">
                Why Choose Us
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl xl:text-5xl">
                We Don’t Just Do Marketing, We{" "}
                <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
                  Drive Growth.
                </span>
              </h2>

              <p
                className="mt-5 max-w-xl text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                We combine creativity, strategy, and data to deliver real
                results for your business.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in srgb, var(--background-secondary) 70%, transparent)",
                  }}
                >
                  <h3 className="text-3xl font-black text-[#0080E0]">4+</h3>
                  <p
                    className="mt-1 text-sm font-bold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Growth Areas
                  </p>
                </div>

                <div
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in srgb, var(--background-secondary) 70%, transparent)",
                  }}
                >
                  <h3 className="text-3xl font-black text-[#F08000]">100%</h3>
                  <p
                    className="mt-1 text-sm font-bold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Client Focus
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group relative overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--card)",
                      boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100"
                      style={{ background: `${feature.color}25` }}
                    />

                    <div className="relative">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110"
                        style={{
                          color: feature.color,
                          background: `${feature.color}18`,
                        }}
                      >
                        <Icon size={28} strokeWidth={2.5} />
                      </div>

                      <h3 className="mt-6 text-lg font-black transition duration-300 group-hover:text-[#00B0F0]">
                        {feature.title}
                      </h3>

                      <p
                        className="mt-3 text-sm leading-7"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {feature.description}
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