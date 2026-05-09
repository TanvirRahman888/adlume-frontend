export default function AboutStory() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0080E0]">
              Our Story
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              Built to Help Small and Growing Brands Win Online.
            </h2>
          </div>

          <div
            className="rounded-4xl border p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <p
              className="text-base text-justify leading-8"
              style={{ color: "var(--text-muted)" }}
            >
              Adlume Media was created to help businesses build a stronger
              digital presence without confusion. Many brands know they need
              marketing, better content, ads, or a website, but they do not
              always know where to start.
            </p>

            <p
              className="mt-5 text-base text-justify leading-8"
              style={{ color: "var(--text-muted)" }}
            >
              Our goal is to make digital growth simple, clear, and
              result-focused. We help businesses present themselves
              professionally, reach the right audience, and turn attention into
              real inquiries, messages, leads, and customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}