import { useIntl } from '~/components/intl';
import { useSponsorsAdFormatData } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Text from '~/components/ui/Text';

import type { SponsorsAdFormat } from '@prisma/client';

type Props = Readonly<{
  format: SponsorsAdFormat;
}>;

export default function SponsorsAdvertiseRequestFormAdsSectionTitle({
  format,
}: Props) {
  const intl = useIntl();
  const adFormatData = useSponsorsAdFormatData();

  return (
    <div>
      <Text className="block" size="body1" weight="medium">
        {intl.formatMessage(
          {
            defaultMessage: 'Configure your {adFormat}',
            description: 'Label for ad configuration',
            id: '/QA/Vp',
          },
          {
            adFormat: adFormatData[format].name,
          },
        )}
      </Text>
      <Text className="mt-1 block" color="secondary" size="body3">
        {intl.formatMessage({
          defaultMessage: 'Upload required assets',
          description: 'Upload required ad assets',
          id: '0M8wQ4',
        })}
      </Text>
    </div>
  );
}
