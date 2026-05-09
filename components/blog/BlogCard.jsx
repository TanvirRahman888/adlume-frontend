import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

export default function BlogCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <article
        className="relative flex h-full min-h-115 flex-col overflow-hidden rounded-4xl border p-3 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--card) 92%, transparent)",
          boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
        }}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00B0F0]/0 blur-3xl transition duration-300 group-hover:bg-[#00B0F0]/25" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F08000]/0 blur-3xl transition duration-300 group-hover:bg-[#F08000]/20" />

        <div className="relative overflow-hidden rounded-[1.45rem]">
          <div className="relative aspect-6/4 w-full overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#000513]">
                {blog.category}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col px-2 pb-3 pt-5">
          <div
            className="flex flex-wrap items-center gap-4 text-xs font-bold"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              {blog.date}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {blog.readTime}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-black leading-snug transition duration-300 group-hover:text-[#00B0F0]">
            {blog.title}
          </h3>

          <p
            className="mt-4 text-sm leading-7"
            style={{ color: "var(--text-muted)" }}
          >
            {blog.excerpt}
          </p>

          <div className="mt-auto pt-8">
            <div className="inline-flex items-center gap-2 text-sm font-black text-[#F08000] transition duration-300 group-hover:gap-3 group-hover:text-[#00B0F0]">
              Read Article
              <ArrowRight
                size={18}
                className="transition duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}