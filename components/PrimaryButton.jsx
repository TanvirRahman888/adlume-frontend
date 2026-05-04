export default function PrimaryButton({ children, href = "#", variant = "blue" }) {
  const styles =
    variant === "orange"
      ? "bg-gradient-to-r from-[#F08000] to-[#F0B000] text-[#000513]"
      : "bg-gradient-to-r from-[#0080E0] to-[#00B0F0] text-white";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold shadow-lg transition hover:scale-105 ${styles}`}
    >
      {children}
    </a>
  );
}