import { capitalize } from 'lodash-es';

import { useToast } from '~/components/global/toasts/useToast';

import type { ToastVariant } from './Toast';
import { ToastImpl } from './Toast';
import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const variants: ReadonlyArray<ToastVariant> = [
  'plain',
  'success',
  'info',
  'warning',
  'danger',
  'dark',
  'special',
  'invert',
];

export default function ToastExamples() {
  const { showToast } = useToast();

  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Toast">
      <div className="flex flex-wrap gap-4">
        {variants.map((variant) => (
          <Button
            key={variant}
            label={`Show ${variant}`}
            variant="secondary"
            onClick={() => {
              showToast({
                description: new Date().toUTCString(),
                title: 'Scheduled: Catch up',
                variant,
              });
            }}
          />
        ))}
      </div>
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-4">
          <ToastImpl title={capitalize(variant) + ' Title'} variant={variant} />
          <ToastImpl
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            title={capitalize(variant) + ' Title'}
            variant={variant}
          />
        </div>
      ))}
    </UIExamplesGroup>
  );
}
