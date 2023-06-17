import { useIntl } from 'react-intl';

import useCompanyNames from '~/hooks/useCompanyNames';
import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionCompany,
  QuestionUserFacingFormat,
} from '~/components/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

const COMPANY_OPTIONS: ReadonlyArray<QuestionCompany> = [
  'google',
  'amazon',
  'apple',
  'airbnb',
  'linkedin',
  'lyft',
  'uber',
  'dropbox',
];

type Props = Readonly<{
  userFacingFormat: QuestionUserFacingFormat;
}>;

export default function useQuestionCompanyFilter({
  userFacingFormat,
}: Props): [Set<QuestionCompany>, QuestionFilter<QuestionCompany>] {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const companyNames = useCompanyNames();
  const [companyFilters, setCompanyFilters] =
    useSessionStorageForSets<QuestionCompany>(
      `gfe:${userFacingFormat}:company-filter`,
      new Set(),
    );
  const CompanyFilterOptions: QuestionFilter<QuestionCompany> = {
    id: 'company',
    matches: (question) =>
      companyFilters.size === 0 ||
      !userProfile?.isPremium ||
      question.companies.some((company) => companyFilters.has(company)),
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
        <div className="flex items-center gap-2">
          <img
            alt={companyNames[company].label}
            className="h-4 w-4 rounded-sm bg-white object-scale-down"
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
