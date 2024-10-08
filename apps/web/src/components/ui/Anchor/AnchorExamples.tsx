import { capitalize } from 'lodash-es';

import Divider from '~/components/ui/Divider';
import UIExamplesGroup from '~/components/ui/misc/UIExamplesGroup';

import Anchor from './Anchor';
import Text from '../Text';

export default function AnchorExamples() {
  return (
    <UIExamplesGroup title="Anchor">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {(
            [
              {
                description:
                  'Brand color on dark theme, dark + underline on light theme.',
                variant: 'default',
              },
              {
                description: 'Secondary color, emphasized color on hover.',
                variant: 'secondary',
              },
              {
                description: 'Same color as text, underline on hover.',
                variant: 'flat',
              },
              {
                description: 'No color nor hover styles.',
                variant: 'unstyled',
              },
            ] as const
          ).map(({ variant, description }) => (
            <div key={variant}>
              <div>
                <Anchor variant={variant}>{capitalize(variant)}</Anchor>
              </div>
              <Text color="secondary" size="body2">
                {description}
              </Text>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div className="flex flex-wrap gap-8">
        {(['normal', 'medium', 'bold'] as const).map((weight) => (
          <Anchor key={weight} weight={weight}>
            {capitalize(weight)}
          </Anchor>
        ))}
      </div>
      <div className="flex flex-wrap gap-8">
        <Anchor underline={true}>Underline</Anchor>
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
