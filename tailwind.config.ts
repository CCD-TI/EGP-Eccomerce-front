const { nextui } = require("@nextui-org/react");
const { fontFamily } = require('tailwindcss/defaultTheme');
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxl': '1980px',
        'xxl2': '1900px',
        'xl2': '1660px',
        'sm2': '670px',
        'sm4': '565px',
        'lg2': '1400px',
        'sm3': '455px',
        '2k': '2048px', // Define un nuevo breakpoint para pantallas mayores a 1980px
        'qhd': '2560px',   // Quad HD
        '4k': '3840px',
      },
      colors: {
        colors: {
          // PALETA OFICIAL CCD
          "cyan-ccd": "#00eadf", // RGB(0,234,223)
          "sky-ccd": "#3185f7", // RGB(49,133,247)
          "dark-blue-ccd": "#162e54", // RGB(22,46,84)

          // PALETA OFICIAL DE EGP
          "egp-gold": "#ba9328", // DORADO
          "egp-silver": "#B1B3B0", // PLATEADO
          "egp-black": "#000000", // NEGRO


          // COLORES DE APOYO
          "night-blue-ccd2": "#131939", // RGB(19,25,57)
          "violet-ccd2": "#6232fa", // RGB(98,50,250)
          "magenta-ccd2": "#FF00BF",   // RGB(255,0,191)
          "midnight-blue-ccd2": "#131939",  //RGB(19,25,57)
          "abyss-blue-ccd2": "#0b1026", // RGB(11,16,38)
        },
        dark: {
          "1": "#152D53",
          "2": "#161925",
        },
        blue: {
          "1": "#0E78F9",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, rgba(53,112,230,1) 0%, rgba(31,143,215,1) 50%, rgba(7,184,190,1) 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient2":
          "linear-gradient(to right, rgb(0, 132, 125), rgb(22, 61, 114))",
      },
      keyframes: {
        zoom: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
        },
        scaleAnimation: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
        colorChange: {
          "0%, 100%": {
            color: "black",
          },
          "50%": {
            color: "#027FE8",
          },
        },
        pulseSlow1: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
        },
        pulseSlow2: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
        buzz: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-3px)' },
          '40%': { transform: 'translateX(3px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        buzzScale: {
          "0%, 100%": { transform: "translateX(0) scale(1)" },
          "20%": { transform: "translateX(-3px) scale(1.05)" },
          "40%": { transform: "translateX(3px) scale(1.05)" },
          "60%": { transform: "translateX(-3px) scale(1.05)" },
          "80%": { transform: "translateX(3px) scale(1.05)" },
        },
      },
      animation: {
        scaleAnimation: "scaleAnimation 3s infinite",
        colorChange: "colorChange 3s infinite",
        zoom: "zoom 3s ease-in-out infinite",
        "pulse-slow-1": "pulseSlow1 3s ease-in-out infinite",
        "pulse-slow-2": "pulseSlow2 3s ease-in-out infinite",
        buzz: 'buzz 0.45s ease-in-out',
        "buzz-scale": "buzzScale 0.5s ease-in-out", // Duración igual a scale-110
        "trans-1000": "trans100 1.0s ease-in-out"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Averta", ...fontFamily.sans], // Averta será la fuente principal
      },
      backgroundPosition: {
        "center-center": "center center",
        "top-left": "top left",
        "top-center": "top center",
        "top-right": "top right",
        "bottom-left": "bottom left",
        "bottom-center": "bottom center",
        "bottom-right": "bottom right",
        "center-bottom": "center bottom",
      },
    },
  },
  darkMode: ["class", "class"],
  plugins: [nextui(), require("tailwindcss-animate"), require('@tailwindcss/line-clamp'),
  ],
};
export default config;
