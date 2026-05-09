"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from "lucide-react";
import {
  FaFacebook,
  FaSquareInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa6";

const services = [
  "Digital Marketing",
  "Social Media Marketing",
  "Facebook & Instagram Ads",
  "Web Design & Development",
  "Lead Generation",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  subject: "",
  customSubject: "",
  message: "",
  terms: false,
  verificationAnswer: "",
  website: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);

  const [verification, setVerification] = useState({
    question: "",
    answer: null,
  });

  function generateVerification() {
    const firstNumber = Math.floor(Math.random() * 5) + 3;
    const secondNumber = Math.floor(Math.random() * 5) + 2;

    setVerification({
      question: `${firstNumber} + ${secondNumber}`,
      answer: firstNumber + secondNumber,
    });
  }

  useEffect(() => {
    generateVerification();
  }, []);

  const selectedSubject =
    form.subject === "Other" ? form.customSubject.trim() : form.subject.trim();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateForm() {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.email.trim()) return "Contact email is required.";
    if (!form.phone.trim()) return "Contact number is required.";
    if (!form.country.trim()) return "Country is required.";
    if (!form.subject.trim()) return "Subject is required.";

    if (form.subject === "Other" && !form.customSubject.trim()) {
      return "Please write your subject.";
    }

    if (!form.message.trim()) return "Message is required.";
    if (!form.terms) return "Please accept the terms and conditions.";

    if (!verification.answer) {
      return "Human verification is still loading. Please try again.";
    }

    if (Number(form.verificationAnswer) !== verification.answer) {
      return "Human verification answer is incorrect.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      setModal({
        type: "error",
        title: "Please check the form",
        message: errorMessage,
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          country: form.country,
          subject: selectedSubject,
          message: form.message,
          verificationAnswer: form.verificationAnswer,
          expectedAnswer: verification.answer,
          website: form.website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Message sending failed.");
      }

      setForm(initialForm);
      generateVerification();

      setModal({
        type: "success",
        title: "Message Sent Successfully",
        message:
          "Thank you for contacting Adlume Media. We received your message and will get back to you soon.",
      });
    } catch (error) {
      setModal({
        type: "error",
        title: "Message Sending Failed",
        message:
          error.message ||
          "Something went wrong. Please try again or contact us directly on WhatsApp.",
      });

      generateVerification();
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="relative overflow-hidden pb-20 sm:pb-24">
      <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div
            className="relative overflow-hidden rounded-4xl border p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 92%, transparent)",
              boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
            }}
          >
            <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-[#0080E0]/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-[#F08000]/15 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
                Contact Information
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                Get in Touch With Adlume Media
              </h2>

              <p
                className="mt-5 text-base leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                We are ready to help your business grow online through digital
                marketing, branding, lead generation, ads, content, and web
                solutions.
              </p>

              <div className="mt-8 grid gap-4">
                <ContactInfoCard
                  icon={Phone}
                  label="Phone / WhatsApp"
                  value="+8801761-784780"
                  href="tel:+8801761784780"
                  color="#0080E0"
                />

                <ContactInfoCard
                  icon={Mail}
                  label="Email Address"
                  value="adlumemediabd@gmail.com"
                  href="mailto:adlumemediabd@gmail.com"
                  color="#00B0F0"
                />

                <ContactInfoCard
                  icon={MapPin}
                  label="Location"
                  value="Bangladesh"
                  color="#F08000"
                />
              </div>

              <div className="mt-8">
                <h3 className="text-base font-black">Follow Us</h3>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <SocialLink
                    href="https://www.facebook.com/adlumemedia"
                    label="Facebook"
                    icon={FaFacebook}
                  />
                  <SocialLink
                    href="https://www.instagram.com/adlumemedia"
                    label="Instagram"
                    icon={FaSquareInstagram}
                  />
                  <SocialLink
                    href="https://www.linkedin.com/company/adlume-media"
                    label="LinkedIn"
                    icon={FaLinkedin}
                  />
                  <SocialLink
                    href="https://wa.me/8801761784780"
                    label="WhatsApp"
                    icon={FaWhatsapp}
                  />
                </div>
              </div>

              <div
                className="mt-8 rounded-3xl border p-5"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
                }}
              >
                <h3 className="text-base font-black">Business Hours</h3>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  Send us a message anytime. We will reply as soon as possible
                  during business hours.
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-4xl border p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--card) 92%, transparent)",
              boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
            }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#00B0F0]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-[#F08000]/15 blur-3xl" />

            <form onSubmit={handleSubmit} className="relative">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#F08000]">
                Send Message
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                Tell Us About Your Project
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                <InputField
                  label="Contact Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />

                <InputField
                  label="Contact Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />

                <InputField
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                />

                <div className="md:col-span-2">
                  <label className="text-sm font-black">Subject</label>

                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="mt-3 h-13 w-full rounded-2xl border px-4 text-sm font-semibold outline-none transition focus:border-[#00B0F0]"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--background)",
                      color: "var(--text)",
                    }}
                  >
                    <option value="">Select a subject</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                    <option value="Other">Other / Custom Subject</option>
                  </select>
                </div>

                {form.subject === "Other" && (
                  <div className="md:col-span-2">
                    <InputField
                      label="Write Your Subject"
                      name="customSubject"
                      value={form.customSubject}
                      onChange={handleChange}
                      placeholder="Write your custom subject"
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="text-sm font-black">Message</label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Write your message..."
                    className="mt-3 w-full resize-none rounded-2xl border px-4 py-4 text-sm font-semibold leading-7 outline-none transition focus:border-[#00B0F0]"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--background)",
                      color: "var(--text)",
                    }}
                  />
                </div>

                <div className="hidden">
                  <label>Website</label>
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-black">
                    Human Verification
                  </label>

                  <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1.2fr]">
                    <div
                      className="flex h-13 items-center justify-center rounded-2xl border px-4 text-sm font-black"
                      style={{
                        borderColor: "var(--border)",
                        background:
                          "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
                      }}
                    >
                      {verification.question
                        ? `What is ${verification.question}?`
                        : "Loading verification..."}
                    </div>

                    <input
                      type="number"
                      name="verificationAnswer"
                      value={form.verificationAnswer}
                      onChange={handleChange}
                      required
                      placeholder="Enter answer"
                      className="h-13 w-full rounded-2xl border px-4 text-sm font-semibold outline-none transition focus:border-[#00B0F0]"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--background)",
                        color: "var(--text)",
                      }}
                    />
                  </div>
                </div>

                <label className="md:col-span-2 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 accent-[#0080E0]"
                  />

                  <span
                    className="text-sm leading-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    I accept the terms and conditions and agree that Adlume
                    Media may contact me regarding my inquiry.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="mt-8 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-8 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSending ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {modal && (
        <MessageModal
          type={modal.type}
          title={modal.title}
          message={modal.message}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm font-black">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="mt-3 h-13 w-full rounded-2xl border px-4 text-sm font-semibold outline-none transition focus:border-[#00B0F0]"
        style={{
          borderColor: "var(--border)",
          background: "var(--background)",
          color: "var(--text)",
        }}
      />
    </div>
  );
}

