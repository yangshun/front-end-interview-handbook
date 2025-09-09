import type {
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';

import UserInterfaceCodingWorkspaceAboveMobile from './UserInterfaceCodingWorkspaceAboveMobile';
import UserInterfaceCodingWorkspaceMobile from './UserInterfaceCodingWorkspaceMobile';
import UserInterfaceCodingWorkspaceSection from './UserInterfaceCodingWorkspaceSection';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
  userAgent: 'desktop' | 'mobile' | 'tablet';
}>;

export default function UserInterfaceCodingWorkspacePage({
  userAgent,
  ...props
}: Props) {
  return (
    <UserInterfaceCodingWorkspaceSection
      {...props}
      embed={false}
      isUserAgentTablet={userAgent === 'tablet'}
      renderWorkspace={
        userAgent === 'mobile'
          ? UserInterfaceCodingWorkspaceMobile
          : UserInterfaceCodingWorkspaceAboveMobile
      }
      sandpackO11yInstance="workspace.ui"
    />
  );
}
