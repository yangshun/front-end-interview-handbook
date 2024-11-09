import clsx from 'clsx';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
} from '~/components/ui/theme';

import { QuestionCountFree } from '../questions/listings/stats/QuestionCount';

export default function InterviewsMarketingDreamJobSection() {
  const intl = useIntl();

  return (
    <Container
      className={clsx(
        'flex flex-col items-start justify-end gap-6 self-stretch',
        'sm:flex-row sm:items-end sm:justify-between sm:gap-0',
        'lg:items-end',
        'py-20',
      )}
      width="marketing">
      <Heading
        className={clsx(
          themeMarketingHeadingSize,
          themeGradientHeading,
          'max-w-lg pb-1 xl:max-w-3xl',
          '!text-balance',
        )}
        level="custom"
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
            href="/questions"
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
