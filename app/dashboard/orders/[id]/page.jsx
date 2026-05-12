"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Loader2,
  PackageCheck,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { getToken, isAuthLoading, isLoggedIn } = useAuth();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [message, setMessage] = useState(null);
  const [revisions, setRevisions] = useState([]);
  const [revisionMessage, setRevisionMessage] = useState("");
  const [isRequestingRevision, setIsRequestingRevision] = useState(false);

  const orderId = params.id;

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push(`/login?redirect=/dashboard/orders/${orderId}`);
    }
  }, [isAuthLoading, isLoggedIn, router, orderId]);

  useEffect(() => {
    if (isLoggedIn && orderId) {
      fetchOrderDetails();
      fetchRevisions();
    }
  }, [isLoggedIn, orderId]);

  async function fetchOrderDetails() {
    try {
      setIsLoading(true);
      setMessage(null);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch order details.");
      }

      setOrder(data.order);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to load order details.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRevisions() {
    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/revisions/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch revisions.");
      }

      setRevisions(data.revisions || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAcceptDelivery() {
    try {
      setIsAccepting(true);
      setMessage(null);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/accept-delivery`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to accept delivery.");
      }

      setMessage({
        type: "success",
        text: data.message || "Delivery accepted successfully.",
      });

      await fetchOrderDetails();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to accept delivery.",
      });
    } finally {
      setIsAccepting(false);
    }
  }

  async function handleRequestRevision(event) {
    event.preventDefault();

    try {
      setIsRequestingRevision(true);
      setMessage(null);

      if (revisionMessage.trim().length < 10) {
        throw new Error("Revision message must be at least 10 characters.");
      }

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/revisions/orders/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: revisionMessage,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to request revision.");
      }

      setRevisionMessage("");

      setMessage({
        type: "success",
        text: data.message || "Revision request submitted successfully.",
      });

      await fetchOrderDetails();
      await fetchRevisions();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to request revision.",
      });
    } finally {
      setIsRequestingRevision(false);
    }
  }

  if (isAuthLoading || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
          <Loader2 size={20} className="animate-spin" />
          Loading order details...
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  if (!order) {
    return (
      <main className="relative min-h-screen overflow-hidden py-20 sm:py-24">
        <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 text-sm font-black text-[#0080E0] transition duration-300 hover:text-[#F08000]"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>

          <div
            className="mt-8 rounded-4xl border p-10 text-center"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <h1 className="text-3xl font-black">Order not found</h1>

            {message && (
              <p className="mt-4 text-sm font-bold text-red-500">
                {message.text}
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <main className="relative min-h-screen overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-sm font-black text-[#0080E0] transition duration-300 hover:text-[#F08000]"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <section
          className="mt-8 rounded-4xl border p-6 md:p-8"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--card) 92%, transparent)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div
                className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-black"
                style={{
                  color: statusConfig.color,
                  background: `${statusConfig.color}18`,
                }}
              >
                <StatusIcon size={17} />
                {statusConfig.label}
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                {order.projectTitle}
              </h1>

              <p
                className="mt-4 max-w-2xl text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                Order Number:{" "}
                <span className="font-black text-[#00B0F0]">
                  {order.orderNumber}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={fetchOrderDetails}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-black transition duration-300 hover:text-[#00B0F0]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background-secondary)",
                }}
              >
                <RefreshCcw size={18} />
                Refresh
              </button>

              {order.status === "delivered" && (
                <button
                  type="button"
                  onClick={handleAcceptDelivery}
                  disabled={isAccepting}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-6 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isAccepting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Accepting...
                    </>
                  ) : (
                    "Accept Delivery"
                  )}
                </button>
              )}
            </div>
          </div>
        </section>

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

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-8">
            <DetailsBlock title="Project Description">
              <p
                className="text-sm leading-7"
                style={{ color: "var(--text-muted)" }}
              >
                {order.projectDescription}
              </p>
            </DetailsBlock>

            {order.requirements && (
              <DetailsBlock title="Special Requirements">
                <p
                  className="text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  {order.requirements}
                </p>
              </DetailsBlock>
            )}
            {order.status === "delivered" && (
              <DetailsBlock title="Request Revision">
                <form onSubmit={handleRequestRevision}>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    If the delivery needs changes, explain the revision clearly
                    before accepting the delivery.
                  </p>

                  <textarea
                    value={revisionMessage}
                    onChange={(event) => setRevisionMessage(event.target.value)}
                    rows={5}
                    placeholder="Write your revision request..."
                    className="mt-4 w-full resize-none rounded-3xl border p-4 text-sm leading-7 outline-none transition focus:border-[#F08000]"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--background-secondary)",
                    }}
                    required
                  />

                  {message && (
                    <div
                      className={`mt-4 rounded-2xl border p-4 text-sm font-bold ${
                        message.type === "success"
                          ? "border-green-500/30 bg-green-500/10 text-green-600"
                          : "border-red-500/30 bg-red-500/10 text-red-500"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isRequestingRevision}
                    className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#F08000] to-[#F0B000] px-7 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isRequestingRevision ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending Revision...
                      </>
                    ) : (
                      "Request Revision"
                    )}
                  </button>
                </form>
              </DetailsBlock>
            )}

            {revisions.length > 0 && (
              <DetailsBlock title="Revision History">
                <div className="grid gap-4">
                  {revisions.map((revision) => (
                    <div
                      key={revision._id}
                      className="rounded-3xl border p-5"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--background-secondary)",
                      }}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-black capitalize text-[#00B0F0]">
                          {revision.status}
                        </p>

                        <p
                          className="text-xs font-bold"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {formatDate(revision.createdAt)}
                        </p>
                      </div>

                      <p
                        className="mt-4 text-sm leading-7"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {revision.message}
                      </p>

                      {revision.responseNote && (
                        <p
                          className="mt-4 rounded-2xl border p-4 text-sm leading-7"
                          style={{
                            color: "var(--text-muted)",
                            borderColor: "var(--border)",
                            background: "var(--card)",
                          }}
                        >
                          Team response: {revision.responseNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </DetailsBlock>
            )}

            {(order.managerNote ||
              order.adminNote ||
              order.rejectionReason) && (
              <DetailsBlock title="Team Notes">
                <div className="grid gap-4">
                  {order.managerNote && (
                    <NoteBox label="Manager Note" value={order.managerNote} />
                  )}

                  {order.adminNote && (
                    <NoteBox label="Admin Note" value={order.adminNote} />
                  )}

                  {order.rejectionReason && (
                    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-sm font-bold leading-7 text-red-500">
                      Rejection Reason: {order.rejectionReason}
                    </div>
                  )}
                </div>
              </DetailsBlock>
            )}
          </div>

          <aside className="grid gap-6">
            <DetailsBlock title="Service Package">
              <div className="grid gap-4">
                <InfoBox label="Service" value={order.serviceTitle} />
                <InfoBox label="Package" value={order.selectedPackage?.name} />
                <InfoBox label="Price" value={order.selectedPackage?.price} />
                <InfoBox
                  label="Billing"
                  value={order.selectedPackage?.billingType}
                />
              </div>
            </DetailsBlock>

            <DetailsBlock title="Business & Contact">
              <div className="grid gap-4">
                <InfoBox label="Business" value={order.businessName} />
                <InfoBox label="Country" value={order.country} />
                <InfoBox label="Phone" value={order.contactPhone} />
                <InfoBox label="Email" value={order.contactEmail} />
              </div>
            </DetailsBlock>

            <DetailsBlock title="Timeline">
              <div className="grid gap-4">
                <InfoBox label="Preferred Deadline" value={order.deadline} />
                <InfoBox label="Budget Note" value={order.budgetNote} />
                <InfoBox label="Created" value={formatDate(order.createdAt)} />
                <InfoBox
                  label="Delivered"
                  value={formatDate(order.deliveredAt)}
                />
                <InfoBox
                  label="Completed"
                  value={formatDate(order.completedAt)}
                />
              </div>
            </DetailsBlock>
          </aside>
        </section>
      </div>
    </main>
  );
}

function DetailsBlock({ title, children }) {
  return (
    <div
      className="rounded-4xl border p-6"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--card) 92%, transparent)",
      }}
    >
      <h2 className="text-2xl font-black">{title}</h2>

      <div className="mt-5">{children}</div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div
      className="rounded-3xl border p-4"
      style={{
        borderColor: "var(--border)",
        background: "var(--background-secondary)",
      }}
    >
      <p
        className="text-xs font-black uppercase tracking-[0.16em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-black capitalize">
        {value || "N/A"}
      </p>
    </div>
  );
}

