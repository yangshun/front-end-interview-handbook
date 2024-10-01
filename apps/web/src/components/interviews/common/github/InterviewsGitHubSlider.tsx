import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useGitHubFollowers, useGitHubStars } from '~/hooks/useGitHubData';

import { useIntl } from '~/components/intl';
import {
  themeBackgroundBrandColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import InterviewsGitHubCard from './InterviewsGitHubCard';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export default function InterviewsGitHubSlider() {
  const intl = useIntl();
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout>();
  const { data: starCountJS } = useGitHubStars(
    'yangshun/top-javascript-interview-questions',
  );
  const { data: starCountSD } = useGitHubStars(
    'greatfrontend/awesome-front-end-system-design',
  );
  const { data: followCount } = useGitHubFollowers('greatfrontend');

  const data = [
    {
      count: starCountJS ?? null,
      description: intl.formatMessage({
        defaultMessage:
          'Support us by starring our GitHub repo and consider contributing!',
        description: 'Description for github star',
        id: 'P4vm6j',
      }),
      href: 'https://github.com/yangshun/top-javascript-interview-questions',
      title: intl.formatMessage({
        defaultMessage: '⭐️ Star our top JavaScript questions repo',
        description: 'Title for github star CTA',
        id: 'Tc9jZ0',
      }),
      type: 'star',
      value: 'js-repo',
    },
    {
      count: followCount ?? null,
      description: intl.formatMessage({
        defaultMessage:
          'Follow the GreatFrontEnd GitHub organization for updates',
        description: 'Description for github Card',
        id: '6WCFJb',
      }),
      href: 'https://github.com/greatfrontend',
      title: intl.formatMessage({
        defaultMessage: '👍️️️️️️ Follow us on GitHub',
        description: 'Title for github card',
        id: 'skF8Vm',
      }),
      type: 'follow',
      value: 'gh-org',
    },
    {
      count: starCountSD ?? null,
      description: intl.formatMessage({
        defaultMessage:
          'Star our repo containing awesome front end system design resources',
        description: 'Description for github star',
        id: 'uw/XXy',
      }),
      href: 'https://github.com/greatfrontend/awesome-front-end-system-design',
      title: intl.formatMessage({
        defaultMessage: '⭐️ Star our Front End System Design repo',
        description: 'Title for github star CTA',
        id: '+9bAd9',
      }),
      type: 'star',
      value: 'sd-repo',
    },
  ] as const;

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
    <div>
      <TabsPrimitive.Root
        className="flex flex-col gap-4"
        value={dataValue}
        onValueChange={(newValue) => {
          // Stop auto-advancing if user interacts with steppers.
          window.clearInterval(timer.current);
          setIndex(data.findIndex(({ value }) => value === newValue));
        }}>
        <div>
          {data.map((item) => (
            <TabsPrimitive.Content key={item.value} value={item.value}>
              <InterviewsGitHubCard
                count={item.count}
                description={item.description}
                href={item.href}
                title={item.title}
                type={item.type}
              />
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
                  'h-2 w-10 rounded',
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
