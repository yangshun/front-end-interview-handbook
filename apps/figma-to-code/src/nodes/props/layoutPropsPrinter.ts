import { convertSizeToTailwind } from '~/utils/tailwindConversions';

import type { GFELayoutMixin } from '../types';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';

// https://www.figma.com/plugin-docs/api/properties/nodes-layoutsizinghorizontal/
export function processLayoutSizingHorizontal(
  metadata: GFENodeMetadata,
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
  metadata: GFENodeMetadata,
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
