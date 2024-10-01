import clsx from 'clsx';
import {
  RiArrowUpLine,
  RiCheckboxMultipleLine,
  RiFireLine,
} from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import ProjectsChallengeSubmissionSuccessBadge from './ProjectsChallengeSubmissionSuccessBadge';
import type { BadgeItem } from './ProjectsChallengeSubmissionSuccessPageImpl';
import type { ProjectsSkillGroupType } from '../../skills/data/ProjectsSkillIcons';
import { ProjectsSkillIcons } from '../../skills/data/ProjectsSkillIcons';

const MAX_COLS_LG = 4;
const MAX_COLS_MD = 3;
const MAX_COLS_SM = 2;

type Props = Readonly<{
  badgeList: Array<BadgeItem>;
  challengeNumber: number;
  submissionUrl: string;
}>;

export default function ProjectsChallengeSubmissionSuccessHero({
  submissionUrl,
  badgeList,
  challengeNumber,
}: Props) {
  const intl = useIntl();

  const smCols =
    badgeList.length > MAX_COLS_SM ? MAX_COLS_SM : badgeList.length;

  const mdCols =
    badgeList.length > MAX_COLS_MD ? MAX_COLS_MD : badgeList.length;

  const lgCols =
    badgeList.length > MAX_COLS_LG ? MAX_COLS_LG : badgeList.length;

  return (
    <div className="flex flex-col items-center gap-12">
      <div
        className={clsx(
          'grid w-full place-content-center gap-y-10 md:w-auto',
          `grid-cols-${smCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols}`,
        )}>
        {badgeList
          .map(({ type, data: { parentKey, key, label } }) => {
            if (type === 'leveled-up') {
              return (
                <ProjectsChallengeSubmissionSuccessBadge
                  key={key}
                  icon={RiArrowUpLine}
                  subTitle={intl.formatMessage({
                    defaultMessage: 'Level up',
                    description: 'Subtext for level Up',
                    id: 'DTW1x3',
                  })}
                  title={intl.formatMessage(
                    {
                      defaultMessage: 'Level {level}',
                      description: 'Title for level Up',
                      id: 'qFJskj',
                    },
                    {
                      level: new Intl.NumberFormat().format(label as number),
                    },
                  )}
                />
              );
            }

            if (type === 'reputation') {
              return (
                <ProjectsChallengeSubmissionSuccessBadge
                  key={key}
                  icon={RiFireLine}
                  subTitle={intl.formatMessage({
                    defaultMessage: 'Reputation',
                    description: 'Subtext for Reputation Reputation',
                    id: 'alG3Yi',
                  })}
                  title={intl.formatMessage(
                    {
                      defaultMessage: '+{reputation}',
                      description: 'Title for level Up',
                      id: 'SgTflO',
                    },
                    {
                      reputation: new Intl.NumberFormat().format(
                        label as number,
                      ),
                    },
                  )}
                />
              );
            }

            if (type === 'skill') {
              return (
                <ProjectsChallengeSubmissionSuccessBadge
                  key={key}
                  icon={ProjectsSkillIcons[parentKey as ProjectsSkillGroupType]}
                  subTitle={intl.formatMessage({
                    defaultMessage: 'Skill plan completed',
                    description: 'Subtext for skill plan completed',
                    id: '3d2VAC',
                  })}
                  title={label as string}
                />
              );
            }

            if (type === 'track') {
              return (
                <ProjectsChallengeSubmissionSuccessBadge
                  key={key}
                  icon={RiCheckboxMultipleLine}
                  subTitle={intl.formatMessage({
                    defaultMessage: 'Track completed',
                    description: 'Subtext for track completed',
                    id: 'aCjI8I',
                  })}
                  title={label as string}
                />
              );
            }
          })
          .filter(Boolean)}
      </div>

      <div className="flex max-w-lg flex-col items-center gap-6">
        <Heading className="text-center" level="heading4">
          <FormattedMessage
            defaultMessage="You've conquered {challengeNumber, plural, one {# challenge} other {# challenges}}! 🌟"
            description="Title for the project submission success page"
            id="dqSf6I"
            values={{
              challengeNumber,
            }}
          />
        </Heading>
        <Text className="px-5 text-center" color="secondary" size="body1">
          <FormattedMessage
            defaultMessage="Your submission is successful and now available for community code reviews"
            description="Description for the project submission success page"
            id="xJJGlf"
          />
        </Text>
        <Button
          href={submissionUrl}
          label={intl.formatMessage({
            defaultMessage: 'View your submission',
            description:
              'Label for View your submission button on project submit page',
            id: 'Geiogi',
          })}
          size="lg"
          variant="primary"
        />
      </div>
    </div>
  );
}
