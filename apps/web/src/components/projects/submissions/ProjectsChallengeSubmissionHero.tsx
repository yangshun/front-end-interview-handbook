import { RiArrowLeftLine } from 'react-icons/ri';

import MarketingHeroBackground from '~/components/common/marketing/MarketingHeroBackground';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsChallengeSubmissionHeroCommentButton from '~/components/projects/submissions//hero/ProjectsChallengeSubmissionHeroCommentButton';
import ProjectsChallengeSubmissionHeroLikeButton from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroLikeButton';
import ProjectsChallengeSubmissionHeroPinButton from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroPinButton';
import ProjectsChallengeSubmissionHeroTimestamp from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHeroTimestamp';
import ProjectsChallengeSubmissionHeroCard from '~/components/projects/submissions/ProjectsChallengeSubmissionHeroCard';
import type { ProjectsChallengeSubmissionItem } from '~/components/projects/submissions/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import ProjectsChallengeSubmissionHeroViews from './hero/ProjectsChallengeSubmissionHeroViews';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  showPin: boolean;
  submission: ProjectsChallengeSubmissionItem;
}>;

export default function ProjectsChallengeSubmissionHero({
  challenge,
  submission,
  showPin = false,
}: Props) {
  return (
    <>
      <div className="relative md:block hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 -mb-28 -mt-28 flex h-[calc(100%_+_112px)] w-full justify-center overflow-hidden rounded-b-[16px]">
          <MarketingHeroBackground className="h-full  min-w-[1200px]" />
        </div>
        <div className="relative pb-8 pt-5 sm:pb-16 md:pt-12 md:pb-8 md:px-8 h-full">
          <div className="flex flex-col justify-between items-start h-full gap-2">
            <div className="flex gap-2 justify-between w-full">
              <Button
                addonPosition="start"
                className="-ml-4"
                icon={RiArrowLeftLine}
                label="Back to all submissions"
                size="sm"
                variant="tertiary"
              />
              {showPin && (
                <div>
                  <ProjectsChallengeSubmissionHeroPinButton />
                </div>
              )}
            </div>
            <div className="flex lg:flex-row flex-col gap-2 h-full justify-between w-full lg:items-center">
              <div className="flex flex-col gap-1">
                <ProjectsChallengeSubmissionHeroTimestamp />
                <div className="flex flex-col gap-5">
                  <Heading level="heading4">{submission.title}</Heading>
                  <div className="flex gap-6 items-center">
                    <ProjectsChallengeSubmissionHeroViews
                      views={submission.views}
                    />
                    <div className="flex items-center gap-2">
                      <ProjectsChallengeSubmissionHeroLikeButton
                        votes={submission.votes}
                      />
                      <ProjectsChallengeSubmissionHeroCommentButton
                        comments={submission.comments}
                      />
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
      <div className="mt-6 flex flex-col gap-10 md:hidden">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 justify-between">
            <Button
              addonPosition="start"
              className="-ml-4"
              icon={RiArrowLeftLine}
              label="Back to all submissions"
              size="sm"
              variant="tertiary"
            />
            {showPin && <ProjectsChallengeSubmissionHeroPinButton />}
          </div>
          <div className="flex flex-col gap-4">
            <ProjectsChallengeSubmissionHeroTimestamp />
            <Heading level="heading5">{submission.title}</Heading>
            <div className="flex gap-4">
              <ProjectsChallengeSubmissionHeroViews views={submission.views} />
              <ProjectsChallengeSubmissionHeroLikeButton
                votes={submission.votes}
              />
              <ProjectsChallengeSubmissionHeroCommentButton
                comments={submission.comments}
              />
            </div>
          </div>
        </div>
        <ProjectsChallengeSubmissionHeroCard challenge={challenge} />
      </div>
    </>
  );
}
