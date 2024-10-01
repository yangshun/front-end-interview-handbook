import clsx from 'clsx';
import { Fragment } from 'react';

import useCompanyNames from '~/hooks/useCompanyNames';

import QuestionPaywallSmall from '~/components/interviews/questions/common/QuestionPaywallSmall';
import type { QuestionCompany } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

type Props = Readonly<{
  canViewPremiumContent?: boolean;
  companies: ReadonlyArray<QuestionCompany>;
}>;

export default function QuestionCompanies({
  canViewPremiumContent = false,
  companies,
}: Props) {
  const companyNames = useCompanyNames();
  const recognizedCompanies = companies.filter(
    (company) => companyNames[company] != null,
  );
  const intl = useIntl();

  if (recognizedCompanies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4">
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
        ) : recognizedCompanies.length > 0 ? (
          <div className="flex flex-wrap gap-x-2">
            {recognizedCompanies.map((company) => (
              <Fragment key={company}>
                <span
                  className={clsx(
                    'relative inline-flex items-center rounded-full border px-3 py-0.5',
                    themeBorderColor,
                  )}>
                  <Text color="secondary" size="body3">
                    {companyNames[company].label}
                  </Text>
                </span>{' '}
              </Fragment>
            ))}
          </div>
        ) : (
          <Text className="block" color="secondary" size="body2">
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
