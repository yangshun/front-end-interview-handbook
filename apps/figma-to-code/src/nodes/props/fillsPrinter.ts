import { convertRgbColorToHexColor } from '@create-figma-plugin/utilities';

import { convertHexColorToTailwindColor } from '../../utils/tailwindConversions';
import type {
  GFEComponentNode,
  GFEFrameNode,
  GFEInstanceNode,
  GFERectangleNode,
  GFETextNode,
  GFEVectorNode,
} from '../types';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';

export function processFills(
  metadata: GFENodeMetadata,
  node:
    | GFEComponentNode
    | GFEFrameNode
    | GFEInstanceNode
    | GFERectangleNode
    | GFETextNode
    | GFEVectorNode,
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

      switch (node.type) {
        case 'TEXT':
        case 'VECTOR': {
          propertiesList.push({
            label: 'Color',
            value: hexColorWithHash,
          });

          cssProperties.color = hexColorWithHash;

          const tailwindColor =
            convertHexColorToTailwindColor(hexColorWithHash);

          tailwindClasses.add(
            'text-' + (tailwindColor ?? `[${hexColorWithHash}]`),
          );
          break;
        }
        case 'COMPONENT':
        case 'RECTANGLE':
        case 'INSTANCE':
        case 'FRAME': {
          propertiesList.push({
            label: 'Background color',
            value: hexColorWithHash,
          });

          cssProperties['background-color'] = hexColorWithHash;

          const tailwindColor =
            convertHexColorToTailwindColor(hexColorWithHash);

          tailwindClasses.add(
            'bg-' + (tailwindColor ?? `[${hexColorWithHash}]`),
          );
          break;
        }
      }

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
