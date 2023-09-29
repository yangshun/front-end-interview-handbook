import { capitalize } from 'lodash-es';

import type { ToastVariant } from './Toast';
import Toast from './Toast';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const variants: ReadonlyArray<ToastVariant> = [
  'plain',
  'success',
  'info',
  'warning',
  'danger',
  'dark',
  'special',
];

export default function ToastExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Toast">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-4">
          <Toast
            title={capitalize(variant) + ' Title'}
            variant={variant}
            onExpire={() => {}}
          />
          <Toast
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            title={capitalize(variant) + ' Title'}
            variant={variant}
            onExpire={() => {}}
          />
        </div>
      ))}
    </UIExamplesGroup>
  );
}
