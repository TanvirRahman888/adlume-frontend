"use client";

import { useState } from "react";
import PortfolioCard from "./PortfolioCard";

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

const categories = [
  "All Projects",
  "Social Media Design",
  "Facebook Ad Campaign",
  "Website Design",
  "Website Development",
  "Landing Page Design",
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

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
              Project Gallery
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Selected{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Creative Projects
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            A collection of designs and digital assets created for campaigns,
            websites, brands, and online business growth.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="rounded-full border px-5 py-2 text-sm font-black transition duration-300 hover:-translate-y-1"
                style={{
                  borderColor: isActive ? "#00B0F0" : "var(--border)",
                  background: isActive
                    ? "linear-gradient(90deg, #0080E0, #00B0F0)"
                    : "var(--card)",
                  color: isActive ? "#FFFFFF" : "var(--text)",
                  boxShadow: isActive
                    ? "0 12px 30px rgba(0, 176, 240, 0.25)"
                    : "none",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p
          className="mt-6 text-center text-sm font-bold"
          style={{ color: "var(--text-muted)" }}
        >
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {filteredProjects.map((project) => (
            <PortfolioCard
              key={project.title}
              title={project.title}
              category={project.category}
              image={project.image}
              href={project.href}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div
            className="mt-14 rounded-4xl border p-10 text-center"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <h3 className="text-2xl font-black">No projects found</h3>

            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              No portfolio items are available in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}