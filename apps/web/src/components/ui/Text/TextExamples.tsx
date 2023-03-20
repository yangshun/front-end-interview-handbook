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
const weights: ReadonlyArray<TextWeight> = ['normal', 'bold'];

export default function TextExamples() {
  return (
    <UIExamplesGroup title="Text">
      {variants.map((variant) => (
        <div key={variant}>
          {weights.map((weight) => (
            <div key={weight} className="space-x-4">
              {colors.map((color) => (
                <Text
                  key={color}
                  color={color}
                  variant={variant}
                  weight={weight}>
                  {variant} {weight} {color}
                </Text>
              ))}
            </div>
          ))}
        </div>
      ))}
    </UIExamplesGroup>
  );
}
