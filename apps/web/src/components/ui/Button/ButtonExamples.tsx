import { capitalize } from 'lodash-es';
import { RiArrowRightLine, RiDownload2Line } from 'react-icons/ri';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import type { TooltipContentSide } from '../Tooltip/Tooltip';
import type { ButtonSize, ButtonVariant } from './Button';
import Button from './Button';

const sizes: ReadonlyArray<ButtonSize> = ['xs', 'sm', 'md', 'lg'];
const variants: ReadonlyArray<ButtonVariant> = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'danger',
  'special',
];
const tooltipSides: ReadonlyArray<TooltipContentSide> = [
  'top',
  'bottom',
  'left',
  'right',
];

export default function ButtonExamples() {
  return (
    <UIExamplesGroup title="Button">
      {variants.map((variant) => (
        <div key={variant} className="space-x-4">
          {sizes.map((size) => (
            <Button
              key={size}
              label={`${capitalize(variant)} Button`}
              size={size}
              variant={variant}
            />
          ))}
          <Button
            isDisabled={true}
            label={`${capitalize(variant)} Button`}
            size="md"
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
          size="md"
          variant="primary"
        />
      </div>
      <div className="space-x-4">
        {sizes.map((size) => (
          <Button
            key={size}
            icon={RiArrowRightLine}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          icon={RiArrowRightLine}
          isDisabled={true}
          label="Button text"
          size="md"
          variant="primary"
        />
      </div>
      <div className="space-x-4">
        {sizes.map((size) => (
          <Button
            key={size}
            addonPosition="start"
            icon={RiDownload2Line}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          addonPosition="start"
          icon={RiDownload2Line}
          isDisabled={true}
          label="Button text"
          size="md"
          variant="primary"
        />
      </div>
      <div className="space-x-4">
        {sizes.map((size) => (
          <Button
            key={size}
            icon={RiArrowRightLine}
            isLabelHidden={true}
            label="Button text"
            size={size}
            variant="secondary"
          />
        ))}
        <Button
          icon={RiArrowRightLine}
          isDisabled={true}
          isLabelHidden={true}
          label="Button text"
          size="md"
          variant="secondary"
        />
      </div>
      <div className="space-y-4">
        {sizes.map((size) => (
          <Button
            key={size}
            display="block"
            icon={RiArrowRightLine}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
      </div>
      <div className="space-x-4">
        {tooltipSides.map((side) => (
          <Button
            key={side}
            label={`Tooltip ${side}`}
            size="md"
            tooltip="Hello World"
            tooltipSide={side}
            variant="primary"
          />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