function NoteBox({ label, value }) {
  return (
    <div
      className="rounded-3xl border p-5"
      style={{
        borderColor: "var(--border)",
        background: "var(--background-secondary)",
      }}
    >
      <p className="text-sm font-black">{label}</p>

      <p
        className="mt-3 text-sm leading-7"
        style={{ color: "var(--text-muted)" }}
      >
        {value}
      </p>
    </div>
  );
}

function formatDate(date) {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getStatusConfig(status) {
  const statuses = {
    pending: {
      label: "Pending",
      color: "#F0B000",
      icon: Clock3,
    },
    accepted: {
      label: "Accepted",
      color: "#00B0F0",
      icon: CheckCircle2,
    },
    rejected: {
      label: "Rejected",
      color: "#F08000",
      icon: XCircle,
    },
    "in-progress": {
      label: "In Progress",
      color: "#0080E0",
      icon: RefreshCcw,
    },
    delivered: {
      label: "Delivered",
      color: "#00B0F0",
      icon: PackageCheck,
    },
    "revision-requested": {
      label: "Revision Requested",
      color: "#F08000",
      icon: RefreshCcw,
    },
    completed: {
      label: "Completed",
      color: "#00B0F0",
      icon: CheckCircle2,
    },
    cancelled: {
      label: "Cancelled",
      color: "#F08000",
      icon: XCircle,
    },
  };

  return statuses[status] || statuses.pending;
}
