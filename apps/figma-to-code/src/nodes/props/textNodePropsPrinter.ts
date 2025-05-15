import type { GFETextNode } from '../types';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';

export function processFontName(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  _tailwindClasses: GFETailwindClasses,
) {
  if (!node.fontName) {
    return;
  }

  propertiesList.push({
    label: 'Font',
    value: node.fontName.family,
  });

  cssProperties['font-family'] = node.fontName.family.includes(' ')
    ? `"${node.fontName.family}"`
    : node.fontName.family;
}

export function processFontWeight(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (!node.fontWeight) {
    return;
  }

  propertiesList.push({
    label: 'Weight',
    value: node.fontWeight,
  });

  cssProperties['font-weight'] = node.fontWeight;

  switch (node.fontWeight) {
    case 100: {
      tailwindClasses.add('font-thin');
      break;
    }
    case 200: {
      tailwindClasses.add('font-extralight');
      break;
    }
    case 300: {
      tailwindClasses.add('font-light');
      break;
    }
    case 400: {
      tailwindClasses.add('font-normal');
      break;
    }
    case 500: {
      tailwindClasses.add('font-medium');
      break;
    }
    case 600: {
      tailwindClasses.add('font-semibold');
      break;
    }
    case 700: {
      tailwindClasses.add('font-bold');
      break;
    }
    case 800: {
      tailwindClasses.add('font-extrabold');
      break;
    }
    case 900: {
      tailwindClasses.add('font-black');
      break;
    }
  }
}

export function processFontSize(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (!node.fontSize) {
    return;
  }

  const fontSizeNumberValue = node.fontSize;
  const fontSizeValue = node.fontSize + 'px';

  propertiesList.push({
    label: 'Size',
    value: fontSizeValue,
  });

  cssProperties['font-size'] = fontSizeValue;

  if (!node.lineHeight) {
    return;
  }

  const lineHeightValue =
    node.lineHeight.unit === 'AUTO'
      ? 'normal'
      : node.lineHeight.unit === 'PIXELS'
        ? node.lineHeight.value + 'px'
        : node.lineHeight.value / fontSizeNumberValue; // Ratio value

  if (
    fontSizeValue === '12px' &&
    (lineHeightValue === '16px' || lineHeightValue === 1)
  ) {
    tailwindClasses.add('text-xs');
  } else if (
    fontSizeValue === '14px' &&
    (lineHeightValue === '20px' || lineHeightValue === 1.25)
  ) {
    tailwindClasses.add('text-sm');
  } else if (
    fontSizeValue === '16px' &&
    (lineHeightValue === '24px' || lineHeightValue === 1.5)
  ) {
    tailwindClasses.add('text-base');
  } else if (
    fontSizeValue === '18px' &&
    (lineHeightValue === '28px' || lineHeightValue === 1.75)
  ) {
    tailwindClasses.add('text-lg');
  } else if (
    fontSizeValue === '20px' &&
    (lineHeightValue === '28px' || lineHeightValue === 1.75)
  ) {
    tailwindClasses.add('text-xl');
  } else if (
    fontSizeValue === '24px' &&
    (lineHeightValue === '32px' || lineHeightValue === 2)
  ) {
    tailwindClasses.add('text-2xl');
  } else if (
    fontSizeValue === '30px' &&
    (lineHeightValue === '36px' || lineHeightValue === 2.25)
  ) {
    tailwindClasses.add('text-3xl');
  } else if (
    fontSizeValue === '36px' &&
    (lineHeightValue === '40px' || lineHeightValue === 2.5)
  ) {
    tailwindClasses.add('text-4xl');
  } else if (
    fontSizeValue === '48px' &&
    (lineHeightValue === '48px' || lineHeightValue === 1)
  ) {
    tailwindClasses.add('text-5xl');
  } else if (
    fontSizeValue === '60px' &&
    (lineHeightValue === '60px' || lineHeightValue === 1)
  ) {
    tailwindClasses.add('text-6xl');
  } else if (
    fontSizeValue === '72px' &&
    (lineHeightValue === '72px' || lineHeightValue === 1)
  ) {
    tailwindClasses.add('text-7xl');
  } else if (
    fontSizeValue === '96px' &&
    (lineHeightValue === '96px' || lineHeightValue === 1)
  ) {
    tailwindClasses.add('text-8xl');
  } else if (
    fontSizeValue === '128px' &&
    (lineHeightValue === '128px' || lineHeightValue === 1)
  ) {
    tailwindClasses.add('text-9xl');
  } else {
    tailwindClasses.add(`text-[${fontSizeValue}]`);
  }
}

