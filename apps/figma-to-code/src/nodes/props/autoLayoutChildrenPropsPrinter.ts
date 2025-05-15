import type { GFEAutoLayoutChildrenMixin } from '../types';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';

export function processLayoutAlign(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutChildrenMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.layoutAlign) {
    case 'INHERIT': {
      // Default.
      return;
    }
    case 'MIN':
    case 'CENTER':
    case 'MAX': {
      // Deprecated, set on parents instead: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/
      return;
    }
    case 'STRETCH': {
      propertiesList.push({
        label: 'Align self',
        value: 'Stretch',
      });
      cssProperties['align-self'] = 'stretch';
      tailwindClasses.add('self-stretch');

      return;
    }
  }
}

export function processLayoutGrow(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutChildrenMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.layoutGrow) {
    case 0: {
      // Default.
      return;
    }
    case 1: {
      propertiesList.push({
        label: 'Flex grow',
        value: 1,
      });
      cssProperties['flex-grow'] = 1;
      tailwindClasses.add('grow');

      return;
    }
  }
}
