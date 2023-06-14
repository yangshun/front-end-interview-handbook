import clsx from 'clsx';
import { capitalize } from 'lodash-es';
import { Fragment } from 'react';

import type { TextColor, TextSize, TextWeight } from './Text';
import Text from './Text';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const colors: ReadonlyArray<TextColor> = [
  'default',
  'subtitle',
  'secondary',
  'placeholder',
  'disabled',
  'active',
  'error',
  'success',
  'invert',
  'inherit',
];
const sizes: ReadonlyArray<TextSize> = ['body', 'body2', 'body3'];
const weights: ReadonlyArray<TextWeight> = ['normal', 'medium', 'bold'];

export default function TextExamples() {
  return (
    <UIExamplesGroup title="Text">
      {sizes.map((size) => (
        <div key={size} className="grid grid-cols-3 gap-2">
          {weights.map((weight) => (
            <Fragment key={weight}>
              <Text
                key={weight}
                className="whitespace-nowrap"
                size={size}
                weight={weight}>
                {capitalize(`${size} ${weight}`)}
              </Text>
            </Fragment>
          ))}
        </div>
      ))}
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <Text
            key={color}
            className={clsx(
              'whitespace-nowrap',
              color === 'invert' && 'bg-black dark:bg-white',
            )}
            color={color}>
            {capitalize(color)}
          </Text>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
