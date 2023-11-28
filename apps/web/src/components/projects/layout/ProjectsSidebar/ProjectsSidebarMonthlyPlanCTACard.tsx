import clsx from 'clsx';
import { RiInformationLine, RiLoopLeftLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

export function ProjectsSidebarMonthlyPlanCTACard() {
  const intl = useIntl();

  return (
    <Card disableSpotlight={true} padding={false} pattern={true}>
      <div className="flex flex-col items-stretch gap-4 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Text size="body3" weight="bold">
              <FormattedMessage
                defaultMessage="Monthly plan"
                description="Title of Monthly Plan CTA card in Projects sidebar"
                id="bESAtB"
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
                  defaultMessage="Monthly Plan CTA card tooltip"
                  description="Tooltip label for Monthly Plan CTA card in Projects sidebar"
                  id="wzLox4"
                />
              }>
              <RiInformationLine
                className={clsx('h-4 w-4', themeTextSecondaryColor)}
              />
            </Tooltip>
          </div>
          <Text className="text-[10px]" size="custom">
            <FormattedMessage
              defaultMessage="Access to all {totalChallengeCount}+ challenges. {remainingGuideCount} Figma & guides access left"
              description="Subtitle of Monthly Plan CTA card in Projects sidebar"
              id="ZrtVIf"
              values={{
                remainingGuideCount: 7,
                totalChallengeCount: 150,
              }}
            />
          </Text>
        </div>
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Get unlimited access',
            description:
              'Label for Get unlimited access button in Monthly Plan CTA card in Projects sidebar',
            id: '/MJhXi',
          })}
          size="xs"
          variant="primary"
        />
      </div>
    </Card>
  );
}
