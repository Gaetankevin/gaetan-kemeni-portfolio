import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaëtan K. - Creative Technologist",
  description: "Portfolio de développeur Front-End et Creative Technologist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased dark font-sans`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
