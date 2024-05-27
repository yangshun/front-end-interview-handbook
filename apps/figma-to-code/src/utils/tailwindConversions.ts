import colorPalette from 'tailwindcss/colors';

const colorVariants = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;
const colorWeights = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

const hexToColorName: Record<string, string> = {};

for (const colorVariant of colorVariants) {
  for (const colorWeight of colorWeights) {
    const hex = colorPalette[colorVariant][colorWeight];

    hexToColorName[hex] = colorVariant + '-' + colorWeight;
  }
}

export function convertHexColorToTailwindColor(
  colorNameOrHexColor: string,
): string | null {
  switch (colorNameOrHexColor) {
    case 'inherit':
    case 'transparent':
      return colorNameOrHexColor;
    case 'currentColor':
      return 'current';
  }

  const hexColor = colorNameOrHexColor.toLowerCase();

  switch (hexColor) {
    case '#000':
    case '#000000':
      return 'black';
    case '#fff':
    case '#ffffff':
      return 'white';
  }

  return hexToColorName[hexColor] ?? null;
}

const sizeMap: Record<number, string> = {
  0: '0',
  1: 'px',
  10: '2.5',
  112: '28',
  12: '3',
  128: '32',
  14: '3.5',
  144: '36',
  16: '4',
  160: '40',
  176: '44',
  192: '48',
  2: '0.5',
  20: '5',
  208: '52',
  224: '56',
  24: '6',
  240: '60',
  256: '64',
  28: '7',
  288: '72',
  32: '8',
  320: '80',
  36: '9',
  384: '96',
  4: '1',
  40: '10',
  48: '12',
  56: '14',
  6: '1.5',
  64: '16',
  8: '2',
  80: '20',
  96: '24',
};

export function convertSizeToTailwind(value: number) {
  return sizeMap[value] ?? null;
}

const borderRadiusMap: Record<number, string> = {
  0: '0',
  12: 'xl',
  16: '2xl',
  2: 'sm',
  24: '3xl',
  4: 'DEFAULT',
  6: 'md',
  8: 'lg',
  9999: 'full',
};

// TODO: Have better support for `full` by comparing against node height/width.
export function convertBorderRadiusToTailwind(value: number) {
  return borderRadiusMap[value] ?? null;
}

const borderWidthMap: Record<number, string> = {
  0: '0',
  1: 'DEFAULT',
  2: '2',
  4: '4',
  8: '8',
};

export function convertBorderWidthToTailwind(value: number) {
  return borderWidthMap[value] ?? null;
}

const outlineWidthMap: Record<number, string> = {
  0: '0',
  1: '1',
  2: '2',
  4: '4',
  8: '8',
};

export function convertOutlineWidthToTailwind(value: number) {
  return outlineWidthMap[value] ?? null;
}

const opacityMap: Record<number, string> = {
  0: '0',
  0.05: '5',
  0.1: '10',
  0.15: '15',
  0.2: '20',
  0.25: '25',
  0.3: '30',
  0.35: '35',
  0.4: '40',
  0.45: '45',
  0.5: '50',
  0.55: '55',
  0.6: '60',
  0.65: '65',
  0.7: '70',
  0.75: '75',
  0.8: '80',
  0.85: '85',
  0.9: '90',
  0.95: '95',
  1: '100',
};

export function convertOpacityToTailwind(value: number) {
  return opacityMap[value] ?? null;
}
