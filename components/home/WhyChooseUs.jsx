import { BarChart3, Handshake, Lightbulb, Target } from "lucide-react";

const features = [
  {
    title: "Result Focused",
    description: "We focus on actions that bring real results, not just vanity metrics.",
    icon: Target,
    color: "#0080E0",
  },
  {
    title: "Creative Strategy",
    description: "Creative ideas combined with smart strategy to grow your brand.",
    icon: Lightbulb,
    color: "#F0B000",
  },
  {
    title: "Transparent Reporting",
    description: "Clear reports so you always know how your business is performing.",
    icon: BarChart3,
    color: "#00B0F0",
  },
  {
    title: "Client Satisfaction",
    description: "Your success is our priority. We work together to achieve your goals.",
    icon: Handshake,
    color: "#F08000",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-16"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div
          className="grid gap-10 rounded-4xl border p-6 md:p-8 lg:grid-cols-[0.9fr_1.6fr]"
          style={{
            borderColor: "var(--border)",
            background: "var(--card)",
          }}
        >
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0080E0]">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              We Don’t Just Do Marketing, <br />
              We{" "}
              <span className="bg-linear-to-r from-[#0080E0] to-[#00B0F0] bg-clip-text text-transparent">
                Drive Growth.
              </span>
            </h2>

            <p
              className="mt-5 max-w-xl text-sm leading-7 md:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              We combine creativity, strategy, and data to deliver real results
              for your business.
            </p>
          </div>

          {/* Right Features */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`group relative p-4 ${
                    index !== 0 ? "xl:border-l" : ""
                  }`}
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-start gap-4 xl:block">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110"
                      style={{
                        color: feature.color,
                        background: `${feature.color}18`,
                      }}
                    >
                      <Icon size={28} strokeWidth={2.5} />
                    </div>

                    <div className="xl:mt-5">
                      <h3 className="text-base font-black">{feature.title}</h3>

                      <p
                        className="mt-3 text-sm leading-6"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}