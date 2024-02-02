// Source: https://github.com/tailwindlabs/tailwindcss.com/blob/master/tailwind.config.js

module.exports = ({ theme }) => ({
  DEFAULT: {
    css: {
      maxWidth: 'none',
      color: theme('colors.neutral.700'),
      hr: {
        borderColor: theme('colors.neutral.100'),
        marginTop: '3em',
        marginBottom: '3em',
      },
      'h1, h2, h3': {
        letterSpacing: '-0.025em',
      },
      h2: {
        marginBottom: `${16 / 24}em`,
      },
      h3: {
        marginTop: '2.4em',
        lineHeight: '1.4',
      },
      h4: {
        marginTop: '2em',
        fontSize: '1.125em',
      },
      'h2 small, h3 small, h4 small': {
        fontFamily: theme('fontFamily.mono').join(', '),
        color: theme('colors.neutral.500'),
        fontWeight: 500,
      },
      'h2 small': {
        fontSize: theme('fontSize.lg')[0],
        ...theme('fontSize.lg')[1],
      },
      'h3 small': {
        fontSize: theme('fontSize.base')[0],
        ...theme('fontSize.base')[1],
      },
      'h4 small': {
        fontSize: theme('fontSize.sm')[0],
        ...theme('fontSize.sm')[1],
      },
      'h5 small': {
        fontSize: theme('fontSize.xs')[0],
        ...theme('fontSize.xs')[1],
      },
      'h2 code, h3 code': {
        font: 'inherit',
      },
      a: {
        fontWeight: theme('fontWeight.medium'),
        textDecoration: 'none',
      },
      'a code': {
        color: 'inherit',
        fontWeight: 'inherit',
      },
      strong: {
        fontWeight: theme('fontWeight.medium'),
      },
      'a strong': {
        color: 'inherit',
        fontWeight: 'inherit',
      },
      kbd: {
        background: theme('colors.neutral.100'),
        borderWidth: '1px',
        borderColor: theme('colors.neutral.200'),
        padding: '0.125em 0.25em',
        color: theme('colors.neutral.700'),
        fontWeight: 500,
        fontSize: '0.875em',
        fontVariantLigatures: 'none',
        borderRadius: '4px',
        margin: '0 1px',
      },
      code: {
        fontWeight: theme('fontWeight.medium'),
        fontVariantLigatures: 'none',
      },
      pre: {
        color: theme('colors.neutral.50'),
        borderRadius: theme('borderRadius.xl'),
        padding: theme('padding.5'),
        marginTop: `${20 / 14}em`,
        marginBottom: `${32 / 14}em`,
      },
      'p + pre': {
        marginTop: `${-4 / 14}em`,
      },
      'pre + pre': {
        marginTop: `${-16 / 14}em`,
      },
      'pre code': {
        flex: 'none',
        minWidth: '100%',
      },
      table: {
        fontSize: theme('fontSize.sm')[0],
        lineHeight: theme('fontSize.sm')[1].lineHeight,
      },
      thead: {
        color: theme('colors.neutral.700'),
        borderBottomColor: theme('colors.neutral.200'),
      },
      'thead th': {
        paddingTop: 0,
        fontWeight: theme('fontWeight.medium'),
      },
      'tbody tr': {
        borderBottomColor: theme('colors.neutral.100'),
      },
      'tbody tr:last-child': {
        borderBottomWidth: '1px',
      },
      'tbody code': {
        fontSize: theme('fontSize.xs')[0],
      },
      'figure figcaption': {
        textAlign: 'center',
        fontStyle: 'italic',
      },
      'figure > figcaption': {
        marginTop: `${12 / 14}em`,
      },
    },
  },
  invert: {
    css: {
      color: theme('colors.neutral.100'),
      'h2, h3, h4, thead th': {
        color: theme('colors.neutral.100'),
      },
      'h2 small, h3 small, h4 small': {
        color: theme('colors.neutral.100'),
      },
      kbd: {
        background: theme('colors.neutral.700'),
        borderColor: theme('colors.neutral.600'),
        color: theme('colors.neutral.200'),
      },
      code: {
        color: theme('colors.neutral.200'),
      },
      hr: {
        borderColor: theme('colors.neutral.200'),
        opacity: '0.05',
      },
      thead: {
        color: theme('colors.neutral.300'),
        borderBottomColor: 'rgb(148 163 184 / 0.2)',
      },
      'tbody tr': {
        borderBottomColor: 'rgb(148 163 184 / 0.1)',
      },
      blockQuote: {
        color: theme('colors.white'),
      },
    },
  },
});
