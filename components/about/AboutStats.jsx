const stats = [
  {
    number: "10+",
    label: "Digital Services",
  },
  {
    number: "4+",
    label: "Growth Areas",
  },
  {
    number: "100%",
    label: "Client Focus",
  },
  {
    number: "24/7",
    label: "Online Presence Goal",
  },
];

export default function AboutStats() {
  return (
    <section
      className="relative overflow-hidden py-16"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div
          className="grid gap-4 rounded-4xl border p-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            borderColor: "var(--border)",
            background: "var(--card)",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border p-6 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
              }}
            >
              <h3 className="text-4xl font-black bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
                {stat.number}
              </h3>

              <p
                className="mt-2 text-sm font-bold"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}