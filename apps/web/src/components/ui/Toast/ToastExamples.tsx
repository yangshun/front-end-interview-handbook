import { capitalize } from 'lodash-es';
import { RiFireFill } from 'react-icons/ri';

import { useToast } from '~/components/global/toasts/useToast';

import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import type { ToastVariant } from './Toast';
import { ToastImpl } from './Toast';

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
        <Button
          label="Show on the right"
          variant="secondary"
          onClick={() => {
            showToast({
              description: new Date().toUTCString(),
              side: 'end',
              title: 'Scheduled: Catch up',
              variant: 'info',
            });
          }}
        />
      </div>
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <ToastImpl
            addOnIcon={RiFireFill}
            addOnLabel="+50"
            title={capitalize(variant) + ' Title'}
            variant={variant}
          />
          <ToastImpl
            addOnIcon={RiFireFill}
            addOnLabel="+50"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            title={capitalize(variant) + ' Title'}
            variant={variant}
          />
        </div>
      ))}
      <ToastImpl
        customComponent={() => (
          <div className="rounded-xl border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-700 dark:bg-neutral-950">
            This is a custom toast component
          </div>
        )}
        variant="custom"
      />
    </UIExamplesGroup>
  );
}
