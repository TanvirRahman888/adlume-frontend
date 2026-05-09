import { BarChart3, Handshake, Lightbulb, ShieldCheck } from "lucide-react";

const values = [
  {
    title: "Result Driven",
    description:
      "We focus on meaningful actions that help your business get more attention, leads, and growth.",
    icon: BarChart3,
    color: "#0080E0",
  },
  {
    title: "Creative Thinking",
    description:
      "We create content, designs, and campaigns that make your brand stand out online.",
    icon: Lightbulb,
    color: "#F0B000",
  },
  {
    title: "Honest Communication",
    description:
      "We keep our process clear, simple, and transparent so you always know what is happening.",
    icon: ShieldCheck,
    color: "#00B0F0",
  },
  {
    title: "Client Partnership",
    description:
      "We work with your business like a growth partner, not just a service provider.",
    icon: Handshake,
    color: "#F08000",
  },
];

export default function AboutValues() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0080E0]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex items-center justify-center rounded-full border px-5 py-2"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 80%, transparent)",
            }}
          >
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
              Our Values
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            What We Believe In
          </h2>

          <p
            className="mx-auto mt-5 text-justify text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Our work is guided by strategy, creativity, transparency, and a
            strong focus on client success.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="group relative flex h-full min-h-70 flex-col overflow-hidden rounded-4xl border p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in srgb, var(--card) 92%, transparent)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100"
                  style={{ background: `${value.color}22` }}
                />

                <div className="relative flex h-full flex-col">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      color: value.color,
                      background: `${value.color}18`,
                    }}
                  >
                    <Icon size={30} strokeWidth={2.5} />
                  </div>

                  <h3 className="mt-7 text-xl font-black transition duration-300 group-hover:text-[#00B0F0]">
                    {value.title}
                  </h3>

                  <p
                    className="mt-4 text-sm leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {value.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="h-1.5 w-14 rounded-full bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] transition duration-300 group-hover:w-24" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
