// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const neutral = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#070708',
};

const green = {
  lighter: colors.green['100'],
  light: colors.green['400'],
  DEFAULT: colors.green['500'],
  dark: colors.green['600'],
  darker: colors.green['700'],
};

const blue = {
  lighter: colors.sky['100'],
  light: colors.sky['400'],
  DEFAULT: colors.sky['500'],
  dark: colors.sky['600'],
  darker: colors.sky['700'],
};

const red = {
  lighter: colors.red['100'],
  light: colors.red['400'],
  DEFAULT: colors.red['500'],
  dark: colors.red['600'],
  darker: colors.red['700'],
};

const yellow = {
  lighter: colors.amber['100'],
  light: colors.amber['400'],
  DEFAULT: colors.amber['500'],
  dark: colors.amber['600'],
  darker: colors.amber['700'],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './questions/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    typography: require('./typography.cjs'),
    extend: {
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        glow: '0 0 4px rgb(0 0 0 / 0.1)',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: colors.indigo,
        green,
        success: green,
        blue,
        info: blue,
        red,
        danger: red,
        yellow,
        warning: yellow,
        neutral,
        gray: neutral,
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      letterSpacing: {
        1: '.015625em',
        2: '.03125em',
        3: '.046875em',
        4: '.0625em',
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
