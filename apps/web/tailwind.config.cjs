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
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#070708',
};

const brand = {
  lightest: 'hsl(var(--brand-lightest))',
  lighter: 'hsl(var(--brand-lighter))',
  light: 'hsl(var(--brand-light))',
  DEFAULT: 'hsl(var(--brand-default))',
  dark: 'hsl(var(--brand-dark))',
  darker: 'hsl(var(--brand-darker))',
  darkest: 'hsl(var(--brand-darkest))',
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
  /**
   This will get rid of sticky hover problem in mobile devices
    refer: https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/
    https://github.com/tailwindlabs/tailwindcss/pull/8394
**/
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ['class', '[data-color-scheme="dark"]'],
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './questions/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        marquee: 'marquee linear infinite',
        marquee2: 'marquee2 linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wiggle: 'wiggle 1s linear infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(15deg)' },
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.594rem' }],
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      // Temporary workaround before the below PR is released
      // See: https://github.com/tailwindlabs/tailwindcss/pull/11317
      height: {
        dvh: '100dvh',
      },
      colors: {
        brand,
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
      boxShadow: {
        glow: '0 0 24px 8px var(--tw-shadow)',
        'glow-sm': '0 2px 8px 0px var(--tw-shadow)',
      },
      letterSpacing: {
        1: '.015625em',
        2: '.03125em',
        3: '.046875em',
        4: '.0625em',
      },
      typography: require('./typography.cjs'),
      zIndex: {
        // Modified from: https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss#L1133
        sticky: 20,
        fixed: 30,
        'slideout-overlay': 40,
        slideout: 45,
        'dialog-overlay': 50,
        dialog: 55,
        dropdown: 60, // Above dialog so that dropdowns can be used within dialogs.
        popover: 70,
        tooltip: 80,
        toast: 90,
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
