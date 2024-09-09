import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiCheckFill,
} from 'react-icons/ri';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import CopyLinkButton from '~/components/common/CopyLinkButton';
import ShareButton from '~/components/common/ShareButton';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from '~/components/ui/DropdownMenu/dropdownStyles';
import Text from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextFainterColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import type { QuestionMetadata } from '../questions/common/QuestionsTypes';
import QuestionsLearningListPageTitleSection from '../questions/listings/learning/QuestionsLearningListPageTitleSection';
import QuestionListingQuestionCount from '../questions/listings/stats/QuestionListingQuestionCount';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { useUser } from '@supabase/auth-helpers-react';

function OtherItemsDropdown({
  sessions,
}: {
  sessions: ReadonlyArray<{
    _count: {
      progress: number;
    };
    key: string;
  }>;
}) {
  const gfe75session = sessions.find(
    (session_) => session_.key === 'greatfrontend75',
  );
  const blind75session = sessions.find(
    (session_) => session_.key === 'blind75',
  );
  // TODO(interviews-revamp): Recheck the data and need to add completed status to the chip
  const items = [
    {
      href: '/front-end-interview-guidebook',
      isCompleted: false,
      label: 'Front End Interview Guide',
    },
    {
      href: '/interviews/greatfrontend75',
      isCompleted: gfe75session?._count.progress === 75,
      label: 'GFE 75',
    },
    {
      href: '/interviews/blind75',
      isCompleted: blind75session?._count.progress === 75,
      label: 'Blind 75',
    },
    {
      href: '/prepare/system-design',
      isCompleted: false,
      label: 'Front End System Design',
    },
  ];

  const pathname = usePathname();

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger
        className={clsx(
          'flex items-center gap-1',
          themeOutlineElementBrandColor_FocusVisible,
        )}>
        <Text
          className="line-clamp-1 text-ellipsis text-left"
          size="body3"
          weight="medium">
          <FormattedMessage
            defaultMessage="{count} other items"
            description="Trigger label for other items"
            id="59u5/i"
            values={{
              count: items.length,
            }}
          />
        </Text>
        <RiArrowDownSLine
          aria-hidden={true}
          className={clsx('size-4 shrink-0', themeTextSubtleColor)}
        />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="start"
          className={clsx(dropdownContentClassName, 'gap-6 p-6')}
          sideOffset={8}>
          <Text color="secondary" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="Recommended prep strategy"
              description="Label for other items dropdown"
              id="gBdxyo"
            />
          </Text>
          <div className={clsx('relative flex flex-col gap-6')}>
            {items.map(({ label, href, isCompleted }, index) => {
              const isSelected = pathname ? href.startsWith(pathname) : false;

              return (
                <div key={label} className="flex w-full gap-4">
                  <div
                    className={clsx(
                      'relative flex flex-col justify-center self-stretch',
                    )}>
                    {isCompleted ? (
                      <Chip
                        icon={RiCheckFill}
                        isLabelHidden={true}
                        label="Completed"
                        size="sm"
                        variant="success"
                      />
                    ) : (
                      <Chip
                        label={(index + 1).toString()}
                        size="sm"
                        variant={isSelected ? 'active' : 'neutral'}
                      />
                    )}
                    {index < items.length - 1 && (
                      <div
                        className={clsx(
                          'absolute top-1/2 h-[90%] w-px translate-y-3 self-center border-l',
                          themeBorderElementColor,
                        )}
                      />
                    )}
                  </div>
                  <DropdownMenuPrimitive.Item key={label} asChild={true}>
                    <Anchor
                      className={clsx(
                        dropdownContentItemClassName,
                        'justify-between gap-4',
                        'group',
                        'transition-colors',
                      )}
                      href={href}
                      variant="unstyled">
                      <Text
                        className="block group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
                        color={isSelected ? 'default' : 'secondary'}
                        size="body2"
                        weight={isSelected ? 'bold' : 'normal'}>
                        {label}
                      </Text>
                      <RiArrowRightLine
                        className={clsx(
                          'size-4 shrink-0',
                          isSelected
                            ? themeTextFainterColor
                            : themeTextSubtleColor,
                          themeTextBrandColor_GroupHover,
                        )}
                      />
                    </Anchor>
                  </DropdownMenuPrimitive.Item>
                </div>
              );
            })}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

type CommonProps = Readonly<{
  description: ReactNode;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  longDescription: ReactNode;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
  overallProgress: ReadonlyArray<QuestionProgress>;
  questions: ReadonlyArray<QuestionMetadata>;
  questionsSessionKey?: string;
  themeBackgroundClass: string;
  title: string;
}>;

type WithIconProps = CommonProps &
  Readonly<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  }>;

type WithLogoProps = CommonProps &
  Readonly<{
    logo: React.ReactNode;
  }>;

type Props = WithIconProps | WithLogoProps;

export default function InterviewsRecommendedPrepStrategyPageTitleSection({
  description,
  themeBackgroundClass,
  title,
  features,
  longDescription,
  metadata,
  questions,
  overallProgress,
  ...props
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-4">
        <div className="flex items-center gap-3">
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'Recommended',
              description: 'Label for Recommended tag',
              id: 'baItxW',
            })}
            size="xs"
            variant="primary"
          />
          <OtherItemsDropdown sessions={sessions} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            addonPosition="start"
            icon={RiQuestionnaireLine}
            label={intl.formatMessage({
              defaultMessage: 'Contribute',
              description: 'Button label for contribute',
              id: 'j9eLks',
            })}
            size="xs"
            variant="tertiary"
          />
          <div
            className={clsx('h-3 w-px', 'bg-neutral-400 dark:bg-neutral-600')}
          />
          <CopyLinkButton href={metadata.href} size="xs" variant="tertiary" />
          <ShareButton metadata={metadata} size="xs" variant="tertiary" />
        </div>
      </div>

      <QuestionsLearningListPageTitleSection
        description={description}
        features={features}
        overallProgress={overallProgress}
        progressTrackingAvailableToNonPremiumUsers={true}
        questions={questions}
        themeBackgroundClass={themeBackgroundClass}
        title={title}
        {...props}
      />

      <Divider className="my-2 lg:my-0" />
      <div className={clsx('grid items-center gap-6 lg:grid-cols-12')}>
        <div className="lg:col-span-9">{longDescription}</div>
        <aside className="lg:col-span-3">
          <QuestionListingQuestionCount
            count={75}
            totalCount={75}
            variant="free"
          />
        </aside>
      </div>
    </div>
  );
}
