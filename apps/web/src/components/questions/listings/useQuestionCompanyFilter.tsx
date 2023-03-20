import { useState } from 'react';
import { useIntl } from 'react-intl';

import useCompanyNames from '~/hooks/useCompanyNames';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCompany } from '../common/QuestionsTypes';

const COMPANY_OPTIONS: ReadonlyArray<QuestionCompany> = [
  'google',
  'facebook',
  'amazon',
  'apple',
  'airbnb',
  'linkedin',
];

export default function useQuestionCompanyFilter(): [
  Set<QuestionCompany>,
  QuestionFilter<QuestionCompany>,
] {
  const intl = useIntl();
  const companyNames = useCompanyNames();
  const [companyFilters, setCompanyFilters] = useState<Set<QuestionCompany>>(
    new Set(),
  );
  const CompanyFilterOptions: QuestionFilter<QuestionCompany> = {
    id: 'company',
    name: intl.formatMessage({
      defaultMessage: 'Company',
      description: 'Header for company filters',
      id: 'IiZazG',
    }),
    onChange: (value) => {
      const newCompanies = new Set(companyFilters);

      newCompanies.has(value)
        ? newCompanies.delete(value)
        : newCompanies.add(value);
      setCompanyFilters(newCompanies);
    },
    options: COMPANY_OPTIONS.map((company) => ({
      label: (
        <div className="flex items-center gap-3">
          <img
            alt={companyNames[company].label}
            className="h-[16px] 2xl:h-[18px]"
            src={companyNames[company].logoUrl}
          />
          {companyNames[company].label}
        </div>
      ),
      value: company,
    })),
  };

  return [companyFilters, CompanyFilterOptions];
}
