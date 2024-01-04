import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';

export function ProjectsSidebarStartProjectCTACard() {
  const intl = useIntl();

  return (
    <Card disableSpotlight={true} padding={false}>
      <div className="flex flex-col items-stretch gap-2 p-3">
        <div className="flex flex-col items-center gap-2">
          <Text size="body3" weight="bold">
            <FormattedMessage
              defaultMessage="Let's start!"
              description="Title of Start Project CTA card in Projects sidebar"
              id="L18d7M"
            />
          </Text>
          <Text className="text-2xs text-center" size="custom">
            <FormattedMessage
              defaultMessage="Learning by building has never been easier"
              description="Subtitle of Start Project CTA card in Projects sidebar"
              id="98YCSU"
            />
          </Text>
        </div>
        <Button
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Start a project',
            description:
              'Label for Start a project button in Start Project CTA card in Projects sidebar',
            id: '5o0/kt',
          })}
          size="xs"
          variant="secondary"
        />
      </div>
    </Card>
  );
}