function ContactInfoCard({ icon: Icon, label, value, href, color }) {
  const content = (
    <div
      className="group flex items-start gap-4 rounded-3xl border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
      }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110"
        style={{
          color,
          background: `${color}18`,
        }}
      >
        <Icon size={22} strokeWidth={2.5} />
      </span>

      <span>
        <span
          className="block text-xs font-black uppercase tracking-[0.18em]"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>

        <span className="mt-1 block break-all text-sm font-black">{value}</span>
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 hover:-translate-y-1"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in srgb, var(--background-secondary) 80%, transparent)",
      }}
    >
      <Icon className="text-lg text-[#0080E0] transition duration-300 group-hover:text-[#F08000]" />
    </a>
  );
}

function MessageModal({ type, title, message, onClose }) {
  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        className="relative z-10 w-full max-w-md rounded-4xl border p-6 text-center shadow-2xl md:p-8"
        style={{
          background: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <button
          type="button"
          aria-label="Close message"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border transition duration-300 hover:bg-[#0080E0] hover:text-white"
          style={{
            borderColor: "var(--border)",
            background: "var(--card)",
          }}
        >
          <X size={20} />
        </button>

        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: isSuccess ? "#00B0F018" : "#F0800018",
            color: isSuccess ? "#00B0F0" : "#F08000",
          }}
        >
          {isSuccess ? <CheckCircle2 size={34} /> : <X size={34} />}
        </div>

        <h3 className="mt-6 text-2xl font-black">{title}</h3>

        <p
          className="mt-4 text-sm leading-7"
          style={{ color: "var(--text-muted)" }}
        >
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] px-7 text-sm font-black text-white transition duration-300 hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
}