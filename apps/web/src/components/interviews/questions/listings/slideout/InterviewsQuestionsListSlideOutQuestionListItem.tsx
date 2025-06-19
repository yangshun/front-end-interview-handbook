import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderColor,
} from '~/components/ui/theme';

import type { QuestionMetadata } from '../../common/QuestionsTypes';
import QuestionDifficultyLabel from '../../metadata/QuestionDifficultyLabel';
import QuestionFormatLabel from '../../metadata/QuestionFormatLabel';
import QuestionsListItemProgressChip from '../items/QuestionsListItemProgressChip';
import InterviewsQuestionsListSlideOutHovercardContents from './InterviewsQuestionsListSlideOutHovercardContents';

type QuestionClickEvent = Parameters<
  NonNullable<React.ComponentProps<typeof Anchor>['onClick']>
>[0];

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion?: (question: Q) => boolean;
  hasCompletedQuestion?: boolean;
  href: string;
  isActiveQuestion: boolean;
  listType: QuestionListTypeData;
  mode: 'embedded' | 'slideout';
  onClick: (event: QuestionClickEvent, href: string) => void;
  questionMetadata: QuestionMetadata;
}>;

export default function InterviewsQuestionsListSlideOutQuestionListItem<
  Q extends QuestionMetadata,
>({
  checkIfCompletedQuestion,
  hasCompletedQuestion,
  href,
  isActiveQuestion,
  listType,
  mode,
  onClick,
  questionMetadata,
}: Props<Q>) {
  const ref = useRef<HTMLDivElement>(null);
  const { userProfile } = useUserProfile();

  useEffect(() => {
    if (!isActiveQuestion) {
      return;
    }

    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [isActiveQuestion]);

  return (
    <Hovercard
      // Add a small close delay so that cursor can enter the card
      // fast enough before the card disappears.
      closeDelay={50}
      openDelay={0}>
      <HovercardTrigger asChild={true}>
        <div
          ref={ref}
          className={clsx(
            'group relative',
            'flex',
            'px-6',
            'gap-4',
            'transition-colors',
            'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
            themeBackgroundElementEmphasizedStateColor_Hover,
            isActiveQuestion && themeBackgroundElementEmphasizedStateColor,
          )}>
          <div className="grow py-4">
            <div className="flex items-center gap-x-4">
              {checkIfCompletedQuestion != null && (
                <QuestionsListItemProgressChip
                  className="z-[1]"
                  hasCompletedQuestion={!!hasCompletedQuestion}
                  hasCompletedQuestionBefore={false}
                  premiumUser={userProfile?.isInterviewsPremium}
                  question={questionMetadata}
                  size="sm"
                />
              )}
              <div className="flex grow items-center gap-x-4 gap-y-1.5 max-sm:flex-wrap">
                <div className="flex grow items-center gap-x-2 max-sm:w-full">
                  <Text size="body3" weight="medium">
                    <Anchor
                      className="focus:outline-none"
                      href={href}
                      variant="unstyled"
                      onClick={(event) => {
                        onClick(event, href);
                      }}>
                      {/* Extend touch target to entire panel */}
                      <span aria-hidden="true" className="absolute inset-0" />
                      {questionMetadata.title}
                    </Anchor>
                  </Text>
                  {questionMetadata.access === 'premium' && (
                    <InterviewsPremiumBadge size="xs" />
                  )}
                </div>
                {mode === 'slideout' && (
                  <div className="flex gap-x-4">
                    <div className="sm:w-[106px]">
                      <QuestionFormatLabel
                        showIcon={true}
                        value={questionMetadata.format}
                      />
                    </div>
                    <div className="sm:w-[68px]">
                      <QuestionDifficultyLabel
                        showIcon={true}
                        value={questionMetadata.difficulty}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </HovercardTrigger>
      <HovercardPortal>
        <HovercardContent
          className={clsx(themeBackgroundColor, ['border', themeBorderColor])}
          side="right"
          // Remove offset so that cursor can enter the card
          // fast enough before the card disappears.
          sideOffset={0}>
          <InterviewsQuestionsListSlideOutHovercardContents
            listType={listType}
            question={questionMetadata}
          />
        </HovercardContent>
      </HovercardPortal>
    </Hovercard>
  );
}
