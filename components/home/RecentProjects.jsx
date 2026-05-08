import Link from "next/link";
import RecentProjectsCard from "./RecentProjectsCard";

const projects = [
  {
    title: "Fresh & Healthy Food Design",
    category: "Social Media Design",
    image: "/images/projects/project-1.png",
    href: "/portfolio",
  },
  {
    title: "Shoe Sale Campaign",
    category: "Facebook Ad Campaign",
    image: "/images/projects/project-2.png",
    href: "/portfolio",
  },
  {
    title: "Interior Design Website",
    category: "Website Design",
    image: "/images/projects/project-3.png",
    href: "/portfolio",
  },
  {
    title: "Burger Weekend Special",
    category: "Social Media Design",
    image: "/images/projects/project-4.png",
    href: "/portfolio",
  },
  {
    title: "Travel Website Design",
    category: "Website Development",
    image: "/images/projects/project-5.png",
    href: "/portfolio",
  },
  {
    title: "Digital Marketing Landing Page",
    category: "Landing Page Design",
    image: "/images/projects/project-6.png",
    href: "/portfolio",
  },
];

export default function RecentProjects() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B0F0]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex items-center justify-center rounded-full border px-5 py-2"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--card) 80%, transparent)",
            }}
          >
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0080E0]">
              Our Work
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Recent{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Some of our latest creative work designed to build trust, attract
            attention, and deliver real business results.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {projects.map((project) => (
            <RecentProjectsCard
              key={project.title}
              title={project.title}
              category={project.category}
              image={project.image}
              href={project.href}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/portfolio"
            className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full border px-8 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105"
            style={{
              borderColor: "transparent",
              background: "linear-gradient(90deg, #F08000, #F0B000)",
            }}
          >
            <span className="absolute inset-0 translate-y-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] transition duration-300 group-hover:translate-y-0" />
            <span className="absolute left-[-40%] top-0 h-full w-1/3 skew-x-[-20deg] bg-white/35 opacity-0 transition duration-500 group-hover:left-[120%] group-hover:opacity-100" />

            <span className="relative z-10 transition duration-300 group-hover:text-white">
              View All Projects
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}