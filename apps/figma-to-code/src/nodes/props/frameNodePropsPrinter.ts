import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';
import type { GFEFrameMixin } from '../types';
import {
  convertBorderRadiusToTailwind,
  convertHexColorToTailwindColor,
  convertSizeToTailwind,
} from '../../utils/tailwindConversions';

import { convertRgbColorToHexColor } from '@create-figma-plugin/utilities';

export function processPadding(
  metadata: GFENodeMetadata,
  node: GFEFrameMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  // Check if all the values are the same.
  if (
    node.paddingLeft === node.paddingBottom &&
    node.paddingLeft === node.paddingTop &&
    node.paddingLeft === node.paddingRight
  ) {
    // Ignore 0 values.
    if (node.paddingLeft === 0) {
      return;
    }

    propertiesList.push({
      label: 'Padding',
      value: node.paddingLeft + 'px',
    });

    cssProperties.padding = node.paddingLeft + 'px';

    const tailwindPadding = convertSizeToTailwind(node.paddingLeft);

    tailwindClasses.add('p-' + (tailwindPadding ?? `[${node.paddingLeft}px]`));

    return;
  }

  // Horizontal and vertical paddings are the same.
  if (
    node.paddingLeft === node.paddingRight &&
    node.paddingTop === node.paddingBottom
  ) {
    if (node.paddingLeft !== 0) {
      propertiesList.push({
        label: 'Padding X',
        value: node.paddingLeft + 'px',
      });

      const tailwindPadding = convertSizeToTailwind(node.paddingLeft);

      tailwindClasses.add(
        'px-' + (tailwindPadding ?? `[${node.paddingLeft}px]`),
      );
    }

    if (node.paddingTop !== 0) {
      propertiesList.push({
        label: 'Padding Y',
        value: node.paddingTop + 'px',
      });

      const tailwindPadding = convertSizeToTailwind(node.paddingTop);

      tailwindClasses.add(
        'py-' + (tailwindPadding ?? `[${node.paddingTop}px]`),
      );
    }

    cssProperties.padding = `${node.paddingTop}px ${node.paddingLeft}px`;

    return;
  }

  // Only horizontal padding is the same.
  if (node.paddingLeft === node.paddingRight) {
    if (node.paddingLeft !== 0) {
      propertiesList.push({
        label: 'Padding X',
        value: node.paddingLeft + 'px',
      });

      const tailwindPadding = convertSizeToTailwind(node.paddingLeft);

      tailwindClasses.add(
        'px-' + (tailwindPadding ?? `[${node.paddingLeft}px]`),
      );
    }

    if (node.paddingTop !== 0) {
      propertiesList.push({
        label: 'Padding top',
        value: node.paddingTop + 'px',
      });

      const tailwindPadding = convertSizeToTailwind(node.paddingTop);

      tailwindClasses.add(
        'pt-' + (tailwindPadding ?? `[${node.paddingTop}px]`),
      );
    }

    if (node.paddingBottom !== 0) {
      propertiesList.push({
        label: 'Padding bottom',
        value: node.paddingBottom + 'px',
      });

      const tailwindPadding = convertSizeToTailwind(node.paddingBottom);

      tailwindClasses.add(
        'pb-' + (tailwindPadding ?? `[${node.paddingBottom}px]`),
      );
    }

    cssProperties.padding = `${node.paddingTop}px ${node.paddingLeft}px ${node.paddingBottom}px`;

    return;
  }

  // Unable to use any of the supported shorter shorthand formats.
  if (node.paddingLeft !== 0) {
    propertiesList.push({
      label: 'Padding left',
      value: node.paddingLeft + 'px',
    });

    cssProperties['padding-left'] = node.paddingLeft + 'px';

    const tailwindPadding = convertSizeToTailwind(node.paddingLeft);

    tailwindClasses.add('pl-' + (tailwindPadding ?? `[${node.paddingLeft}px]`));
  }

  if (node.paddingRight !== 0) {
    propertiesList.push({
      label: 'Padding right',
      value: node.paddingRight + 'px',
    });

    cssProperties['padding-right'] = node.paddingRight + 'px';

    const tailwindPadding = convertSizeToTailwind(node.paddingRight);

    tailwindClasses.add(
      'pr-' + (tailwindPadding ?? `[${node.paddingRight}px]`),
    );
  }

  if (node.paddingTop !== 0) {
    propertiesList.push({
      label: 'Padding top',
      value: node.paddingTop + 'px',
    });

    cssProperties['padding-top'] = node.paddingTop + 'px';

    const tailwindPadding = convertSizeToTailwind(node.paddingTop);

    tailwindClasses.add('pt-' + (tailwindPadding ?? `[${node.paddingTop}px]`));
  }

  if (node.paddingBottom !== 0) {
    propertiesList.push({
      label: 'Padding bottom',
      value: node.paddingBottom + 'px',
    });

    cssProperties['padding-bottom'] = node.paddingBottom + 'px';

    const tailwindPadding = convertSizeToTailwind(node.paddingBottom);

    tailwindClasses.add(
      'pb-' + (tailwindPadding ?? `[${node.paddingBottom}px]`),
    );
  }
}

