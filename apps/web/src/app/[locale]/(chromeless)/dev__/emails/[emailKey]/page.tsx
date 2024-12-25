import type { EmailKey } from '~/emails/EmailsTypes';
import EmailsPreviewPage from '~/emails/preview/EmailsPreviewPage';

export default async function Page({
  params,
}: {
  params: Readonly<{ emailKey: EmailKey }>;
}) {
  const { emailKey } = params;

  return <EmailsPreviewPage emailKey={emailKey} />;
}
