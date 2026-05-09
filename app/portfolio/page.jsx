import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata = {
  title: "Portfolio | Adlume Media",
  description:
    "Explore recent creative projects by Adlume Media including social media designs, ad campaigns, website designs, and landing pages.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCTA />
    </main>
  );
}