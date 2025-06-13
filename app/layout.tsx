import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attendance Tracker",
  description: "Employee Attandance Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="__variable_5cfdac __variable_9a8899 antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
