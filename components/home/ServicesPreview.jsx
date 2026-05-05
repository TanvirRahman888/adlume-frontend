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
    <section className="py-20">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
            Our Services
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Complete Digital Solutions for Business Growth
          </h2>

          <p className="mt-5 leading-8" style={{ color: "var(--text-muted)" }}>
            From digital marketing and branding to websites and lead generation,
            we help your business build a stronger online presence.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#F08000] to-[#F0B000] px-7 text-sm font-black text-[#000513] shadow-lg transition hover:scale-105"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
