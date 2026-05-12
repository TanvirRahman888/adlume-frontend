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
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const statusOptions = [
  "all",
  "pending",
  "accepted",
  "rejected",
  "in-progress",
  "delivered",
  "revision-requested",
  "completed",
  "cancelled",
];

const actionButtons = [
  {
    label: "Accept",
    status: "accepted",
    className: "from-[#0080E0] to-[#00B0F0] text-white",
  },
  {
    label: "In Progress",
    status: "in-progress",
    className: "from-[#0080E0] to-[#00B0F0] text-white",
  },
  {
    label: "Delivered",
    status: "delivered",
    className: "from-[#00B0F0] to-[#0080E0] text-white",
  },
  {
    label: "Reject",
    status: "rejected",
    className: "from-[#F08000] to-[#F0B000] text-[#000513]",
  },
  {
    label: "Cancel",
    status: "cancelled",
    className: "from-[#F08000] to-[#F0B000] text-[#000513]",
  },
];

export default function ManageOrdersPage() {
  const router = useRouter();
  const { getToken, isAuthLoading, isLoggedIn, isAdmin, isManager, role } =
    useAuth();

  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [note, setNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [message, setMessage] = useState(null);

  const canManageOrders = isAdmin || isManager;

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login?redirect=/dashboard/manage-orders");
    }

    if (!isAuthLoading && isLoggedIn && !canManageOrders) {
      router.push("/dashboard");
    }
  }, [isAuthLoading, isLoggedIn, canManageOrders, router]);

  useEffect(() => {
    if (isLoggedIn && canManageOrders) {
      fetchOrders();
    }
  }, [isLoggedIn, canManageOrders, statusFilter]);

  async function fetchOrders() {
    try {
      setIsLoading(true);
      setMessage(null);

      const token = await getToken();
      const query = statusFilter === "all" ? "" : `?status=${statusFilter}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch orders.");
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

  async function handleStatusUpdate(orderId, status) {
    try {
      setUpdatingId(orderId);
      setMessage(null);

      const token = await getToken();

      const body = {
        status,
      };

      if (role === "manager") {
        body.managerNote = note;
      }

      if (role === "admin") {
        body.adminNote = note;
      }

      if (status === "rejected") {
        body.rejectionReason = rejectionReason || "Order rejected.";
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update order.");
      }

      setNote("");
      setRejectionReason("");

      setMessage({
        type: "success",
        text: data.message || "Order updated successfully.",
      });

      await fetchOrders();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update order.",
      });
    } finally {
      setUpdatingId("");
    }
  }

  if (isAuthLoading || (isLoggedIn && !canManageOrders)) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
          <Loader2 size={20} className="animate-spin" />
          Loading manage orders...
        </div>
      </main>
    );
  }

  if (!isLoggedIn || !canManageOrders) {
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
                <ShieldCheck size={17} className="text-[#00B0F0]" />

                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                  {role} Panel
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Manage Orders
              </h1>

              <p
                className="mt-4 max-w-2xl text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                Review client orders, update status, deliver work, and manage
                project progress.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-12 rounded-2xl border px-4 text-sm font-black capitalize outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background-secondary)",
                }}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Orders" : status}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={fetchOrders}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-6 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
              >
                <RefreshCcw size={18} />
                Refresh
              </button>
            </div>
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
            Loading orders...
          </div>
        ) : orders.length > 0 ? (
          <div className="mt-10 grid gap-6">
            {orders.map((order) => (
              <ManageOrderCard
                key={order._id}
                order={order}
                note={note}
                setNote={setNote}
                rejectionReason={rejectionReason}
                setRejectionReason={setRejectionReason}
                updatingId={updatingId}
                onStatusUpdate={handleStatusUpdate}
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
              No orders match the selected filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function ManageOrderCard({
  order,
  note,
  setNote,
  rejectionReason,
  setRejectionReason,
  updatingId,
  onStatusUpdate,
}) {
  const statusConfig = getStatusConfig(order.status);
  const Icon = statusConfig.icon;
  const isUpdating = updatingId === order._id;

  return (
    <div
      className="rounded-4xl border p-6"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--card) 92%, transparent)",
      }}
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
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
            <InfoBox label="Client" value={order.userId?.name} />
            <InfoBox label="Email" value={order.contactEmail} />
            <InfoBox label="Phone" value={order.contactPhone} />
            <InfoBox label="Business" value={order.businessName} />
            <InfoBox label="Price" value={order.selectedPackage?.price} />
            <InfoBox label="Deadline" value={order.deadline || "Not set"} />
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

          {order.requirements && (
            <p
              className="mt-4 rounded-3xl border p-5 text-sm leading-7"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              Requirements: {order.requirements}
            </p>
          )}

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

        <div
          className="rounded-4xl border p-5"
          style={{
            borderColor: "var(--border)",
            background: "var(--background-secondary)",
          }}
        >
          <h3 className="text-xl font-black">Update Order</h3>

          <p
            className="mt-3 text-sm leading-7"
            style={{ color: "var(--text-muted)" }}
          >
            Add a note and update this order status.
          </p>

          <div className="mt-5">
            <label className="text-sm font-black">Note</label>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              placeholder="Write manager/admin note..."
              className="mt-2 w-full resize-none rounded-3xl border p-4 text-sm leading-7 outline-none transition focus:border-[#00B0F0]"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-black">Rejection Reason</label>

            <textarea
              value={rejectionReason}
              onChange={(event) => setRejectionReason(event.target.value)}
              rows={3}
              placeholder="Only needed if rejecting order..."
              className="mt-2 w-full resize-none rounded-3xl border p-4 text-sm leading-7 outline-none transition focus:border-[#F08000]"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {actionButtons.map((action) => (
              <button
                key={action.status}
                type="button"
                onClick={() => onStatusUpdate(order._id, action.status)}
                disabled={isUpdating}
                className={`inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r px-5 text-sm font-black shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 ${action.className}`}
              >
                {isUpdating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  action.label
                )}
              </button>
            ))}
          </div>

          <Link
            href={`/dashboard/orders/${order._id}`}
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border px-5 text-sm font-black transition duration-300 hover:text-[#00B0F0]"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            View Full Details
          </Link>
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

      <p className="mt-2 break-words text-sm font-black capitalize">
        {value || "N/A"}
      </p>
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