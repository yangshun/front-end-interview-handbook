import { capitalize } from 'lodash-es';
import { Fragment } from 'react';

import type { TextColor, TextVariant, TextWeight } from './Text';
import Text from './Text';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const colors: ReadonlyArray<TextColor> = [
  'default',
  'secondary',
  'active',
  'disabled',
  'placeholder',
  'error',
  'success',
  'inherit',
];
const variants: ReadonlyArray<TextVariant> = ['body', 'body2', 'body3'];
const weights: ReadonlyArray<TextWeight> = ['normal', 'medium', 'bold'];

export default function TextExamples() {
  return (
    <UIExamplesGroup title="Text">
      {variants.map((variant) => (
        <div key={variant} className="grid grid-cols-3 gap-2">
          {weights.map((weight) => (
            <Fragment key={weight}>
              <Text
                key={weight}
                className="whitespace-nowrap"
                variant={variant}
                weight={weight}>
                {capitalize(`${variant} ${weight}`)}
              </Text>
            </Fragment>
          ))}
        </div>
      ))}
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <Text key={color} className="whitespace-nowrap" color={color}>
            {capitalize(color)}
          </Text>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
