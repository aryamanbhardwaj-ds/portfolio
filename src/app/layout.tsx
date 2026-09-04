import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aryaman Bhardwaj — Data Analyst",
  description:
    "Portfolio of Aryaman Bhardwaj — Data Analyst turning raw data into business decisions with SQL, Python, Power BI, and Databricks.",
  keywords: [
    "Aryaman Bhardwaj",
    "Data Analyst",
    "Data Science",
    "SQL",
    "Python",
    "Power BI",
    "Databricks",
    "PySpark",
    "Portfolio",
  ],
  authors: [{ name: "Aryaman Bhardwaj" }],
  openGraph: {
    title: "Aryaman Bhardwaj — Data Analyst",
    description:
      "Turning raw data into business decisions with SQL, Python, Power BI, and Databricks.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/insurance.png",
        width: 1600,
        height: 900,
        alt: "Aryaman Bhardwaj — Data Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryaman Bhardwaj — Data Analyst",
    description:
      "Turning raw data into business decisions with SQL, Python, Power BI, and Databricks.",
    images: ["/images/insurance.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${poppins.variable} ${josefinSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-void text-cloud">
        {children}
      </body>
    </html>
  );
}
