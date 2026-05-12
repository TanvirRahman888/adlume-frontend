"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  BriefcaseBusiness,
  ClipboardList,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Star,
  UserCog,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { dbUser, isAuthLoading, isLoggedIn, logout, role } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login?redirect=/dashboard");
    }
  }, [isAuthLoading, isLoggedIn, router]);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-black text-[#00B0F0]">
          <Loader2 size={20} className="animate-spin" />
          Loading dashboard...
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const dashboardCards = getDashboardCards(role);

  return (
    <main className="relative min-h-screen overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div
          className="rounded-4xl border p-6 md:p-8"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--card) 92%, transparent)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2">
                <LayoutDashboard size={17} className="text-[#00B0F0]" />
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00B0F0]">
                  Dashboard
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Welcome, {dbUser?.name || "User"}
              </h1>

              <p
                className="mt-4 max-w-2xl text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                Manage your account, orders, messages, revisions, deliveries,
                and project activities from one place.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
              <div
                className="rounded-2xl border px-5 py-3 text-sm font-black capitalize"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background-secondary)",
                }}
              >
                Role: <span className="text-[#00B0F0]">{role}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#F08000] to-[#F0B000] px-6 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-4xl border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in srgb, var(--card) 92%, transparent)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100"
                  style={{ background: `${card.color}25` }}
                />

                <div className="relative">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110"
                    style={{
                      color: card.color,
                      background: `${card.color}18`,
                    }}
                  >
                    <Icon size={28} strokeWidth={2.5} />
                  </div>

                  <h2 className="mt-6 text-xl font-black">{card.title}</h2>

                  <p
                    className="mt-3 text-sm leading-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function getDashboardCards(role) {
  const commonUserCards = [
    {
      title: "My Orders",
      description: "View your orders, order status, delivery, and revisions.",
      href: "/dashboard/orders",
      icon: ClipboardList,
      color: "#0080E0",
    },
    {
      title: "Messages",
      description: "Chat with the Adlume Media team about your projects.",
      href: "/dashboard/messages",
      icon: MessageCircle,
      color: "#00B0F0",
    },
    {
      title: "Request Manager Role",
      description: "Submit a request if you want to become a manager.",
      href: "/dashboard/role-request",
      icon: UserCog,
      color: "#F08000",
    },
  ];

  const managerCards = [
    {
      title: "Manage Orders",
      description: "Accept, reject, deliver, and manage client orders.",
      href: "/dashboard/manage-orders",
      icon: PackageCheck,
      color: "#0080E0",
    },
    {
      title: "Client Messages",
      description: "View and reply to client messages with manager title.",
      href: "/dashboard/messages",
      icon: MessageCircle,
      color: "#00B0F0",
    },
    {
      title: "Manage Services",
      description: "Add, update, or hold services without deleting them.",
      href: "/dashboard/services",
      icon: BriefcaseBusiness,
      color: "#F08000",
    },
    {
      title: "Request Admin Role",
      description: "Submit a request to become an admin.",
      href: "/dashboard/role-request",
      icon: ShieldCheck,
      color: "#F0B000",
    },
  ];

  const adminCards = [
    {
      title: "Manage Users",
      description: "View users, block accounts, and update user roles.",
      href: "/dashboard/users",
      icon: UserCog,
      color: "#0080E0",
    },
    {
      title: "Manage Orders",
      description: "View, assign, accept, reject, deliver, and manage orders.",
      href: "/dashboard/manage-orders",
      icon: PackageCheck,
      color: "#00B0F0",
    },
    {
      title: "Manage Services",
      description: "Add, update, hold, and delete services.",
      href: "/dashboard/services",
      icon: BriefcaseBusiness,
      color: "#F08000",
    },
    {
      title: "Manage Projects",
      description: "Add, update, feature, publish, and delete portfolio work.",
      href: "/dashboard/projects",
      icon: LayoutDashboard,
      color: "#F0B000",
    },
    {
      title: "Role Requests",
      description: "Approve or reject manager and admin role requests.",
      href: "/dashboard/role-requests",
      icon: ShieldCheck,
      color: "#0080E0",
    },
    {
      title: "Reviews",
      description: "View and manage client reviews after order completion.",
      href: "/dashboard/reviews",
      icon: Star,
      color: "#00B0F0",
    },
  ];

  if (role === "admin") {
    return adminCards;
  }

  if (role === "manager") {
    return managerCards;
  }

  return commonUserCards;
}