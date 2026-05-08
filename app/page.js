import Container from "@/components/Container";
import ClientFeedbackSection from "@/components/home/ClientFeedbackSection";
import HeroSection from "@/components/home/HeroSection";
import HomeCTA from "@/components/home/HomeCTA";
import PriceSection from "@/components/home/PriceSection";
import ProcessSection from "@/components/home/ProcessSection";
import RecentProjects from "@/components/home/RecentProjects";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="">
        <HeroSection />
      <Container>
        <ServicesPreview />
        <WhyChooseUs />
        <RecentProjects />
        <ProcessSection />
        <PriceSection />
        <ClientFeedbackSection />
        <HomeCTA />
      </Container>
    </main>
  );
}
