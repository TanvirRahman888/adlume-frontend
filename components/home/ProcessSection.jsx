import Container from "@/components/Container";
import ProcessCard from "@/components/home/ProcessCard";
import {
  SearchCheck,
  ClipboardList,
  PencilLine,
  Rocket,
  ChartNoAxesCombined,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We learn about your business, goals, and target audience.",
    icon: SearchCheck,
    color: "#0080E0",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We create a customized strategy that fits your goals.",
    icon: ClipboardList,
    color: "#00B0F0",
  },
  {
    number: "03",
    title: "Create",
    description: "We design, develop, and create with purpose.",
    icon: PencilLine,
    color: "#F08000",
  },
  {
    number: "04",
    title: "Launch",
    description: "We launch the campaign and start delivering.",
    icon: Rocket,
    color: "#F0B000",
  },
  {
    number: "05",
    title: "Grow",
    description: "We analyze, optimize, and scale your growth.",
    icon: ChartNoAxesCombined,
    color: "#0080E0",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0080E0]/8 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
            Our Process
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            Our 5-Step Process to Success
          </h2>

          <p
            className="mt-5 text-base leading-7 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            From discovery to growth, we follow a clear process that keeps your
            brand moving in the right direction.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              color={step.color}
              showArrow={index !== processSteps.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}