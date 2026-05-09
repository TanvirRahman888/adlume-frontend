import Image from "next/image";
import Link from "next/link";

export default function PortfolioCard({
  title,
  category,
  image,
  href = "/portfolio",
}) {
  return (
    <Link href={href} className="group block h-full">
      <div
        className="relative h-full overflow-hidden rounded-4xl border p-3 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--card) 92%, transparent)",
          boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
        }}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00B0F0]/0 blur-3xl transition duration-300 group-hover:bg-[#00B0F0]/25" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F08000]/0 blur-3xl transition duration-300 group-hover:bg-[#F08000]/20" />

        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#00B0F0] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-[#F08000] to-transparent" />
        </div>

        <div className="relative overflow-hidden rounded-[1.45rem]">
          <div className="relative aspect-6/4 w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#000513]/80 via-[#000513]/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

            <div className="absolute left-4 top-4 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#000513]">
                {category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-lg font-black leading-snug text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <div className="relative px-2 pb-3 pt-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0080E0]">
            {category}
          </p>

          <h3 className="mt-2 text-xl font-black leading-snug transition duration-300 group-hover:text-[#00B0F0]">
            {title}
          </h3>

          <div className="mt-5 h-1.5 w-14 rounded-full bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] transition duration-300 group-hover:w-24" />
        </div>
      </div>
    </Link>
  );
}