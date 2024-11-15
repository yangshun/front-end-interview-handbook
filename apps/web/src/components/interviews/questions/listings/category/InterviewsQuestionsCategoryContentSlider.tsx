import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useGitHubStars } from '~/hooks/useGitHubData';

import InterviewsContentSliderCard from '~/components/interviews/common/InterviewsContentSliderCard';
import type { QuestionFrameworkOrLanguage } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

type Props = Readonly<{
  framework?: QuestionFrameworkOrLanguage;
}>;

export default function InterviewsQuestionsCategoryContentSlider({
  framework,
}: Props) {
  const intl = useIntl();
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout>();
  const { data: starCountJS } = useGitHubStars(
    'yangshun/top-javascript-interview-questions',
    framework === 'js',
  );

  const jsRepoData = {
    count: starCountJS ?? null,
    description: intl.formatMessage({
      defaultMessage:
        'Support us by starring our GitHub repo and consider contributing!',
      description: 'Description for github star',
      id: 'P4vm6j',
    }),
    href: 'https://github.com/yangshun/top-javascript-interview-questions',
    title: intl.formatMessage({
      defaultMessage: '⭐️ Star our JavaScript repo',
      description: 'Title for github star CTA',
      id: 'acvTMO',
    }),
    type: 'github-star',
    value: 'js-repo',
  } as const;

  const frontEndInterviewData = {
    count: null,
    description: (
      <FormattedMessage
        defaultMessage="Leverage our <anchor>front end interview roadmap</anchor> to prepare quickly and effectively."
        description="Description for front end interview roadmap"
        id="9Oyn4m"
        values={{
          anchor: (chunks) => (
            <Anchor href="/front-end-interview-playbook">{chunks}</Anchor>
          ),
        }}
      />
    ),
    href: '/front-end-interview-playbook',
    title: intl.formatMessage({
      defaultMessage: "Don't waste time on mindless grinding",
      description: 'Title for front end interview roadmap',
      id: 'xF6ENX',
    }),
    type: 'link',
    value: 'frontend-interview',
  } as const;

  const data =
    framework === 'js'
      ? [jsRepoData, frontEndInterviewData]
      : [frontEndInterviewData];

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((preIndex) => (preIndex + 1) % data.length);
    }, 15000);

    return () => {
      window.clearInterval(timer.current);
    };
  }, [data.length]);

  const dataValue = data[index].value;

  return (
    <TabsPrimitive.Root
      className="flex w-full max-w-3xl flex-col gap-2.5"
      value={dataValue}
      onValueChange={(newValue) => {
        // Stop auto-advancing if user interacts with steppers.
        window.clearInterval(timer.current);
        setIndex(data.findIndex(({ value }) => value === newValue));
      }}>
      <div className={clsx('w-full', data.length > 1 && 'min-h-[154px]')}>
        {data.map((item) => (
          <TabsPrimitive.Content key={item.value} value={item.value}>
            <InterviewsContentSliderCard
              count={item.count}
              description={item.description}
              href={item.href}
              title={item.title}
              type={item.type}
            />
          </TabsPrimitive.Content>
        ))}
      </div>
      {data.length > 1 && (
        <TabsPrimitive.List className="flex justify-center gap-4">
          {data.map((item) => (
            <TabsPrimitive.Trigger
              key={item.value}
              asChild={true}
              value={item.value}>
              <button
                aria-label={item.value}
                className="w-12 py-1.5"
                type="button">
                <div
                  className={clsx(
                    'h-1 w-full rounded',
                    item.value === dataValue
                      ? 'bg-neutral-900 dark:bg-neutral-100'
                      : 'bg-neutral-200/70 dark:bg-neutral-700',
                    themeOutlineElement_FocusVisible,
                    themeOutlineElementBrandColor_FocusVisible,
                  )}
                />
              </button>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      )}
    </TabsPrimitive.Root>
  );
}
