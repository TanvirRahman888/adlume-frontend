"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  PackageCheck,
  Send,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function OrderPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceSlug = searchParams.get("service") || "";
  const packageName = searchParams.get("package") || "";

  const { dbUser, getToken, isAuthLoading, isLoggedIn } = useAuth();

  const [service, setService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoadingService, setIsLoadingService] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    projectTitle: "",
    businessName: "",
    contactPhone: "",
    contactEmail: "",
    country: "",
    projectDescription: "",
    requirements: "",
    deadline: "",
    budgetNote: "",
  });

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/order?service=${serviceSlug}&package=${packageName}`
        )}`
      );
    }
  }, [isAuthLoading, isLoggedIn, router, serviceSlug, packageName]);

  useEffect(() => {
    if (dbUser?.email) {
      setFormData((prev) => ({
        ...prev,
        contactEmail: prev.contactEmail || dbUser.email,
      }));
    }
  }, [dbUser]);

  useEffect(() => {
    async function fetchService() {
      try {
        setIsLoadingService(true);
        setMessage(null);

        if (!serviceSlug || !packageName) {
          throw new Error("Service or package information is missing.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceSlug}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load service.");
        }

        const serviceData = data.service;

        const matchedPackage = serviceData.packages?.find(
          (item) => item.name.toLowerCase() === packageName.toLowerCase()
        );

        if (!matchedPackage) {
          throw new Error("Selected package was not found for this service.");
        }

        setService(serviceData);
        setSelectedPackage(matchedPackage);
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message || "Failed to load order information.",
        });
      } finally {
        setIsLoadingService(false);
      }
    }

    fetchService();
  }, [serviceSlug, packageName]);

  const requiredFieldsFilled = useMemo(() => {
    return (
      formData.projectTitle.trim() &&
      formData.businessName.trim() &&
      formData.contactPhone.trim() &&
      formData.contactEmail.trim() &&
      formData.country.trim() &&
      formData.projectDescription.trim()
    );
  }, [formData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setMessage(null);

      if (!isLoggedIn) {
        router.push(
          `/login?redirect=${encodeURIComponent(
            `/order?service=${serviceSlug}&package=${packageName}`
          )}`
        );
        return;
      }

      if (!service?._id || !selectedPackage?.name) {
        throw new Error("Service/package data is missing.");
      }

      if (!requiredFieldsFilled) {
        throw new Error("Please complete all required fields.");
      }

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            serviceId: service._id,
            packageName: selectedPackage.name,
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to place order.");
      }

      setMessage({
        type: "success",
        text: data.message || "Order placed successfully.",
      });

      setTimeout(() => {
        router.push("/dashboard/orders");
      }, 1200);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to submit order.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAuthLoading || isLoadingService) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
          <Loader2 size={20} className="animate-spin" />
          Loading order page...
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <Link
          href={service ? `/services/${service.slug}` : "/services"}
          className="inline-flex items-center gap-2 text-sm font-black text-[#0080E0] transition duration-300 hover:text-[#F08000]"
        >
          <ArrowLeft size={18} />
          Back to Service
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.25fr] lg:items-start">
          <aside
            className="rounded-4xl border p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 92%, transparent)",
              boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2">
              <PackageCheck size={17} className="text-[#00B0F0]" />
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                Selected Package
              </p>
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              Place Your Order
            </h1>

            {service && selectedPackage && (
              <div
                className="mt-8 rounded-4xl border p-6"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background-secondary)",
                }}
              >
                <p className="text-sm font-black text-[#00B0F0]">
                  {service.title}
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  {selectedPackage.name}
                </h2>

                <div className="mt-5 flex items-end gap-2">
                  <p className="text-4xl font-black">{selectedPackage.price}</p>
                  <p
                    className="pb-1 text-sm font-bold capitalize"
                    style={{ color: "var(--text-muted)" }}
                  >
                    / {selectedPackage.billingType}
                  </p>
                </div>

                <p
                  className="mt-4 text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  {selectedPackage.description}
                </p>

                <div className="mt-6 grid gap-3">
                  {(selectedPackage.features || []).map((feature) => (
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
              </div>
            )}

            <p
              className="mt-6 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              After submitting your order, our admin or manager will review it
              and update the order status.
            </p>
          </aside>

          <section
            className="rounded-4xl border p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 92%, transparent)",
            }}
          >
            <h2 className="text-3xl font-black">Order Details</h2>

            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Fill in your project information so we can understand your
              requirements clearly.
            </p>

            {message && (
              <div
                className={`mt-6 rounded-3xl border p-5 text-sm font-bold ${
                  message.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-600"
                    : "border-red-500/30 bg-red-500/10 text-red-500"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Project Title"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  placeholder="Example: Monthly social media management"
                  required
                />

                <InputField
                  label="Business Name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your business name"
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Contact Phone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+880..."
                  required
                />

                <InputField
                  label="Contact Email"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Bangladesh"
                required
              />

              <TextAreaField
                label="Project Description"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Describe your business, goals, and what you want us to do..."
                required
              />

              <TextAreaField
                label="Special Requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Brand colors, references, target audience, design style, platform details, etc."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Preferred Deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  placeholder="Example: Within 7 days"
                />

                <InputField
                  label="Budget Note"
                  name="budgetNote"
                  value={formData.budgetNote}
                  onChange={handleChange}
                  placeholder="Any extra budget or custom requirement note"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Place Order
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="text-sm font-black">
        {label}
        {required && <span className="text-[#F08000]"> *</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border px-4 text-sm outline-none transition focus:border-[#00B0F0]"
        style={{
          borderColor: "var(--border)",
          background: "var(--background-secondary)",
        }}
        required={required}
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="text-sm font-black">
        {label}
        {required && <span className="text-[#F08000]"> *</span>}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        className="mt-2 w-full resize-none rounded-3xl border p-4 text-sm leading-7 outline-none transition focus:border-[#00B0F0]"
        style={{
          borderColor: "var(--border)",
          background: "var(--background-secondary)",
        }}
        required={required}
      />
    </div>
  );
}

function OrderPageFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
        <Loader2 size={20} className="animate-spin" />
        Loading order page...
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<OrderPageFallback />}>
      <OrderPageContent />
    </Suspense>
  );
}