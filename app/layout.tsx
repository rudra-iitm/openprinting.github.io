import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Openprinting - Openprinting",
  description: "OpenPrinting is dedicated to providing open-source printing solutions for Linux, Unix, and other operating systems. Explore drivers, tools, and resources to enhance your printing experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var media = window.matchMedia('(prefers-color-scheme: dark)');
                  function apply() {
                    var stored = localStorage.getItem('theme');
                    var dark = false;
                    if (stored === 'dark') dark = true;
                    else if (stored === 'light') dark = false;
                    else dark = media.matches;
                    document.documentElement.classList.toggle('dark', dark);
                  }
                  apply();
                  if (media.addEventListener) {
                    media.addEventListener('change', function() {
                      if (!localStorage.getItem('theme')) apply();
                    });
                  } else if (media.addListener) {
                    media.addListener(function() {
                      if (!localStorage.getItem('theme')) apply();
                    });
                  }
                  window.addEventListener('storage', function(e) {
                    if (e.key === 'theme') apply();
                  });
                } catch (e) {
                  console.error('Theme detection failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
