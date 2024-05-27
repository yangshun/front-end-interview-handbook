import { convertSizeToTailwind } from '~/utils/tailwindConversions';

import type {
  GFECSSProperties,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';
import type { GFELayoutMixin } from '../types';

// https://www.figma.com/plugin-docs/api/properties/nodes-layoutsizinghorizontal/
export function processLayoutSizingHorizontal(
  node: GFELayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.layoutSizingHorizontal) {
    case 'FILL':
    case 'HUG': {
      return;
    }
    case 'FIXED': {
      cssProperties.width = node.width + 'px';

      const tailwindWidth = convertSizeToTailwind(node.width);

      tailwindClasses.add('w-' + (tailwindWidth ?? `[${node.width}px]`));

      return;
    }
  }
}

// https://www.figma.com/plugin-docs/api/properties/nodes-layoutsizingvertical/
export function processLayoutSizingVertical(
  node: GFELayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.layoutSizingVertical) {
    case 'FILL':
    case 'HUG': {
      return;
    }
    case 'FIXED': {
      cssProperties.height = node.height + 'px';

      const tailwindHeight = convertSizeToTailwind(node.height);

      tailwindClasses.add('h-' + (tailwindHeight ?? `[${node.height}px]`));

      return;
    }
  }
}
