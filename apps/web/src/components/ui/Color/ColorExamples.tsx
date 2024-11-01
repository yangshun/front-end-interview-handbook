import clsx from 'clsx';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import Text from '../Text';

const neutral = [
  'bg-neutral-50',
  'bg-neutral-100',
  'bg-neutral-200',
  'bg-neutral-300',
  'bg-neutral-400',
  'bg-neutral-500',
  'bg-neutral-600',
  'bg-neutral-700',
  'bg-neutral-800',
  'bg-neutral-900',
  'bg-neutral-950',
];

const brand = [
  'bg-brand-lightest',
  'bg-brand-lighter',
  'bg-brand-light',
  'bg-brand',
  'bg-brand-dark',
  'bg-brand-darker',
  'bg-brand-darkest',
];

const danger = [
  'bg-danger-lightest',
  'bg-danger-lighter',
  'bg-danger-light',
  'bg-danger',
  'bg-danger-dark',
  'bg-danger-darker',
  'bg-danger-darkest',
];

const success = [
  'bg-success-lightest',
  'bg-success-lighter',
  'bg-success-light',
  'bg-success',
  'bg-success-dark',
  'bg-success-darker',
  'bg-success-darkest',
];

const info = [
  'bg-info-lightest',
  'bg-info-lighter',
  'bg-info-light',
  'bg-info',
  'bg-info-dark',
  'bg-info-darker',
  'bg-info-darkest',
];

const warning = [
  'bg-warning-lightest',
  'bg-warning-lighter',
  'bg-warning-light',
  'bg-warning',
  'bg-warning-dark',
  'bg-warning-darker',
  'bg-warning-darkest',
];

function ColorSwatch({
  title,
  colors,
}: Readonly<{ colors: ReadonlyArray<string>; title: string }>) {
  return (
    <div className="grid gap-y-1">
      <Text className="block" size="body2" weight="medium">
        {title}
      </Text>
      <div className="flex gap-x-2">
        {colors.map((color) => (
          <div key={color} className={clsx('size-10 rounded', color)}></div>
        ))}
      </div>
    </div>
  );
}

export default function ColorExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Color">
      <ColorSwatch colors={neutral} title="Neutral" />
      <ColorSwatch colors={brand} title="Brand" />
      <ColorSwatch colors={success} title="Success" />
      <ColorSwatch colors={info} title="Info" />
      <ColorSwatch colors={warning} title="Warning" />
      <ColorSwatch colors={danger} title="Danger" />
    </UIExamplesGroup>
  );
}
