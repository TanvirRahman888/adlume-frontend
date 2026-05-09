export const blogData = [
  {
    slug: "why-digital-marketing-matters-for-small-business",
    title: "Why Digital Marketing Matters for Small Business Growth",
    category: "Digital Marketing",
    date: "January 10, 2026",
    readTime: "5 min read",
    image: "/images/blog/blog-1.png",
    excerpt:
      "Digital marketing helps small businesses build visibility, reach the right audience, and turn online attention into real customers.",
    content: [
      {
        heading: "Digital marketing helps businesses get discovered",
        text: "Today, customers often search online before choosing a product, service, restaurant, shop, or local business. If your business is not visible online, many potential customers may never find you. Digital marketing helps your brand appear where your audience already spends time.",
      },
      {
        heading: "It builds trust before customers contact you",
        text: "A strong online presence gives customers confidence. Professional social media pages, useful content, clear branding, and a well-designed website help people understand your business before they send a message or make a purchase.",
      },
      {
        heading: "It makes growth more measurable",
        text: "Unlike traditional marketing, digital marketing allows you to track clicks, messages, website visits, leads, and campaign performance. This helps you understand what is working and where improvements are needed.",
      },
      {
        heading: "Final thoughts",
        text: "For small businesses, digital marketing is not just about posting online. It is about building visibility, trust, and a system that brings consistent customer interest.",
      },
    ],
  },
  {
    slug: "how-social-media-marketing-builds-brand-trust",
    title: "How Social Media Marketing Builds Brand Trust",
    category: "Social Media Marketing",
    date: "January 12, 2026",
    readTime: "4 min read",
    image: "/images/blog/blog-2.png",
    excerpt:
      "Social media marketing helps brands stay active, communicate clearly, and build stronger relationships with customers.",
    content: [
      {
        heading: "Consistency creates recognition",
        text: "When your business posts regularly with a consistent style, message, and tone, people start recognizing your brand more easily. This repeated visibility builds familiarity and trust.",
      },
      {
        heading: "Content helps customers understand your value",
        text: "Good social media content explains what you offer, why it matters, and how customers can benefit from your service. This makes it easier for people to choose your business.",
      },
      {
        heading: "Engagement builds relationships",
        text: "Replying to comments, answering messages, and sharing useful updates make your business feel active and approachable. Customers are more likely to trust a brand that communicates clearly.",
      },
      {
        heading: "Final thoughts",
        text: "Social media marketing is not only about likes. It is about building a professional presence that helps customers feel confident about your business.",
      },
    ],
  },
  {
    slug: "facebook-instagram-ads-for-lead-generation",
    title: "Facebook & Instagram Ads for Lead Generation",
    category: "Paid Advertising",
    date: "January 15, 2026",
    readTime: "6 min read",
    image: "/images/blog/blog-3.png",
    excerpt:
      "Paid ads can help businesses reach the right people, generate messages, collect leads, and increase customer inquiries.",
    content: [
      {
        heading: "Ads help you reach targeted customers",
        text: "Facebook and Instagram ads allow businesses to target people based on location, interests, behavior, and demographics. This helps your offer reach people who are more likely to become customers.",
      },
      {
        heading: "Lead campaigns make customer contact easier",
        text: "With message ads, WhatsApp ads, and lead forms, customers can contact your business quickly. This reduces friction and helps generate more inquiries.",
      },
      {
        heading: "Testing improves performance",
        text: "The best ad results usually come from testing different creatives, audiences, offers, and messages. Performance data helps identify what works best.",
      },
      {
        heading: "Final thoughts",
        text: "Paid ads are powerful when they are planned properly. A strong offer, clear message, targeted audience, and follow-up system are key to getting better results.",
      },
    ],
  },
  {
    slug: "why-your-business-needs-a-professional-website",
    title: "Why Your Business Needs a Professional Website",
    category: "Website Design",
    date: "January 18, 2026",
    readTime: "5 min read",
    image: "/images/blog/blog-4.png",
    excerpt:
      "A professional website helps your business build trust, explain services clearly, and convert visitors into inquiries.",
    content: [
      {
        heading: "Your website is your online business home",
        text: "Social media is useful, but your website gives your business a central place where customers can learn about your services, pricing, portfolio, contact details, and brand story.",
      },
      {
        heading: "Good design builds trust",
        text: "A clean, modern, mobile-friendly website makes your business look more professional. Customers are more likely to contact a business that presents itself clearly.",
      },
      {
        heading: "Websites support marketing campaigns",
        text: "A website or landing page gives your ads and content a better destination. Instead of sending customers only to social media, you can guide them to a page designed for conversion.",
      },
      {
        heading: "Final thoughts",
        text: "A professional website is an important investment for any business that wants long-term online credibility and better customer inquiries.",
      },
    ],
  },
  {
    slug: "content-marketing-tips-for-growing-brands",
    title: "Content Marketing Tips for Growing Brands",
    category: "Content Marketing",
    date: "January 20, 2026",
    readTime: "4 min read",
    image: "/images/blog/blog-5.png",
    excerpt:
      "Content marketing helps brands educate customers, build authority, and stay visible with valuable online communication.",
    content: [
      {
        heading: "Focus on customer problems",
        text: "The best content answers questions your customers already have. Instead of only promoting your service, create content that explains problems, solutions, tips, and benefits.",
      },
      {
        heading: "Keep your message simple",
        text: "Clear content is more powerful than complicated content. Make your posts, captions, blogs, and videos easy to understand.",
      },
      {
        heading: "Use different content formats",
        text: "A strong content strategy can include social posts, carousels, reels ideas, blogs, graphics, testimonials, case studies, and promotional campaigns.",
      },
      {
        heading: "Final thoughts",
        text: "Content marketing works best when it is consistent, helpful, and aligned with your business goals.",
      },
    ],
  },
  {
    slug: "google-business-profile-for-local-businesses",
    title: "Google Business Profile for Local Businesses",
    category: "Local SEO",
    date: "January 22, 2026",
    readTime: "5 min read",
    image: "/images/blog/blog-6.png",
    excerpt:
      "Google Business Profile helps local customers find your business on Google Search and Maps.",
    content: [
      {
        heading: "Local customers search on Google",
        text: "When people need a nearby service, restaurant, shop, or agency, they often search on Google first. A properly optimized Google Business Profile helps your business appear in local search results.",
      },
      {
        heading: "Your profile builds quick trust",
        text: "Customers can see your location, phone number, business hours, photos, reviews, and services directly from Google. This makes your business easier to trust and contact.",
      },
      {
        heading: "Optimization improves visibility",
        text: "Adding the right categories, services, descriptions, photos, updates, and contact details can improve how your profile performs in local searches.",
      },
      {
        heading: "Final thoughts",
        text: "For local businesses, Google Business Profile is one of the most important online assets for visibility and customer action.",
      },
    ],
  },
];

export function getBlogBySlug(slug) {
  return blogData.find((blog) => blog.slug === slug);
}