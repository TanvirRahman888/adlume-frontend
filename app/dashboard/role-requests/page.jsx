"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Loader2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RoleRequestsAdminPage() {
  const router = useRouter();
  const { getToken, isAuthLoading, isLoggedIn, isAdmin, role } = useAuth();

  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState("");
  const [reviewNote, setReviewNote] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login?redirect=/dashboard/role-requests");
    }

    if (!isAuthLoading && isLoggedIn && !isAdmin) {
      router.push("/dashboard");
    }
  }, [isAuthLoading, isLoggedIn, isAdmin, router]);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      fetchRoleRequests();
    }
  }, [isLoggedIn, isAdmin, statusFilter]);

  async function fetchRoleRequests() {
    try {
      setIsLoading(true);
      setMessage(null);

      const token = await getToken();

      const query = statusFilter === "all" ? "" : `?status=${statusFilter}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/role-requests${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch role requests.");
      }

      setRequests(data.requests || []);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to load role requests.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReview(requestId, status) {
    try {
      setReviewingId(requestId);
      setMessage(null);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/role-requests/${requestId}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            reviewNote,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to review request.");
      }

      setReviewNote("");
      setMessage({
        type: "success",
        text: data.message || "Role request reviewed successfully.",
      });

      await fetchRoleRequests();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to review request.",
      });
    } finally {
      setReviewingId("");
    }
  }

  if (isAuthLoading || (isLoggedIn && !isAdmin && role !== "admin")) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
          <Loader2 size={20} className="animate-spin" />
          Loading role requests...
        </div>
      </main>
    );
  }

  if (!isLoggedIn || !isAdmin) {
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
                  Admin Panel
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Role Requests
              </h1>

              <p
                className="mt-4 max-w-2xl text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                Review user requests to become managers and manager requests to
                become admins.
              </p>
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-12 rounded-2xl border px-4 text-sm font-black outline-none"
              style={{
                borderColor: "var(--border)",
                background: "var(--background-secondary)",
              }}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
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
            Loading requests...
          </div>
        ) : requests.length > 0 ? (
          <div className="mt-10 grid gap-6">
            {requests.map((request) => (
              <RoleRequestAdminCard
                key={request._id}
                request={request}
                reviewingId={reviewingId}
                reviewNote={reviewNote}
                setReviewNote={setReviewNote}
                onReview={handleReview}
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
            <p
              className="text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              No role requests found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function RoleRequestAdminCard({
  request,
  reviewingId,
  reviewNote,
  setReviewNote,
  onReview,
}) {
  const statusConfig = {
    pending: {
      icon: Clock3,
      color: "#F0B000",
      label: "Pending",
    },
    approved: {
      icon: CheckCircle2,
      color: "#00B0F0",
      label: "Approved",
    },
    rejected: {
      icon: XCircle,
      color: "#F08000",
      label: "Rejected",
    },
  };

  const config = statusConfig[request.status] || statusConfig.pending;
  const Icon = config.icon;
  const isReviewing = reviewingId === request._id;
  const isPending = request.status === "pending";

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
              color: config.color,
              background: `${config.color}18`,
            }}
          >
            <Icon size={17} />
            {config.label}
          </div>

          <h2 className="mt-5 text-2xl font-black">
            {request.userId?.name || "Unknown User"}
          </h2>

          <p
            className="mt-2 text-sm leading-7"
            style={{ color: "var(--text-muted)" }}
          >
            {request.userId?.email || "No email"} · Current role:{" "}
            <span className="font-black capitalize">{request.currentRole}</span>{" "}
            · Requested role:{" "}
            <span className="font-black capitalize text-[#00B0F0]">
              {request.requestedRole}
            </span>
          </p>

          <p
            className="mt-5 rounded-3xl border p-5 text-sm leading-7"
            style={{
              color: "var(--text-muted)",
              borderColor: "var(--border)",
              background: "var(--background-secondary)",
            }}
          >
            {request.reason}
          </p>

          {request.reviewNote && (
            <p
              className="mt-4 rounded-3xl border p-5 text-sm leading-7"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              Admin note: {request.reviewNote}
            </p>
          )}
        </div>

        {isPending && (
          <div className="w-full lg:max-w-sm">
            <label className="text-sm font-black">Review Note</label>

            <textarea
              value={reviewNote}
              onChange={(event) => setReviewNote(event.target.value)}
              rows={4}
              placeholder="Optional admin note..."
              className="mt-2 w-full resize-none rounded-3xl border p-4 text-sm leading-7 outline-none transition focus:border-[#00B0F0]"
              style={{
                borderColor: "var(--border)",
                background: "var(--background-secondary)",
              }}
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onReview(request._id, "approved")}
                disabled={isReviewing}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-5 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isReviewing ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Approve"
                )}
              </button>

              <button
                type="button"
                onClick={() => onReview(request._id, "rejected")}
                disabled={isReviewing}
                className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-[#F08000] to-[#F0B000] px-5 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}