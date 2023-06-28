// Base typography from Protocol-template: https://protocol.tailwindui.com/
const fontSize = {
  '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
  xs: ['0.8125rem', { lineHeight: '1.5rem' }],
  sm: ['0.875rem', { lineHeight: '1.5rem' }],
  base: ['1rem', { lineHeight: '1.75rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
};

module.exports = ({ theme }) => ({
  DEFAULT: {
    css: {
      '--tw-prose-body': theme('colors.neutral.700'),
      '--tw-prose-headings': theme('colors.neutral.900'),
      '--tw-prose-links': theme('colors.brand.500'),
      '--tw-prose-links-hover': theme('colors.brand.600'),
      '--tw-prose-links-underline': theme('colors.brand.500 / 0.3'),
      '--tw-prose-bold': theme('colors.neutral.900'),
      '--tw-prose-counters': theme('colors.neutral.500'),
      '--tw-prose-bullets': theme('colors.neutral.300'),
      '--tw-prose-hr': theme('colors.neutral.900 / 0.05'),
      '--tw-prose-quotes': theme('colors.neutral.900'),
      '--tw-prose-quote-borders': theme('colors.neutral.200'),
      '--tw-prose-captions': theme('colors.neutral.500'),
      '--tw-prose-code': theme('colors.neutral.900'),
      '--tw-prose-code-bg': theme('colors.neutral.100'),
      '--tw-prose-code-bg-hover': theme('colors.neutral.100 / 0.5'),
      '--tw-prose-code-ring': theme('colors.neutral.300'),
      '--tw-prose-th-borders': theme('colors.neutral.300'),
      '--tw-prose-td-borders': theme('colors.neutral.200'),

      '--tw-prose-invert-body': theme('colors.neutral.400'),
      '--tw-prose-invert-headings': theme('colors.white'),
      '--tw-prose-invert-links': theme('colors.brand.400'),
      '--tw-prose-invert-links-hover': theme('colors.brand.500'),
      '--tw-prose-invert-links-underline': theme('colors.brand.500 / 0.3'),
      '--tw-prose-invert-bold': theme('colors.white'),
      '--tw-prose-invert-counters': theme('colors.neutral.400'),
      '--tw-prose-invert-bullets': theme('colors.neutral.600'),
      '--tw-prose-invert-hr': theme('colors.white / 0.05'),
      '--tw-prose-invert-quotes': theme('colors.neutral.100'),
      '--tw-prose-invert-quote-borders': theme('colors.neutral.700'),
      '--tw-prose-invert-captions': theme('colors.neutral.400'),
      '--tw-prose-invert-code': theme('colors.white'),
      '--tw-prose-invert-code-bg': theme('colors.neutral.700 / 0.15'),
      '--tw-prose-invert-code-bg-hover': theme('colors.neutral.700 / 0.10'),
      '--tw-prose-invert-code-ring': theme('colors.white / 0.1'),
      '--tw-prose-invert-th-borders': theme('colors.neutral.600'),
      '--tw-prose-invert-td-borders': theme('colors.neutral.700'),

      // Base
      color: 'var(--tw-prose-body)',
      fontSize: fontSize.base[0],
      lineHeight: theme('lineHeight.7'),

      // Layout
      '> *': {
        maxWidth: theme('maxWidth.2xl'),
        marginLeft: 'auto',
        marginRight: 'auto',
        '@screen lg': {
          maxWidth: theme('maxWidth.3xl'),
          marginLeft: `calc(50% - min(50%, ${theme('maxWidth.lg')}))`,
          marginRight: `calc(50% - min(50%, ${theme('maxWidth.lg')}))`,
        },
      },

      // Text
      p: {
        marginTop: theme('spacing.7'),
        marginBottom: theme('spacing.7'),
      },
      '[class~="lead"]': {
        fontSize: fontSize.lg[0],
        ...theme('fontSize.lg')[1],
        ...fontSize.lg[1],
        marginBottom: theme('spacing.10'),
      },

      // Lists
      ol: {
        listStyleType: 'decimal',
        marginTop: theme('spacing.6'),
        marginBottom: theme('spacing.6'),
        paddingLeft: '1.625rem',
      },
      'ol[type="A"]': {
        listStyleType: 'upper-alpha',
      },
      'ol[type="a"]': {
        listStyleType: 'lower-alpha',
      },
      'ol[type="A" s]': {
        listStyleType: 'upper-alpha',
      },
      'ol[type="a" s]': {
        listStyleType: 'lower-alpha',
      },
      'ol[type="I"]': {
        listStyleType: 'upper-roman',
      },
      'ol[type="i"]': {
        listStyleType: 'lower-roman',
      },
      'ol[type="I" s]': {
        listStyleType: 'upper-roman',
      },
      'ol[type="i" s]': {
        listStyleType: 'lower-roman',
      },
      'ol[type="1"]': {
        listStyleType: 'decimal',
      },
      ul: {
        listStyleType: 'disc',
        marginTop: theme('spacing.6'),
        marginBottom: theme('spacing.6'),
        paddingLeft: '1.625rem',
      },
      li: {
        marginTop: theme('spacing.2'),
        marginBottom: theme('spacing.2'),
      },
      ':is(ol, ul) > li': {
        paddingLeft: theme('spacing[1.5]'),
      },
      'ol > li::marker': {
        fontWeight: '400',
        color: 'var(--tw-prose-counters)',
      },
      'ul > li::marker': {
        color: 'var(--tw-prose-bullets)',
      },
      '> ul > li p': {
        marginTop: theme('spacing.3'),
        marginBottom: theme('spacing.3'),
      },
      '> ul > li > *:first-child': {
        marginTop: theme('spacing.5'),
      },
      '> ul > li > *:last-child': {
        marginBottom: theme('spacing.5'),
      },
      '> ol > li > *:first-child': {
        marginTop: theme('spacing.5'),
      },
      '> ol > li > *:last-child': {
        marginBottom: theme('spacing.5'),
      },
      'ul ul, ul ol, ol ul, ol ol': {
        marginTop: theme('spacing.3'),
        marginBottom: theme('spacing.3'),
      },

      // Horizontal rules
      hr: {
        borderColor: 'var(--tw-prose-hr)',
        borderTopWidth: 1,
        marginTop: theme('spacing.9'),
        marginBottom: theme('spacing.9'),
        maxWidth: 'none',
      },

      // Quotes
      blockquote: {
        fontWeight: '500',
        fontStyle: 'italic',
        color: 'var(--tw-prose-quotes)',
        borderLeftWidth: '0.25rem',
        borderLeftColor: 'var(--tw-prose-quote-borders)',
        quotes: '"\\201C""\\201D""\\2018""\\2019"',
        marginTop: theme('spacing.8'),
        marginBottom: theme('spacing.8'),
        paddingLeft: theme('spacing.5'),
      },
      'blockquote p:first-of-type::before': {
        content: 'open-quote',
      },
      'blockquote p:last-of-type::after': {
        content: 'close-quote',
      },

      // Headings
      h1: {
        color: 'var(--tw-prose-headings)',
        fontWeight: '700',
        fontSize: fontSize['3xl'][0],
        ...theme('fontSize.3xl')[1],
        ...fontSize['3xl'][1],
        marginBottom: theme('spacing.3'),
      },
      h2: {
        color: 'var(--tw-prose-headings)',
        fontWeight: '600',
        fontSize: fontSize['2xl'][0],
        ...theme('fontSize.2xl')[1],
        ...fontSize['2xl'][1],
        marginTop: theme('spacing.12'),
        marginBottom: theme('spacing.4'),
      },
      h3: {
        color: 'var(--tw-prose-headings)',
        fontSize: fontSize.xl[0],
        ...theme('fontSize.xl')[1],
        ...fontSize.xl[1],
        fontWeight: '600',
        marginTop: theme('spacing.10'),
        marginBottom: theme('spacing.4'),
      },
      h4: {
        color: 'var(--tw-prose-headings)',
        fontSize: fontSize.lg[0],
        ...theme('fontSize.lg')[1],
        ...fontSize.lg[1],
        fontWeight: '600',
        marginTop: theme('spacing.8'),
        marginBottom: theme('spacing.2'),
      },

      // Media
      'img, video, figure': {
        marginTop: theme('spacing.8'),
        marginBottom: theme('spacing.8'),
      },
      'figure > *': {
        marginTop: '0',
        marginBottom: '0',
      },
      figcaption: {
        color: 'var(--tw-prose-captions)',
        fontSize: fontSize.xs[0],
        ...theme('fontSize.xs')[1],
        ...fontSize.xs[1],
        marginTop: theme('spacing.2'),
      },

      // Tables
      table: {
        width: '100%',
        tableLayout: 'auto',
        textAlign: 'left',
        marginTop: theme('spacing.4'),
        marginBottom: theme('spacing.4'),
        lineHeight: theme('lineHeight.6'),
      },
      thead: {
        borderBottomWidth: '1px',
        borderBottomColor: 'var(--tw-prose-th-borders)',
      },
      'thead th': {
        color: 'var(--tw-prose-headings)',
        fontWeight: '600',
        verticalAlign: 'bottom',
        paddingRight: theme('spacing.2'),
        paddingBottom: theme('spacing.2'),
        paddingLeft: theme('spacing.2'),
      },
      'thead th:first-child': {
        paddingLeft: '0',
      },
      'thead th:last-child': {
        paddingRight: '0',
      },
      'tbody tr': {
        borderBottomWidth: '1px',
        borderBottomColor: 'var(--tw-prose-td-borders)',
      },
      'tbody tr:last-child': {
        borderBottomWidth: '0',
      },
      'tbody td': {
        verticalAlign: 'baseline',
      },
      tfoot: {
        borderTopWidth: '1px',
        borderTopColor: 'var(--tw-prose-th-borders)',
      },
      'tfoot td': {
        verticalAlign: 'top',
      },
      ':is(tbody, tfoot) td': {
        paddingTop: theme('spacing.2'),
        paddingRight: theme('spacing.2'),
        paddingBottom: theme('spacing.2'),
        paddingLeft: theme('spacing.2'),
      },
      ':is(tbody, tfoot) td:first-child': {
        paddingLeft: '0',
      },
      ':is(tbody, tfoot) td:last-child': {
        paddingRight: '0',
      },

      // Inline elements
      a: {
        color: 'var(--tw-prose-links)',
        textDecoration: 'underline transparent',
        fontWeight: '500',
        transitionProperty: 'color, text-decoration-color',
        transitionDuration: theme('transitionDuration.DEFAULT'),
        transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
        '&:hover': {
          color: 'var(--tw-prose-links-hover)',
          textDecorationColor: 'var(--tw-prose-links-underline)',
        },
        '&:has(code)': {
          textDecoration: 'none !important',
        },
      },
      ':is(h1, h2, h3, h4, h5, h6) a': {
        fontWeight: 'inherit',
      },
      strong: {
        color: 'var(--tw-prose-bold)',
        fontWeight: '600',
      },
      ':is(a, blockquote, thead th) strong': {
        color: 'inherit',
      },
      code: {
        color: 'var(--tw-prose-code)',
        borderRadius: theme('borderRadius.lg'),
        paddingTop: theme('padding.1'),
        paddingRight: theme('padding[1.5]'),
        paddingBottom: theme('padding.1'),
        paddingLeft: theme('padding[1.5]'),
        boxShadow: 'inset 0 0 0 1px var(--tw-prose-code-ring)',
        backgroundColor: 'var(--tw-prose-code-bg)',
        fontSize: fontSize.xs[0],
        ...fontSize.xs[1],
      },
      ':is(a, h1, h2, h3, h4, h5, h6, blockquote, thead th) code': {
        color: 'inherit',
      },
      ':is(a) code:hover': {
        backgroundColor: 'var(--tw-prose-code-bg-hover)',
      },
      'h1 code': {
        fontSize: fontSize['3xl'][0],
        fontWeight: 'inherit',
      },
      'h2 code': {
        fontSize: fontSize['2xl'][0],
        fontWeight: 'inherit',
      },
      'h3 code': {
        fontSize: fontSize.xl[0],
        fontWeight: 'inherit',
      },
      'h4 code': {
        fontSize: fontSize.base[0],
        fontWeight: 'inherit',
      },
      'h5 code': {
        fontSize: fontSize.base[0],
        fontWeight: 'inherit',
      },
      pre: {
        padding: theme('padding.4'),
        borderRadius: theme('borderRadius.xl'),
        overflowX: 'auto',
        fontSize: theme('fontSize.sm')[0],
        ...theme('fontSize.sm')[1],
      },

      // Overrides
      ':is(h1, h2, h3, h4, h5) + *': {
        marginTop: '0',
      },
      '> :first-child': {
        marginTop: '0 !important',
      },
      '> :last-child': {
        marginBottom: '0 !important',
      },
    },
  },
  invert: {
    css: {
      '--tw-prose-body': 'var(--tw-prose-invert-body)',
      '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
      '--tw-prose-links': 'var(--tw-prose-invert-links)',
      '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
      '--tw-prose-links-underline': 'var(--tw-prose-invert-links-underline)',
      '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
      '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
      '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
      '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
      '--tw-prose-quotes': 'var(--tw-prose-invert-quotes)',
      '--tw-prose-quote-borders': 'var(--tw-prose-invert-quote-borders)',
      '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
      '--tw-prose-code': 'var(--tw-prose-invert-code)',
      '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
      '--tw-prose-code-ring': 'var(--tw-prose-invert-code-ring)',
      '--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
      '--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)',
    },
  },
});
