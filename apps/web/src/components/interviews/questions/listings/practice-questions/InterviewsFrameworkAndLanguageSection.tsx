import clsx from 'clsx';
import { type ReactNode, useMemo } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

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
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
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
        'rounded-lg px-6 py-5',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
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
          <Text size="body1" weight="medium">
            {title}
          </Text>
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
      icon: <JavaScriptLogo className="size-6" />,
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
        <ReactLogo className="size-6" style={{ fill: 'rgb(20, 158, 202)' }} />
      ),
      title: 'React',
      totalQuestions: frameworkQuestions.react.length,
    },
    {
      completedQuestions: frameworkProgress.angular.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/angular',
      icon: <AngularLogo className="size-6" />,
      title: 'Angular',
      totalQuestions: frameworkQuestions.angular.length,
    },
    {
      completedQuestions: frameworkProgress.vue.size,
      gradient: themeGradientPurpleGreen.className,
      href: '/questions/vue',
      icon: <VueLogo className="size-6" />,
      title: 'Vue',
      totalQuestions: 10,
    },
    {
      completedQuestions: frameworkProgress.svelte.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/svelte',
      icon: <SvelteLogo className="size-6" />,
      title: 'Svelte',
      totalQuestions: frameworkQuestions.svelte.length,
    },
    {
      completedQuestions: languageProgress.html.size,
      gradient: themeGradientGreenYellow.className,
      href: '/questions/html',
      icon: <HTML5Logo className="size-6" />,
      title: 'HTML',
      totalQuestions: languageQuestions.html.length,
    },
    {
      completedQuestions: languageProgress.css.size,
      gradient: themeGradientPinkPurple.className,
      href: '/questions/css',
      icon: <CSS3Logo className="size-6" />,
      title: 'CSS',
      totalQuestions: languageQuestions.css.length,
    },
    {
      completedQuestions: languageProgress.ts.size,
      gradient: themeGradientPinkPurple.className,
      href: '/questions/js',
      icon: <TypeScriptLogo className="size-6" />,
      title: 'TypeScript',
      totalQuestions: languageQuestions.ts.length,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
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

      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
        {frameworks.map((framework) => (
          <FrameworkCard key={framework.title} {...framework} />
        ))}
      </div>
    </div>
  );
}
