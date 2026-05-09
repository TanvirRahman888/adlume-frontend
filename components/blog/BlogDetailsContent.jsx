export default function BlogDetailsContent({ blog }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0080E0]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <article
          className="mx-auto max-w-4xl rounded-4xl border p-6 md:p-10"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--card) 92%, transparent)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          {blog.content.map((section, index) => (
            <div
              key={section.heading}
              className={index !== 0 ? "mt-10 border-t pt-10" : ""}
              style={{
                borderColor: index !== 0 ? "var(--border)" : "transparent",
              }}
            >
              <h2 className="text-2xl font-black leading-tight md:text-3xl">
                {section.heading}
              </h2>

              <p
                className="mt-4 text-base leading-8 md:text-lg"
                style={{ color: "var(--text-muted)" }}
              >
                {section.text}
              </p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}