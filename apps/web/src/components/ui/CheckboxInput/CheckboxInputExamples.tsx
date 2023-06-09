import { useState } from 'react';

import CheckboxInput from './CheckboxInput';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function CheckboxInputExamples() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <UIExamplesGroup gapSize="lg" title="Checkbox">
      <div className="flex gap-x-24">
        <CheckboxInput
          label="I would like to sign up for newsletter and updates"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
        <CheckboxInput
          label="I would like to sign up for newsletter and updates"
          size="sm"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
      </div>
      <div className="flex gap-x-24">
        <CheckboxInput
          description="No spam, we promise! Unsubscribe anytime"
          label="I would like to sign up for newsletter and updates"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
        <CheckboxInput
          description="No spam, we promise! Unsubscribe anytime"
          label="I would like to sign up for newsletter and updates"
          size="sm"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
      </div>
      <div className="flex gap-x-24">
        <CheckboxInput
          disabled={true}
          label="I would like to sign up for newsletter and updates"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
        <CheckboxInput
          description="No spam, we promise! Unsubscribe anytime"
          disabled={true}
          label="I would like to sign up for newsletter and updates"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
      </div>
      <div className="flex gap-x-24">
        <CheckboxInput
          errorMessage="You have to sign up to proceed!"
          label="I would like to sign up for newsletter and updates"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
        <CheckboxInput
          description="No spam, we promise! Unsubscribe anytime"
          errorMessage="You have to sign up to proceed!"
          label="I would like to sign up for newsletter and updates"
          value={isChecked}
          onChange={(value) => {
            setIsChecked(value);
          }}
        />
      </div>
    </UIExamplesGroup>
  );
}
