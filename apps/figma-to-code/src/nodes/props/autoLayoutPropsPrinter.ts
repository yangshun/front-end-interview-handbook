import { convertSizeToTailwind } from '../../utils/tailwindConversions';
import type {
  GFEAutoLayoutChildrenMixin,
  GFEAutoLayoutMixin,
  GFEDimensionAndPositionMixin,
} from '../types';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';

export function processLayoutMode(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (node.layoutMode === 'NONE') {
    return;
  }

  cssProperties.display = 'flex';
  propertiesList.push({
    label: 'Display',
    value: 'Flex',
  });
  tailwindClasses.add('flex');

  if (node.layoutMode === 'VERTICAL') {
    propertiesList.push({
      label: 'Flex direction',
      value: 'Column',
    });
    cssProperties['flex-direction'] = 'column';
    tailwindClasses.add('flex-col');
  }
}

export function processLayoutWrap(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (node.layoutMode === 'HORIZONTAL' && node.layoutWrap === 'WRAP') {
    propertiesList.push({
      label: 'Flex wrap',
      value: 'Wrap',
    });
    cssProperties['flex-wrap'] = 'wrap';
    tailwindClasses.add('flex-wrap');
  }
}

export function processPrimaryAxisSizingMode(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutChildrenMixin &
    GFEAutoLayoutMixin &
    GFEDimensionAndPositionMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  // Reference: https://www.figma.com/plugin-docs/api/properties/nodes-primaryaxissizingmode/
  if (node.primaryAxisSizingMode === 'FIXED') {
    if (node.layoutAlign === 'STRETCH' || node.layoutGrow === 1) {
      return;
    }

    if (node.layoutMode === 'HORIZONTAL') {
      cssProperties.width = node.width + 'px';

      // TODO: Also support breakpoint classes.
      const tailwindWidth = convertSizeToTailwind(node.width);

      tailwindClasses.add('w-' + (tailwindWidth ?? `[${node.width}px]`));

      return;
    }

    if (node.layoutMode === 'VERTICAL') {
      cssProperties.height = node.height + 'px';

      const tailwindHeight = convertSizeToTailwind(node.height);

      tailwindClasses.add('h-' + (tailwindHeight ?? `[${node.height}px]`));

      return;
    }

    return;
  }
}

export function processCounterAxisSizingMode(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutChildrenMixin &
    GFEAutoLayoutMixin &
    GFEDimensionAndPositionMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  // Reference: https://www.figma.com/plugin-docs/api/properties/nodes-counteraxissizingmode/
  if (node.counterAxisSizingMode === 'FIXED') {
    if (node.layoutAlign === 'STRETCH' || node.layoutGrow === 1) {
      return;
    }

    if (node.layoutMode === 'HORIZONTAL') {
      cssProperties.height = node.height + 'px';

      const tailwindHeight = convertSizeToTailwind(node.height);

      tailwindClasses.add('h-' + (tailwindHeight ?? `[${node.height}px]`));

      return;
    }

    if (node.layoutMode === 'VERTICAL') {
      cssProperties.width = node.width + 'px';

      const tailwindWidth = convertSizeToTailwind(node.width);

      tailwindClasses.add('w-' + (tailwindWidth ?? `[${node.width}px]`));

      return;
    }

    return;
  }
}

export function processPrimaryAxisAlignItems(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.primaryAxisAlignItems) {
    case 'MIN': {
      return;
    }
    case 'CENTER': {
      propertiesList.push({
        label: 'Justify content',
        value: 'Center',
      });
      cssProperties['justify-content'] = 'center';
      tailwindClasses.add('justify-center');

      return;
    }
    case 'MAX': {
      propertiesList.push({
        label: 'Justify content',
        value: 'End',
      });
      cssProperties['justify-content'] = 'flex-end';
      tailwindClasses.add('justify-end');

      return;
    }
    case 'SPACE_BETWEEN': {
      propertiesList.push({
        label: 'Justify content',
        value: 'Between',
      });
      cssProperties['justify-content'] = 'space-between';
      tailwindClasses.add('justify-between');

      return;
    }
  }
}

