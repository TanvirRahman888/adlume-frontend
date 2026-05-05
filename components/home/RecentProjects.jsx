import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <section className="py-20">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0080E0]">
            Our Work
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Recent Projects
          </h2>

          <p
            className="mt-4 text-sm leading-7 md:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Some of our latest work that delivered real results.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border px-7 text-sm font-black transition hover:border-[#0080E0] hover:text-[#0080E0]"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--text)",
            }}
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
