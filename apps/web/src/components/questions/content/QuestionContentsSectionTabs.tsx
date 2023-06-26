import { useIntl } from 'react-intl';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

function useSectionLabels(): Record<QuestionContentsSection, string> {
  const intl = useIntl();

  return {
    description: intl.formatMessage({
      defaultMessage: 'Description',
      description:
        'Header for question description section in coding workspace',
      id: 'lkCg86',
    }),
    solution: intl.formatMessage({
      defaultMessage: 'Solution',
      description: 'Header for question solution section in coding workspace',
      id: 'JEcwe6',
    }),
    tests: intl.formatMessage({
      defaultMessage: 'Test Cases',
      description: 'Header for question test cases section in coding workspace',
      id: 'Q2pP1Q',
    }),
  };
}

export type QuestionContentsSection = 'description' | 'solution' | 'tests';
type Props = Readonly<{
  onSelectSection: (section: QuestionContentsSection) => void;
  sections?: ReadonlyArray<QuestionContentsSection>;
  selectedSection: QuestionContentsSection;
}>;

export default function QuestionContentsSectionTabs({
  onSelectSection,
  selectedSection,
  sections: sectionsProp,
}: Props) {
  const intl = useIntl();
  const sectionLabels = useSectionLabels();
  const DEFAULT_SECTIONS: ReadonlyArray<QuestionContentsSection> = [
    'description',
    'solution',
    'tests',
  ];
  const sections = sectionsProp ?? DEFAULT_SECTIONS;

  return (
    <TabsUnderline
      label={intl.formatMessage({
        defaultMessage: 'Select question section',
        description: 'Label for tabs within coding workspace',
        id: 'jgldKV',
      })}
      size="sm"
      tabs={sections.map((section) => ({
        label: sectionLabels[section],
        value: section,
      }))}
      value={selectedSection}
      onSelect={onSelectSection}
    />
  );
}
