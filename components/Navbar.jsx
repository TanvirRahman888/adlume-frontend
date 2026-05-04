"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
  const pathname = usePathname();
  const navbarRef = useRef(null);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

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
        </div>

        {/* Mobile Actions */}
        <div className="flex shrink-0 items-center gap-3 min-[720px]:hidden">
          <ThemeToggle />

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

      {/* Mobile Dropdown */}
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
          </nav>
        </div>
      )}
    </header>
  );
}