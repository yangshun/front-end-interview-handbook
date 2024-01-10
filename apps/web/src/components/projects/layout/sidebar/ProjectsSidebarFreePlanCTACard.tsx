import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

export function ProjectsSidebarFreePlanCTACard() {
  const intl = useIntl();

  return (
    <Card disableSpotlight={true} padding={false} pattern={true}>
      <div className="flex flex-col items-stretch gap-4 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Text size="body3" weight="bold">
              <FormattedMessage
                defaultMessage="Free plan"
                description="Title of Free Plan CTA card in Projects sidebar"
                id="n+XFbs"
              />
            </Text>
            <Tooltip
              label={
                <FormattedMessage
                  defaultMessage="Free Plan CTA card tooltip"
                  description="Tooltip label for Free Plan CTA card in Projects sidebar"
                  id="WX+cIg"
                />
              }>
              <RiInformationLine
                className={clsx('h-4 w-4', themeTextSecondaryColor)}
              />
            </Tooltip>
          </div>
          <Text className="text-2xs" size="inherit">
            <FormattedMessage
              defaultMessage="Access to {freeChallengeCount}+ free challenges. No access to Figma & guides"
              description="Subtitle of Free Plan CTA card in Projects sidebar"
              id="QzHPOD"
              values={{
                freeChallengeCount: 50,
              }}
            />
          </Text>
        </div>
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Get full access',
            description:
              'Label for Get full access button in Free Plan CTA card in Projects sidebar',
            id: 'UCsXAd',
          })}
          size="xs"
          variant="primary"
        />
      </div>
    </Card>
  );
}
