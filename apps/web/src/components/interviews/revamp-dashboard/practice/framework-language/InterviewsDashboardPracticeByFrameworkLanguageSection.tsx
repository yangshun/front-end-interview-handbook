import clsx from 'clsx';
import { type ReactNode, useMemo } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import AngularLogo from '~/components/icons/AngularLogo';
import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import ReactLogo from '~/components/icons/ReactLogo';
import SvelteLogo from '~/components/icons/SvelteLogo';
import VueLogo from '~/components/icons/VueLogo';
import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsDashboardLearningSection from '~/components/interviews/revamp-dashboard/InterviewsDashboardLearningSection';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGradientGreenYellow,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { categorizeQuestionsProgressByFrameworkAndLanguage } from '~/db/QuestionsUtils';

type FrameworkCardProps = Readonly<{
  completedQuestions: number;
  gradient: string;
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
  gradient,
}: FrameworkCardProps) {
  return (
    <div
      className={clsx(
        'group relative flex items-center gap-6',
        'rounded-lg p-6',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'rounded-md',
          'size-10 shrink-0',
          themeBackgroundLayerEmphasized,
        )}>
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2.5">
          <Anchor href={href} variant="unstyled">
            <span className="absolute inset-0" />
            <Text size="body1" weight="medium">
              {title}
            </Text>
          </Anchor>
          {titleAddOnText && (
            <Badge label={titleAddOnText} size="sm" variant="neutral-active" />
          )}
        </div>
        <InterviewsEntityProgress
          completed={completedQuestions}
          progressClassName={gradient}
          title={title}
          total={totalQuestions}
          type="question"
        />
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-6 transition-colors',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
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

export default function InterviewsDashboardPracticeByFrameworkLanguageSection({
  questions,
  questionsProgress,
}: Props) {
  const intl = useIntl();
  const { frameworkQuestions, languageQuestions } = questions;

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
      completedQuestions: languageProgress.js.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/js',
      icon: <JavaScriptLogo className="size-8" />,
      title: 'JavaScript',
      titleAddOnText: intl.formatMessage({
        defaultMessage: 'TypeScript supported',
        description: 'JavaScript questions can be done in TypeScript',
        id: '04Q6JH',
      }),
      totalQuestions: languageQuestions.js.length,
    },
    {
      completedQuestions: frameworkProgress.react.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/react',
      icon: (
        <ReactLogo className="size-8" style={{ fill: 'rgb(20, 158, 202)' }} />
      ),
      title: 'React',
      totalQuestions: frameworkQuestions.react.length,
    },
    {
      completedQuestions: frameworkProgress.angular.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/angular',
      icon: <AngularLogo className="size-8" />,
      title: 'Angular',
      totalQuestions: frameworkQuestions.angular.length,
    },
    {
      completedQuestions: frameworkProgress.vue.size,
      gradient: themeGradientPurpleGreen.className,
      href: '/questions/vue',
      icon: <VueLogo className="size-8" />,
      title: 'Vue',
      totalQuestions: 10,
    },
    {
      completedQuestions: frameworkProgress.svelte.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/svelte',
      icon: <SvelteLogo className="size-8" />,
      title: 'Svelte',
      totalQuestions: frameworkQuestions.svelte.length,
    },
    {
      completedQuestions: languageProgress.html.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/html',
      icon: <HTML5Logo className="size-8" />,
      title: 'HTML',
      totalQuestions: languageQuestions.html.length,
    },
    {
      completedQuestions: languageProgress.css.size,
      gradient: themeGradientPinkPurple.className,
      href: '/questions/css',
      icon: <CSS3Logo className="size-8" />,
      title: 'CSS',
      totalQuestions: languageQuestions.css.length,
    },
  ];

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage:
          'Practice quiz and coding questions for specific frameworks or languages.',
        description:
          'Description for practice by framework or language section',
        id: 'M959Wh',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Practice by framework or language',
        description: 'Title for practice by framework or language section',
        id: '5wMIcP',
      })}>
      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
        {frameworks.map((framework) => (
          <FrameworkCard
            key={framework.title}
            completedQuestions={framework.completedQuestions}
            gradient={framework.gradient}
            href={framework.href}
            icon={framework.icon}
            title={framework.title}
            totalQuestions={framework.totalQuestions}
          />
        ))}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
