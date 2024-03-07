import clsx from 'clsx';
import { capitalize } from 'lodash-es';
import { Fragment } from 'react';

import type { TextColor, TextSize, TextWeight } from './Text';
import Text from './Text';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import { themeBackgroundInvertColor } from '../theme';

const colors: ReadonlyArray<TextColor> = [
  'default',
  'subtitle',
  'secondary',
  'subtle',
];

const specialColors: ReadonlyArray<TextColor> = [
  'label',
  'placeholder',
  'disabled',
  'active',
  'error',
  'success',
  'invert',
  'inherit',
];

const sizes: ReadonlyArray<TextSize> = ['body0', 'body1', 'body2', 'body3'];
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
      <table>
        <tbody>
          <tr>
            <td className="py-1">
              <Text size="body1" weight="medium">
                Common Colors
              </Text>
            </td>
            <td>
              <div className="flex flex-wrap items-center gap-4">
                {colors.map((color) => (
                  <Text
                    key={color}
                    className={clsx(
                      'whitespace-nowrap',
                      color === 'invert' && themeBackgroundInvertColor,
                    )}
                    color={color}
                    size="body1">
                    {capitalize(color)}
                  </Text>
                ))}
                <Text size="body2">(Becomes more muted)</Text>
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-1">
              <Text size="body1" weight="medium">
                Special Colors
              </Text>
            </td>
            <td>
              <div className="flex flex-wrap items-center gap-4">
                {specialColors.map((color) => (
                  <Text
                    key={color}
                    className={clsx(
                      'whitespace-nowrap',
                      color === 'invert' && themeBackgroundInvertColor,
                    )}
                    color={color}
                    size="body1">
                    {capitalize(color)}
                  </Text>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </UIExamplesGroup>
  );
}
