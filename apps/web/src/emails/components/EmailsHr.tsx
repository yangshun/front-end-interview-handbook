import type { HrProps } from '@react-email/components';
import { Hr } from '@react-email/components';

const hr = { borderColor: '#E6E6E6', marginBottom: 40, marginTop: 40 };

export default function EmailsHr({ style, ...props }: HrProps) {
  return (
    <Hr
      style={{
        ...hr,
        ...style,
      }}
      {...props}
    />
  );
}
