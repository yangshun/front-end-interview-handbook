import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import { questionsListTabsConfig } from '../utils/QuestionsListTabsConfig';

type Props = Readonly<{
  baseHref: string;
  listType?: QuestionListTypeData;
}>;

export default function InterviewsQuestionsCategoryPracticeFormatTabs({
  baseHref,
  listType,
}: Props) {
  const intl = useIntl();
  const listTabsConfig = questionsListTabsConfig(listType);

  if (listTabsConfig == null) {
    return null;
  }

  const listTabs = [
    {
      href: baseHref,
      label: intl.formatMessage({
        defaultMessage: 'Coding',
        description: 'Question format',
        id: 'eJU0PN',
      }),
      value: 'coding',
    } as const,
    {
      href: `${baseHref}/system-design`,
      label: intl.formatMessage({
        defaultMessage: 'System design',
        description: 'Question format',
        id: '57qxzy',
      }),
      value: 'system-design',
    } as const,
    {
      href: `${baseHref}/quiz`,
      label: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Question format',
        id: 'doY6Fg',
      }),
      value: 'quiz',
    } as const,
  ].filter((tabItem) => listTabsConfig?.includes(tabItem.value));

  return (
    <TabsUnderline
      size="sm"
      tabs={listTabs}
      value={listType?.tab ?? 'coding'}
    />
  );
}
