import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata = {
  title: "Services | Adlume Media",
  description:
    "Explore Adlume Media services including digital marketing, social media marketing, Facebook ads, branding, web design, lead generation, and Google Business Profile setup.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesCTA />
    </main>
  );
}