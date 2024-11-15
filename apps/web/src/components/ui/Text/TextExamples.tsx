import clsx from 'clsx';
import { capitalize } from 'lodash-es';
import { Fragment } from 'react';

import Text from './Text';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import { themeBackgroundInvertColor } from '../theme';

const colors = ['default', 'subtitle', 'secondary', 'subtle'] as const;

const specialColors = [
  'label',
  'placeholder',
  'disabled',
  'active',
  'error',
  'success',
  'invert',
  'inherit',
] as const;

const sizes = ['body0', 'body1', 'body2', 'body3'] as const;
const weights = ['normal', 'medium', 'bold'] as const;

export default function TextExamples() {
  return (
    <UIExamplesGroup title="Text">
      {sizes.map((size) => (
        <div key={size} className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
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
                    className={clsx('whitespace-nowrap')}
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
