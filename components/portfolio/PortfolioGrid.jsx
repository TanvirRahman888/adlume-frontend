"use client";

import { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";

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
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const query =
          activeCategory === "All Projects"
            ? ""
            : `?category=${encodeURIComponent(activeCategory)}`;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects${query}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch projects.");
        }

        setProjects(data.projects || []);
      } catch (error) {
        setErrorMessage(
          error.message || "Something went wrong while loading projects."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [activeCategory]);

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
          {isLoading
            ? "Loading projects..."
            : `Showing ${projects.length} ${
                projects.length === 1 ? "project" : "projects"
              }`}
        </p>

        {errorMessage && (
          <div
            className="mx-auto mt-10 max-w-2xl rounded-4xl border p-6 text-center"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <h3 className="text-xl font-black text-[#F08000]">
              Failed to load projects
            </h3>

            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              {errorMessage}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-105 animate-pulse rounded-4xl border"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in srgb, var(--card) 85%, transparent)",
                }}
              />
            ))}
          </div>
        )}

        {!isLoading && !errorMessage && projects.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
            {projects.map((project) => (
              <PortfolioCard
                key={project._id}
                title={project.title}
                category={project.category}
                image={project.image}
                href={`/portfolio/${project.slug}`}
              />
            ))}
          </div>
        )}

        {!isLoading && !errorMessage && projects.length === 0 && (
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