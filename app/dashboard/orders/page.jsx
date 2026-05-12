"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function MyOrdersPage() {
  const router = useRouter();
  const { getToken, isAuthLoading, isLoggedIn } = useAuth();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login?redirect=/dashboard/orders");
    }
  }, [isAuthLoading, isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMyOrders();
    }
  }, [isLoggedIn]);

  async function fetchMyOrders() {
    try {
      setIsLoading(true);
      setMessage(null);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch your orders.");
      }

      setOrders(data.orders || []);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to load orders.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAcceptDelivery(orderId) {
    try {
      setMessage(null);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/accept-delivery`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to accept delivery.");
      }

      setMessage({
        type: "success",
        text: data.message || "Delivery accepted successfully.",
      });

      await fetchMyOrders();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to accept delivery.",
      });
    }
  }

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
          <Loader2 size={20} className="animate-spin" />
          Loading orders...
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
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-black text-[#0080E0] transition duration-300 hover:text-[#F08000]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div
          className="mt-8 rounded-4xl border p-6 md:p-8"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--card) 92%, transparent)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2">
                <PackageCheck size={17} className="text-[#00B0F0]" />

                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                  My Orders
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Your Project Orders
              </h1>

              <p
                className="mt-4 max-w-2xl text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                Track your submitted orders, project status, delivery updates,
                and completion progress.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchMyOrders}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-6 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>
        </div>

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

        {isLoading ? (
          <div className="mt-10 flex items-center gap-3 text-sm font-black text-[#00B0F0]">
            <Loader2 size={18} className="animate-spin" />
            Loading your orders...
          </div>
        ) : orders.length > 0 ? (
          <div className="mt-10 grid gap-6">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onAcceptDelivery={handleAcceptDelivery}
              />
            ))}
          </div>
        ) : (
          <div
            className="mt-10 rounded-4xl border p-10 text-center"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <h2 className="text-2xl font-black">No orders found</h2>

            <p
              className="mx-auto mt-3 max-w-xl text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              You have not placed any orders yet. Choose a service package and
              place your first order.
            </p>

            <Link
              href="/services"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
            >
              Browse Services
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function OrderCard({ order, onAcceptDelivery }) {
  const statusConfig = getStatusConfig(order.status);
  const Icon = statusConfig.icon;

  return (
    <div
      className="rounded-4xl border p-6"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--card) 92%, transparent)",
      }}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-black"
            style={{
              color: statusConfig.color,
              background: `${statusConfig.color}18`,
            }}
          >
            <Icon size={17} />
            {statusConfig.label}
          </div>

          <h2 className="mt-5 text-2xl font-black">{order.projectTitle}</h2>

          <p
            className="mt-2 text-sm leading-7"
            style={{ color: "var(--text-muted)" }}
          >
            Order:{" "}
            <span className="font-black text-[#00B0F0]">
              {order.orderNumber}
            </span>{" "}
            · Service: {order.serviceTitle} · Package:{" "}
            {order.selectedPackage?.name}
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoBox label="Price" value={order.selectedPackage?.price} />
            <InfoBox label="Billing" value={order.selectedPackage?.billingType} />
            <InfoBox label="Business" value={order.businessName} />
          </div>

          <p
            className="mt-5 rounded-3xl border p-5 text-sm leading-7"
            style={{
              color: "var(--text-muted)",
              borderColor: "var(--border)",
              background: "var(--background-secondary)",
            }}
          >
            {order.projectDescription}
          </p>

          {order.managerNote && (
            <p
              className="mt-4 rounded-3xl border p-5 text-sm leading-7"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              Manager note: {order.managerNote}
            </p>
          )}

          {order.adminNote && (
            <p
              className="mt-4 rounded-3xl border p-5 text-sm leading-7"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              Admin note: {order.adminNote}
            </p>
          )}

          {order.rejectionReason && (
            <p className="mt-4 rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-sm font-bold leading-7 text-red-500">
              Rejection reason: {order.rejectionReason}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 lg:max-w-xs">
          <Link
            href={`/dashboard/orders/${order._id}`}
            className="inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-black transition duration-300 hover:text-[#00B0F0]"
            style={{
              borderColor: "var(--border)",
              background: "var(--background-secondary)",
            }}
          >
            View Details
          </Link>

          {order.status === "delivered" && (
            <button
              type="button"
              onClick={() => onAcceptDelivery(order._id)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-5 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
            >
              Accept Delivery
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div
      className="rounded-3xl border p-4"
      style={{
        borderColor: "var(--border)",
        background: "var(--card)",
      }}
    >
      <p
        className="text-xs font-black uppercase tracking-[0.16em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>

      <p className="mt-2 text-sm font-black capitalize">{value || "N/A"}</p>
    </div>
  );
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