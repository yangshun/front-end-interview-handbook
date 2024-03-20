import { RiCheckboxCircleFill } from 'react-icons/ri';

import Text from '../ui/Text';

export default function PurchaseActivePlanLabel() {
  return (
    <Text className="flex gap-1.5" color="active" size="body3" weight="medium">
      <RiCheckboxCircleFill className="size-4 inline" />
      <span>Your active plan</span>
    </Text>
  );
}
