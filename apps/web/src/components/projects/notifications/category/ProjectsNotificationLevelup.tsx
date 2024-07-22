import clsx from 'clsx';
import { RiArrowUpLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import Text from '~/components/ui/Text';
import { themeBackgroundBrandColor } from '~/components/ui/theme';

import ProjectsTierUpIcon from './ProjectsTierUpIcon';
import type { ProjectsNotificationSubmissionLevelUpItemType } from '../types';
import { ProjectsReputationTierLabel } from '../../reputation/projectsReputationLevelUtils';

type Props = Readonly<{
  data: ProjectsNotificationSubmissionLevelUpItemType;
}>;

function ProjectsNotificationLevelupMessage({ data }: Props) {
  const { data: levelupData, createdAt } = data;

  const boldValue = (chunks: Array<React.ReactNode>) => (
    <Text color="secondary" size="body3" weight="bold">
      {chunks}
    </Text>
  );
  const timestamp = (
    <span>
      {`· `}
      <RelativeTimestamp timestamp={new Date(createdAt)} />
    </span>
  );

  if (levelupData.level) {
    return (
      <FormattedMessage
        defaultMessage="You've just attained <bold>level {level}</bold> ✨ Congratulations! {timestamp}"
        description="Notification for level up"
        id="gLXbQL"
        values={{
          bold: boldValue,
          level: levelupData.level,
          timestamp,
        }}
      />
    );
  }

  if (levelupData.tier) {
    return (
      <FormattedMessage
        defaultMessage="You're now in the <bold>{tier}</bold> tier! 🛠️  {timestamp}"
        description="Notification for tier up"
        id="8dzIfX"
        values={{
          bold: boldValue,
          tier: ProjectsReputationTierLabel[levelupData.tier],
          timestamp,
        }}
      />
    );
  }

  return null;
}

export default function ProjectsNotificationLevelUp({ data }: Props) {
  return (
    <div className="flex items-center gap-4">
      {data.data.level ? (
        <div
          className={clsx(
            'size-12',
            'rounded-full',
            'shrink-0',
            'flex items-center justify-center',
            themeBackgroundBrandColor,
          )}>
          <RiArrowUpLine className="size-6 text-white" />
        </div>
      ) : (
        <ProjectsTierUpIcon />
      )}
      <Text color="subtle" size="body3" weight="medium">
        <ProjectsNotificationLevelupMessage data={data} />
      </Text>
    </div>
  );
}
