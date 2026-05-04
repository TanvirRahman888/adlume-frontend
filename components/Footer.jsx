import Link from "next/link";
import Container from "./Container";
import { FaFacebook, FaLinkedin, FaSquareInstagram, FaWhatsapp } from "react-icons/fa6";

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

export default function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{
        borderColor: "var(--border)",
        background: "var(--background-secondary)",
      }}
    >
      <Container>
        <div className="grid gap-5 md:gap-10 grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#0080E0] to-[#F08000] text-xl font-black text-white">
                A
              </div>
              <div>
                <p className="text-xl font-black leading-none">Adlume</p>
                <p className="text-sm font-bold text-[#F08000]">Media</p>
              </div>
            </div>
            <p
              className="mt-4 text-sm text-justify leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Helping brands get seen, clicked, and chosen through smart digital
              marketing, branding, and web solutions.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-4 grid gap-3">
              {quickLinks.map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="text-sm hover:text-[#00B0F0]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold">Our Services</h3>
            <div className="mt-4 grid gap-3">
              {services.map((service) => (
                <p
                  key={service}
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {service}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold">Contact Us</h3>

            <div
              className="mt-4 grid gap-3 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <p>+8801761-784780</p>
              <p>adlumemediabd@gmail.com</p>
              <p>Bangladesh</p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/adlumemedia"
                target="_blank"
              >
                <FaFacebook />

              </a>

              <a
                href="https://www.instagram.com/adlumemedia"
                target="_blank"
              >
                <FaSquareInstagram />
              </a>

              <a
                href="https://www.linkedin.com/company/adlume-media"
                target="_blank"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/8801761784780"
                target="_blank"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col justify-between gap-4 border-t pt-6 text-sm md:flex-row"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p>© 2025 Adlume Media. All Rights Reserved.</p>
          <p>
            <span className="text-[#0080E0]">Get Seen.</span>{" "}
            <span>Get Clicked.</span>{" "}
            <span className="text-[#F08000]">Get Chosen.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
