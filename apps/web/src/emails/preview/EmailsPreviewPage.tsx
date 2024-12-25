'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import Heading from '~/components/ui/Heading';
import { themeBorderColor } from '~/components/ui/theme';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '~/components/workspace/common/CodingWorkspaceDivider';

import type { EmailKey } from '../EmailsTypes';
import EmailsTemplateCheckoutFirstTime from '../items/checkout/EmailsTemplateCheckoutFirstTime';
import EmailsTemplateCheckoutMultipleTimes from '../items/checkout/EmailsTemplateCheckoutMultipleTimes';
import EmailsTemplateInterviewsProgress from '../items/interviews-progress/EmailsTemplateInterviewsProgress';
import EmailsTemplatePaymentFailed from '../items/payment-fail/EmailsTemplatePaymentFailed';
import EmailsTemplateWelcomeSeriesAfter24Hours from '../items/welcome/EmailsTemplateWelcomeSeriesAfter24Hours';
import EmailsTemplateWelcomeSeriesImmediate from '../items/welcome/EmailsTemplateWelcomeSeriesImmediate';
import { renderEmail } from '../render/EmailsRender';

type Props = Readonly<{
  emailKey: EmailKey;
}>;

const emailKeyToTemplate: Record<EmailKey, React.FC<any>> = {
  INTERVIEWS_CHECKOUT_FIRST_TIME: EmailsTemplateCheckoutFirstTime,
  INTERVIEWS_CHECKOUT_MULTIPLE_TIMES: EmailsTemplateCheckoutMultipleTimes,
  INTERVIEWS_PROGRESS: EmailsTemplateInterviewsProgress,
  INTERVIEWS_WELCOME_EMAIL_24_HOURS: EmailsTemplateWelcomeSeriesImmediate,
  INTERVIEWS_WELCOME_EMAIL_IMMEDIATE: EmailsTemplateWelcomeSeriesAfter24Hours,
  PAYMENT_FAILED: EmailsTemplatePaymentFailed,
};

export default function EmailsPreviewPage({ emailKey }: Props) {
  const [emailContents, setEmailContents] = useState<{
    html: string;
    text: string;
  } | null>(null);

  async function renderPreviewEmail(emailKey_: EmailKey) {
    const Component = emailKeyToTemplate[emailKey_];

    setEmailContents(await renderEmail(<Component />));
  }

  useEffect(() => {
    renderPreviewEmail(emailKey);
  }, [emailKey]);

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-3">
      <div className="">{emailKey}</div>
      <PanelGroup
        className="flex h-full"
        direction="horizontal"
        disablePointerEventsDuringResize={true}>
        <Panel className="flex flex-col">
          <div className={clsx('overflow-y-auto')}>
            {emailContents?.text && (
              <div className="flex flex-col gap-2">
                <Heading level="heading6">Text content</Heading>
                <pre
                  className={clsx(
                    'rounded-lg p-2 text-xs',
                    ['border', themeBorderColor],
                    'overflow-x-auto',
                  )}>
                  {emailContents?.text}
                </pre>
              </div>
            )}
          </div>
        </Panel>
        <PanelResizeHandle
          className={CodingWorkspaceDividerWrapperClassname('vertical')}>
          <CodingWorkspaceDivider direction="vertical" />
        </PanelResizeHandle>
        <Panel className="overflow-y-auto" minSize={20}>
          <iframe
            className="size-full rounded-lg"
            srcDoc={emailContents?.html}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}
