/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B00",
        primaryBlack: "#0f0f0f",
        primaryRed: "#ff4040",
        success: "#32936f",
        blur: "#979797",
        primaryGray: "#dcdcdc",
        link: "#0094FF",
        toast_success: "#1AB232",
        toast_error: "#FF4040",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(primary|blur|primaryRed|primaryBlack|primaryGray|success|link|blur|toast_success|toast_error)/,
    },
  ],
};
