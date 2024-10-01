'use client';

import { RiArrowLeftLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Prose from '~/components/ui/Prose';

import Terms from './terms.mdx';

export default function RewardsTermsPage() {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-y-12">
      <div>
        <Button
          addonPosition="start"
          href="/rewards/social"
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'Back',
            description: 'Button label for back button',
            id: 'Dq9yul',
          })}
          size="md"
          type="button"
          variant="secondary"
        />
      </div>
      <Prose>
        <Terms />
      </Prose>
    </div>
  );
}
