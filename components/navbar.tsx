"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { button as buttonStyles } from "@nextui-org/theme";
import InputIcon from "@mui/icons-material/Input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

import { siteConfig } from "../config/site";
import { ThemeSwitch } from "../components/theme-switch";
import { title } from "../components/primitives";
import { Button } from "@nextui-org/button";

export const Navbar = (props: any) => {
  const cookies = useCookies();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "all",
    });
  }

  useEffect(() => {
    setIsMenuOpen(false); // Close the navigation panel
  }, [pathname]);

  if (status === "authenticated") {
    axios
      .post("/api/user", {
        session: session,
      })
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-background_navbar h-auto">
      <NextUINavbar
        classNames={{
          toggleIcon: ["text-white"],
        }}
        className="bg-inherit lg:py-2"
        maxWidth="full"
        position="sticky"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="basis-1/5 lg:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <span className={title({ size: "sm", color: "logo" })}>
                SCCS&nbsp;
              </span>
              <span className={title({ size: "xs" }) + " text-white"}>
                Course Planner&nbsp;
              </span>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          justify="center"
          className="hidden lg:flex gap-3 flex-row"
        >
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: pathname === item.href ? "shadow" : "ghost",
              })}
              onClick={() => {
                cookies.set("pagePref", item.href);
              }}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </NavbarContent>

        <NavbarContent
          className="hidden lg:flex basis-1/5 lg:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>

          <NavbarItem>
            {status === "authenticated" ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    className="text-primary border-primary"
                  >
                    <AccountCircleIcon className="fill-primary" />
                    {session.user?.name || "Account"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {/* Causes an awful error if rendered conditionally */}
                  {/* <DropdownItem key="admin" href="/admin">
                    Admin
                  </DropdownItem> */}
                  <DropdownItem key="signOut" onClick={() => signOut()}>
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                variant="bordered"
                onClick={() => signIn("keycloak", { callbackUrl: "/" })}
                className="border-primary"
              >
                <InputIcon className="fill-white text-primary" /> Log In
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        {/* Mobile?*/}

        <NavbarContent className="flex lg:hidden" justify="end">
          <ThemeSwitch />

          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarMenu className=" lg:flex">
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  href={item.href}
                  size="lg"
                  onClick={() => {
                    cookies.set("pagePref", item.href);
                  }}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
          <NavbarItem>
            {status === "authenticated" ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    <AccountCircleIcon className="fill-white" />
                    {session.user?.name || "Account"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Signout dropdown">
                  {/* Causes an awful error if rendered conditionally */}
                  {/* <DropdownItem key="admin" href="/admin">
                    Admin
                  </DropdownItem> */}
                  <DropdownItem key="signOut" onClick={() => signOut()}>
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                type="button"
                variant="bordered"
                onClick={() => signIn("keycloak", { callbackUrl: "/" })}
              >
                <InputIcon className="fill-white text-primary" /> Log In
              </Button>
            )}
          </NavbarItem>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};
