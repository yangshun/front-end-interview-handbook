// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme');

const neutral = {
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  50: '#fafafa',
  500: '#71717a',
  600: '#52525b',
  700: '#484851',
  800: '#303036',
  900: '#252429',
  950: '#18181b',
};

const indigo = {
  dark: '#7063f3',
  darker: '#5133cf',
  darkest: '#3a2888',
  DEFAULT: '#948cf9',
  light: '#bab5fd',
  lighter: '#d6d5fe',
  lightest: '#f3f0ff',
};

const green = {
  dark: '#1a6a22',
  darker: '#0c3310',
  darkest: '#071c09',
  DEFAULT: '#28a635',
  light: '#39ea4a',
  lighter: '#97ffa2',
  lightest: '#ebffed',
};

const orange = {
  dark: '#aa6729',
  darker: '#3f260f',
  darkest: '#221508',
  DEFAULT: '#f8963c',
  light: '#ffbf85',
  lighter: '#ffe3ca',
  lightest: '#fff9f3',
};

const red = {
  dark: '#ad2a2a',
  darker: '#551515',
  darkest: '#2f0b0b',
  DEFAULT: '#ff5353',
  light: '#ff8d8d',
  lighter: '#ffe1e1',
  lightest: '#fff8f8',
};

const blue = {
  dark: '#1d6379',
  darker: '#0e303b',
  darkest: '#081a20',
  DEFAULT: '#2e9cbe',
  light: '#47c5ee',
  lighter: '#c0f0ff',
  lightest: '#f1fcff',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './questions/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee linear infinite',
        marquee2: 'marquee2 linear infinite',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      boxShadow: {
        glow: '0 0 4px rgb(0 0 0 / 0.1)',
      },
      colors: {
        blue,
        brand: indigo,
        danger: red,
        gray: neutral,
        green,
        indigo,
        info: blue,
        neutral,
        orange,
        red,
        success: green,
        warning: orange,
      },
      fontFamily: {
        sans: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif",
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
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
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      letterSpacing: {
        1: '.015625em',
        2: '.03125em',
        3: '.046875em',
        4: '.0625em',
      },
      opacity: {
        1: '0.01',
        15: '0.15',
        2.5: '0.025',
        7.5: '0.075',
      },
      zIndex: {
        // Modified from: https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss#L1133
        fixed: 30,
      },
    },
  },
};
