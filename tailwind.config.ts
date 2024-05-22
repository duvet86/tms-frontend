import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  // daisyui: {
  //   themes: ["light", "dark"],
  // },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#006F51",
          secondary: "#004949",
          accent: "#ffe716",
          neutral: "#313131",
          "base-100": "#ffffff",
          info: "#0ea5e9",
          success: "#84cc16",
          warning: "#ffe716",
          error: "#ef4444",
        },
      },
    ],
  },
} satisfies Config;
