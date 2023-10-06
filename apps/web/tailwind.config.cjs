// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme');

const neutral = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#484851',
  800: '#303036',
  900: '#252429',
  950: '#18181b',
};

const indigo = {
  lightest: '#f3f0ff',
  lighter: '#d6d5fe',
  light: '#bab5fd',
  DEFAULT: '#948cf9',
  dark: '#7063f3',
  darker: '#5133cf',
  darkest: '#3a2888',
};

const green = {
  lightest: '#ebffed',
  lighter: '#97ffa2',
  light: '#39ea4a',
  DEFAULT: '#28a635',
  dark: '#1a6a22',
  darker: '#0c3310',
  darkest: '#071c09',
};

const orange = {
  lightest: '#fff9f3',
  lighter: '#ffe3ca',
  light: '#ffbf85',
  DEFAULT: '#f8963c',
  dark: '#aa6729',
  darker: '#3f260f',
  darkest: '#221508',
};

const red = {
  lightest: '#fff8f8',
  lighter: '#ffe1e1',
  light: '#ff8d8d',
  DEFAULT: '#ff5353',
  dark: '#ad2a2a',
  darker: '#551515',
  darkest: '#2f0b0b',
};

const blue = {
  lightest: '#f1fcff',
  lighter: '#c0f0ff',
  light: '#47c5ee',
  DEFAULT: '#2e9cbe',
  dark: '#1d6379',
  darker: '#0e303b',
  darkest: '#081a20',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './questions/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee linear infinite',
        marquee2: 'marquee2 linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
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
        indigo,
        brand: indigo,
        green,
        success: green,
        blue,
        info: blue,
        red,
        danger: red,
        orange,
        warning: orange,
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
      typography: require('./typography.cjs'),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
