import clsx from 'clsx';

// Text colors.
export const themeTextColor = clsx('text-neutral-900 dark:text-neutral-100');
export const themeTextBrandColor = clsx('text-brand-dark dark:text-brand');
export const themeTextBrandHoverColor = clsx(
  'hover:text-brand-dark dark:hover:text-brand',
);
export const themeTextBrandGroupHoverColor = clsx(
  'group-hover:text-brand-dark dark:group-hover:text-brand',
);
export const themeTextSubtitleColor = clsx(
  'text-neutral-700 dark:text-neutral-300',
);
export const themeTextSecondaryColor = clsx(
  'text-neutral-600 dark:text-neutral-400',
);
export const themeTextSubtleColor = clsx('text-neutral-500');
export const themeTextFaintColor = clsx(
  'text-neutral-400 dark:text-neutral-600',
);
export const themeTextSecondaryInvertColor = clsx(
  'text-neutral-400 dark:text-neutral-600',
);
export const themeTextInvertColor = clsx(
  'text-neutral-100 dark:text-neutral-900',
);
export const themeTextDarkColor = clsx('text-neutral-900');
export const themeTextLightColor = clsx('text-neutral-100');
// Text colors -- semantic.
export const themeTextSuccessColor = clsx(
  'text-success dark:text-success-light',
);
export const themeTextDangerColor = clsx('text-danger');
export const themeTextPlaceholderColor = themeTextSecondaryColor;
export const themeTextDisabledColor = clsx(
  'text-neutral-300 dark:text-neutral-700',
);
export const themeTextLabelColor = clsx(
  'text-neutral-700 dark:text-neutral-300',
);

export const themeIconColor = clsx('text-neutral-400 dark:text-neutral-600');

// Background colors.
export const themeBackgroundColor = clsx('bg-white dark:bg-neutral-950');
export const themeBackgroundInvertColor = clsx('bg-neutral-950 dark:bg-white');
export const themeBackgroundLayerColor = clsx('bg-white dark:bg-neutral-900');
export const themeBackgroundEmphasized = clsx(
  'bg-neutral-50 dark:bg-neutral-900',
);
export const themeBackgroundEmphasizedHover = clsx(
  'hover:bg-neutral-50 dark:hover:bg-neutral-900',
);
export const themeBackgroundLayerEmphasized = clsx(
  'bg-neutral-50 dark:bg-neutral-800',
);
export const themeBackgroundLayerEmphasizedHover = clsx(
  'hover:bg-neutral-50 dark:hover:bg-neutral-800',
);

export const themeCardBackgroundColor = clsx(
  'bg-neutral-50 dark:bg-neutral-800/40',
);

// Line colors.
export const themeLineColor = clsx(
  'border-neutral-200 dark:border-neutral-800',
);
export const themeLineBackgroundColor = clsx(
  'bg-neutral-200 dark:bg-neutral-800',
);
export const themeLineTextColor = clsx(
  'text-neutral-200 dark:text-neutral-800',
);
export const themeDivideColor = clsx(
  'divide-neutral-200 dark:divide-neutral-800',
);

export const themeGlassyBorder = clsx(
  'glassbox border border-neutral-200 dark:border-transparent',
);

export type ThemeGradient<
  StartColor extends string = string,
  EndColor extends string = string,
> = {
  className: `bg-[linear-gradient(133.77deg,_${StartColor}_0%,_${EndColor}_97.95%)]`;
  endColor: EndColor;
  startColor: StartColor;
};

// Gradient colors.
export const themeGradientBlueGreen: ThemeGradient<'#6366F1', '#10B981'> = {
  className: 'bg-[linear-gradient(133.77deg,_#6366F1_0%,_#10B981_97.95%)]',
  endColor: '#10B981',
  startColor: '#6366F1',
};

export const themeGradientGreenYellow: ThemeGradient<'#059669', '#F59E0B'> = {
  className: 'bg-[linear-gradient(133.77deg,_#059669_0%,_#F59E0B_97.95%)]',
  endColor: '#F59E0B',
  startColor: '#059669',
};

export const themeGradientPinkPurple: ThemeGradient<'#EC4899', '#818CF8'> = {
  className: 'bg-[linear-gradient(133.77deg,_#EC4899_0%,_#818CF8_97.95%)]',
  endColor: '#818CF8',
  startColor: '#EC4899',
};

export const themeRadialGlowBackground = clsx(
  'relative before:rounded-[inherit] before:opacity-50 before:z-[-1] before:top-0 before:left-0 before:right-0 before:absolute before:bg-top before:bg-cover before:w-full before:h-[600px] before:bg-[radial-gradient(78.57%_78.57%_at_50.65%_0.84%,_#E9D5FF_0%,_#8383FD_0%,_rgba(15,_23,_42,_0.0001)_100%)]',
);

// Shadow colors.
export const themeBrandShadow =
  'shadow-[0px_0px_24px_8px_rgba(148,_140,_249,_0.4)]';
