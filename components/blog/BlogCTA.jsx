import Link from "next/link";

export default function BlogCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div
          className="relative overflow-hidden rounded-4xl border px-6 py-12 text-center md:px-10"
          style={{
            borderColor: "var(--border)",
            background: "var(--card)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-[#0080E0]/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-[#F08000]/15 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Need a Strategy for Your Business Growth?
            </h2>

            <p
              className="mx-auto mt-5 max-w-2xl text-base leading-8"
              style={{ color: "var(--text-muted)" }}
            >
              Let’s discuss your business and create a clear digital marketing
              plan to help you get seen, clicked, and chosen.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
              >
                Get Free Consultation
              </Link>

              <Link
                href="https://wa.me/8801761784780?text=Hello%20Adlume%20Media%2C%20I%20want%20a%20digital%20marketing%20strategy%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#F08000] to-[#F0B000] px-7 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105"
              >
                WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}