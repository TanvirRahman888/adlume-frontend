"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserCircle,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const navbarRef = useRef(null);

  const { dbUser, firebaseUser, isLoggedIn, isAuthLoading, logout, role } =
    useAuth();

  const profileImage = dbUser?.photoURL || firebaseUser?.photoURL || "";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  async function handleLogout() {
    await logout();
    setProfileOpen(false);
    setMenuOpen(false);
    router.push("/login");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 w-full border-b backdrop-blur-2xl"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--background) 72%, transparent)",
        boxShadow:
          "0 12px 50px rgba(0, 128, 224, 0.10), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex h-22 w-full items-center justify-between px-4 sm:px-6 xl:px-10">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center"
        >
          <div className="relative h-15 w-43 sm:h-16 sm:w-48">
            <Image
              src="/images/AdlumeMedia.png"
              alt="Adlume Media Logo"
              fill
              priority
              sizes="190px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 min-[720px]:flex lg:gap-3">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex h-11 items-center justify-center rounded-full border px-3 text-[13px] font-black tracking-wide transition-colors duration-300 lg:min-w-23 lg:px-5 lg:text-sm"
                style={{
                  color: active ? "#00B0F0" : "var(--text)",
                  borderColor: active
                    ? "rgba(0,176,240,0.75)"
                    : "var(--border)",
                  background:
                    "color-mix(in srgb, var(--card) 58%, transparent)",
                  boxShadow: active
                    ? "0 0 22px rgba(0,176,240,0.16)"
                    : "0 0 0 rgba(0,176,240,0)",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 min-[720px]:flex">
          <ThemeToggle />

          {!isAuthLoading && !isLoggedIn && (
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-6 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105"
            >
              <LogIn size={17} />
              Login
            </Link>
          )}

          {!isAuthLoading && isLoggedIn && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-label="Open profile menu"
                className="inline-flex h-12 items-center gap-2 rounded-full border p-1.5 pr-3 transition duration-300 hover:border-[#00B0F0]"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in srgb, var(--card) 70%, transparent)",
                }}
              >
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#0080E0] to-[#F08000] text-white">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={dbUser?.name || "Profile"}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  ) : (
                    <UserCircle size={24} />
                  )}
                </div>

                <ChevronDown
                  size={16}
                  className={`transition duration-300 ${
                    profileOpen ? "rotate-180 text-[#00B0F0]" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-15 z-50 w-72 overflow-hidden rounded-3xl border p-3 shadow-2xl"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: "var(--background-secondary)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#0080E0] to-[#F08000] text-white">
                        {profileImage ? (
                          <Image
                            src={profileImage}
                            alt={dbUser?.name || "Profile"}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <UserCircle size={30} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {dbUser?.name || "User"}
                        </p>

                        <p
                          className="mt-1 truncate text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {dbUser?.email}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 inline-flex rounded-full bg-[#00B0F0]/15 px-3 py-1 text-xs font-black capitalize text-[#00B0F0]">
                      {role}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition duration-300 hover:bg-[#00B0F0]/10 hover:text-[#00B0F0]"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black text-[#F08000] transition duration-300 hover:bg-[#F08000]/10"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex shrink-0 items-center gap-3 min-[720px]:hidden">
          <ThemeToggle />

          {isLoggedIn && !isAuthLoading && (
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-label="Open profile menu"
              className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-linear-to-br from-[#0080E0] to-[#F08000] text-white"
              style={{
                borderColor: "var(--border)",
              }}
            >
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={dbUser?.name || "Profile"}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              ) : (
                <UserCircle size={26} />
              )}
            </button>
          )}

          <button
            type="button"
            aria-label="Toggle mobile menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Profile Dropdown */}
      {profileOpen && isLoggedIn && (
        <div
          className="w-full border-t px-4 pb-5 pt-3 min-[720px]:hidden"
          style={{
            borderColor: "var(--border)",
            background:
              "color-mix(in srgb, var(--background) 88%, transparent)",
          }}
        >
          <div className="grid gap-2">
            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in srgb, var(--card) 70%, transparent)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#0080E0] to-[#F08000] text-white">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={dbUser?.name || "Profile"}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <UserCircle size={30} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-black">
                    {dbUser?.name || "User"}
                  </p>

                  <p
                    className="mt-1 truncate text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {dbUser?.email}
                  </p>
                </div>
              </div>

              <p className="mt-3 inline-flex rounded-full bg-[#00B0F0]/15 px-3 py-1 text-xs font-black capitalize text-[#00B0F0]">
                {role}
              </p>
            </div>

            <Link
              href="/dashboard"
              onClick={() => setProfileOpen(false)}
              className="flex h-12 items-center gap-3 rounded-2xl border px-4 text-sm font-black transition duration-300 hover:text-[#00B0F0]"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in srgb, var(--card) 70%, transparent)",
              }}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-12 items-center gap-3 rounded-2xl border px-4 text-left text-sm font-black text-[#F08000] transition duration-300 hover:bg-[#F08000]/10"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in srgb, var(--card) 70%, transparent)",
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div
          className="w-full border-t px-4 pb-5 pt-3 min-[720px]:hidden"
          style={{
            borderColor: "var(--border)",
            background:
              "color-mix(in srgb, var(--background) 88%, transparent)",
          }}
        >
          <nav className="grid gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center rounded-2xl border px-4 text-sm font-black tracking-wide transition-colors duration-300"
                  style={{
                    color: active ? "#00B0F0" : "var(--text)",
                    borderColor: active
                      ? "rgba(0,176,240,0.75)"
                      : "var(--border)",
                    background:
                      "color-mix(in srgb, var(--card) 70%, transparent)",
                    boxShadow: active
                      ? "0 0 20px rgba(0,176,240,0.14)"
                      : "0 0 0 rgba(0,176,240,0)",
                  }}
                >
                  {item.name}
                </Link>
              );
            })}

            {!isAuthLoading && !isLoggedIn && (
              <>
                <div
                  className="my-2 h-px w-full"
                  style={{ background: "var(--border)" }}
                />

                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center gap-3 rounded-2xl bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-4 text-sm font-black text-white shadow-lg"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}