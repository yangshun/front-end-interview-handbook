// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './questions/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.6rem', '0.9rem'],
        '1.5xl': ['1.36rem', '1.9rem'],
        '4.5xl': ['2.35rem', '3.2rem'],
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: colors.indigo,
      },
      fontWeight: {
        lightnormal: 320,
        heavymedium: 550,
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
