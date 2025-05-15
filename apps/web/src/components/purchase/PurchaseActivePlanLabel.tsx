'use client';

import { RiCheckboxCircleFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';

import Text from '../ui/Text';

export default function PurchaseActivePlanLabel() {
  const intl = useIntl();

  return (
    <Text className="flex gap-1.5" color="active" size="body3" weight="medium">
      <RiCheckboxCircleFill className="inline size-4" />
      <span>
        {intl.formatMessage({
          defaultMessage: 'Your active plan',
          description: 'Current subscription plan',
          id: 'KmjUuX',
        })}
      </span>
    </Text>
  );
}
