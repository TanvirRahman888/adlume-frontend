import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/data/servicesData";
import ServiceDetailsHero from "@/components/services/ServiceDetailsHero";
import ServiceDetailsContent from "@/components/services/ServiceDetailsContent";
import ServiceDetailsCTA from "@/components/services/ServiceDetailsCTA";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Adlume Media",
    };
  }

  return {
    title: `${service.title} | Adlume Media`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailsPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceDetailsHero service={service} />
      <ServiceDetailsContent service={service} />
      <ServiceDetailsCTA service={service} />
    </main>
  );
}