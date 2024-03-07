import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-t from-backgroundColor1 to-primaryColor">
        {children}
      </body>
    </html>
  );
}

//     <body className={inter.className}>{children}</body>
