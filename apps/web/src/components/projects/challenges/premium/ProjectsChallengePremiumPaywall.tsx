import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

export default function ProjectsChallengePremiumPaywall() {
  const intl = useIntl();

  return (
    <div className={clsx('mx-auto max-w-xl', 'text-center')}>
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Premium project"
          description="Label for a premium project"
          id="Sokr+M"
        />
      </Heading>
      <Text className="text-pretty mt-4 block" color="subtitle" size="body1">
        <FormattedMessage
          defaultMessage="Purchase premium to get access to premium projects, official guides, production-ready Figma files, and exclusive component tracks and skill plans."
          description="Message for project paywall"
          id="YBteXK"
        />
      </Text>
      <Button
        className="mt-7"
        href="/projects/pricing"
        label={intl.formatMessage({
          defaultMessage: 'View subscription plans',
          description:
            'Label for View subscription plans button on Projects project page',
          id: '9POdEK',
        })}
        size="md"
        variant="primary"
      />
    </div>
  );
}
