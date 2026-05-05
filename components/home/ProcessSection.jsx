const steps = [
  ["01", "Discover", "We learn about your business, goals, and audience."],
  ["02", "Strategy", "We create a custom plan for growth."],
  ["03", "Create", "We design content, ads, branding, and web assets."],
  ["04", "Launch", "We publish campaigns and start reaching your audience."],
  ["05", "Grow", "We analyze, improve, and scale your results."],
];

export default function ProcessSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
          Our Process
        </p>
        <h2 className="mt-4 text-4xl font-black md:text-5xl">
          Our 5-Step Process to Success
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-5">
        {steps.map(([number, title, text]) => (
          <div
            key={title}
            className="rounded-3xl border p-6"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <p className="text-sm font-black text-[#F08000]">{number}</p>
            <h3 className="mt-4 text-xl font-black">{title}</h3>
            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}