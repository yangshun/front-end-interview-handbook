import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiCheckFill,
  RiFlaskLine,
  RiVerifiedBadgeLine,
  RiWindowLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import PreparationGFE75Logo from '~/data/plans/logo/PreparationGFE75Logo';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from '~/components/ui/DropdownMenu/dropdownStyles';
import Heading from '~/components/ui/Heading';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextColor,
  themeTextFainterColor,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import QuestionsListSession from './QuestionsListSession';
import QuestionListingQuestionCount from '../stats/QuestionListingQuestionCount';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type Props = Readonly<{
  description?: ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  themeBackgroundClass: string;
  title: string;
}>;

function OtherItemsDropdown() {
  // TODO(interviews-revamp): Recheck the data and need to add completed status to the chip
  const items = [
    {
      href: '/front-end-interview-guidebook',
      isCompleted: false,
      label: 'Front End Interview Guide',
    },
    {
      href: '/interviews/greatfrontend75',
      isCompleted: false,
      label: 'GFE 75',
    },
    {
      href: '/interviews/blind75',
      isCompleted: false,
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

export default function QuestionsGFE75TitleSection({
  description,
  themeBackgroundClass,
  title,
}: Props) {
  const intl = useIntl();
  const { setShowFeedbackWidget } = useUserPreferences();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);

  const features = [
    {
      icon: RiWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for interviews questions',
        id: 'qZTabX',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions',
        description: 'Features for interviews questions',
        id: 'l+NV6Y',
      }),
    },
    {
      icon: RiFlaskLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for interviews questions',
        id: 'CZJo2K',
      }),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
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
        <OtherItemsDropdown />
      </div>

      <div className="flex flex-col justify-between gap-x-8 gap-y-4 md:flex-row">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <PreparationGFE75Logo />
            <Heading className={themeTextColor} color="custom" level="heading4">
              {title}
            </Heading>
          </div>

          <div className="flex flex-col gap-10">
            <Text color="subtitle" size="body1" weight="medium">
              {description}
            </Text>

            {/* Features */}
            <div className={clsx('flex flex-wrap items-center gap-6')}>
              {features.map(({ icon: FeatureIcon, label }, index) => (
                <div key={label} className={clsx('flex items-center gap-6')}>
                  <div className={clsx('flex items-center gap-2')}>
                    <FeatureIcon
                      className={clsx('size-5', themeTextSubtitleColor)}
                    />
                    <Text color="secondary" size="body2" weight="medium">
                      {label}
                    </Text>
                  </div>
                  {index + 1 !== features.length && (
                    <div
                      className={clsx(
                        'h-3 w-px',
                        'bg-neutral-400 dark:bg-neutral-600',
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start/End Session */}
        <QuestionsListSession
          progressTrackingAvailableToNonPremiumUsers={false}
          questionCount={75}
          questionListKey="greatfrontend75"
          themeBackgroundClass={themeBackgroundClass}
        />
      </div>
      <Divider className="my-2 lg:my-0" />
      <div className={clsx('grid items-center gap-6 lg:grid-cols-12')}>
        <div className="flex flex-col gap-4 lg:col-span-9">
          <Text color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="The smallest list of practice questions that gets you the most mileage in your preparation. Covers the most commonly asked front end interview topics."
              description="Description for GFE75 page"
              id="5jNSb2"
            />
          </Text>
          <Text color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="Created with the expertise of senior to staff front end interviewers from some of the top companies in the world. <button>Have a suggestion?</button>"
              description="Description for GFE75 page"
              id="L2J7Pv"
              values={{
                button: (chunks) => (
                  <button
                    className={clsx(
                      textVariants({ color: 'active', size: 'body1' }),
                      themeOutlineElementBrandColor_FocusVisible,
                    )}
                    type="button"
                    onClick={() => setIsOpenFeedback(true)}>
                    {chunks}
                  </button>
                ),
              }}
            />
          </Text>
        </div>
        <aside className="lg:col-span-3">
          <QuestionListingQuestionCount
            count={75}
            totalCount={75}
            variant="free"
          />
        </aside>
      </div>

      <FeedbackDialog
        isShown={isOpenFeedback}
        onClose={() => setIsOpenFeedback(false)}
        onHideWidgetForSession={() => {
          setShowFeedbackWidget(false);
        }}
      />
    </div>
  );
}
