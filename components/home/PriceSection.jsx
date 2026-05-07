import PriceCard from "./PriceCard";
import { Rocket, CalendarDays, Crown, Handshake } from "lucide-react";

const pricingPlans = [
  {
    title: "Free Trial",
    subtitle: "Perfect to get started",
    price: "$0",
    period: "7 Days",
    icon: Rocket,
    color: "#0080E0",
    buttonText: "Start Free Trial",
    whatsappMessage:
      "Hello Adlume Media, I want to start the Free Trial plan for my business. Please share the details.",
    features: [
      "1 Marketing Channel Setup",
      "Basic Social Media Audit",
      "1 Social Media Post Design",
      "Limited Support",
    ],
  },
  {
    title: "Weekly Plan",
    subtitle: "Great for short-term growth",
    price: "$49",
    period: "Week",
    icon: CalendarDays,
    color: "#0080E0",
    buttonText: "Choose Weekly Plan",
    whatsappMessage:
      "Hello Adlume Media, I am interested in the Weekly Plan. Please share the details and next steps.",
    features: [
      "Social Media Management",
      "7 Engaging Post Designs",
      "Facebook & Instagram Ads",
      "Performance Report",
      "Email & Chat Support",
    ],
  },
  {
    title: "Monthly Plan",
    subtitle: "Best for consistent growth",
    price: "$149",
    period: "Month",
    icon: Crown,
    color: "#00B0F0",
    popular: true,
    buttonText: "Choose Monthly Plan",
    whatsappMessage:
      "Hello Adlume Media, I want to choose the Monthly Plan for my business. Please share the details and payment process.",
    features: [
      "Everything in Weekly Plan",
      "Content Creation 12 Posts",
      "Advanced Ads Management",
      "Landing Page Design",
      "Performance Report",
      "Priority Support",
    ],
  },
  {
    title: "Contractual Plan",
    subtitle: "Long-term growth partner",
    price: "Custom",
    period: "Based on Requirements",
    icon: Handshake,
    color: "#F08000",
    buttonText: "Contact Us",
    whatsappMessage:
      "Hello Adlume Media, I want a custom contractual plan for my business. Please contact me with the details.",
    features: [
      "Everything in Monthly Plan",
      "Custom Strategy & Plan",
      "Dedicated Account Manager",
      "Unlimited Content Creation",
      "Conversion Optimization",
      "Weekly Strategy Call",
    ],
  },
];

export default function PriceSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: "var(--background)" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-160 -translate-x-1/2 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0080E0]">
            Pricing Plans
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            Flexible Plans for Every Business
          </h2>

          <p
            className="mt-5 text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Choose the perfect plan to grow your brand. Start with a free trial
            and scale when you are ready.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PriceCard
              key={plan.title}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              period={plan.period}
              icon={plan.icon}
              color={plan.color}
              popular={plan.popular}
              buttonText={plan.buttonText}
              whatsappMessage={plan.whatsappMessage}
              features={plan.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}