import { notFound } from "next/navigation";
import ServiceDetailsHero from "@/components/services/ServiceDetailsHero";
import ServiceDetailsContent from "@/components/services/ServiceDetailsContent";
import ServiceDetailsCTA from "@/components/services/ServiceDetailsCTA";

async function getService(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.service || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

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
  const service = await getService(slug);

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