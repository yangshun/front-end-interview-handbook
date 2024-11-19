'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import {
  RiThumbUpLine,
  RiVerifiedBadgeLine,
  RiWindowLine,
} from 'react-icons/ri';

import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import InterviewsCompanyGuideListWithFilters from './InterviewsCompanyGuideListWithFilters';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  companyGuides: Array<InterviewsStudyList>;
}>;

export default function InterviewsStudyListListPage({
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
    <div className={clsx('flex flex-col gap-y-10 xl:gap-y-16')}>
      <InterviewsPageHeader
        description={intl.formatMessage({
          defaultMessage:
            'Optimized preparation for target companies, leveraging insider tips and expertise.',
          description: 'Description for company guides page',
          id: 'olxZ5i',
        })}
        features={features}
        headingAddOnElement={<InterviewsPremiumBadge />}
        title={intl.formatMessage({
          defaultMessage: 'Company guides',
          description: 'Title of company guides page',
          id: 'k2qYCS',
        })}
      />
      <InterviewsCompanyGuideListWithFilters companyGuides={companyGuides} />
      {bottomContent && (
        <>
          <Divider className="my-8 md:my-4" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </div>
  );
}
