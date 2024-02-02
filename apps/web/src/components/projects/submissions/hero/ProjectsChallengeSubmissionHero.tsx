import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'usehooks-ts';

import MarketingHeroBackground from '~/components/common/marketing/MarketingHeroBackground';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsChallengeSubmissionHeroCommentButton from '~/components/projects/submissions//hero/ProjectsChallengeSubmissionHeroCommentButton';
import ProjectsChallengeSubmissionHeroCard from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroCard';
import ProjectsChallengeSubmissionHeroPinButton from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroPinButton';
import ProjectsChallengeSubmissionHeroTimestamp from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroTimestamp';
import ProjectsChallengeSubmissionHeroViews from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroViews';
import ProjectsChallengeSubmissionHeroVoteButton from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroVoteButton';
import type { ProjectsChallengeSubmissionAugmented } from '~/components/projects/submissions/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isParentInView: boolean;
  isViewingOwnSubmission?: boolean;
  onScrollToDiscussionsButtonClick: () => void;
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionHero({
  challenge,
  submission,
  isViewingOwnSubmission = false,
  isParentInView,
  onScrollToDiscussionsButtonClick,
}: Props) {
  const intl = useIntl();
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');
  const heroRef = useRef<HTMLDivElement>(null);
  const parentWidthRef = useRef<HTMLDivElement>(null);
  const mobileHeroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const isHeroMobileInView = useInView(mobileHeroRef);
  const [width, setWidth] = useState({ main: 0, parent: 0 });

  const showStickyActionBar =
    isParentInView && !(isMobileAndBelow ? isHeroMobileInView : isHeroInView);

  const sideMargin = (width.parent - width.main) / 2;

  // To calculate the sticky action bar full width
  useEffect(() => {
    const moveOnWindowResize = () => {
      setWidth({
        main:
          (isMobileAndBelow
            ? mobileHeroRef.current?.offsetWidth
            : heroRef.current?.offsetWidth) ?? 0,
        parent: parentWidthRef.current?.offsetWidth ?? 0,
      });
    };

    window.addEventListener('resize', moveOnWindowResize);

    return () => window.removeEventListener('resize', moveOnWindowResize);
  });
  useEffect(() => {
    setWidth({
      main:
        (isMobileAndBelow
          ? mobileHeroRef.current?.offsetWidth
          : heroRef.current?.offsetWidth) ?? 0,
      parent: parentWidthRef.current?.offsetWidth ?? 0,
    });
  }, [heroRef, parentWidthRef, mobileHeroRef, isMobileAndBelow]);

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
      label={intl.formatMessage({
        defaultMessage: 'Edit submission',
        description: 'Button to edit project submission',
        id: '1m0p3c',
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
    <ProjectsChallengeSubmissionHeroCommentButton
      comments={submission.comments ?? 0}
      onClick={onScrollToDiscussionsButtonClick}
    />
  );

  const views = (
    <ProjectsChallengeSubmissionHeroViews views={submission.views} />
  );

  return (
    <>
      {/* To calculate the width of the parent element */}
      <div
        ref={parentWidthRef}
        className="absolute top-0 left-0 right-0 -z-1"
      />
      {/* Sticky action bar */}
      <div
        className={clsx(
          'sticky top-0 z-30 py-4 border-b hidden',
          themeBorderColor,
          themeBackgroundColor,
          showStickyActionBar && '!block',
        )}
        style={{
          marginLeft: `-${sideMargin}px`,
          marginRight: `-${sideMargin}px`,
        }}>
        <Container className="flex md:flex-row flex-col items-center">
          <Text className="flex-1" weight="medium">
            {submission.title}
          </Text>
          <div className="flex gap-4">
            {views}
            <div className="flex gap-3 w-full">
              {voteButton}
              {commentButton}
            </div>
          </div>
        </Container>
      </div>
      <div ref={heroRef} className="relative md:block hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 -mb-28 -mt-28 flex h-[calc(100%_+_112px)] w-full justify-center overflow-hidden rounded-b-[16px]">
          <MarketingHeroBackground className="h-full min-w-[1200px]" />
        </div>
        <div className="relative pb-8 pt-5 sm:pb-16 md:pt-12 md:pb-8 md:px-8 h-full">
          <div className="flex flex-col justify-between items-start h-full gap-2">
            <div className="flex gap-2 justify-between w-full">
              {backButton}
              {isViewingOwnSubmission && (
                <div className="flex gap-2 items-center">
                  {pinButton}
                  {editButton}
                </div>
              )}
            </div>
            <div className="flex lg:flex-row flex-col gap-2 h-full justify-between w-full lg:items-center">
              <div className="flex flex-col gap-1">
                <ProjectsChallengeSubmissionHeroTimestamp
                  submission={submission}
                />
                <div className="flex flex-col gap-5">
                  <Heading level="heading4">{submission.title}</Heading>
                  <div className="flex gap-6 items-center">
                    {views}
                    <div className="flex items-center gap-2">
                      {voteButton}
                      {commentButton}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[29px]">
                <ProjectsChallengeSubmissionHeroCard challenge={challenge} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-6 md:hidden">
        <div ref={mobileHeroRef} className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 justify-between">
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
        <ProjectsChallengeSubmissionHeroCard challenge={challenge} />
      </div>
    </>
  );
}