export function processCornerRadius(
  metadata: GFENodeMetadata,
  node: GFEFrameMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  // Check if all the values are the same.
  if (
    node.topLeftRadius === node.bottomLeftRadius &&
    node.topLeftRadius === node.topRightRadius &&
    node.topLeftRadius === node.bottomRightRadius
  ) {
    // Ignore 0 values.
    if (node.topLeftRadius === 0) {
      return;
    }

    propertiesList.push({
      label: 'Radius',
      value: node.topLeftRadius + 'px',
    });

    cssProperties['border-radius'] = node.topLeftRadius + 'px';

    const tailwindBorderRadius = convertBorderRadiusToTailwind(
      node.topLeftRadius,
    );

    tailwindClasses.add(
      (
        'rounded-' + (tailwindBorderRadius ?? `[${node.topLeftRadius}px]`)
      ).replace('-DEFAULT', ''),
    );

    return;
  }

  propertiesList.push({
    label: 'Radius',
    value: `${node.topLeftRadius}px, ${node.topRightRadius}px, ${node.bottomRightRadius}px, ${node.bottomLeftRadius}px`,
  });

  // Ignore the other shorter shorthand formats since it's rare.
  if (node.topLeftRadius !== 0) {
    cssProperties['border-top-left-radius'] = node.topLeftRadius + 'px';

    const tailwindBorderRadius = convertBorderRadiusToTailwind(
      node.topLeftRadius,
    );

    tailwindClasses.add(
      (
        'rounded-tl-' + (tailwindBorderRadius ?? `[${node.topLeftRadius}px]`)
      ).replace('-DEFAULT', ''),
    );
  }

  if (node.topRightRadius !== 0) {
    cssProperties['border-top-right-radius'] = node.topRightRadius + 'px';

    const tailwindBorderRadius = convertBorderRadiusToTailwind(
      node.topRightRadius,
    );

    tailwindClasses.add(
      (
        'rounded-tr-' + (tailwindBorderRadius ?? `[${node.topRightRadius}px]`)
      ).replace('-DEFAULT', ''),
    );
  }

  if (node.bottomRightRadius !== 0) {
    cssProperties['border-bottom-right-radius'] = node.bottomRightRadius + 'px';

    const tailwindBorderRadius = convertBorderRadiusToTailwind(
      node.bottomRightRadius,
    );

    tailwindClasses.add(
      (
        'rounded-br-' +
        (tailwindBorderRadius ?? `[${node.bottomRightRadius}px]`)
      ).replace('-DEFAULT', ''),
    );
  }

  if (node.bottomLeftRadius !== 0) {
    cssProperties['border-bottom-left-radius'] = node.bottomLeftRadius + 'px';

    const tailwindBorderRadius = convertBorderRadiusToTailwind(
      node.bottomLeftRadius,
    );

    tailwindClasses.add(
      (
        'rounded-bl-' + (tailwindBorderRadius ?? `[${node.bottomLeftRadius}px]`)
      ).replace('-DEFAULT', ''),
    );
  }
}

export function processFills(
  metadata: GFENodeMetadata,
  node: GFEFrameMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (node.fills == null || node.fills.length === 0) {
    return;
  }

  if (node.fills.length > 1) {
    // TODO: show warning in UI.
    console.warn('More than one fill color specified');
  }

  const fill = node.fills[0];

  if (!fill.visible) {
    return;
  }

  switch (fill.type) {
    case 'SOLID': {
      const hexColor = convertRgbColorToHexColor(fill.color);

      if (hexColor == null) {
        return;
      }

      const hexColorWithHash = '#' + hexColor.toLowerCase();

      propertiesList.push({
        label: 'Background color',
        value: hexColorWithHash,
      });

      cssProperties['background-color'] = hexColorWithHash;

      const tailwindColor = convertHexColorToTailwindColor(hexColorWithHash);

      tailwindClasses.add('bg-' + (tailwindColor ?? `[${hexColorWithHash}]`));

      return;
    }
    case 'GRADIENT_LINEAR': {
      const hexColors: Array<string> = [];

      fill.gradientStops.forEach((gradientStop) => {
        const hexColor = convertRgbColorToHexColor(gradientStop.color);

        if (hexColor == null) {
          return;
        }

        const hexColorWithHash = '#' + hexColor.toLowerCase();

        hexColors.push(hexColorWithHash);
      });

      propertiesList.push({
        label: 'Background',
        value: 'Linear gradient',
      });

      // TODO: handle angle.
      cssProperties['background-image'] =
        `linear-gradient(to bottom, ${hexColors.join(', ')})`;

      // TODO: handle angle.
      tailwindClasses.add('bg-gradient-to-b');
      hexColors.forEach((color, index) => {
        const tailwindColor = convertHexColorToTailwindColor(color);

        if (index === 0) {
          tailwindClasses.add('from-' + (tailwindColor ?? `[${color}]`));
        } else if (index === hexColors.length - 1) {
          tailwindClasses.add('to-' + (tailwindColor ?? `[${color}]`));
        } else {
          tailwindClasses.add('via-' + (tailwindColor ?? `[${color}]`));
        }
      });

      return;
    }
    case 'IMAGE': {
      metadata.type = 'IMAGE';
      switch (fill.scaleMode) {
        case 'FILL': {
          cssProperties['object-fit'] = 'cover';
          tailwindClasses.add('object-cover');

          return;
        }
        case 'FIT': {
          cssProperties['object-fit'] = 'contain';
          tailwindClasses.add('object-contain');

          return;
        }
        default: {
          console.warn(`Image fill scaleMode "${fill.type}" is unsupported.`);

          return;
        }
      }
    }
    default: {
      console.warn(`Fill type "${fill.type}" is unsupported.`);

      return;
    }
  }
}
