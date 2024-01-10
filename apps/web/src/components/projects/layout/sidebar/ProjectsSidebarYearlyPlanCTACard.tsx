import clsx from 'clsx';
import { RiInformationLine, RiLoopLeftLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

export function ProjectsSidebarYearlyPlanCTACard() {
  const intl = useIntl();

  return (
    <Card disableSpotlight={true} padding={false} pattern={false}>
      <div className="flex flex-col items-stretch gap-4 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Text size="body3" weight="bold">
              <FormattedMessage
                defaultMessage="Yearly plan"
                description="Title of Yearly Plan CTA card in Projects sidebar"
                id="Gcx+tu"
              />
            </Text>
            <Badge
              icon={RiLoopLeftLine}
              label={intl.formatDate(new Date(), {
                day: 'numeric',
                month: 'numeric',
                year: '2-digit',
              })}
              size="sm"
              variant="neutral"
            />
            <Tooltip
              label={
                <FormattedMessage
                  defaultMessage="Yearly Plan CTA card tooltip"
                  description="Tooltip label for Yearly Plan CTA card in Projects sidebar"
                  id="JPoqoi"
                />
              }>
              <RiInformationLine
                className={clsx('h-4 w-4', themeTextSecondaryColor)}
              />
            </Tooltip>
          </div>
          <Text className="text-2xs" size="inherit">
            <FormattedMessage
              defaultMessage="Access to all {totalChallengeCount}+ challenges. Unlimited Figma & guides access"
              description="Subtitle of Yearly Plan CTA card in Projects sidebar"
              id="JmdC8M"
              values={{
                totalChallengeCount: 150,
              }}
            />
          </Text>
        </div>
      </div>
    </Card>
  );
}