export function processLetterSpacing(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (!node.letterSpacing || node.letterSpacing.value === 0) {
    return;
  }

  const value =
    node.letterSpacing.unit === 'PIXELS'
      ? node.letterSpacing.value + 'px'
      : node.letterSpacing.value / 16 + 'em';

  propertiesList.push({
    label: 'Letter spacing',
    value,
  });

  cssProperties['letter-spacing'] = value;

  switch (value) {
    case '-0.05em': {
      tailwindClasses.add('tracking-tighter');
      break;
    }
    case '-0.025em': {
      tailwindClasses.add('tracking-tight');
      break;
    }
    case '0em': {
      tailwindClasses.add('tracking-normal');
      break;
    }
    case '0.025em': {
      tailwindClasses.add('tracking-wide');
      break;
    }
    case '0.05em': {
      tailwindClasses.add('tracking-wider');
      break;
    }
    case '0.1em': {
      tailwindClasses.add('tracking-widest');
      break;
    }
  }
}

export function processLineHeight(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (!node.lineHeight) {
    return;
  }

  const fontSizeNumberValue = node.fontSize ?? 1;
  const fontSizeValue = node.fontSize + 'px';

  const lineHeightValue =
    node.lineHeight.unit === 'AUTO'
      ? 'normal'
      : node.lineHeight.unit === 'PIXELS'
        ? node.lineHeight.value + 'px'
        : node.lineHeight.value / fontSizeNumberValue; // Ratio value

  propertiesList.push({
    label: 'Line height',
    value: lineHeightValue,
  });

  cssProperties['line-height'] = lineHeightValue;

  // Requires font-size processing to have executed first.
  if (tailwindClasses.has('text-xs')) {
    if (fontSizeValue === '12px' && lineHeightValue === '16px') {
      return;
    }
  } else if (tailwindClasses.has('text-sm')) {
    if (fontSizeValue === '14px' && lineHeightValue === '20px') {
      return;
    }
  } else if (tailwindClasses.has('text-base')) {
    if (fontSizeValue === '16px' && lineHeightValue === '24px') {
      return;
    }
  } else if (tailwindClasses.has('text-lg')) {
    if (fontSizeValue === '18px' && lineHeightValue === '28px') {
      return;
    }
  } else if (tailwindClasses.has('text-xl')) {
    if (fontSizeValue === '20px' && lineHeightValue === '28px') {
      return;
    }
  } else if (tailwindClasses.has('text-2xl')) {
    if (fontSizeValue === '24px' && lineHeightValue === '32px') {
      return;
    }
  } else if (tailwindClasses.has('text-3xl')) {
    if (fontSizeValue === '30px' && lineHeightValue === '36px') {
      return;
    }
  } else if (tailwindClasses.has('text-4xl')) {
    if (fontSizeValue === '36px' && lineHeightValue === '40px') {
      return;
    }
  } else if (tailwindClasses.has('text-5xl')) {
    if (
      fontSizeValue === '48px' &&
      (lineHeightValue === '48px' || lineHeightValue === 1)
    ) {
      return;
    }
  } else if (tailwindClasses.has('text-6xl')) {
    if (
      fontSizeValue === '60px' &&
      (lineHeightValue === '60px' || lineHeightValue === 1)
    ) {
      return;
    }
  } else if (tailwindClasses.has('text-7xl')) {
    if (
      fontSizeValue === '72px' &&
      (lineHeightValue === '72px' || lineHeightValue === 1)
    ) {
      return;
    }
  } else if (tailwindClasses.has('text-8xl')) {
    if (
      fontSizeValue === '96px' &&
      (lineHeightValue === '96px' || lineHeightValue === 1)
    ) {
      return;
    }
  } else if (tailwindClasses.has('text-9xl')) {
    if (
      fontSizeValue === '128px' &&
      (lineHeightValue === '128px' || lineHeightValue === 1)
    ) {
      return;
    }
  }

  if (lineHeightValue === '12px') {
    tailwindClasses.add('leading-3');
  } else if (lineHeightValue === 1.25) {
    tailwindClasses.add('leading-tight');
  } else if (lineHeightValue === 1.375) {
    tailwindClasses.add('leading-snug');
  } else if (lineHeightValue === 1.5) {
    if (!tailwindClasses.has('text-base')) {
      tailwindClasses.add('leading-normal');
    }
  } else if (typeof lineHeightValue === 'string') {
    if (lineHeightValue !== 'normal') {
      tailwindClasses.add(`leading-[${lineHeightValue}]`);
    }
  } else {
    tailwindClasses.add(`leading-[${lineHeightValue}%]`);
  }
}

