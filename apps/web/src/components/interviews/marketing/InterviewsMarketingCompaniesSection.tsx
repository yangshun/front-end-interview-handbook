import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import InterviewsStudyListCard from '~/components/interviews/questions/listings/study-list/InterviewsStudyListCard';
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

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsMarketingCompaniesSection({
  companyGuides,
}: Props) {
  const intl = useIntl();
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1024px)');

  return (
    <Container
      className={clsx('py-16 sm:py-20')}
      tag="section"
      width="marketing">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Company guides and tips"
          description="Marketing section title"
          id="xv/L23"
        />
      </Heading>
      <Heading
        className={clsx(
          themeMarketingHeadingSize,
          themeGradientHeading,
          'max-w-lg pb-1',
        )}
        level="custom"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="Leverage insider tips from leading companies"
          description="Title for marketing page section"
          id="7UW/T/"
        />
      </Heading>
      <Section>
        <Text
          className={clsx(
            'mt-6 block',
            'text-base lg:text-lg',
            'lg:font-medium',
            'lg:max-w-2xl',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="Practicing company-specific questions is the quickest way to ace specific interviews. We regularly survey and update lists for known questions tested in top companies around the world."
            description="Marketing page section subtitle"
            id="z9lq1x"
          />
        </Text>
        <div
          className={clsx(
            'mt-12 lg:mt-16',
            'flex flex-col items-center gap-8',
          )}>
          <div
            className={clsx(
              'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6',
              'w-full',
            )}>
            {companyGuides.slice(0, isTablet ? 8 : 9).map((companyGuide) => {
              return (
                <InterviewsStudyListCard
                  key={companyGuide.slug}
                  alignVerticalOnMobile={false}
                  backgroundClass="bg-neutral-50 dark:bg-neutral-800/40"
                  completionCount={0}
                  isStarted={false}
                  showDescription={false}
                  showLogoShadow={false}
                  showProgress={false}
                  studyList={companyGuide}
                />
              );
            })}
          </div>
          <Button
            href="/interviews/company"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'View full list',
              description: 'Label for view companies button in homepage',
              id: 'WEDD1f',
            })}
            prefetch={null}
            size="md"
            variant="secondary"
          />
        </div>
      </Section>
    </Container>
  );
}
