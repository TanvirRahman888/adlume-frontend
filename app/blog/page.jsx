import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogCTA from "@/components/blog/BlogCTA";

export const metadata = {
  title: "Blog | Adlume Media",
  description:
    "Read digital marketing, branding, social media, web design, and lead generation tips from Adlume Media.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <BlogGrid />
      <BlogCTA />
    </main>
  );
}