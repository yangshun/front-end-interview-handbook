'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiQuestionFill } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsProfilePremiumChip from '~/components/projects/users/ProjectsProfilePremiumChip';
import Anchor from '~/components/ui/Anchor';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Img from '~/components/ui/Img';
import Text, { textVariants } from '~/components/ui/Text';
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

  const { data: submissions, isLoading } =
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
          'rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {submissions?.map((submission, index) => (
          <li
            key={submission.id}
            className={clsx(
              'relative isolate',
              'group flex',
              'py-4 pl-5 pr-8',
              themeBackgroundCardWhiteOnLightColor,
              themeBackgroundEmphasized_Hover,
              'transition-colors',
              index === 0 && 'rounded-t-lg',
              index === submissions.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex w-full items-center gap-4">
              <Img
                alt={submission.title}
                className="size-[90px] shrink-0 rounded object-cover"
                decoding="async"
                loading="lazy"
                src={submission.imgSrc}
              />
              <div className="flex w-full grow flex-col gap-3">
                <div className="flex flex-col gap-2 lg:gap-1">
                  <Anchor
                    className={textVariants({
                      className: 'z-[1] self-start',
                      size: 'body1',
                      weight: 'medium',
                    })}
                    href={submission.hrefs.detail}
                    variant="flat">
                    {submission.title}
                  </Anchor>
                  {submission.challenge && (
                    <Text color="secondary" size="body3">
                      <FormattedMessage
                        defaultMessage="Challenge: <link>{challengeTitle}</link>"
                        description="Link to brief for project challenge"
                        id="XyQeEv"
                        values={{
                          challengeTitle: submission.challenge.info.title,
                          link: (chunks) => (
                            <Anchor
                              className="relative z-[1]"
                              href={submission.challenge.metadata.href}>
                              {chunks}
                            </Anchor>
                          ),
                        }}
                      />
                    </Text>
                  )}
                </div>
                <div className="flex gap-3 lg:gap-4">
                  {submission.projectsProfile?.userProfile && (
                    <div className="z-[1] flex items-center gap-1.5 lg:gap-2">
                      <UserAvatar
                        size="xs"
                        userProfile={submission.projectsProfile.userProfile}
                      />
                      <Text size="body3" weight="medium">
                        <ProjectsProfileDisplayNameLink
                          color="subtitle"
                          userProfile={submission.projectsProfile.userProfile}
                        />
                      </Text>
                      {submission.projectsProfile?.premium && (
                        <ProjectsProfilePremiumChip />
                      )}
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
            <Anchor
              aria-label={submission.title}
              className="absolute inset-0"
              href={submission.hrefs.detail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
