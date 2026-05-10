"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ServicePreviewCard from "./ServicePreviewCard";

export default function ServicesPreview() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchFeaturedServices() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services?featured=true`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch services.");
        }

        setServices(data.services || []);
      } catch (error) {
        setErrorMessage(
          error.message || "Something went wrong while loading services."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedServices();
  }, []);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />
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
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
              Our Services
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Complete Digital Solutions for{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Business Growth
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            From digital marketing and branding to websites and lead generation,
            we help your business build a stronger online presence.
          </p>
        </div>

        {isLoading && (
          <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-7">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="min-h-87.5 animate-pulse rounded-4xl border"
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
              Failed to load services
            </h3>

            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              {errorMessage}
            </p>
          </div>
        )}

        {!isLoading && !errorMessage && services.length > 0 && (
          <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-7">
            {services.slice(0, 8).map((service) => (
              <ServicePreviewCard
                key={service._id}
                icon={service.icon}
                title={service.title}
                description={service.shortDescription}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        )}

        {!isLoading && !errorMessage && services.length === 0 && (
          <div
            className="mt-14 rounded-4xl border p-10 text-center"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <h3 className="text-2xl font-black">No services found</h3>

            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Add featured services from the backend to show them here.
            </p>
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full border px-8 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105"
            style={{
              borderColor: "transparent",
              background: "linear-gradient(90deg, #F08000, #F0B000)",
            }}
          >
            <span className="absolute inset-0 translate-y-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] transition duration-300 group-hover:translate-y-0" />
            <span className="absolute left-[-40%] top-0 h-full w-1/3 skew-x-[-20deg] bg-white/35 opacity-0 transition duration-500 group-hover:left-[120%] group-hover:opacity-100" />

            <span className="relative z-10 transition duration-300 group-hover:text-white">
              View All Services
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}