import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-10">
      <div className="rounded-4xl bg-linear-to-r from-[#0080E0] via-[#001B46] to-[#F08000] p-px">
        <div
          className="rounded-4xl p-8 text-center md:p-14"
          style={{ background: "var(--background)" }}
        >
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to Grow Your Business Online?
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl leading-8"
            style={{ color: "var(--text-muted)" }}
          >
            Let’s build your brand, increase visibility, and bring more
            customers to your business.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white"
            >
              Get Free Consultation
            </Link>

            <a
              href="https://wa.me/8801761784780"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#F08000] to-[#F0B000] px-7 text-sm font-black text-[#000513]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}