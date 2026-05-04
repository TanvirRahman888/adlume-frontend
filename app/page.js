import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <ThemeToggle />

      <section className="mt-10">
        <h1 className="text-5xl font-bold">Adlume Media</h1>
        <p className="mt-4 text-xl" style={{ color: "var(--text-muted)" }}>
          Helping Brands Get Seen, Clicked, and Chosen.
        </p>
      </section>
    </main>
  );
}