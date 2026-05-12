import Link from "next/link";
import { CheckCircle2, PackageCheck } from "lucide-react";

export default function ServicePackages({ service }) {
  const packages = service.packages || [];

  if (!packages.length) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 80%, transparent)",
            }}
          >
            <PackageCheck size={17} className="text-[#00B0F0]" />

            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
              Packages & Pricing
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Choose the Right Package
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8"
            style={{ color: "var(--text-muted)" }}
          >
            Select a package that matches your business goal. Final cost may
            vary based on project scope and requirements.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((item) => (
            <ServicePackageCard
              key={item.name}
              serviceTitle={service.title}
              serviceSlug={service.slug}
              packageItem={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePackageCard({ serviceTitle, serviceSlug, packageItem }) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-4xl border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        borderColor: packageItem.popular ? "#00B0F0" : "var(--border)",
        background: "color-mix(in srgb, var(--card) 92%, transparent)",
        boxShadow: packageItem.popular
          ? "0 24px 80px rgba(0, 176, 240, 0.16)"
          : "0 24px 80px rgba(0, 128, 224, 0)",
      }}
    >
      {packageItem.popular && (
        <div className="absolute right-5 top-5 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
          Popular
        </div>
      )}

      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00B0F0]/0 blur-3xl transition duration-300 group-hover:bg-[#00B0F0]/20" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F08000]/0 blur-3xl transition duration-300 group-hover:bg-[#F08000]/20" />

      <div className="relative flex h-full flex-col">
        <h3 className="pr-28 text-2xl font-black">{packageItem.name}</h3>

        <p
          className="mt-3 text-sm leading-7"
          style={{ color: "var(--text-muted)" }}
        >
          {packageItem.description}
        </p>

        <div className="mt-6 flex items-end gap-2">
          <p className="text-4xl font-black md:text-5xl">{packageItem.price}</p>

          <p
            className="pb-2 text-sm font-bold capitalize"
            style={{ color: "var(--text-muted)" }}
          >
            / {packageItem.billingType}
          </p>
        </div>

        <div
          className="my-6 h-px w-full"
          style={{ background: "var(--border)" }}
        />

        <div className="grid gap-3">
          {(packageItem.features || []).map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-1 shrink-0 text-[#00B0F0]"
                strokeWidth={2.5}
              />

              <p
                className="text-sm font-bold leading-6"
                style={{ color: "var(--text-muted)" }}
              >
                {feature}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <Link
            href={`/order?service=${serviceSlug}&package=${encodeURIComponent(
              packageItem.name,
            )}`}
            className="group/button relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-[#F08000] to-[#F0B000] px-6 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 translate-y-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] transition duration-300 group-hover/button:translate-y-0" />

            <span className="relative z-10 transition duration-300 group-hover/button:text-white">
              Choose {packageItem.name}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
