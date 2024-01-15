import clsx from 'clsx';
import { startCase } from 'lodash-es';
import {
  RiArrowRightLine,
  RiCheckLine,
  RiCircleFill,
  RiFlashlightLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'usehooks-ts';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsComponentTrackTag from '~/components/projects/stats/ProjectsComponentTrackTag';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundLayerColor,
  themeGlassyBorder,
  themeTextFaintColor,
} from '~/components/ui/theme';

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
        !isMobileAndBelow && themeBackgroundColor,
        isMobileAndBelow && themeBackgroundLayerColor,
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
              {status != null && (
                <>
                  {status === 'IN_PROGRESS' && (
                    <Badge
                      icon={RiCircleFill}
                      label={intl.formatMessage({
                        defaultMessage: 'In progress',
                        description: 'Project in progress label',
                        id: 'nsk8M8',
                      })}
                      size="sm"
                      variant="warning"
                    />
                  )}
                  {status === 'COMPLETED' && (
                    <Badge
                      icon={RiCheckLine}
                      label={intl.formatMessage({
                        defaultMessage: 'Completed',
                        description: 'Project completed label',
                        id: 'YY7lXv',
                      })}
                      size="sm"
                      variant="success"
                    />
                  )}
                </>
              )}
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
          <Text size="body0">{title}</Text>
          <Text className="line-clamp-3" size="body3">
            {description}
          </Text>
          <div className="flex items-center gap-4">
            <Badge
              className="!bg-transparent border-none !p-0"
              icon={RiFlashlightLine}
              iconClassName="!text-neutral-500 dark:!text-neutral-500"
              label={startCase(difficulty)}
              variant="success"
            />
            <ProjectsComponentTrackTag track={track} />
          </div>
        </div>
      </Anchor>
    </div>
  );
}