export function processCounterAxisAlignItems(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.counterAxisAlignItems) {
    case 'MIN': {
      return;
    }
    case 'CENTER': {
      propertiesList.push({
        label: 'Align items',
        value: 'Center',
      });
      cssProperties['align-items'] = 'center';
      tailwindClasses.add('items-center');

      return;
    }
    case 'MAX': {
      propertiesList.push({
        label: 'Align items',
        value: 'End',
      });
      cssProperties['align-items'] = 'flex-end';
      tailwindClasses.add('items-end');

      return;
    }
    case 'BASELINE': {
      propertiesList.push({
        label: 'Align items',
        value: 'Baseline',
      });
      cssProperties['align-items'] = 'baseline';
      tailwindClasses.add('items-baseline');

      return;
    }
  }
}

export function processCounterAxisAlignContent(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  if (node.layoutWrap !== 'WRAP') {
    return;
  }

  switch (node.counterAxisAlignContent) {
    case 'AUTO': {
      return;
    }
    case 'SPACE_BETWEEN': {
      propertiesList.push({
        label: 'Align content',
        value: 'Between',
      });
      cssProperties['align-content'] = 'space-between';
      tailwindClasses.add('content-between');

      return;
    }
  }
}

export function processSpacing(
  metadata: GFENodeMetadata,
  node: GFEAutoLayoutMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  switch (node.layoutMode) {
    case 'NONE': {
      return;
    }
    case 'HORIZONTAL': {
      if (node.layoutWrap === 'NO_WRAP') {
        if (
          node.itemSpacing !== 0 &&
          node.primaryAxisAlignItems !== 'SPACE_BETWEEN'
        ) {
          propertiesList.push({
            label: 'Gap',
            value: node.itemSpacing + 'px',
          });
          cssProperties.gap = node.itemSpacing + 'px';

          const tailwindGap = convertSizeToTailwind(node.itemSpacing);

          tailwindClasses.add(
            'gap-' + (tailwindGap ?? `[${node.itemSpacing}px]`),
          );
        }

        return;
      }

      // Equal spacing in both directions.
      if (
        node.itemSpacing !== 0 &&
        node.itemSpacing === node.counterAxisSpacing
      ) {
        propertiesList.push({
          label: 'Gap',
          value: node.itemSpacing + 'px',
        });
        cssProperties.gap = node.itemSpacing + 'px';

        const tailwindGap = convertSizeToTailwind(node.itemSpacing);

        tailwindClasses.add(
          'gap-' + (tailwindGap ?? `[${node.itemSpacing}px]`),
        );

        return;
      }

      if (
        node.itemSpacing !== 0 &&
        node.primaryAxisAlignItems !== 'SPACE_BETWEEN'
      ) {
        propertiesList.push({
          label: 'Gap X',
          value: node.itemSpacing + 'px',
        });
        cssProperties['column-gap'] = node.itemSpacing + 'px';

        const tailwindGap = convertSizeToTailwind(node.itemSpacing);

        tailwindClasses.add(
          'gap-x-' + (tailwindGap ?? `[${node.itemSpacing}px]`),
        );
      }

      if (
        node.counterAxisSpacing != null &&
        node.counterAxisSpacing !== 0 &&
        node.counterAxisAlignContent !== 'SPACE_BETWEEN'
      ) {
        propertiesList.push({
          label: 'Gap Y',
          value: node.counterAxisSpacing + 'px',
        });
        cssProperties['row-gap'] = node.counterAxisSpacing + 'px';

        const tailwindGap = convertSizeToTailwind(node.counterAxisSpacing);

        tailwindClasses.add(
          'gap-y-' + (tailwindGap ?? `[${node.counterAxisSpacing}px]`),
        );
      }

      return;
    }
    case 'VERTICAL': {
      if (
        node.itemSpacing !== 0 &&
        node.primaryAxisAlignItems !== 'SPACE_BETWEEN'
      ) {
        propertiesList.push({
          label: 'Gap',
          value: node.itemSpacing + 'px',
        });
        cssProperties.gap = node.itemSpacing + 'px';

        const tailwindGap = convertSizeToTailwind(node.itemSpacing);

        tailwindClasses.add(
          'gap-' + (tailwindGap ?? `[${node.itemSpacing}px]`),
        );
      }

      return;
    }
  }
}
