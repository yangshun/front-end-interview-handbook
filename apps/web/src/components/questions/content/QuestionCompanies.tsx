import { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useCompanyNames from '~/hooks/useCompanyNames';

import QuestionPaywallSmall from '~/components/questions/common/QuestionPaywallSmall';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { QuestionMetadata } from '../common/QuestionsTypes';

type Props = Readonly<{
  canViewPremiumContent?: boolean;
  question: QuestionMetadata;
}>;

export default function QuestionCompanies({
  canViewPremiumContent = false,
  question,
}: Props) {
  const companyNames = useCompanyNames();
  const companies = question.companies.filter(
    (company) => companyNames[company] != null,
  );
  const intl = useIntl();

  return (
    <div className="space-y-4">
      <Heading className="text-base font-semibold" level="custom">
        <FormattedMessage
          defaultMessage="Companies"
          description="Title for section on question that shows which companies asked the question"
          id="iSDQh3"
        />
      </Heading>
      <Section>
        {!canViewPremiumContent ? (
          <QuestionPaywallSmall
            subtitle={intl.formatMessage({
              defaultMessage:
                'Purchase premium to see companies which ask this question.',
              description:
                'Subtitle for paywall over information about companies that asked the question',
              id: 'vp4zbB',
            })}
            title={intl.formatMessage({
              defaultMessage: 'Premium Feature',
              description:
                'Title for paywall over information about companies that asked the question',
              id: 'BPE/qv',
            })}
          />
        ) : companies.length > 0 ? (
          companies.map((company) => (
            <Fragment key={company}>
              <span className="relative inline-flex items-center rounded-full border border-neutral-200 px-3 py-0.5">
                <Text color="secondary" variant="body3">
                  {companyNames[company].label}
                </Text>
              </span>{' '}
            </Fragment>
          ))
        ) : (
          <Text color="secondary" display="block" variant="body2">
            <FormattedMessage
              defaultMessage="No tagged companies"
              description="Text that appears if the question does not have any tagged comppanies (where the question was known to be asked)"
              id="ftr2lo"
            />
          </Text>
        )}
      </Section>
    </div>
  );
}
