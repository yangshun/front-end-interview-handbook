import clsx from 'clsx';
import { RiArrowRightSLine, RiBookOpenLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeCardBackgroundColor,
  themeGradientBlueGreen,
  themeGradientGreenYellow,
  themeLineBackgroundColor,
  themeTextBrandGroupHoverColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import QuestionsContinueLearning from '../../dashboard/QuestionsContinueLearning';

// TODO: i18n
function ContinueLearningCard() {
  return (
    <QuestionsContinueLearning
      hideHeading={true}
      items={[
        {
          completedCount: 24,
          durationMins: 92,
          gradient: themeGradientBlueGreen,
          href: '/',
          questionsCount: 47,
          reverseGradient: true,
          title: 'Data Structure and Algorithms',
        },
        {
          completedCount: 24,
          durationMins: 92,
          gradient: themeGradientGreenYellow,
          href: '/',
          questionsCount: 50,
          reverseGradient: true,
          title: 'Forms',
        },
      ]}
    />
  );
}

export default function QuestionPreparationPageHeader() {
  const { userProfile } = useUserProfile();

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row">
      <div className="grid gap-y-6">
        <Heading level="heading5">
          {userProfile != null ? (
            <FormattedMessage
              defaultMessage="Welcome back"
              description="Message greeting the user on preparation dashboard page"
              id="30t9g2"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Preparation dashboard"
              description="Preparation dashboard section title"
              id="r0Ddhm"
            />
          )}
        </Heading>
      </div>
      {userProfile != null ? (
        <div
          className={clsx(
            'group relative inline-flex shrink items-center justify-between gap-2 py-3 px-4',
            'border border-neutral-200 dark:border-transparent',
            'rounded-lg',
            'transition-colors',
            themeCardBackgroundColor,
            themeBackgroundEmphasizedHover,
          )}>
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className={clsx(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-md',
                themeLineBackgroundColor,
              )}>
              <RiBookOpenLine
                className={clsx('h-5 w-5', themeTextSecondaryColor)}
              />
            </div>
            <Anchor href="/front-end-interview-guidebook" variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Text color="subtitle" display="block" size="body3">
                <p className="whitespace-nowrap">
                  <FormattedMessage
                    defaultMessage="First time preparing for front end interviews?"
                    description="Link to front end interview guidebook"
                    id="qarlYe"
                  />
                </p>
                <FormattedMessage
                  defaultMessage="Read our <link>Front End Interview Guidebook</link>"
                  description="Link to front end interview guidebook"
                  id="/F80kH"
                  values={{
                    link: (chunk) => (
                      <Anchor
                        className="whitespace-nowrap font-semibold"
                        href="/front-end-interview-guidebook">
                        {chunk}
                      </Anchor>
                    ),
                  }}
                />
              </Text>
            </Anchor>
          </div>
          <RiArrowRightSLine
            className={clsx(
              'h-6 w-6 shrink-0 text-neutral-500 dark:text-neutral-400',
              themeTextBrandGroupHoverColor,
            )}
          />
        </div>
      ) : (
        <div
          className={clsx(
            'group relative flex',
            'border border-neutral-200 dark:border-transparent',
            'overflow-hidden rounded-lg',
            themeCardBackgroundColor,
            themeBackgroundEmphasizedHover,
          )}>
          <div
            className={clsx(
              'relative h-full w-36 overflow-hidden',
              'bg-neutral-200/70 dark:bg-neutral-900',
            )}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[650px] origin-top-left scale-[0.4] p-2">
              <ContinueLearningCard />
            </div>
            <div className="absolute h-full w-full bg-gradient-to-t from-neutral-200/70 dark:from-neutral-900" />
          </div>
          <div className="flex items-center p-4">
            <Anchor href="/sign-up" variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Text className="sm:max-w-[158px]" display="block" size="body3">
                <FormattedMessage
                  defaultMessage="Create a free account to track your progress"
                  description="CTA to create a free account for non-logged in users"
                  id="Lh00HQ"
                />
              </Text>
            </Anchor>
            <RiArrowRightSLine
              className={clsx(
                'h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400',
                themeTextBrandGroupHoverColor,
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
