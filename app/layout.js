import Navbar from "@/components/Navbar";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Adlume Media",
  description:
    "Adlume Media helps businesses grow online through digital marketing, branding, paid ads, and web design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
