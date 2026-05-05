import Image from "next/image";
import Link from "next/link";

export default function RecentProjectsCard({
  title,
  category,
  image,
  href = "/portfolio",
}) {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-2xl shadow-md transition duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
        <div className="relative h-64 overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/25" />

          <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="rounded-full bg-white/90 px-3 py-1 text-center text-xs font-black text-[#000513]">
              View Project
            </p>
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-center text-sm font-black">{category}</h3>
    </Link>
  );
}