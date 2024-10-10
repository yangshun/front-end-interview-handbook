import clsx from 'clsx';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

import { QuestionCountFree } from '../questions/listings/stats/QuestionCount';

export default function InterviewsMarketingDreamJobSection() {
  const intl = useIntl();

  return (
    <Container
      className={clsx(
        'flex flex-col items-start justify-end gap-6 self-stretch py-20 md:flex-row md:items-end md:justify-between md:gap-0 lg:items-end',
      )}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-3xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Your dream job is absolutely worth it"
          description="Title for marketing page section"
          id="90EGb3"
        />
      </Heading>
      <Section>
        <div className="flex flex-col items-start justify-center gap-2 md:items-end">
          <Button
            href="/prepare"
            label={intl.formatMessage({
              defaultMessage: 'Get started now',
              description: 'Label for Get Started button in dream job section.',
              id: 'rrE1PA',
            })}
            prefetch={null}
            size="md"
            type="submit"
            variant="primary"
          />
          <Text
            className="block max-w-xl"
            color="secondary"
            size="body3"
            weight="medium">
            <FormattedMessage
              defaultMessage="{count}+ questions are free to do"
              description="Marketing page section subtitle"
              id="7/se2x"
              values={{ count: QuestionCountFree }}
            />
          </Text>
        </div>
      </Section>
    </Container>
  );
}
