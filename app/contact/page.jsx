import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";

export const metadata = {
  title: "Contact | Adlume Media",
  description:
    "Contact Adlume Media for digital marketing, social media marketing, web design, branding, lead generation, and business growth services.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactSection />
    </main>
  );
}