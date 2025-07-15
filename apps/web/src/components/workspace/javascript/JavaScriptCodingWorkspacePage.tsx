'use client';

import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import useCodingWorkspaceWorkingLanguage from '../common/useCodingWorkspaceWorkingLanguage';
import JavaScriptCodingWorkspaceSection from './JavaScriptCodingWorkspaceSection';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspacePage({
  canViewPremiumContent,
  nextQuestions,
  question,
  similarQuestions,
  studyListKey,
}: Props) {
  const [language, setLanguage] = useCodingWorkspaceWorkingLanguage();

  return (
    <JavaScriptCodingWorkspaceSection
      canViewPremiumContent={canViewPremiumContent}
      language={language}
      nextQuestions={nextQuestions}
      question={question}
      sandpackO11yInstance="workspace.js"
      similarQuestions={similarQuestions}
      studyListKey={studyListKey}
      onLanguageChange={setLanguage}
    />
  );
}
