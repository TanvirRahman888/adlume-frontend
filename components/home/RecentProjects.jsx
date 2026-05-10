"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecentProjectsCard from "./RecentProjectsCard";

export default function RecentProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects?featured=true`,
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

    fetchFeaturedProjects();
  }, []);

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

        {isLoading && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
            {Array.from({ length: 3 }).map((_, index) => (
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

        {errorMessage && (
          <div
            className="mx-auto mt-14 max-w-2xl rounded-4xl border p-8 text-center"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <h3 className="text-2xl font-black text-[#F08000]">
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

        {!isLoading && !errorMessage && projects.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
            {projects.slice(0, 6).map((project) => (
              <RecentProjectsCard
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
            <h3 className="text-2xl font-black">No featured projects found</h3>

            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Add featured projects from the backend to show them here.
            </p>
          </div>
        )}

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