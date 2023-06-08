import type { ButtonSize, ButtonVariant } from './Button';
import Button from './Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import type { TooltipPosition } from '../Tooltip/Tooltip';

import { EnvelopeIcon } from '@heroicons/react/24/solid';

const sizes: ReadonlyArray<ButtonSize> = ['sm', 'md', 'lg', 'xl'];
const variants: ReadonlyArray<ButtonVariant> = [
  'primary',
  'success',
  'secondary',
  'tertiary',
  'special',
  'flat',
];
const tooltipPositions: ReadonlyArray<TooltipPosition> = [
  'above',
  'below',
  'start',
  'end',
];

export default function ButtonExamples() {
  return (
    <UIExamplesGroup title="Button">
      {variants.map((variant) => (
        <div key={variant} className="space-x-4">
          {sizes.map((size) => (
            <Button
              key={size}
              label="Button text"
              size={size}
              variant={variant}
            />
          ))}
          <Button
            isDisabled={true}
            label="Button text"
            size="lg"
            variant={variant}
          />
        </div>
      ))}
      <div className="space-x-4">
        {sizes.map((size) => (
          <Button
            key={size}
            isLoading={true}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          isDisabled={true}
          isLoading={true}
          label="Button text"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="space-x-4">
        {sizes.map((size) => (
          <Button
            key={size}
            icon={EnvelopeIcon}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          icon={EnvelopeIcon}
          isDisabled={true}
          label="Button text"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="space-x-4">
        {sizes.map((size) => (
          <Button
            key={size}
            addonPosition="start"
            icon={EnvelopeIcon}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          addonPosition="start"
          icon={EnvelopeIcon}
          isDisabled={true}
          label="Button text"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="space-x-4">
        {sizes.map((size) => (
          <Button
            key={size}
            icon={EnvelopeIcon}
            isLabelHidden={true}
            label="Button text"
            size={size}
            variant="tertiary"
          />
        ))}
        <Button
          icon={EnvelopeIcon}
          isDisabled={true}
          isLabelHidden={true}
          label="Button text"
          size="lg"
          variant="tertiary"
        />
      </div>
      <div className="space-y-4">
        {sizes.map((size) => (
          <Button
            key={size}
            display="block"
            icon={EnvelopeIcon}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
      </div>
      <div className="space-x-4">
        {tooltipPositions.map((position) => (
          <Button
            key={position}
            label={`Tooltip ${position}`}
            size="lg"
            tooltip="Hello World"
            tooltipPosition={position}
            variant="primary"
          />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
