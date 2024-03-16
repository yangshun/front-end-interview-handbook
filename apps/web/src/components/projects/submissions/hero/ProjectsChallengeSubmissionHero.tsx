import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { RiArrowLeftLine, RiMessage2Fill, RiPencilLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'usehooks-ts';

import FilterButton from '~/components/common/FilterButton';
import MarketingHeroBackground from '~/components/marketing/MarketingHeroBackground';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsChallengeSubmissionHeroCard from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroCard';
import ProjectsChallengeSubmissionHeroPinButton from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroPinButton';
import ProjectsChallengeSubmissionHeroTimestamp from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroTimestamp';
import ProjectsChallengeSubmissionHeroViews from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroViews';
import ProjectsChallengeSubmissionHeroVoteButton from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroVoteButton';
import type { ProjectsChallengeSubmissionAugmented } from '~/components/projects/submissions/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isParentInView: boolean;
  isViewerPremium: boolean;
  isViewingOwnSubmission?: boolean;
  onScrollToDiscussionsButtonClick?: () => void;
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionHero({
  challenge,
  submission,
  isViewingOwnSubmission = false,
  isParentInView,
  isViewerPremium,
  onScrollToDiscussionsButtonClick,
}: Props) {
  const intl = useIntl();
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');
  const heroRef = useRef<HTMLDivElement>(null);
  const mobileHeroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const isHeroMobileInView = useInView(mobileHeroRef);
  const showStickyActionBar =
    isParentInView && !(isMobileAndBelow ? isHeroMobileInView : isHeroInView);

  const backButton = (
    <Button
      addonPosition="start"
      className="-ml-4"
      href="/projects/submissions"
      icon={RiArrowLeftLine}
      label={intl.formatMessage({
        defaultMessage: 'Back to all submissions',
        description: 'Label to go back to submissions page',
        id: '3T7UDC',
      })}
      size="sm"
      variant="tertiary"
    />
  );

  const editButton = (
    <Button
      href={submission.hrefs.edit}
      icon={RiPencilLine}
      label={intl.formatMessage({
        defaultMessage: 'Edit',
        description: 'Edit button label',
        id: '2rcoOT',
      })}
      size="sm"
      variant="secondary"
    />
  );

  const pinButton = (
    <ProjectsChallengeSubmissionHeroPinButton
      projectsProfile={submission.projectsProfile}
      submissionId={submission.id}
    />
  );

  const voteButton = (
    <ProjectsChallengeSubmissionHeroVoteButton
      submissionId={submission.id}
      votes={submission._count.votes}
    />
  );

  const commentButton = (
    <FilterButton
      icon={RiMessage2Fill}
      label={String(submission.comments ?? 0)}
      purpose="button"
      onClick={onScrollToDiscussionsButtonClick}
    />
  );

  const views = (
    <ProjectsChallengeSubmissionHeroViews views={submission.views} />
  );

  return (
    <>
      {/* Sticky action bar */}
      <div
        className={clsx(
          'z-sticky sticky top-0 hidden',
          'py-4',
          ['border-b', themeBorderColor],
          themeBackgroundColor,
          showStickyActionBar && '!block',
        )}>
        <div className="flex items-center gap-4">
          <Text className="flex-1 truncate" size="body1" weight="bold">
            {submission.title}
          </Text>
          <div className="flex gap-4">
            {views}
            <div className="flex w-full gap-3">
              {voteButton}
              {commentButton}
            </div>
          </div>
        </div>
      </div>
      <div ref={heroRef} className="relative hidden md:block">
        <div
          aria-hidden="true"
          className={clsx(
            'flex justify-center',
            '-my-28 h-[calc(100%_+_112px)] w-full',
            'absolute -z-10',
            'pointer-events-none overflow-hidden rounded-b-2xl',
          )}>
          <MarketingHeroBackground className="h-full min-w-[1200px]" />
        </div>
        <div className="relative h-full pb-8 pt-5 sm:pb-16 md:px-8 md:pb-8 md:pt-12">
          <div className="flex h-full flex-col items-start justify-between gap-2">
            <div className="flex w-full justify-between gap-2">
              {backButton}
              {isViewingOwnSubmission && (
                <div className="flex items-center gap-2">
                  {pinButton}
                  {editButton}
                </div>
              )}
            </div>
            <div className="size-full flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-1">
                <ProjectsChallengeSubmissionHeroTimestamp
                  submission={submission}
                />
                <div className="flex flex-col gap-5">
                  <Heading level="heading4">{submission.title}</Heading>
                  <div className="flex items-center gap-6">
                    {views}
                    <div className="flex items-center gap-2">
                      {voteButton}
                      {commentButton}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-7">
                <ProjectsChallengeSubmissionHeroCard
                  challenge={challenge}
                  isViewerPremium={isViewerPremium}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-6 md:hidden">
        <div ref={mobileHeroRef} className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-between gap-4">
            {backButton}
            {isViewingOwnSubmission && pinButton}
          </div>
          <div className="flex flex-col gap-4">
            <ProjectsChallengeSubmissionHeroTimestamp submission={submission} />
            <Heading level="heading5">{submission.title}</Heading>

            <div className="flex gap-4">
              {views}
              {voteButton}
              {commentButton}
            </div>
          </div>
        </div>
        <ProjectsChallengeSubmissionHeroCard
          challenge={challenge}
          isViewerPremium={isViewerPremium}
        />
      </div>
    </>
  );
}
