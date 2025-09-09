import { headers } from 'next/headers';
import { userAgentFromString } from 'next/server';

export default function getUserAgent(): 'desktop' | 'mobile' | 'tablet' {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  const { device } = userAgentFromString(userAgent || undefined);

  return device.type === 'tablet'
    ? 'tablet'
    : device.type === 'mobile'
      ? 'mobile'
      : 'desktop';
}
