import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { useGitHubStars } from '~/hooks/useGithubStars';

import {
  themeBackgroundBrandColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import InterviewsGithubRepoCard from './InterviewsGithubRepoCard';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export default function InterviewsGithubRepoSlider() {
  const intl = useIntl();
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout>();
  const { data: starCount } = useGitHubStars(
    'yangshun/top-javascript-interview-questions',
  );

  // TODO(interviews): need to check for correctness of the url
  const data = [
    {
      count: starCount ?? 0,
      description: intl.formatMessage({
        defaultMessage:
          'Support us by starring our repo and consider contributing!',
        description: 'Description for github star',
        id: 'ZfXIPi',
      }),
      href: 'https://github.com/yangshun/top-javascript-interview-questions',
      title: intl.formatMessage({
        defaultMessage: '⭐️ Star our JS GitHub repo',
        description: 'Title for github star',
        id: 't1Qxme',
      }),
      value: 'star',
    },
    {
      actionLabel: intl.formatMessage({
        defaultMessage: 'Add your question',
        description: 'Github action button label',
        id: 'hhJBt5',
      }),
      description: intl.formatMessage({
        defaultMessage: 'Help the community out by contributing to our repo!',
        description: 'Description for github add question',
        id: 'Nb3mw/',
      }),
      href: 'https://github.com/yangshun/top-javascript-interview-questions',
      title: intl.formatMessage({
        defaultMessage: '💡 Got a question to add?',
        description: 'Title for github add question',
        id: 'ZayNDN',
      }),
      value: 'action',
    },
  ];

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((preIndex) => (preIndex + 1) % data.length);
    }, 6000);

    return () => {
      window.clearInterval(timer.current);
    };
  }, [data.length]);

  const dataValue = data[index].value;

  return (
    <div className="w-[344px]">
      <TabsPrimitive.Root
        className="flex flex-col gap-8"
        value={dataValue}
        onValueChange={(newValue) => {
          // Stop auto-advancing if user interacts with steppers.
          window.clearInterval(timer.current);
          setIndex(data.findIndex(({ value }) => value === newValue));
        }}>
        <div>
          {data.map((item) => (
            <TabsPrimitive.Content key={item.value} value={item.value}>
              {item.value === 'star' ? (
                <InterviewsGithubRepoCard
                  description={item.description}
                  href={item.href}
                  starCount={item.count}
                  title={item.title}
                  type="star"
                />
              ) : (
                <InterviewsGithubRepoCard
                  actionLabel={item.actionLabel ?? ''}
                  description={item.description}
                  href={item.href}
                  title={item.title}
                  type="action"
                />
              )}
            </TabsPrimitive.Content>
          ))}
        </div>
        <TabsPrimitive.List className="flex justify-center gap-4">
          {data.map((item) => (
            <TabsPrimitive.Trigger
              key={item.value}
              asChild={true}
              value={item.value}>
              <button
                aria-label={item.title}
                className={clsx(
                  'h-[5px] w-10 rounded',
                  alert,
                  item.value === dataValue
                    ? themeBackgroundBrandColor
                    : 'bg-neutral-200/70 dark:bg-neutral-700',
                  themeOutlineElement_FocusVisible,
                  themeOutlineElementBrandColor_FocusVisible,
                )}
                type="button"
              />
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </TabsPrimitive.Root>
    </div>
  );
}
