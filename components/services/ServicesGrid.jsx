"use client";

import { useEffect, useState } from "react";
import ServicePageCard from "./ServicePageCard";

export default function ServicesGrid() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
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

    fetchServices();
  }, []);

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
              What We Offer
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Services Designed for{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Real Growth
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Choose the right service for your business or combine multiple
            solutions for a complete digital growth system.
          </p>
        </div>

        {isLoading && (
          <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-7">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="min-h-97.5 animate-pulse rounded-4xl border"
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
            {services.map((service) => (
              <ServicePageCard
                key={service._id}
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                href={`/services/${service.slug}`}
                points={service.features?.slice(0, 3) || []}
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
              No service items are available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}