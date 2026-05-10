import { notFound } from "next/navigation";
import PortfolioDetailsHero from "@/components/portfolio/PortfolioDetailsHero";
import PortfolioDetailsContent from "@/components/portfolio/PortfolioDetailsContent";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

async function getProject(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.project || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Adlume Media",
    };
  }

  return {
    title: `${project.title} | Adlume Media Portfolio`,
    description:
      project.description ||
      "Explore this portfolio project by Adlume Media.",
  };
}

export default async function PortfolioDetailsPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <PortfolioDetailsHero project={project} />
      <PortfolioDetailsContent project={project} />
      <PortfolioCTA />
    </main>
  );
}