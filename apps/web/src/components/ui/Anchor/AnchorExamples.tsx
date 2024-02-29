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
      <div className="flex flex-wrap gap-8">
        <Anchor href="https://www.frontendinterviewhandbook.com/">
          External links open in new tab by default
        </Anchor>
        <Anchor
          href="https://www.frontendinterviewhandbook.com/"
          warnAboutExternalLink={true}>
          Show warning page for external link
        </Anchor>
      </div>
    </UIExamplesGroup>
  );
}
