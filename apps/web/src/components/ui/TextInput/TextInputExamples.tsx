import TextInput from './TextInput';
import UIExamplesGroup from '../misc/UIExamplesGroup';

import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';

export default function TextInputExamples() {
  return (
    <UIExamplesGroup gapSize="lg" title="Text Input">
      <TextInput label="Email" placeholder="john.doe@email.com" type="email" />
      <TextInput
        errorMessage="Incorrect password!"
        label="Password"
        type="password"
      />
      <TextInput
        isLabelHidden={true}
        label="Name"
        placeholder="John Doe"
        type="text"
      />
      <TextInput
        label="Email"
        placeholder="you@example.com"
        startIcon={EnvelopeIcon}
        type="email"
      />
      <TextInput
        endIcon={QuestionMarkCircleIcon}
        label="Account number"
        placeholder="000-00-0000"
        type="text"
      />
      <TextInput
        isDisabled={true}
        label="Disabled input"
        placeholder="John Doe"
        type="text"
      />
      <TextInput
        label="Small"
        placeholder="you@example.com"
        size="sm"
        startIcon={EnvelopeIcon}
        type="email"
      />
    </UIExamplesGroup>
  );
}
