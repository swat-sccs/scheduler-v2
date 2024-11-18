import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      logo: "from-[#F46523] to-[#9FADBC]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      xs: "text-2xl",
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "logo",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const courseColors = [
  "hsl(0deg 60% 35%)",
  "hsl(21.17deg 60% 35%)",
  "hsl(42.34deg 60% 35%)",
  "hsl(63.51deg 60% 35%)",
  "hsl(84.68deg 60% 35%)",
  "hsl(105.85deg 60% 35%)",
  "hsl(127.02deg 60% 35%)",
  "hsl(148.19deg 60% 35%)",
  "hsl(169.36deg 60% 35%)",
  "hsl(190.53deg 60% 35%)",
  "hsl(211.70deg 60% 35%)",
  "hsl(232.87deg 60% 35%)",
  "hsl(254.04deg 60% 35%)",
  "hsl(275.21deg 60% 35%)",
  "hsl(296.38deg 60% 35%)",
  "hsl(317.55deg 60% 35%)",
];

export function generateColorFromName(name: string) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i) * i;
  }

  return courseColors[hash % courseColors.length];
}
