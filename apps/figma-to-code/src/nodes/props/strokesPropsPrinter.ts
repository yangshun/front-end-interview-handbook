import { convertRgbColorToHexColor } from '@create-figma-plugin/utilities';

import {
  convertBorderWidthToTailwind,
  convertHexColorToTailwindColor,
  convertOutlineWidthToTailwind,
} from '../../utils/tailwindConversions';
import type {
  GFEIndividualStrokesMixin,
  GFEMinimalStrokesMixin,
} from '../types';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';

export function processStrokesColor(
  metadata: GFENodeMetadata,
  node: GFEMinimalStrokesMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (node.strokes.length === 0) {
    return;
  }

  if (node.strokes.length > 1) {
    // TODO: show warning in UI.
    console.warn('More than one stroke color specified');
  }

  const stroke = node.strokes[0];

  if (!stroke.visible) {
    return;
  }

  // TODO: Handle gradient types.
  if (stroke.type === 'SOLID') {
    const hexColor = convertRgbColorToHexColor(stroke.color);

    if (hexColor == null) {
      return;
    }

    const hexColorWithHash = '#' + hexColor.toLowerCase();

    switch (node.strokeAlign) {
      case 'CENTER': {
        console.warn('Node stroke center align is unsupported');
        break;
      }
      case 'INSIDE': {
        propertiesList.push({
          label: 'Border color',
          value: hexColorWithHash,
        });

        cssProperties['border-color'] = hexColorWithHash;

        const tailwindColor = convertHexColorToTailwindColor(hexColorWithHash);

        tailwindClasses.add(
          'border-' + (tailwindColor ?? `[${hexColorWithHash}]`),
        );
        break;
      }
      case 'OUTSIDE': {
        propertiesList.push({
          label: 'Outline color',
          value: hexColorWithHash,
        });

        cssProperties['outline-color'] = hexColorWithHash;

        // Look into using `ring` instead.
        const tailwindColor = convertHexColorToTailwindColor(hexColorWithHash);

        tailwindClasses.add(
          'outline-' + (tailwindColor ?? `[${hexColorWithHash}]`),
        );
        break;
      }
    }
  }
}

export function processStrokesStyle(
  metadata: GFENodeMetadata,
  node: GFEMinimalStrokesMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (node.strokes.length === 0) {
    return;
  }

  if (node.strokes.length > 1) {
    // TODO: show warning in UI.
    console.warn('More than one stroke color specified');
  }

  const stroke = node.strokes[0];

  if (!stroke.visible) {
    return;
  }

  switch (node.strokeAlign) {
    case 'CENTER': {
      console.warn('Node stroke center align is unsupported');
      break;
    }
    case 'INSIDE': {
      if (node.dashPattern.length === 0) {
        propertiesList.push({
          label: 'Border style',
          value: 'Solid',
        });
        cssProperties['border-style'] = 'solid';
        tailwindClasses.add('border-solid');
      } else {
        propertiesList.push({
          label: 'Border style',
          value: 'Dashed',
        });
        cssProperties['border-style'] = 'dashed';
        tailwindClasses.add('border-dashed');
      }
      break;
    }
    case 'OUTSIDE': {
      if (node.dashPattern.length === 0) {
        propertiesList.push({
          label: 'Outline style',
          value: 'Solid',
        });
        cssProperties['outline-style'] = 'solid';
        tailwindClasses.add('outline');
      } else {
        propertiesList.push({
          label: 'Outline style',
          value: 'Dashed',
        });
        cssProperties['outline-style'] = 'dashed';
        tailwindClasses.add('outline-dashed');
      }
      break;
    }
  }
}

