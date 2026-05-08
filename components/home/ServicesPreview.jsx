import Link from "next/link";
import ServicePreviewCard from "./ServicePreviewCard";

const services = [
  {
    title: "Digital Marketing",
    description:
      "Complete online marketing solutions to grow your business, increase visibility, and attract the right customers.",
    icon: "/images/services/digital-marketing.png",
    href: "/services/digital-marketing",
  },
  {
    title: "Social Media Marketing",
    description:
      "Grow your brand with strategic content planning, page management, engagement, and organic marketing.",
    icon: "/images/services/social-media-marketing.png",
    href: "/services/social-media-marketing",
  },
  {
    title: "Facebook & Instagram Ads",
    description:
      "Target the right audience with paid ad campaigns designed to generate leads, messages, and sales.",
    icon: "/images/services/facebook-instagram-ads.png",
    href: "/services/facebook-instagram-ads",
  },
  {
    title: "Content Creation",
    description:
      "Creative posts, captions, reels ideas, promotional content, and content planning for consistent brand activity.",
    icon: "/images/services/content-creation.png",
    href: "/services/content-creation",
  },
  {
    title: "Graphic Design & Branding",
    description:
      "Professional visuals, logos, banners, brand identity, and design assets that make your business stand out.",
    icon: "/images/services/graphic-design-branding.png",
    href: "/services/graphic-design-branding",
  },
  {
    title: "Web Design & Development",
    description:
      "Modern, responsive, and conversion-focused websites that build trust and turn visitors into real inquiries.",
    icon: "/images/services/web-design-development.png",
    href: "/services/web-design-development",
  },
  {
    title: "Lead Generation",
    description:
      "Campaigns and strategies designed to bring potential customers through messages, forms, calls, and WhatsApp.",
    icon: "/images/services/lead-generation.png",
    href: "/services/lead-generation",
  },
  {
    title: "Google Local Business Setup",
    description:
      "Google Business Profile setup and optimization to help local customers find you on Search and Maps.",
    icon: "/images/services/google-local-business.png",
    href: "/services/google-local-business-setup",
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B0F0]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center rounded-full border px-5 py-2">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
              Our Services
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Complete Digital Solutions for{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Business Growth
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            From digital marketing and branding to websites and lead generation,
            we help your business build a stronger online presence.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-7">
          {services.map((service) => (
            <ServicePreviewCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full border px-8 text-sm font-black text-[#000513] shadow-lg transition duration-300 hover:scale-105"
            style={{
              borderColor: "transparent",
              background: "linear-gradient(90deg, #F08000, #F0B000)",
            }}
          >
            <span className="absolute inset-0 translate-y-full bg-linear-to-r from-[#0080E0] to-[#00B0F0] transition duration-300 group-hover:translate-y-0" />
            <span className="absolute left-[-40%] top-0 h-full w-1/3 skew-x-[-20deg] bg-white/35 opacity-0 transition duration-500 group-hover:left-[120%] group-hover:opacity-100" />
            <span className="relative z-10 transition duration-300 group-hover:text-white">
              View All Services
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}