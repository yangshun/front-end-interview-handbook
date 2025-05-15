'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import { themeRadialGlowBackground } from '~/components/ui/theme';

export default function ProjectMarketingReadyToStart() {
  const intl = useIntl();

  return (
    <Container className={clsx('isolate px-0 pb-16 lg:pb-32')}>
      <div
        className={clsx(
          'flex flex-col items-center justify-center gap-8 text-balance',
          'rounded-[48px]',
          'px-4 py-20 sm:px-[170px]',
          themeRadialGlowBackground,
        )}>
        <MarketingSectionHeader
          description={
            <FormattedMessage
              defaultMessage="Starting is as easy as clicking a Start project button, and we will take you through every step of the way."
              description="Ready to start section subtitle"
              id="Tdn+OY"
            />
          }
          heading={
            <FormattedMessage
              defaultMessage="Ready to start building?"
              description="Ready to start building section title"
              id="ECjV1e"
            />
          }
        />
        <Button
          href="/projects/challenges"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Select a project',
            description: 'Select a project on ready to start page',
            id: 'Kl+fdC',
          })}
          size="lg"
          variant="primary"
        />
      </div>
    </Container>
  );
}
