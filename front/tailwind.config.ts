
import { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",


        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#41d3be',
        secondary: '#8AFF70',
        tertiary: '#708aff',
        quaternary: '#A47AFF',
        quinary: '#FF3D60',
        neutral: '#7f7f7f'
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('tailwind-scrollbar'),
  ],
};

export default config;
