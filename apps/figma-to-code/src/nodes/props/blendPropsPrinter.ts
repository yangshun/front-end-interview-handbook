import type {
  GFECSSProperties,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './types';
import type { GFEBlendMixin } from '../types';
import { convertOpacityToTailwind } from '../../utils/tailwindConversions';

export function processOpacity(
  node: GFEBlendMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  tailwindClasses: GFETailwindClasses,
) {
  // Ignore 0 values.
  if (node.opacity === 1) {
    return;
  }

  propertiesList.push({
    label: 'Opacity',
    value: node.opacity.toFixed(2),
  });

  cssProperties.opacity = node.opacity.toFixed(2);

  const tailwindOpacity = convertOpacityToTailwind(node.opacity);

  tailwindClasses.add(
    'opacity-' + (tailwindOpacity ?? `[${node.opacity.toFixed(2)}]`),
  );

  return;
}

export function processEffects(
  node: GFEBlendMixin,
  propertiesList: GFENodePropertiesList,
  cssProperties: GFECSSProperties,
  _tailwindClasses: GFETailwindClasses,
) {
  if (node.effects.length === 0) {
    return;
  }

  node.effects.forEach((effect) => {
    switch (effect.type) {
      case 'DROP_SHADOW': {
        return;
      }
      default: {
        console.warn(`Effect "${effect.type}" on is unsupported`);
      }
    }
  });

  const dropShadowEffects = node.effects.filter(
    (effect) => effect.type === 'DROP_SHADOW',
  ) as Array<DropShadowEffect>;

  cssProperties['box-shadow'] = dropShadowEffects
    .map(
      (eff) =>
        `${eff.offset.x}px ${eff.offset.y}px ${eff.radius}px ${eff.spread ? eff.spread + 'px' : '0'} rgb(${eff.color.r} ${eff.color.g} ${eff.color.b} / ${eff.color.a.toFixed(2)})`,
    )
    .join(', ');
  // TODO: map to Tailwind shadows.

  // TODO: handle other types.
}
