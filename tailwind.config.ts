import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1C5F8C',
        'secondary': '#474747',
        'thirdary': '#F0314E',
        'white': '#FFFFFF',
        'input': '#F2F2F2',
        'black': '#000000',
        'warning': '#ffc107',
        'success': '#28a745',
        'error': '#dc3545',
      },
    },
  },
  plugins: [],
} satisfies Config;
