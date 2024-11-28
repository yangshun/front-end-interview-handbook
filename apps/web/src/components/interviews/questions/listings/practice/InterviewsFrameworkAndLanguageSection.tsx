import clsx from 'clsx';
import { type ReactNode, useMemo } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import {
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import AngularLogo from '~/components/icons/AngularLogo';
import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import ReactLogo from '~/components/icons/ReactLogo';
import SvelteLogo from '~/components/icons/SvelteLogo';
import TypeScriptLogo from '~/components/icons/TypeScriptLogo';
import VueLogo from '~/components/icons/VueLogo';
import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { categorizeQuestionsProgressByFrameworkAndLanguage } from '~/db/QuestionsUtils';

type FrameworkCardProps = Readonly<{
  completedQuestions: number;
  href: string;
  icon: ReactNode;
  title: string;
  titleAddOnText?: string;
  totalQuestions: number;
}>;

function FrameworkCard({
  completedQuestions,
  icon,
  title,
  titleAddOnText,
  totalQuestions,
  href,
}: FrameworkCardProps) {
  return (
    <div
      className={clsx(
        'group relative flex items-center gap-6',
        'rounded-lg px-6 py-4',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'rounded-lg',
          'size-12 shrink-0',
          themeBackgroundLayerEmphasized,
          themeGlassyBorder,
        )}>
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap gap-x-2.5 gap-y-1">
          <Text size="body1" weight="bold">
            {title}
          </Text>
          {titleAddOnText && (
            <Badge label={titleAddOnText} size="sm" variant="neutral-active" />
          )}
        </div>
        <InterviewsEntityProgress
          completed={completedQuestions}
          entity="question"
          title={title}
          total={totalQuestions}
        />
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-6 shrink-0 transition-colors',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
      <Anchor aria-label={title} className="absolute inset-0" href={href} />
    </div>
  );
}

type Props = Readonly<{
  questions: {
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<QuestionMetadata>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<QuestionMetadata>
    >;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsFrameworkAndLanguageSection({
  questions,
  questionsProgress,
}: Props) {
  const intl = useIntl();
  const { frameworkQuestions, languageQuestions } = questions;
  const languagesData = useQuestionLanguagesData();
  const frameworksData = useQuestionFrameworksData();

  const { framework: frameworkProgress, language: languageProgress } = useMemo(
    () =>
      categorizeQuestionsProgressByFrameworkAndLanguage(
        questionsProgress,
        questions,
      ),
    [questions, questionsProgress],
  );

  const frameworks: ReadonlyArray<FrameworkCardProps> = [
    {
      completedQuestions: frameworkProgress.react.size,
      href: frameworksData.react.href,
      icon: (
        <ReactLogo className="size-6" style={{ fill: 'rgb(20, 158, 202)' }} />
      ),
      title: frameworksData.react.label,
      totalQuestions: frameworkQuestions.react.length,
    },
    {
      completedQuestions: frameworkProgress.angular.size,
      href: frameworksData.angular.href,
      icon: <AngularLogo className="size-6" />,
      title: frameworksData.angular.label,
      totalQuestions: frameworkQuestions.angular.length,
    },
    {
      completedQuestions: frameworkProgress.vue.size,
      href: frameworksData.vue.href,
      icon: <VueLogo className="size-6" />,
      title: frameworksData.vue.label,
      totalQuestions: frameworkQuestions.vue.length,
    },
    {
      completedQuestions: frameworkProgress.svelte.size,
      href: frameworksData.svelte.href,
      icon: <SvelteLogo className="size-6" />,
      title: frameworksData.svelte.label,
      totalQuestions: frameworkQuestions.svelte.length,
    },
    {
      completedQuestions: languageProgress.js.size,
      href: languagesData.js.href,
      icon: <JavaScriptLogo className="size-6" />,
      title: languagesData.js.label,
      titleAddOnText: intl.formatMessage({
        defaultMessage: 'TypeScript supported',
        description: 'JavaScript questions can be done in TypeScript',
        id: '04Q6JH',
      }),
      totalQuestions: languageQuestions.js.length,
    },
    {
      completedQuestions: languageProgress.css.size,
      href: languagesData.css.href,
      icon: <CSS3Logo className="size-6" />,
      title: languagesData.css.label,
      totalQuestions: languageQuestions.css.length,
    },
    {
      completedQuestions: languageProgress.html.size,
      href: languagesData.html.href,
      icon: <HTML5Logo className="size-6" />,
      title: languagesData.html.label,
      totalQuestions: languageQuestions.html.length,
    },
    {
      completedQuestions: languageProgress.ts.size,
      href: languagesData.ts.href,
      icon: <TypeScriptLogo className="size-6" />,
      title: languagesData.ts.label,
      totalQuestions: languageQuestions.ts.length,
    },
  ];

  return (
    <div
      className={clsx('flex flex-col gap-6', 'scroll-mt-40 lg:scroll-mt-20')}>
      <div className="flex flex-col gap-3">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Frameworks and languages"
            description="Title for framework and language section"
            id="uSGeKw"
          />
        </Heading>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Targeted practice in specific front end frameworks and languages."
            description="Description for framework and language section"
            id="v9//lW"
          />
        </Text>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:gap-6">
        {frameworks.map((framework) => (
          <FrameworkCard key={framework.title} {...framework} />
        ))}
      </div>
    </div>
  );
}
