import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

export default function BlogDetailsHero({ blog }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-black text-[#0080E0] transition duration-300 hover:text-[#F08000]"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div
              className="inline-flex items-center rounded-full border px-5 py-2"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in srgb, var(--card) 80%, transparent)",
              }}
            >
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                {blog.category}
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              {blog.title}
            </h1>

            <p
              className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {blog.excerpt}
            </p>

            <div
              className="mt-6 flex flex-wrap items-center gap-5 text-sm font-bold"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} className="text-[#0080E0]" />
                {blog.date}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock size={17} className="text-[#F08000]" />
                {blog.readTime}
              </span>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-4xl border p-3"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--card) 90%, transparent)",
              boxShadow: "0 24px 80px rgba(0, 128, 224, 0.1)",
            }}
          >
            <div className="relative aspect-6/4 w-full overflow-hidden rounded-3xl">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}