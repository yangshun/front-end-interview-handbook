import { capitalize } from 'lodash-es';

import UIExamplesGroup from '~/components/ui/misc/UIExamplesGroup';

import Anchor from './Anchor';

export default function AnchorExamples() {
  return (
    <UIExamplesGroup title="Anchor">
      <div className="flex flex-wrap gap-8">
        {(
          ['default', 'blend', 'flat', 'light', 'muted', 'unstyled'] as const
        ).map((variant) => (
          <Anchor key={variant} variant={variant}>
            {capitalize(variant)}
          </Anchor>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
