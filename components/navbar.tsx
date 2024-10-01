"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { button as buttonStyles } from "@nextui-org/theme";
import { Divider } from "@nextui-org/divider";
import InputIcon from "@mui/icons-material/Input";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";

export const Navbar = () => {
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          k
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <>
      <NextUINavbar className="mt-10" maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
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

        <NavbarContent justify="start">
          <Spacer x={24} />
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <>
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
              </>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
            <Link
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "ghost",
              })}
              href=""
            >
              Sign In <InputIcon />
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile?*/}
        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <Divider className="my-4" />
    </>
  );
};
