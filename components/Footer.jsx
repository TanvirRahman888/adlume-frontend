import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import {
  FaFacebook,
  FaLinkedin,
  FaSquareInstagram,
  FaWhatsapp,
} from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

const services = [
  "Social Media Marketing",
  "Facebook & Instagram Ads",
  "Content Creation",
  "Graphic Design & Branding",
  "Web Design & Development",
  "Lead Generation",
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/adlumemedia",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/adlumemedia",
    icon: FaSquareInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/adlume-media",
    icon: FaLinkedin,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/8801761784780",
    icon: FaWhatsapp,
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t pt-16"
      style={{
        borderColor: "var(--border)",
        background: "var(--background-secondary)",
      }}
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#F08000]/10 blur-3xl" />

      <Container className="relative">
        <div
          className="overflow-hidden rounded-4xl border p-6 md:p-8 lg:p-10"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--card) 90%, transparent)",
            boxShadow: "0 24px 80px rgba(0, 128, 224, 0.08)",
          }}
        >
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/images/AdlumeMedia.png"
                  alt="Adlume Media"
                  width={170}
                  height={70}
                  className="h-auto w-38 object-contain"
                />
              </Link>

              <p
                className="mt-5 max-w-sm text-sm leading-7"
                style={{ color: "var(--text-muted)" }}
              >
                Helping brands get seen, clicked, and chosen through smart
                digital marketing, branding, lead generation, and web solutions.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
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
                })}
              </div>
            </div>

            <div>
              <h3 className="text-base font-black">Quick Links</h3>

              <div className="mt-5 grid gap-3">
                {quickLinks.map(([name, href]) => (
                  <Link
                    key={name}
                    href={href}
                    className="group inline-flex w-fit items-center gap-2 text-sm font-medium transition duration-300 hover:text-[#00B0F0]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00B0F0] opacity-0 transition duration-300 group-hover:opacity-100" />
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-black">Our Services</h3>

              <div className="mt-5 grid gap-3">
                {services.map((service) => (
                  <p
                    key={service}
                    className="text-sm leading-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {service}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-black">Contact Us</h3>

              <div className="mt-5 grid gap-4">
                <a
                  href="tel:+8801761784780"
                  className="group flex items-start gap-3 text-sm transition duration-300 hover:text-[#00B0F0]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0080E0]/12 text-[#0080E0] transition duration-300 group-hover:bg-[#0080E0] group-hover:text-white">
                    <Phone size={17} />
                  </span>
                  <span className="pt-2">+8801761-784780</span>
                </a>

                <a
                  href="mailto:adlumemediabd@gmail.com"
                  className="group flex items-start gap-3 text-sm transition duration-300 hover:text-[#00B0F0]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00B0F0]/12 text-[#00B0F0] transition duration-300 group-hover:bg-[#00B0F0] group-hover:text-white">
                    <Mail size={17} />
                  </span>
                  <span className="pt-2 break-all">adlumemediabd@gmail.com</span>
                </a>

                <div
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F08000]/12 text-[#F08000]">
                    <MapPin size={17} />
                  </span>
                  <span className="pt-2">Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-10 flex flex-col justify-between gap-4 border-t pt-6 text-sm md:flex-row md:items-center"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <p>© 2026 Adlume Media. All Rights Reserved.</p>

            <p className="font-bold">
              <span className="text-[#0080E0]">Get Seen.</span>{" "}
              <span>Get Clicked.</span>{" "}
              <span className="text-[#F08000]">Get Chosen.</span>
            </p>
          </div>
        </div>
      </Container>

      <div className="mt-12 h-1 w-full bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000]" />
    </footer>
  );
}