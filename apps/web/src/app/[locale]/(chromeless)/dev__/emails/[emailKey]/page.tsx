import { notFound } from 'next/navigation';

import type { EmailKey } from '~/emails/EmailsTypes';
import { EmailsItemConfigs } from '~/emails/items/EmailItemConfigs';
import EmailsPreviewPage from '~/emails/preview/EmailsPreviewPage';
import { renderEmail } from '~/emails/render/EmailsRender';

export default async function Page({
  params,
}: {
  params: Readonly<{ emailKey: EmailKey }>;
}) {
  const { emailKey } = params;

  const emailConfig = EmailsItemConfigs.find(
    (itemConfig) => itemConfig.id === emailKey,
  );

  if (
    emailConfig == null ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
  ) {
    return notFound();
  }

  const Component = emailConfig.component;
  const { html, text } = await renderEmail(
    <Component {...(emailConfig.defaultProps as any)} />,
  );

  return <EmailsPreviewPage emailKey={emailKey} html={html} text={text} />;
}
