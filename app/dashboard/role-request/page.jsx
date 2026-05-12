"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Loader2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RoleRequestPage() {
  const router = useRouter();
  const {
    dbUser,
    getToken,
    isAuthLoading,
    isLoggedIn,
    role,
    syncUserToBackend,
    firebaseUser,
  } = useAuth();

  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const requestedRole = useMemo(() => {
    if (role === "user") {
      return "manager";
    }

    if (role === "manager") {
      return "admin";
    }

    return "";
  }, [role]);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login?redirect=/dashboard/role-request");
    }
  }, [isAuthLoading, isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMyRequests();
    }
  }, [isLoggedIn]);

  async function fetchMyRequests() {
    try {
      setIsLoadingRequests(true);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/role-requests/my`,
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
      setIsLoadingRequests(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setMessage(null);

      if (!requestedRole) {
        throw new Error("Your current role cannot submit a role request.");
      }

      if (reason.trim().length < 20) {
        throw new Error("Please write at least 20 characters for your reason.");
      }

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/role-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            requestedRole,
            reason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit role request.");
      }

      setReason("");
      setMessage({
        type: "success",
        text: data.message || "Role request submitted successfully.",
      });

      await fetchMyRequests();

      if (firebaseUser) {
        await syncUserToBackend(firebaseUser);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to submit role request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
          <Loader2 size={20} className="animate-spin" />
          Loading role request page...
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const isAdmin = role === "admin";

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
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2">
                <ShieldCheck size={17} className="text-[#00B0F0]" />
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                  Role Request
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Request Account Access
              </h1>

              <p
                className="mt-5 text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                Your current role is{" "}
                <span className="font-black capitalize text-[#00B0F0]">
                  {role}
                </span>
                . You can request a higher role if you need access to manage
                more project activities.
              </p>

              <div
                className="mt-6 rounded-3xl border p-5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background-secondary)",
                }}
              >
                <p className="text-sm font-black">Account</p>

                <p
                  className="mt-2 text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  {dbUser?.name} · {dbUser?.email}
                </p>
              </div>
            </div>

            <div>
              {message && (
                <div
                  className={`mb-6 rounded-3xl border p-5 text-sm font-bold ${
                    message.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-600"
                      : "border-red-500/30 bg-red-500/10 text-red-500"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {isAdmin ? (
                <div
                  className="rounded-4xl border p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <CheckCircle2 size={30} className="text-[#00B0F0]" />

                  <h2 className="mt-5 text-2xl font-black">
                    You already have admin access
                  </h2>

                  <p
                    className="mt-3 text-sm leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Admins do not need to submit role requests. You can manage
                    role requests from the admin dashboard.
                  </p>

                  <Link
                    href="/dashboard/role-requests"
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
                  >
                    Manage Role Requests
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-4xl border p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <h2 className="text-2xl font-black capitalize">
                    Request {requestedRole} Role
                  </h2>

                  <p
                    className="mt-3 text-sm leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Explain why you want to become a {requestedRole}. Admin will
                    review your request.
                  </p>

                  <div className="mt-6">
                    <label className="text-sm font-black">Reason</label>

                    <textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      rows={7}
                      placeholder={`Write why you want to become a ${requestedRole}...`}
                      className="mt-2 w-full resize-none rounded-3xl border p-4 text-sm leading-7 outline-none transition focus:border-[#00B0F0]"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--background-secondary)",
                      }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      `Submit ${requestedRole} Request`
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black">My Role Requests</h2>

          {isLoadingRequests ? (
            <div className="mt-6 flex items-center gap-3 text-sm font-black text-[#00B0F0]">
              <Loader2 size={18} className="animate-spin" />
              Loading requests...
            </div>
          ) : requests.length > 0 ? (
            <div className="mt-6 grid gap-5">
              {requests.map((request) => (
                <RoleRequestCard key={request._id} request={request} />
              ))}
            </div>
          ) : (
            <div
              className="mt-6 rounded-4xl border p-8 text-center"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              <p
                className="text-sm leading-7"
                style={{ color: "var(--text-muted)" }}
              >
                You have not submitted any role request yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function RoleRequestCard({ request }) {
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

  return (
    <div
      className="rounded-4xl border p-6"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--card) 92%, transparent)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#00B0F0]">
            {request.currentRole} → {request.requestedRole}
          </p>

          <p
            className="mt-3 text-sm leading-7"
            style={{ color: "var(--text-muted)" }}
          >
            {request.reason}
          </p>

          {request.reviewNote && (
            <p
              className="mt-4 rounded-2xl border p-4 text-sm leading-7"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                background: "var(--background-secondary)",
              }}
            >
              Admin note: {request.reviewNote}
            </p>
          )}
        </div>

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
      </div>
    </div>
  );
}