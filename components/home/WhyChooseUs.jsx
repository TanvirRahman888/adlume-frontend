const items = [
  ["Result Focused", "We focus on reach, engagement, leads, and growth."],
  ["Creative Strategy", "Every campaign is planned with design and audience in mind."],
  ["Transparent Reporting", "You get clear updates and performance insights."],
  ["Reliable Partner", "We work with you step by step to grow your brand."],
];

export default function WhyChooseUs() {
  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-10"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#F0B000]">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            We Don’t Just Do Marketing, We Drive Growth.
          </h2>
          <p
            className="mt-5 leading-8"
            style={{ color: "var(--text-muted)" }}
          >
            Adlume Media combines creativity, strategy, and performance to help
            your business look professional and reach the right customers.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border p-6"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              <h3 className="text-xl font-black">{title}</h3>
              <p
                className="mt-3 leading-7"
                style={{ color: "var(--text-muted)" }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}