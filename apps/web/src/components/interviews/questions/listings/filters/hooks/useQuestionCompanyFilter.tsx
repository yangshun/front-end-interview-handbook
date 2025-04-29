import { useState } from 'react';

import useCompanyNames from '~/hooks/useCompanyNames';
import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionCompany } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

import type { QuestionFilter } from '../QuestionFilterType';

const COMPANY_OPTIONS: ReadonlyArray<QuestionCompany> = [
  'google',
  'amazon',
  'apple',
  'bytedance',
  'microsoft',
  'tiktok',
  'uber',
  'linkedin',
  'atlassian',
  'stripe',
  'lyft',
  'airbnb',
  'dropbox',
];

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionCompanyFilter({
  namespace,
}: Props): [Set<QuestionCompany>, QuestionFilter<QuestionCompany>] {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const companyNames = useCompanyNames();

  const [companyFiltersState, setCompanyFiltersState] = useState<
    Set<QuestionCompany>
  >(new Set());
  const [companyFiltersSessionStorage, setCompanyFiltersSessionStorage] =
    useGreatStorageLocal<Set<QuestionCompany>>(
      `qns:${namespace}:filter:company`,
      new Set(),
      {
        ttl: 24 * 60 * 60,
      },
    );

  // Conditionally select which hook's state to use
  const companyFilters = namespace
    ? companyFiltersSessionStorage
    : companyFiltersState;
  const setCompanyFilters = namespace
    ? setCompanyFiltersSessionStorage
    : setCompanyFiltersState;

  const CompanyFilterOptions: QuestionFilter<QuestionCompany> = {
    id: 'company',
    matches: (question) =>
      companyFilters.size === 0 ||
      !userProfile?.isInterviewsPremium ||
      question.metadata.companies.some((company) =>
        companyFilters.has(company),
      ),
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
    onClear: () => {
      setCompanyFilters(new Set());
    },
    options: COMPANY_OPTIONS.map((company) => {
      const Icon = companyNames[company].logo;

      return {
        icon: Icon,
        label: companyNames[company].label,
        value: company,
      };
    }),
    setValues: setCompanyFilters,
  };

  return [companyFilters, CompanyFilterOptions];
}
