import { useIntl } from 'react-intl';

import useCompanyNames from '~/hooks/useCompanyNames';

import { useUserPreferencesState } from '~/components/global/UserPreferencesProvider';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCategory } from './types';
import type { QuestionCompany } from '../common/QuestionsTypes';

const COMPANY_OPTIONS: ReadonlyArray<QuestionCompany> = [
  'google',
  'amazon',
  'apple',
  'airbnb',
  'linkedin',
];

type Props = Readonly<{
  category: QuestionCategory;
}>;

export default function useQuestionCompanyFilter({
  category,
}: Props): [Set<QuestionCompany>, QuestionFilter<QuestionCompany>] {
  const intl = useIntl();
  const companyNames = useCompanyNames();
  const [companyFilters, setCompanyFilters] = useUserPreferencesState<
    Set<QuestionCompany>
  >(`${category}CompanyFilters`, new Set());
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
