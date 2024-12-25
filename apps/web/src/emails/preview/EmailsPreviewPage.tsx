'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import Heading from '~/components/ui/Heading';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import {
  themeBorderColor,
  themeDivideColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '~/components/workspace/common/CodingWorkspaceDivider';

import type { EmailItemConfig, EmailKey } from '../EmailsTypes';
import { EmailsItemConfigs } from '../items/EmailItemConfigs';
import { renderEmail } from '../render/EmailsRender';

type Props = Readonly<{
  emailKey: EmailKey;
  html: string;
  text: string;
}>;

export default function EmailsPreviewPage({ emailKey, html, text }: Props) {
  const router = useRouter();

  const emailConfig = EmailsItemConfigs.find(
    (itemConfig) => itemConfig.id === emailKey,
  )!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [emailProps, setEmailProps] = useState<any>(emailConfig.defaultProps);
  const [emailContents, setEmailContents] = useState<{
    html: string;
    text: string;
  }>({ html, text });

  async function renderPreviewEmail(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emailConfig_: EmailItemConfig<React.FC<any>>,
  ) {
    const Component = emailConfig_?.component;
    const props = emailConfig_.defaultProps;

    setEmailContents(await renderEmail(<Component {...props} />));
    setEmailProps(props);
  }

  async function updatePreviewEmail(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emailConfig_: EmailItemConfig<React.FC<any>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emailProps_: any,
  ) {
    const Component = emailConfig_.component;

    setEmailContents(await renderEmail(<Component {...emailProps_} />));
  }

  useEffect(() => {
    renderPreviewEmail(emailConfig);
  }, [emailConfig]);

  useEffect(() => {
    updatePreviewEmail(emailConfig, emailProps);
  }, [emailConfig, emailProps]);

  return (
    <div
      className={clsx('flex h-screen w-full flex-col', [
        'divide-y',
        themeDivideColor,
      ])}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3">
        <Heading level="heading6">Emails Preview</Heading>
        <Select
          isLabelHidden={true}
          label="Emails"
          options={EmailsItemConfigs.map((item) => ({
            label: item.id,
            value: item.id,
          }))}
          value={emailConfig.id}
          onChange={(value: EmailKey) => {
            router.push(`/dev__/emails/${value}`);
          }}
        />
      </div>
      <PanelGroup
        className="flex h-full w-full py-3"
        direction="horizontal"
        disablePointerEventsDuringResize={true}>
        <Panel className="flex flex-col" defaultSize={50}>
          <div
            className={clsx('flex flex-col gap-4', 'overflow-y-auto', 'pl-3')}>
            {Object.keys(emailProps).length > 0 && (
              <div>
                <TextArea
                  label="Props"
                  rows={JSON.stringify(emailProps, null, 2).split('\n').length}
                  value={JSON.stringify(emailProps, null, 2)}
                  onChange={(value) => {
                    setEmailProps(JSON.parse(value));
                  }}
                />
              </div>
            )}
            {emailContents?.text && (
              <div className="flex flex-col gap-2">
                <Text className="block" size="body2" weight="medium">
                  Text content
                </Text>
                <pre
                  className={clsx(
                    'rounded-lg p-2 text-xs',
                    ['border', themeBorderColor],
                    'overflow-x-auto',
                    themeTextSecondaryColor,
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
        <Panel
          className="flex flex-col gap-4 pe-3"
          defaultSize={50}
          minSize={20}>
          <div className="flex flex-col gap-1">
            <Text className="block" size="body0" weight="bold">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {emailConfig?.subject(emailProps as any)}
            </Text>
            <div>
              <Text size="body2">From:</Text>{' '}
              <Text size="body2" weight="bold">
                {emailConfig?.from.name}
              </Text>{' '}
              <Text color="subtitle" size="body3">
                &lt;{emailConfig?.from.email}&gt;
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
