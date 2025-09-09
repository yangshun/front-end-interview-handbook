import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiBuildingLine } from 'react-icons/ri';

import useCompanyNames from '~/hooks/useCompanyNames';

import type { QuestionCompany } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';

type Props = Readonly<{
  canViewPremiumContent?: boolean;
  companies: ReadonlyArray<QuestionCompany>;
  topAddOn?: ReactNode;
}>;

export default function QuestionCompanies({
  canViewPremiumContent = false,
  companies,
  topAddOn,
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
    <>
      {topAddOn}
      <div className="flex flex-col gap-y-4">
        <Heading
          className={clsx(
            textVariants({
              color: 'subtitle',
              size: 'body2',
              weight: 'medium',
            }),
          )}
          level="custom">
          <FormattedMessage
            defaultMessage="Asked at these companies"
            description="Title for section on question that shows which companies asked the question"
            id="wI2SYk"
          />
        </Heading>
        <Section>
          {!canViewPremiumContent ? (
            <div className="flex items-center gap-1.5">
              <RiBuildingLine
                aria-hidden={true}
                className={clsx(themeIconColor, 'size-4')}
              />
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Unlock Companies data with Premium',
                  description: 'Label for the premium badge for companies data',
                  id: 'krxWYh',
                })}
                size="xs"
                variant="neutral-active"
              />
            </div>
          ) : recognizedCompanies.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {recognizedCompanies.map((company) => {
                const Icon = companyNames[company].logo;

                return (
                  <div key={company} className="flex items-center gap-2">
                    <div className="rounded bg-white p-[3px]">
                      <Icon />
                    </div>
                    <Text color="subtitle" size="body3" weight="medium">
                      {companyNames[company].label}
                    </Text>
                  </div>
                );
              })}
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
    </>
  );
}
