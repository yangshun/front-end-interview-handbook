'use client';

import clsx from 'clsx';
import type { JobsPosting } from 'contentlayer/generated';
import { startCase } from 'lodash-es';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  content: string;
  employmentType: JobsPosting['employmentType'];
  href: string;
  payRange: string;
  title: string;
}>;

export default function JobPostingPage({
  content,
  employmentType,
  href,
  payRange,
  title,
}: Props) {
  const intl = useIntl();

  return (
    <Container
      className="my-10 grid gap-y-8 md:my-20 md:gap-y-16"
      width="marketing">
      <div className="flex flex-col gap-y-6">
        <div>
          <Anchor href="/jobs">
            ←{' '}
            {intl.formatMessage({
              defaultMessage: 'Back to jobs',
              description: 'Back to jobs page',
              id: 'stA35Q',
            })}
          </Anchor>
        </div>
        <Heading level="heading3">{title}</Heading>
      </div>
      <Section>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:order-last">
            <div
              className={clsx(
                'rounded',
                ['border', themeBorderColor],
                ['divide-y', themeDivideColor],
              )}>
              <div className="grid gap-y-2 p-4">
                <Text className="block" size="body2" weight="medium">
                  {intl.formatMessage({
                    defaultMessage: 'Employment Type',
                    description: 'Employment type',
                    id: '4lxFH6',
                  })}
                </Text>
                <Text
                  className="block"
                  color="secondary"
                  size="body2"
                  weight="medium">
                  {startCase(employmentType.toLowerCase())}
                </Text>
              </div>
              <div className="grid gap-y-2 p-4">
                <Text className="block" size="body2" weight="medium">
                  {intl.formatMessage({
                    defaultMessage: 'Pay Range',
                    description: 'Job pay range',
                    id: 'cHRu7b',
                  })}
                </Text>
                <Text
                  className="block"
                  color="secondary"
                  size="body2"
                  weight="medium">
                  {payRange}
                </Text>
              </div>
              <div className="p-5">
                <Button
                  display="block"
                  href={href}
                  label={intl.formatMessage({
                    defaultMessage: 'Apply now',
                    description: 'Apply now button label',
                    id: 'WriAja',
                  })}
                  variant="primary"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <Prose dangerouslySetInnerHTML={{ __html: content }} />
            <div
              className={clsx(
                'mt-8 flex flex-col gap-y-4 rounded-lg border px-6 md:p-8',
                themeBackgroundEmphasized,
                themeBorderColor,
              )}>
              <Heading level="heading5">
                {intl.formatMessage({
                  defaultMessage: 'We are excited to hear from you',
                  description: 'Job posting title',
                  id: 'xSJcDV',
                })}
              </Heading>
              <Prose>
                <p>
                  {intl.formatMessage({
                    defaultMessage:
                      "At GreatFrontEnd, we look for people with intense passion in the front end domain. You're encouraged to apply even if your background does not exactly align with the job requirements.",
                    description: 'Job posting description',
                    id: '/Huda4',
                  })}
                </p>
                <p>
                  {intl.formatMessage({
                    defaultMessage:
                      'Your abilities and enthusiasm will be recognized and distinguished, especially if your career has taken a unique path. We value diverse viewpoints and individuals who think critically and are unafraid to question preconceptions. Come join us.',
                    description: 'Job posting description',
                    id: 'PJ4Kme',
                  })}
                </p>
              </Prose>
              <div className="mt-4">
                <Button
                  href={href}
                  label={intl.formatMessage({
                    defaultMessage: 'Apply now',
                    description: 'Apply now button label',
                    id: 'WriAja',
                  })}
                  size="md"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
