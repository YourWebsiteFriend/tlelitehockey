import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TL Elite Hockey",
    default: "TL Elite Hockey | Youth Player Development | Thayer Sports Center, Braintree, MA",
  },
  description:
    "TL Elite Hockey School provides small-group and private youth hockey training in Greater Boston. Book sessions, clinics, and private lessons at Thayer Sports Center in Braintree, MA.",
  keywords: [
    "youth hockey training",
    "hockey lessons Boston",
    "hockey clinics Braintree",
    "private hockey lessons",
    "TL Elite Hockey",
    "Thayer Sports Center",
    "youth hockey development",
    "hockey school Massachusetts",
  ],
  openGraph: {
    siteName: "TL Elite Hockey",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "TL Elite Hockey School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.jpg"],
  },
  verification: {
    google: "VKTeOtBCFYtgYKmhORumVMihR5A7l_Ubkf5hdsu__o0",
  },
  other: {
    "fb:admins": "TLeliteHockey",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