export function processStrokeWeight(
  metadata: GFENodeMetadata,
  node: GFEIndividualStrokesMixin & GFEMinimalStrokesMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (node.strokes.length === 0) {
    return;
  }

  // Ignore 0 values.
  if (node.strokeTopWeight === 0) {
    return;
  }

  switch (node.strokeAlign) {
    case 'CENTER': {
      console.warn('Node stroke center align is unsupported');
      break;
    }
    case 'INSIDE': {
      // Check if all the values are the same.
      if (
        node.strokeTopWeight === node.strokeBottomWeight &&
        node.strokeTopWeight === node.strokeLeftWeight &&
        node.strokeTopWeight === node.strokeRightWeight
      ) {
        propertiesList.push({
          label: 'Border weight',
          value: node.strokeTopWeight + 'px',
        });

        cssProperties['border-width'] = node.strokeTopWeight + 'px';

        const tailwindBorderWidth = convertBorderWidthToTailwind(
          node.strokeTopWeight,
        );

        tailwindClasses.add(
          (
            'border-' + (tailwindBorderWidth ?? `[${node.strokeTopWeight}px]`)
          ).replace('-DEFAULT', ''),
        );

        return;
      }

      propertiesList.push({
        label: 'Border',
        value: `${node.strokeTopWeight}px, ${node.strokeRightWeight}px, ${node.strokeBottomWeight}px, ${node.strokeLeftWeight}px`,
      });

      // Ignore the other shorter shorthand formats since it's rare.
      if (node.strokeTopWeight !== 0) {
        cssProperties['border-top-width'] = node.strokeTopWeight + 'px';

        const tailwindBorderWidth = convertBorderWidthToTailwind(
          node.strokeTopWeight,
        );

        tailwindClasses.add(
          (
            'border-t-' + (tailwindBorderWidth ?? `[${node.strokeTopWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      if (node.strokeLeftWeight !== 0) {
        cssProperties['border-left-width'] = node.strokeLeftWeight + 'px';

        const tailwindBorderWidth = convertBorderWidthToTailwind(
          node.strokeLeftWeight,
        );

        tailwindClasses.add(
          (
            'border-l-' +
            (tailwindBorderWidth ?? `[${node.strokeLeftWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      if (node.strokeRightWeight !== 0) {
        cssProperties['border-right-width'] = node.strokeRightWeight + 'px';

        const tailwindBorderWidth = convertBorderWidthToTailwind(
          node.strokeRightWeight,
        );

        tailwindClasses.add(
          (
            'border-r-' +
            (tailwindBorderWidth ?? `[${node.strokeRightWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      if (node.strokeBottomWeight !== 0) {
        cssProperties['border-bottom-width'] = node.strokeBottomWeight + 'px';

        const tailwindBorderWidth = convertBorderWidthToTailwind(
          node.strokeBottomWeight,
        );

        tailwindClasses.add(
          (
            'border-b-' +
            (tailwindBorderWidth ?? `[${node.strokeBottomWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      break;
    }
    case 'OUTSIDE': {
      // Check if all the values are the same.
      if (
        node.strokeTopWeight === node.strokeBottomWeight &&
        node.strokeTopWeight === node.strokeLeftWeight &&
        node.strokeTopWeight === node.strokeRightWeight
      ) {
        propertiesList.push({
          label: 'Outline weight',
          value: node.strokeTopWeight + 'px',
        });

        cssProperties['outline-width'] = node.strokeTopWeight + 'px';

        const tailwindBorderRadius = convertOutlineWidthToTailwind(
          node.strokeTopWeight,
        );

        tailwindClasses.add(
          (
            'outline-' + (tailwindBorderRadius ?? `[${node.strokeTopWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      propertiesList.push({
        label: 'Outline',
        value: `${node.strokeTopWeight}px, ${node.strokeRightWeight}px, ${node.strokeBottomWeight}px, ${node.strokeLeftWeight}px`,
      });

      // Ignore the other shorter shorthand formats since it's rare.
      if (node.strokeTopWeight !== 0) {
        cssProperties['outline-top-width'] = node.strokeTopWeight + 'px';

        const tailwindBorderWidth = convertOutlineWidthToTailwind(
          node.strokeTopWeight,
        );

        tailwindClasses.add(
          (
            'outline-t-' +
            (tailwindBorderWidth ?? `[${node.strokeTopWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      if (node.strokeLeftWeight !== 0) {
        cssProperties['outline-left-width'] = node.strokeLeftWeight + 'px';

        const tailwindOutlineWidth = convertOutlineWidthToTailwind(
          node.strokeLeftWeight,
        );

        tailwindClasses.add(
          (
            'outline-l-' +
            (tailwindOutlineWidth ?? `[${node.strokeLeftWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      if (node.strokeRightWeight !== 0) {
        cssProperties['outline-right-width'] = node.strokeRightWeight + 'px';

        const tailwindOutlineWidth = convertOutlineWidthToTailwind(
          node.strokeRightWeight,
        );

        tailwindClasses.add(
          (
            'outline-r-' +
            (tailwindOutlineWidth ?? `[${node.strokeRightWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }

      if (node.strokeBottomWeight !== 0) {
        cssProperties['outline-bottom-width'] = node.strokeBottomWeight + 'px';

        const tailwindOutlineWidth = convertOutlineWidthToTailwind(
          node.strokeBottomWeight,
        );

        tailwindClasses.add(
          (
            'outline-b-' +
            (tailwindOutlineWidth ?? `[${node.strokeBottomWeight}px]`)
          ).replace('-DEFAULT', ''),
        );
      }
      break;
    }
  }
}
