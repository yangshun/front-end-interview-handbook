import { RiArrowRightLine } from 'react-icons/ri';

import { PROJECT_ACTIVATION_AVAILABLE } from '~/data/FeatureFlags';

import Timer from '~/components/countdown/Timer';
import useCountdownTimer from '~/components/countdown/useCountdownTimer';
import ProjectsLogo from '~/components/global/logos/ProjectsLogo';
import type { BadgeVariant } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import Ticket from '../tickets/Ticket';
import MysteryProductLogo from '../../global/logos/MysteryProductLogo';

type Props = Readonly<{
  height?: number;
  width?: number;
}>;

const LAUNCH_DATE = new Date('Apr 22 2024 14:00:00');

export default function ComingSoonTicket({ height, width }: Props) {
  const { days, hours, minutes, seconds, finished } =
    useCountdownTimer(LAUNCH_DATE);

  const label = finished ? 'Launched' : 'Upcoming';
  const badgeVariant: BadgeVariant = finished ? 'success' : 'warning';

  return (
    <Ticket height={height} padding="sm" ratio="wide" width={width}>
      <div className="grid place-items-start gap-5">
        <div className="flex w-full items-center justify-between gap-2">
          {finished ? (
            <ProjectsLogo height={24} />
          ) : (
            <MysteryProductLogo height={24} />
          )}
          <Badge label={label} size="sm" variant={badgeVariant} />
        </div>
        {finished ? (
          PROJECT_ACTIVATION_AVAILABLE ? (
            // TODO(projects): Need to redirect to activation when click this button
            <Button
              icon={RiArrowRightLine}
              label="Activate"
              size="xs"
              variant="secondary"
            />
          ) : (
            // TODO(projects): remove this when activation available
            <Text color="secondary" size="body3" weight="medium">
              Activation coming soon
            </Text>
          )
        ) : (
          <Timer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            variant="special"
          />
        )}
      </div>
    </Ticket>
  );
}
