export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SCCS Course Planner",
  description: "Version 2 of the Course Planner provided by SCCS",
  navItems: [
    {
      label: "Plan",
      href: "/",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Ratings",
      href: "/rating",
    },
  ],
  navMenuItems: [
    {
      label: "Plan",
      href: "/",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
