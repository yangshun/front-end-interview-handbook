'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '~/components/workspace/common/CodingWorkspaceDivider';

import type { EmailItemConfig, EmailKey } from '../EmailsTypes';
import { EmailsItemConfigCheckoutFirstTime } from '../items/checkout/EmailsItemConfigCheckoutFirstTime';
import { EmailsItemConfigCheckoutMultipleTimes } from '../items/checkout/EmailsItemConfigCheckoutMultipleTimes';
import { EmailsItemConfigInterviewsProgress } from '../items/interviews-progress/EmailsItemConfigInterviewsProgress';
import { EmailsItemConfigPaymentFailed } from '../items/payment-fail/EmailsItemConfigPaymentFailed';
import { EmailsItemConfigWelcomeSeriesAfter24Hours } from '../items/welcome/EmailsItemConfigWelcomeSeriesAfter24Hours';
import { EmailsItemConfigWelcomeSeriesImmediate } from '../items/welcome/EmailsItemConfigWelcomeSeriesImmediate';
import { renderEmail } from '../render/EmailsRender';

type Props = Readonly<{
  emailKey: EmailKey;
}>;

const emailConfigs = [
  EmailsItemConfigWelcomeSeriesImmediate,
  EmailsItemConfigWelcomeSeriesAfter24Hours,
  EmailsItemConfigInterviewsProgress,
  EmailsItemConfigCheckoutFirstTime,
  EmailsItemConfigCheckoutMultipleTimes,
  EmailsItemConfigPaymentFailed,
];

export default function EmailsPreviewPage({ emailKey }: Props) {
  const [emailContents, setEmailContents] = useState<{
    html: string;
    text: string;
  } | null>(null);

  async function renderPreviewEmail(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emailConfig_: EmailItemConfig<React.FC<any>>,
  ) {
    const Component = emailConfig_?.component;

    setEmailContents(
      await renderEmail(<Component {...emailConfig_?.defaultProps} />),
    );
  }

  const emailConfig = emailConfigs.find((config) => config.id === emailKey);

  useEffect(() => {
    if (emailConfig == null) {
      return;
    }

    renderPreviewEmail(emailConfig);
  }, [emailConfig]);

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-3">
      <div className="">{emailKey}</div>
      <PanelGroup
        className="flex h-full"
        direction="horizontal"
        disablePointerEventsDuringResize={true}>
        <Panel className="flex flex-col">
          <div className={clsx('flex flex-col gap-4', 'overflow-y-auto')}>
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
        <Panel className="flex flex-col gap-4" minSize={20}>
          <div className="flex flex-col gap-1">
            <Text className="block" size="body0" weight="bold">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {emailConfig?.subject(emailConfig?.defaultProps as any)}
            </Text>
            <div className="flex flex-wrap items-center gap-2">
              <Text size="body2">From:</Text>
              <Text size="body2" weight="bold">
                {emailConfig?.from.name}
              </Text>
              <Text color="subtitle" size="body3">
                {emailConfig?.from.email}
              </Text>
            </div>
          </div>
          <iframe
            className="h-0 grow overflow-y-auto rounded-lg"
            srcDoc={emailContents?.html}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}
