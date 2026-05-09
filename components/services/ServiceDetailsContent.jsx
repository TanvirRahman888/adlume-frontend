import { CheckCircle2, CircleHelp, ListChecks, Sparkles } from "lucide-react";

export default function ServiceDetailsContent({ service }) {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0080E0]/5 blur-3xl" />

        <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div
              className="rounded-4xl border p-7 lg:col-span-1"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in srgb, var(--card) 92%, transparent)",
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0080E0]/12 text-[#0080E0]">
                <Sparkles size={28} />
              </div>

              <h2 className="mt-6 text-3xl font-black leading-tight">
                What’s Included
              </h2>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "var(--text-muted)" }}
              >
                This service is designed to give your business the right support
                for better visibility, stronger communication, and measurable
                growth.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="group rounded-3xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <CheckCircle2
                    size={22}
                    className="text-[#00B0F0]"
                    strokeWidth={2.5}
                  />
                  <h3 className="mt-4 text-base font-black">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                "color-mix(in srgb, var(--card) 90%, transparent)",
            }}
          >
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
                  Benefits
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                  How This Service Helps Your Business
                </h2>

                <p
                  className="mt-5 text-base leading-8"
                  style={{ color: "var(--text-muted)" }}
                >
                  We focus on practical improvements that make your brand more
                  visible, trustworthy, and ready to convert attention into
                  action.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-3xl border p-5"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--card)",
                    }}
                  >
                    <CheckCircle2
                      size={20}
                      className="text-[#F08000]"
                      strokeWidth={2.5}
                    />
                    <p
                      className="mt-4 text-sm font-bold leading-7"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in srgb, var(--card) 80%, transparent)",
              }}
            >
              <ListChecks size={17} className="text-[#0080E0]" />
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0080E0]">
                Our Process
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              How We Deliver This Service
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {service.process.map((item, index) => (
              <div
                key={item}
                className="group relative flex h-full min-h-57.5 flex-col rounded-4xl border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in srgb, var(--card) 92%, transparent)",
                }}
              >
                <span className="text-sm font-black text-[#00B0F0]">
                  0{index + 1}
                </span>

                <p
                  className="mt-5 text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item}
                </p>

                <div className="mt-auto pt-8">
                  <div className="h-1.5 w-14 rounded-full bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] transition duration-300 group-hover:w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in srgb, var(--card) 80%, transparent)",
              }}
            >
              <CircleHelp size={17} className="text-[#F08000]" />
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#F08000]">
                FAQ
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-4xl border p-6"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                }}
              >
                <h3 className="text-lg font-black">{faq.question}</h3>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}