export function processTextAlignHorizontal(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.textAlignHorizontal) {
    case 'LEFT': {
      return;
    }
    case 'CENTER': {
      propertiesList.push({
        label: 'Align',
        value: 'Center',
      });
      cssProperties['text-align'] = 'center';
      tailwindClasses.add('text-center');

      return;
    }
    case 'RIGHT': {
      propertiesList.push({
        label: 'Align',
        value: 'Right',
      });
      cssProperties['text-align'] = 'right';
      tailwindClasses.add('text-right');

      return;
    }
    case 'JUSTIFIED': {
      propertiesList.push({
        label: 'Align',
        value: 'Justified',
      });
      cssProperties['text-align'] = 'justify';
      tailwindClasses.add('text-justify');

      return;
    }
  }
}

export function processTextDecoration(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.textDecoration) {
    case null:
    case 'NONE': {
      return;
    }
    case 'UNDERLINE': {
      propertiesList.push({
        label: 'Text decoration',
        value: 'Underline',
      });
      cssProperties['text-decoration-line'] = 'underline';
      tailwindClasses.add('underline');

      return;
    }
    case 'STRIKETHROUGH': {
      propertiesList.push({
        label: 'Text decoration',
        value: 'Linethrough',
      });
      cssProperties['text-decoration-line'] = 'line-through';
      tailwindClasses.add('line-through');

      return;
    }
  }
}

export function processTextCase(
  metadata: GFENodeMetadata,
  node: GFETextNode,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.textCase) {
    case null:
    case 'ORIGINAL': {
      return;
    }
    case 'UPPER': {
      propertiesList.push({
        label: 'Text case',
        value: 'Uppercase',
      });
      cssProperties['text-transform'] = 'uppercase';
      tailwindClasses.add('underline');

      return;
    }
    case 'LOWER': {
      propertiesList.push({
        label: 'Text case',
        value: 'Lowercase',
      });
      cssProperties['text-transform'] = 'lowercase';
      tailwindClasses.add('lowercase');

      return;
    }
    case 'TITLE': {
      propertiesList.push({
        label: 'Text case',
        value: 'Title case',
      });
      cssProperties['text-transform'] = 'capitalize';
      tailwindClasses.add('capitalize');

      return;
    }
    case 'SMALL_CAPS':
    case 'SMALL_CAPS_FORCED': {
      console.warn(`Unsupported text case "${node.textCase}"`);

      return;
    }
  }
}
