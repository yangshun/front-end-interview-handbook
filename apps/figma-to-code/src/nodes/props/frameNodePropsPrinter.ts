import {
  convertBorderRadiusToTailwind,
  convertSizeToTailwind,
} from '../../utils/tailwindConversions';
import type { GFEBaseFrameMixin } from '../types';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';

export function processPadding(
  metadata: GFENodeMetadata,
  node: GFEBaseFrameMixin,
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
  node: GFEBaseFrameMixin,
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
