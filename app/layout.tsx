import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { CookiesProvider } from "next-client-cookies/server";

import { NextAuthProvider } from "../components/providers/NextAuthProvider";
import { siteConfig } from "../config/site";
import { fontSans } from "../config/fonts";
import { Navbar } from "../components/navbar";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookiesProvider>
      <NextAuthProvider>
        <html suppressHydrationWarning lang="en">
          <head />
          <body
            className={clsx(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <Providers
              themeProps={{
                children: children,
                attribute: "class",
                defaultTheme: "dark",
              }}
            >
              <div className="relative flex flex-col h-screen ">
                <Navbar />
                <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                  {children}
                </main>
                <footer className="w-full flex items-center justify-center py-3">
                  <div className="columns-1 container max-w-4xl text-center">
                    <span className="text-xs">
                      The Course Planner is a student-run service, and displays
                      classes from the Tri-College course database. We recommend
                      confirming your schedule with the official course listings
                      just in case. If there are any issues, email us.
                    </span>
                    <br />

                    <div className=" space-x-5">
                      <Link
                        isExternal
                        href="https://www.sccs.swarthmore.edu/docs/policy"
                        title="SCCS Usage & Data Policy"
                      >
                        <span className=" text-xs underline  ">
                          Usage & Data Policy
                        </span>
                      </Link>
                      <span className="text-xs ">
                        © 2024 Swarthmore College Computer Society | v2.0.0
                      </span>
                    </div>
                  </div>
                </footer>
              </div>
            </Providers>
          </body>
        </html>
      </NextAuthProvider>
    </CookiesProvider>
  );
}
