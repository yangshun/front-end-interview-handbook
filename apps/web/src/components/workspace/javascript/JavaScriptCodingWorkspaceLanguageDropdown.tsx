import type { QuestionCodingWorkingLanguage } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionLanguageIcon from '~/components/interviews/questions/metadata/QuestionLanguageIcon';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';
import { useCodingWorkspaceUnsavedSolutionContext } from '~/components/workspace/common/CodingWorkspaceUnsavedSolutionContext';

import { changeJavaScriptCodingWorkspaceLanguage } from './store/actions';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from './store/hooks';

type Props = Readonly<{
  mode?: 'icon' | 'label';
  size?: 'md' | 'sm' | 'xs';
}>;

export default function JavaScriptCodingWorkspaceLanguageDropdown({
  mode = 'label',
  size = 'xs',
}: Props) {
  const intl = useIntl();
  const { setUnsavedChangesDialog } =
    useCodingWorkspaceUnsavedSolutionContext();
  const workspaceDispatch = useJavaScriptCodingWorkspaceDispatch();
  const language = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace.language,
  );

  function onChange(value: QuestionCodingWorkingLanguage) {
    workspaceDispatch(
      changeJavaScriptCodingWorkspaceLanguage(value, setUnsavedChangesDialog),
    );
  }

  const languageOptions = [
    { label: 'JavaScript', value: 'js' as const },
    { label: 'TypeScript', value: 'ts' as const },
  ];

  const currentLanguageLabel = languageOptions.find(
    (option) => option.value === language,
  )?.label;

  return (
    <DropdownMenu
      icon={
        mode === 'icon'
          ? () => <QuestionLanguageIcon language={language} />
          : undefined
      }
      isLabelHidden={mode === 'icon'}
      label={
        mode === 'label'
          ? currentLanguageLabel ?? language
          : intl.formatMessage({
              defaultMessage: 'Question Language',
              description: 'Coding question language',
              id: 'IXT5w0',
            })
      }
      showChevron={true}
      side="top"
      size={size}>
      {languageOptions.map((languageOption) => (
        <DropdownMenu.Item
          key={languageOption.value}
          label={languageOption.label}
          onClick={() => onChange(languageOption.value)}
        />
      ))}
    </DropdownMenu>
  );
}
