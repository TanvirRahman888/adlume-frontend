import ServicePageCard from "./ServicePageCard";

const services = [
  {
    title: "Digital Marketing",
    description:
      "Complete online marketing solutions to grow your visibility, attract customers, and build a stronger brand presence.",
    icon: "/images/services/digital-marketing.png",
    href: "/services/digital-marketing",
    points: ["Growth strategy", "Campaign planning", "Performance tracking"],
  },
  {
    title: "Social Media Marketing",
    description:
      "Strategic page management, content planning, and audience engagement to grow your social presence.",
    icon: "/images/services/social-media-marketing.png",
    href: "/services/social-media-marketing",
    points: ["Content planning", "Page management", "Audience engagement"],
  },
  {
    title: "Facebook & Instagram Ads",
    description:
      "Targeted ad campaigns designed to generate leads, messages, website traffic, and sales.",
    icon: "/images/services/facebook-instagram-ads.png",
    href: "/services/facebook-instagram-ads",
    points: ["Ad setup", "Audience targeting", "Lead campaigns"],
  },
  {
    title: "Content Creation",
    description:
      "Creative captions, post designs, promotional content, and campaign ideas for consistent brand activity.",
    icon: "/images/services/content-creation.png",
    href: "/services/content-creation",
    points: ["Post ideas", "Caption writing", "Campaign content"],
  },
  {
    title: "Graphic Design & Branding",
    description:
      "Professional visuals, logos, brand assets, and creative designs that make your business stand out.",
    icon: "/images/services/graphic-design-branding.png",
    href: "/services/graphic-design-branding",
    points: ["Brand identity", "Social designs", "Promotional graphics"],
  },
  {
    title: "Web Design & Development",
    description:
      "Modern, responsive, and conversion-focused websites that build trust and turn visitors into inquiries.",
    icon: "/images/services/web-design-development.png",
    href: "/services/web-design-development",
    points: ["Responsive design", "Landing pages", "Conversion layout"],
  },
  {
    title: "Lead Generation",
    description:
      "Smart campaigns and funnels designed to bring potential customers through messages, calls, and forms.",
    icon: "/images/services/lead-generation.png",
    href: "/services/lead-generation",
    points: ["Lead funnels", "WhatsApp leads", "Form campaigns"],
  },
  {
    title: "Google Local Business Setup",
    description:
      "Google Business Profile setup and optimization to help local customers find you on Search and Maps.",
    icon: "/images/services/google-local-business.png",
    href: "/services/google-local-business-setup",
    points: ["Profile setup", "Map visibility", "Local optimization"],
  },
];

export default function ServicesGrid() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex items-center justify-center rounded-full border px-5 py-2"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--card) 80%, transparent)",
            }}
          >
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0080E0]">
              What We Offer
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Services Designed for{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              Real Growth
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Choose the right service for your business or combine multiple
            solutions for a complete digital growth system.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {services.map((service) => (
            <ServicePageCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
              points={service.points}
            />
          ))}
        </div>
      </div>
    </section>
  );
}