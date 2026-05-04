export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const alignment = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#00B0F0]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-black md:text-5xl">{title}</h2>

      {description && (
        <p className="mt-4 text-base leading-7" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      )}
    </div>
  );
}