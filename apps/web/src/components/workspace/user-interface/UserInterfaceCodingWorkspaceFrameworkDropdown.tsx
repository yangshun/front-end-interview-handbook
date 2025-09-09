import { useQuestionFrameworksData } from '~/data/QuestionCategories';

import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionFrameworkIcon from '~/components/interviews/questions/metadata/QuestionFrameworkIcon';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

type Props = Readonly<{
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  mode?: 'icon' | 'label';
  onFrameworkChange: (framework: QuestionFramework) => void;
  size?: 'md' | 'sm' | 'xs';
}>;

export default function UserInterfaceCodingWorkspaceFrameworkDropdown({
  framework,
  metadata,
  mode = 'label',
  onFrameworkChange,
  size = 'xs',
}: Props) {
  const intl = useIntl();
  const frameworks = useQuestionFrameworksData();

  return (
    <DropdownMenu
      icon={
        mode === 'icon'
          ? () => <QuestionFrameworkIcon framework={framework} />
          : undefined
      }
      isLabelHidden={mode === 'icon'}
      label={
        mode === 'label'
          ? frameworks[framework].label
          : intl.formatMessage({
              defaultMessage: 'Framework',
              description:
                'Label for the selection dropdown used to select the framework to use for the question',
              id: 'eeWLAW',
            })
      }
      showChevron={true}
      side="top"
      size={size}>
      {metadata.frameworks.map((frameworkItem) => (
        <DropdownMenu.Item
          key={frameworks[frameworkItem.framework].label}
          label={frameworks[frameworkItem.framework].label}
          onClick={() => onFrameworkChange(frameworkItem.framework)}
        />
      ))}
    </DropdownMenu>
  );
}
