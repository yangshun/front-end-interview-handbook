'use client';

import clsx from 'clsx';
import type {
  InterviewsLearningList,
  InterviewsListingBottomContent,
} from 'contentlayer/generated';
import {
  RiThumbUpLine,
  RiVerifiedBadgeLine,
  RiWindowLine,
} from 'react-icons/ri';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import InterviewsListPageHeader from '~/components/interviews/common/InterviewsListPageHeader';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import InterviewsCompanyGuideListWithFilters from './InterviewsCompanyGuideListWithFilters';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  companyGuides: Array<InterviewsLearningList>;
}>;

export default function InterviewsLearningListListPage({
  companyGuides,
  bottomContent,
}: Props) {
  const intl = useIntl();

  const features = [
    {
      icon: RiWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'Actual interview questions',
        description: 'Features for company guides',
        id: 'T9J/PN',
      }),
    },
    {
      icon: RiThumbUpLine,
      label: intl.formatMessage({
        defaultMessage: 'Recommended resources',
        description: 'Features for company guides',
        id: 'K7D+wG',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Solutions by ex-interviewers',
        description: 'Features for company guides',
        id: 'gpdfNp',
      }),
    },
  ];

  return (
    <Container className={clsx('flex flex-col', 'py-10', 'gap-y-12')}>
      {INTERVIEWS_REVAMP_2024 ? (
        <InterviewsListPageHeader
          description={intl.formatMessage({
            defaultMessage:
              'Optimized preparation for target companies, leveraging insider tips and expertise.',
            description: 'Description for company guides page',
            id: 'olxZ5i',
          })}
          features={features}
          title={intl.formatMessage({
            defaultMessage: 'Company guides',
            description: 'Title of company guides page',
            id: 'k2qYCS',
          })}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <Heading level="heading5">
            {intl.formatMessage({
              defaultMessage:
                'Company Guides for Front End Engineer Interviews',
              description: 'Title of company guides page',
              id: 'BvkdTb',
            })}
          </Heading>
          <Text className="block" color="secondary" size="body2">
            {intl.formatMessage({
              defaultMessage:
                'Explore front end engineering interview questions and preparation resources tailored to popular companies and ace your interviews.',
              description: 'Description for company guides page',
              id: 'hf8Jl7',
            })}
          </Text>
        </div>
      )}
      <InterviewsCompanyGuideListWithFilters companyGuides={companyGuides} />
      {bottomContent && (
        <>
          <Divider className="my-8" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </Container>
  );
}
