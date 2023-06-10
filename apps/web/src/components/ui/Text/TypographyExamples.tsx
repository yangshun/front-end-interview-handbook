import clsx from 'clsx';

import UIExamplesGroup from '../misc/UIExamplesGroup';

const sizes: ReadonlyArray<string> = [
  'text-4xl',
  'text-3xl',
  'text-2xl',
  'text-xl',
  'text-lg',
  'text-base',
  'text-sm',
  'text-xs',
  'text-2xs',
];

export default function TypographyExamples() {
  return (
    <UIExamplesGroup title="Typography">
      {sizes.map((sizeClass) => (
        <div
          key={sizeClass}
          className={clsx(
            'text-semibold text-slate-900 dark:text-white',
            sizeClass,
          )}>
          The quick brown fox jumps over the lazy dog ({sizeClass})
        </div>
      ))}
    </UIExamplesGroup>
  );
}
