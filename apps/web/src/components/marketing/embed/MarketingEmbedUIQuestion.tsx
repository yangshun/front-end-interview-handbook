import clsx from 'clsx';
import { useState } from 'react';
import { RiListUnordered } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import QuestionPaywallSmall from '~/components/questions/common/QuestionPaywallSmall';
import type {
  QuestionMetadata,
  QuestionUserInterfaceBundle,
} from '~/components/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/questions/common/QuestionsTypes';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import type { QuestionContentsSection } from '~/components/questions/content/QuestionContentsSectionTabs';
import QuestionContentsSectionTabs from '~/components/questions/content/QuestionContentsSectionTabs';
import sandpackProviderOptions from '~/components/questions/evaluator/sandpackProviderOptions';
import QuestionMetadataSection from '~/components/questions/metadata/QuestionMetadataSection';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeLineColor } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

import MarketingCodeMirrorTheme from '../coding/MarketingCodeMirrorTheme';
import type { QuestionFramework } from '../../questions/common/QuestionsTypes';

import type { SandboxEnvironment } from '@codesandbox/sandpack-react';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';

export type EmbedUIQuestion = Readonly<{
  angular: Readonly<{
    skeleton: QuestionUserInterfaceBundle;
    solution: QuestionUserInterfaceBundle;
  }>;
  metadata: QuestionMetadata;
  react: Readonly<{
    skeleton: QuestionUserInterfaceBundle;
    solution: QuestionUserInterfaceBundle;
  }>;
  vanilla: Readonly<{
    skeleton: QuestionUserInterfaceBundle;
    solution: QuestionUserInterfaceBundle;
  }>;
  vue: Readonly<{
    skeleton: QuestionUserInterfaceBundle;
    solution: QuestionUserInterfaceBundle;
  }>;
}>;

type Props = Readonly<{
  question: EmbedUIQuestion;
}>;

const editorPartPercentage = 60;
const previewPartPercentage = 100 - editorPartPercentage;
const height = '100%';

export default function MarketingEmbedUIQuestion({ question }: Props) {
  const intl = useIntl();
  const [framework, setFramework] = useState<QuestionFramework>('react');

  const [selectedSection, setSelectedSection] =
    useState<QuestionContentsSection>('description');
  const { writeup, sandpack: setup } =
    question[framework][
      selectedSection === 'description' ? 'skeleton' : 'solution'
    ];

  return (
    <div aria-hidden={true} className="relative flex h-full w-full flex-col">
      <div className="h-0 grow lg:grid lg:grid-cols-5">
        <div className="overflow-y-scroll lg:col-span-2 lg:flex lg:flex-col">
          <div className="flex flex-col gap-y-4 p-4 sm:grow">
            <div className="flex justify-between">
              <Text
                className="text-base font-semibold sm:text-xl"
                size="custom">
                {question.metadata.title}
              </Text>
              <Select
                isLabelHidden={true}
                label={intl.formatMessage({
                  defaultMessage: 'Framework',
                  description: 'Question framework',
                  id: 'xbmWBx',
                })}
                options={question.metadata.frameworks.map((frameworkItem) => ({
                  label: QuestionFrameworkLabels[frameworkItem.framework],
                  value: frameworkItem.framework,
                }))}
                size="sm"
                value={framework}
                onChange={(value) => {
                  setFramework(value as QuestionFramework);
                }}
              />
            </div>
            <QuestionMetadataSection
              elements={['author', 'languages']}
              metadata={question.metadata}
            />
            <div className="mt-3 sm:mt-4">
              <QuestionContentsSectionTabs
                sections={['description', 'solution']}
                selectedSection={selectedSection}
                onSelectSection={setSelectedSection}
              />
            </div>
            <QuestionContentProse contents={writeup} />
            <Divider />
            <div className="space-y-2">
              <div className="text-base font-medium sm:text-lg">
                {intl.formatMessage({
                  defaultMessage: 'Companies',
                  description: 'Companies section label',
                  id: '5rd3TN',
                })}
              </div>
              <QuestionPaywallSmall
                subtitle={intl.formatMessage({
                  defaultMessage:
                    'Purchase premium to see companies which ask this question.',
                  description:
                    'Subtitle for paywall over information about companies that asked the question',
                  id: 'vp4zbB',
                })}
                title={intl.formatMessage({
                  defaultMessage: 'Premium Feature',
                  description:
                    'Title for paywall over information about companies that asked the question',
                  id: 'BPE/qv',
                })}
              />
            </div>
          </div>
          <div
            className={clsx(
              'flex items-center justify-between border-t px-4 py-2',
              themeBackgroundColor,
              themeLineColor,
            )}>
            <Button
              addonPosition="start"
              href="/prepare/coding"
              icon={RiListUnordered}
              label="All Questions"
              size="xs"
              variant="secondary"
            />
          </div>
        </div>
        <div className="flex grow sm:h-full lg:col-span-3">
          <SandpackProvider
            customSetup={{
              dependencies: setup?.dependencies,
              entry: setup?.entry,
              environment: setup?.environment as SandboxEnvironment | undefined,
            }}
            files={setup?.files}
            options={{
              ...sandpackProviderOptions,
              activeFile: setup?.activeFile,
              classes: {
                'sp-input': 'touch-none select-none pointer-events-none',
                'sp-layout': 'h-full',
                'sp-wrapper': '!h-full',
              },
              visibleFiles: setup?.visibleFiles,
            }}
            theme={MarketingCodeMirrorTheme}>
            <SandpackLayout>
              <SandpackCodeEditor
                showLineNumbers={true}
                showTabs={true}
                style={{
                  // Reference: https://github.com/codesandbox/sandpack/blob/d1301bdbcf80c063e6ed63451f5b48ce55ea46e5/sandpack-react/src/presets/Sandpack.tsx
                  flexGrow: editorPartPercentage,
                  flexShrink: editorPartPercentage,
                  height,
                }}
                wrapContent={false}
              />
              <SandpackPreview
                showNavigator={true}
                showOpenInCodeSandbox={false}
                style={{
                  // Reference: https://github.com/codesandbox/sandpack/blob/d1301bdbcf80c063e6ed63451f5b48ce55ea46e5/sandpack-react/src/presets/Sandpack.tsx
                  flexGrow: previewPartPercentage,
                  flexShrink: previewPartPercentage,
                  height,
                }}
              />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>
      <Anchor
        href={question.metadata.href}
        target="_blank"
        variant="unstyled"
        onClick={() => {
          gtag.event({
            action: `homepage.hero.embed.user_interface.try_out.click`,
            category: 'engagement',
            label:
              'Click here to try out the actual workspace instead of this embed',
          });
          logEvent('click', {
            element: 'Homepage UI question embed',
            label:
              'Click here to try out the actual workspace instead of this embed',
          });
        }}>
        <Banner size="xs">
          {intl.formatMessage({
            defaultMessage:
              'Click here to try out the actual workspace instead of this embed.',
            description: 'Button label within embed',
            id: 'Cjz59k',
          })}
        </Banner>
      </Anchor>
    </div>
  );
}
