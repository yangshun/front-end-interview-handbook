'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiQuestionFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsProfileDisplayNameLink from '../users/ProjectsProfileDisplayNameLink';

const limit = 4;

export default function ProjectsDashboardTrendingSubmissionsSection() {
  const intl = useIntl();

  const { isLoading, data: submissions } =
    trpc.projects.submissions.listLatest.useQuery({
      limit,
    });

  if (isLoading || submissions?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between">
        <div className="flex items-center gap-2.5">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Trending user submissions"
              description="Title for Trending submissions section on Projects dashboard page"
              id="qVn8Yq"
            />
          </Heading>
          <Tooltip
            label={intl.formatMessage({
              defaultMessage:
                'We recommend quality submissions from more senior engineers using a similar tech stack to you, or tech stack you expressed interest in learning',
              description:
                'Tooltip label for Trending submissions section on Projects dashboard page',
              id: 'XMHcvt',
            })}>
            <RiQuestionFill className="size-4 text-neutral-400 dark:text-neutral-500" />
          </Tooltip>
        </div>
        <Button
          className="-my-1 -mr-4"
          href="/projects/submissions"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'See all',
            description: 'Link to see all submissions',
            id: 'Fgr6w/',
          })}
          variant="tertiary"
        />
      </div>
      <ul
        className={clsx(
          'isolate rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {submissions?.map((submission, index) => (
          <li
            key={submission.id}
            className={clsx(
              'group relative flex py-4 pl-5 pr-8',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              themeBackgroundCardWhiteOnLightColor,
              'transition-colors',
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === submissions.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex w-full gap-4 lg:items-center">
              <div className="bg-red h-[90px] w-[90px] shrink-0 rounded" />
              <div className="flex w-full grow flex-col gap-3">
                <div className="flex flex-col gap-2 lg:gap-1">
                  <Text size="body1" weight="medium">
                    <Anchor href={submission.hrefs.detail} variant="unstyled">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {submission.title}
                    </Anchor>
                  </Text>
                  {submission.challenge && (
                    <Text color="secondary" size="body3">
                      <FormattedMessage
                        defaultMessage="Brief: <link>{briefDescription}</link>"
                        description="Link to brief for project submission"
                        id="BgJH+X"
                        values={{
                          briefDescription: submission.challenge.metadata.title,
                          link: (chunks) => (
                            <Anchor
                              className="relative"
                              href={submission.challenge.metadata.href}>
                              {chunks}
                            </Anchor>
                          ),
                        }}
                      />
                    </Text>
                  )}
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
                  {submission.projectsProfile?.userProfile && (
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <UserAvatar
                        className="border border-green-400"
                        profile={submission.projectsProfile.userProfile}
                        size="xs"
                      />
                      <Text className="z-10" size="body3" weight="medium">
                        <ProjectsProfileDisplayNameLink
                          profile={submission.projectsProfile.userProfile}
                        />
                      </Text>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    {submission._count.votes > 0 && (
                      <Text color="subtitle" size="body3">
                        <FormattedMessage
                          defaultMessage="{upvoteCount, plural, =0 {No upvotes} one {# upvote} other {# upvotes}}"
                          description="Number of upvotes for project submission"
                          id="4g6SOx"
                          values={{
                            upvoteCount: submission._count.votes,
                          }}
                        />
                      </Text>
                    )}
                    {(submission?.comments ?? 0) > 0 && (
                      <Text color="subtitle" size="body3">
                        <FormattedMessage
                          defaultMessage="{commentsCount, plural, =0 {No comments} one {# comment} other {# comments}}"
                          description="Number of comments for project submission"
                          id="6zZ5vj"
                          values={{
                            commentsCount: submission.comments ?? 0,
                          }}
                        />
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <RiArrowRightLine
                  aria-hidden="true"
                  className={clsx(
                    'size-6 shrink-0',
                    themeTextFaintColor,
                    themeTextBrandColor_GroupHover,
                  )}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
