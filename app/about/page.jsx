import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutValues from "@/components/about/AboutValues";
import AboutStats from "@/components/about/AboutStats";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Adlume Media",
  description:
    "Learn about Adlume Media, a digital marketing agency helping brands get seen, clicked, and chosen.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <AboutValues />
      <AboutStats />
      <AboutCTA />
    </main>
  );
}