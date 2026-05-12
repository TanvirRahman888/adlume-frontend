"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const { loginWithEmail, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (!formData.email.trim()) {
        throw new Error("Email address is required.");
      }

      if (!formData.password.trim()) {
        throw new Error("Password is required.");
      }

      await loginWithEmail({
        email: formData.email,
        password: formData.password,
      });

      router.push(redirectTo);
    } catch (error) {
      setErrorMessage(error.message || "Failed to login.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await loginWithGoogle();

      router.push(redirectTo);
    } catch (error) {
      setErrorMessage(error.message || "Google login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-360 items-center justify-center px-4 sm:px-6 lg:px-10">
        <div
          className="w-full max-w-xl rounded-4xl border p-6 shadow-2xl sm:p-8"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--card) 92%, transparent)",
          }}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#0080E0] to-[#00B0F0] text-white">
            <LogIn size={28} />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
              Welcome Back
            </p>

            <h1 className="mt-3 text-3xl font-black md:text-4xl">
              Login to Your Account
            </h1>

            <p
              className="mx-auto mt-4 max-w-md text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Access your dashboard to manage orders, messages, revisions,
              deliveries, and account details.
            </p>
          </div>

          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold text-red-500">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 grid gap-5">
            <div>
              <label className="text-sm font-black">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="mt-2 h-12 w-full rounded-2xl border px-4 text-sm outline-none transition focus:border-[#00B0F0]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background-secondary)",
                }}
                required
              />
            </div>

            <div>
              <label className="text-sm font-black">Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-2xl border px-4 pr-12 text-sm outline-none transition focus:border-[#00B0F0]"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--background-secondary)",
                  }}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div
              className="h-px flex-1"
              style={{ background: "var(--border)" }}
            />
            <span
              className="text-xs font-black uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              Or
            </span>
            <div
              className="h-px flex-1"
              style={{ background: "var(--border)" }}
            />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="inline-flex h-12 w-full items-center justify-center rounded-full border px-7 text-sm font-black transition duration-300 hover:-translate-y-1 hover:text-[#00B0F0] disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              borderColor: "var(--border)",
              background: "var(--background-secondary)",
            }}
          >
            Continue with Google
          </button>

          <p
            className="mt-7 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-black text-[#00B0F0]">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}