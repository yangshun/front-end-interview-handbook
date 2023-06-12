import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TabsSolutions from '~/components/ui/Tabs/TabsSolutions';

import logEvent from '~/logging/logEvent';

import MarketingCodeMirrorTheme from './coding/MarketingCodeMirrorTheme';
import type { QuestionUserInterfaceBundle } from '../questions/common/QuestionsTypes';
import sandpackProviderOptions from '../questions/evaluator/sandpackProviderOptions';

import type { SandboxEnvironment } from '@codesandbox/sandpack-react';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';

const height = 450;
const editorPartPercentage = 70;
const previewPartPercentage = 100 - editorPartPercentage;

type Props = Readonly<{
  solutions: Readonly<{
    todoListReact: QuestionUserInterfaceBundle;
    todoListVanilla: QuestionUserInterfaceBundle;
  }>;
}>;

export default function MarketingQualitySolutions({ solutions }: Props) {
  const { todoListReact, todoListVanilla } = solutions;
  const [selectedTab, setSelectedTab] = useState('vanilla');
  const { sandpack: setup } =
    selectedTab === 'vanilla'
      ? {
          ...todoListVanilla,
          sandpack: {
            ...todoListVanilla.sandpack,
            activeFile: '/src/index.js',
          },
        }
      : {
          ...todoListReact,
          sandpack: {
            ...todoListReact.sandpack,
            activeFile: '/App.js',
          },
        };
  const sectionMarkerRef = useRef(null);
  const isInView = useInView(sectionMarkerRef, {
    amount: 'all',
    once: true,
  });
  const solutionsMarkerRef = useRef(null);
  const solIsInView = useInView(solutionsMarkerRef, {
    amount: 'all',
    margin: '33%',
    once: true,
  });

  return (
    <div className="bg-white">
      <div ref={solutionsMarkerRef} />
      <Container>
        <div
          className={clsx(
            'relative mx-auto max-w-xl py-24 transition-opacity duration-[1500ms] ease-in-out sm:max-w-3xl md:max-w-4xl lg:max-w-5xl lg:py-40',
            isInView ? 'opacity-100' : 'opacity-0',
          )}>
          <div className="pb-10 lg:pb-12">
            <Heading level="heading2">
              <FormattedMessage
                defaultMessage="Learn from the best solutions."
                description="Title of the 'Learn from the best solutions' section on Homepage"
                id="FIQIm5"
              />
            </Heading>
            <Section>
              <div ref={sectionMarkerRef} />
              <p className="relative mt-10 max-w-5xl text-lg text-neutral-500 lg:text-xl">
                <FormattedMessage
                  defaultMessage="Studying well-written solutions is one the most effective methods to ace the interview. Our platform guarantees the quality of our solutions because they are all written by us, ex-FAANG Senior Front End Engineers."
                  description="Subtitle of the 'Learn from the best solutions' section on Homepage, paragraph 1"
                  id="0dqqyE"
                />
              </p>
              <p className="relative mt-10 max-w-5xl text-lg text-neutral-500 lg:text-xl">
                <FormattedMessage
                  defaultMessage="You can always rely on our solutions to include multiple approaches, reinforce fundamentals, patterns & techniques, and include a large number of practical considerations. If not, leave us a message!"
                  description="Subtitle of the 'Learn from the best solutions' section on Homepage, paragraph 2"
                  id="OtRu2B"
                />
              </p>
            </Section>
          </div>
          <Section>
            <div
              className={clsx(
                'transition-opacity duration-[1500ms] ease-in-out',
                solIsInView ? 'opacity-100' : 'opacity-0',
              )}>
              <div>
                <div className="mx-auto flex items-center">
                  <p className="mb-4 mr-8 hidden justify-start text-sm text-neutral-500 sm:text-base md:flex md:text-lg xl:text-xl">
                    <FormattedMessage
                      defaultMessage="Check out sample solutions:"
                      description="Text above sample solutions code sample. Purpose is to explain that the code sample is sample code from some of our solutions"
                      id="R79mq9"
                    />
                  </p>
                  <div className="grow pb-4">
                    <TabsSolutions
                      label="Select navigation item"
                      tabs={[
                        // TODO: i18n
                        { label: 'Vanilla JavaScript', value: 'vanilla' },
                        { label: 'React', value: 'react' },
                      ]}
                      value={selectedTab}
                      onSelect={(newTab) => {
                        gtag.event({
                          action: `homepage.solutions.${newTab}.click`,
                          category: 'engagement',
                          label: newTab,
                        });
                        logEvent('click', {
                          element: 'Homepage solutions tab',
                          label: newTab,
                        });
                        setSelectedTab(newTab);
                      }}
                    />
                  </div>
                </div>
              </div>
              <SandpackProvider
                customSetup={{
                  dependencies: setup?.dependencies,
                  entry: setup?.entry,
                  environment: setup?.environment as
                    | SandboxEnvironment
                    | undefined,
                }}
                files={setup?.files}
                options={{
                  ...sandpackProviderOptions,
                  activeFile: setup?.activeFile,
                  classes: {
                    'sp-input': 'touch-none select-none pointer-events-none',
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
                      minWidth:
                        700 *
                        (editorPartPercentage /
                          (previewPartPercentage + editorPartPercentage)),
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
                      minWidth:
                        700 *
                        (previewPartPercentage /
                          (previewPartPercentage + editorPartPercentage)),
                    }}
                  />
                </SandpackLayout>
              </SandpackProvider>
            </div>
            <div className="mx-auto flex items-center justify-center pt-14 text-center text-lg md:pt-20 md:text-xl lg:pt-28 lg:text-2xl">
              <span className="block text-neutral-500 sm:flex">
                <FormattedMessage
                  defaultMessage="Want to see more solutions? <link>Explore our product →</link>"
                  description="Call to action button to ask users to explore our product. Leads to the interview practice questions bank."
                  id="lTQM7o"
                  values={{
                    link: (chunks) => (
                      <Anchor
                        className="text-brand-dark hover:text-brand ml-2 flex items-center font-semibold"
                        href="/prepare"
                        variant="unstyled"
                        onClick={() => {
                          gtag.event({
                            action: 'homepage.solutions.explore_product.click',
                            category: 'engagement',
                            label: 'Explore the product',
                          });
                        }}>
                        {chunks}
                      </Anchor>
                    ),
                  }}
                />
              </span>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}
