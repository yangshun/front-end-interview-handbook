import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'usehooks-ts';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsComponentTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundLayerColor,
  themeGlassyBorder,
  themeTextFaintColor,
} from '~/components/ui/theme';

import ProjectsChallengeStatusBadge from '../../challenges/status/ProjectsChallengeStatusBadge';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeSubmissionHeroCard({
  challenge,
}: Props) {
  const intl = useIntl();
  const { metadata, status, track } = challenge;
  const { title, difficulty, description, href } = metadata;
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');

  return (
    <div
      className={clsx(
        'md:w-[436px] w-full px-4 py-6 rounded-lg group relative',
        themeGlassyBorder,
        isMobileAndBelow ? themeBackgroundLayerColor : themeBackgroundColor,
      )}>
      <Anchor href={href} variant="unstyled">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Text color="secondary" size="body2">
                {intl.formatMessage({
                  defaultMessage: 'Challenge brief',
                  description: 'Projects challenge submission hero card title',
                  id: '/BGC+5',
                })}
              </Text>
              <ProjectsChallengeStatusBadge status={status} />
            </div>
            <RiArrowRightLine
              aria-hidden={true}
              className={clsx(
                'h-5 w-5 shrink-0',
                themeTextFaintColor,
                'group-hover:text-brand dark:group-hover:text-brand',
              )}
            />
          </div>
          <Text size="body0" weight="bold">
            {title}
          </Text>
          <Text className="line-clamp-3" color="subtitle" size="body3">
            {description}
          </Text>
          <div className="flex items-center gap-4">
            <ProjectsChallengeDifficultyTag difficulty={difficulty} />
            <ProjectsComponentTrackTag track={track} />
          </div>
        </div>
      </Anchor>
    </div>
  );
}
