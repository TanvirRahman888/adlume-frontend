import { notFound } from "next/navigation";
import { blogData, getBlogBySlug } from "@/data/blogData";
import BlogDetailsHero from "@/components/blog/BlogDetailsHero";
import BlogDetailsContent from "@/components/blog/BlogDetailsContent";
import BlogCTA from "@/components/blog/BlogCTA";

export function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Adlume Media",
    };
  }

  return {
    title: `${blog.title} | Adlume Media`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main>
      <BlogDetailsHero blog={blog} />
      <BlogDetailsContent blog={blog} />
      <BlogCTA />
    </main>
  );
}