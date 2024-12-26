'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { useToast } from '~/components/global/toasts/useToast';
import InterviewsNavbarEnd from '~/components/interviews/common/InterviewsNavbarEnd';
import Heading from '~/components/ui/Heading';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import {
  themeBackgroundColor,
  themeBackgroundInputColor,
  themeBorderColor,
  themeBorderEmphasizeColor,
  themeDivideColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '~/components/workspace/common/CodingWorkspaceDivider';

import { getErrorMessage } from '~/utils/getErrorMessage';

import EmailsPreviewSendSection from './EmailsPreviewSendSection';
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
  const { showToast } = useToast();

  const emailConfig = EmailsItemConfigs.find(
    (itemConfig) => itemConfig.id === emailKey,
  )!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [emailProps, setEmailProps] = useState<any>(emailConfig.defaultProps);
  const [emailPropsTextarea, setEmailPropsTextarea] = useState<string>(
    JSON.stringify(emailConfig.defaultProps, null, 2),
  );
  const [emailPropsError, setEmailPropsError] = useState<string | null>(null);

  const [emailContents, setEmailContents] = useState<{
    html: string;
    text: string;
  }>({ html, text });

  useEffect(() => {
    setEmailPropsTextarea(JSON.stringify(emailProps, null, 2));
  }, [emailProps]);

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
      className={clsx(
        'flex h-screen w-full flex-col',
        'bg-neutral-50 dark:bg-neutral-950',
        ['divide-y', themeDivideColor],
      )}>
      <div
        className={clsx(
          'flex items-center justify-between',
          themeBackgroundColor,
        )}>
        <div
          className={clsx(
            'flex flex-wrap items-center',
            'gap-x-4 gap-y-2',
            'py-2 pl-6',
          )}>
          <Heading level="heading6">Emails Preview</Heading>
          <Select
            isLabelHidden={true}
            label="Emails"
            options={EmailsItemConfigs.map((item) => ({
              label: item.id,
              value: item.id,
            }))}
            size="sm"
            value={emailConfig.id}
            onChange={(value: EmailKey) => {
              router.push(`/dev__/emails/${value}`);
            }}
          />
        </div>
        <InterviewsNavbarEnd />
      </div>
      <PanelGroup
        className="flex h-full w-full p-3"
        direction="horizontal"
        disablePointerEventsDuringResize={true}>
        <Panel
          className={clsx(
            'flex flex-col',
            'rounded-lg',

            ['border', themeBorderColor],
            themeBackgroundColor,
          )}
          defaultSize={50}>
          <div
            className={clsx('flex flex-col gap-4', 'p-3', 'overflow-y-auto')}>
            <EmailsPreviewSendSection
              onSubmit={async ({ email, name }) => {
                const response = await fetch('/api/dev__/emails', {
                  body: JSON.stringify({
                    email,
                    emailKey,
                    name,
                    props: emailProps,
                  }),
                  method: 'POST',
                });

                if (response.ok) {
                  showToast({
                    title: `Email sent to ${email}`,
                    variant: 'success',
                  });
                } else {
                  const results = await response.json();

                  showToast({
                    description: results.message,
                    title: `Email error`,
                    variant: 'danger',
                  });
                }
              }}
            />
            {Object.keys(emailProps).length > 0 && (
              <div>
                <TextArea
                  className="font-mono"
                  errorMessage={emailPropsError}
                  label="Props"
                  rows={emailPropsTextarea.split('\n').length}
                  value={emailPropsTextarea}
                  onBlur={() => {
                    try {
                      if (JSON.parse(emailPropsTextarea)) {
                        setEmailProps(JSON.parse(emailPropsTextarea));
                        setEmailPropsError(null);
                      }
                    } catch (err) {
                      setEmailPropsError(getErrorMessage(err));
                    }
                  }}
                  onChange={(value) => {
                    setEmailPropsTextarea(value);
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
                    'rounded',
                    'p-3',
                    'text-xs',
                    themeTextSecondaryColor,
                    ['border', themeBorderEmphasizeColor],
                    'overflow-x-auto',
                    themeBackgroundInputColor,
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
          className={clsx(
            'flex flex-col gap-4 p-3',
            'rounded-lg',
            ['border', themeBorderColor],
            themeBackgroundColor,
          )}
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
