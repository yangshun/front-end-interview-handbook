import clsx from 'clsx';
import { RiArrowRightSLine, RiBookOpenLine } from 'react-icons/ri';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundChipColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeTextBrandColor,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import InterviewsDashboardCreateAccountCard from './InterviewsDashboardCreateAccountCard';

export default function InterviewsDashboardPageHeader() {
  const { userProfile } = useUserProfile();

  return (
    <div className="grid grid-cols-1 items-stretch justify-between gap-4 sm:flex sm:flex-row">
      <Heading level="heading5">
        {userProfile != null ? (
          <FormattedMessage
            defaultMessage="Welcome back!"
            description="Message greeting the user on preparation dashboard page"
            id="w1Jqfl"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Preparation dashboard"
            description="Preparation dashboard section title"
            id="r0Ddhm"
          />
        )}
      </Heading>
      {userProfile != null ? (
        <div
          className={clsx(
            'group relative inline-flex shrink items-center justify-between gap-2 px-4 py-3',
            'border border-neutral-200 dark:border-transparent',
            'rounded-lg',
            'transition-colors',
            themeBackgroundCardColor,
            themeBackgroundElementEmphasizedStateColor_Hover,
          )}>
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className={clsx(
                'size-10 flex shrink-0 items-center justify-center rounded-md',
                themeBackgroundChipColor,
              )}>
              <RiBookOpenLine
                className={clsx('size-5', themeTextSecondaryColor)}
              />
            </div>
            <Anchor href="/front-end-interview-guidebook" variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Text className="block" color="subtitle" size="body3">
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
                      <span
                        className={clsx(
                          'whitespace-nowrap font-semibold',
                          themeTextBrandColor,
                        )}>
                        {chunk}
                      </span>
                    ),
                  }}
                />
              </Text>
            </Anchor>
          </div>
          <RiArrowRightSLine
            className={clsx(
              'size-6 shrink-0 text-neutral-500 dark:text-neutral-400',
              themeTextBrandColor_GroupHover,
            )}
          />
        </div>
      ) : (
        <InterviewsDashboardCreateAccountCard />
      )}
    </div>
  );
}
