"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import React from "react";
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
import { Spacer } from "@nextui-org/spacer";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { button as buttonStyles } from "@nextui-org/theme";
import InputIcon from "@mui/icons-material/Input";
import axios from "axios";

import { siteConfig } from "../config/site";
import { ThemeSwitch } from "../components/theme-switch";
import { title } from "../components/primitives";

export const Navbar = (props: any) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  let authenticated;
  let loginLink: any;
  let adminDashLink: any;
  let nameButton;

  if (props.hasOwnProperty("login")) {
    loginLink = null;
    nameButton = null;
  } else {
    if (status === "authenticated") {
      authenticated = true;
      axios
        .post("/api/user", {
          session: session,
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      loginLink = (
        <div role="button" onClick={() => signOut()}>
          Log out
        </div>
      );

      if (session.user?.role === "admin") {
        adminDashLink = (
          <DropdownItem key="admin" href="/admin">
            <div>Admin</div>
          </DropdownItem>
        );
      }
      nameButton = session.user?.name;
    } else {
      authenticated = false;
      loginLink = <></>;
      nameButton = (
        <div>
          Log In <InputIcon />
        </div>
      );
    }
  }

  return (
    <div className="bg-background_navbar h-auto">
      <NextUINavbar
        className="bg-inherit md:py-2"
        maxWidth="full"
        position="sticky"
      >
        <NavbarContent className="basis-1/5 md:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <span className={title({ size: "sm", color: "logo" })}>
                SCCS&nbsp;
              </span>
              <span className={title({ size: "xs" })}>
                Course Planner&nbsp;
              </span>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="start" className="hidden md:flex">
          <Spacer x={24} />
          <ul className="gap-4 flex-row justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: pathname == item.href ? "shadow" : "ghost",
                })}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden md:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden md:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>

          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Link
                  className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "ghost",
                  })}
                  onClick={
                    authenticated
                      ? () => {}
                      : () => signIn("keycloak", { callbackUrl: "/" })
                  }
                >
                  {nameButton}
                </Link>
              </DropdownTrigger>

              {authenticated ? (
                <DropdownMenu aria-label="Static Actions">
                  {adminDashLink}
                  <DropdownItem key="loginLink">{loginLink}</DropdownItem>
                </DropdownMenu>
              ) : (
                <></>
              )}
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="flex md:hidden" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile?*/}
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link href={item.href} size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}

            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Link
                    className={buttonStyles({
                      color: "primary",
                      radius: "full",
                      variant: "ghost",
                    })}
                    onClick={
                      authenticated
                        ? () => {}
                        : () => signIn("keycloak", { callbackUrl: "/" })
                    }
                  >
                    {nameButton}
                  </Link>
                </DropdownTrigger>

                {authenticated ? (
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="loginLink">{loginLink}</DropdownItem>
                  </DropdownMenu>
                ) : (
                  <></>
                )}
              </Dropdown>
            </NavbarItem>
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};
