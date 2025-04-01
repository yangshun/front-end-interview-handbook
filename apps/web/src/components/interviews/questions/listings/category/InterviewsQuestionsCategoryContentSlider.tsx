import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import url from 'url';

import { trpc } from '~/hooks/trpc';
import { useGitHubStars } from '~/hooks/useGitHubData';
import { SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION } from '~/hooks/useScrollToHash';

import InterviewsContentSliderCard from '~/components/interviews/common/InterviewsContentSliderCard';
import type { QuestionFrameworkOrLanguage } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import SponsorsAdFormatSpotlightCardContainer from '~/components/sponsors/ads/SponsorsAdFormatSpotlightCardContainer';
import Anchor from '~/components/ui/Anchor';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  frameworkOrLanguage?: QuestionFrameworkOrLanguage;
}>;

export default function InterviewsQuestionsCategoryContentSlider({
  frameworkOrLanguage,
}: Props) {
  const intl = useIntl();
  const user = useUser();

  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout>();

  // Eagerly fetch the active sessions, so that when navigating to recommended preparation section with scroll hash SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION for frontend interview roadmap
  // So that it prevent the layout shift due to continue learning section data not being already present there
  trpc.questionSessions.getActive.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: starCountJS } = useGitHubStars(
    'yangshun/top-javascript-interview-questions',
    frameworkOrLanguage === 'js',
  );
  const { data: starCountReact } = useGitHubStars(
    'yangshun/top-reactjs-interview-questions',
    frameworkOrLanguage === 'react',
  );

  const jsRepoData = {
    element: (
      <InterviewsContentSliderCard
        className="h-auto"
        count={starCountJS ?? null}
        description={intl.formatMessage({
          defaultMessage:
            'Support us by starring our GitHub repo and consider contributing!',
          description: 'Description for github star',
          id: 'P4vm6j',
        })}
        href="https://github.com/yangshun/top-javascript-interview-questions"
        title={intl.formatMessage({
          defaultMessage: '⭐️ Star our JavaScript repo',
          description: 'Star the GitHub repository',
          id: 'nbVWkk',
        })}
        type="github-star"
      />
    ),
    value: 'js-repo',
  } as const;

  const reactRepoData = {
    element: (
      <InterviewsContentSliderCard
        className="h-auto"
        count={starCountReact ?? null}
        description={intl.formatMessage({
          defaultMessage:
            'Support us by starring our GitHub repo and consider contributing!',
          description: 'Description for github star',
          id: 'P4vm6j',
        })}
        href="https://github.com/yangshun/top-reactjs-interview-questions"
        title={intl.formatMessage({
          defaultMessage: '⭐️ Star our React repo',
          description: 'Star the GitHub repository',
          id: '+H0jN0',
        })}
        type="github-star"
      />
    ),
    value: 'react-repo',
  } as const;

  const frontEndInterviewData = {
    element: (
      <InterviewsContentSliderCard
        className="h-auto"
        description={
          <FormattedMessage
            defaultMessage="Leverage our <anchor>front end interview roadmap</anchor> to prepare quickly and effectively."
            description="Description for front end interview roadmap"
            id="9Oyn4m"
            values={{
              anchor: (chunks) => (
                <Anchor
                  href={url.format({
                    hash: SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION,
                    pathname: user ? '/dashboard' : '/get-started',
                  })}>
                  {chunks}
                </Anchor>
              ),
            }}
          />
        }
        href={url.format({
          hash: SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION,
          pathname: user ? '/interviews/dashboard' : '/get-started',
        })}
        title={intl.formatMessage({
          defaultMessage: "Don't waste time on mindless grinding",
          description: 'Title for front end interview roadmap',
          id: 'xF6ENX',
        })}
        type="link"
      />
    ),
    value: 'frontend-interview',
  } as const;

  const adItem = {
    element: (
      <SponsorsAdFormatSpotlightCardContainer adPlacement="questions_side_column" />
    ),
    value: 'ad',
  } as const;

  const data = (
    [
      frameworkOrLanguage === 'js' ? jsRepoData : null,
      frameworkOrLanguage === 'react' ? reactRepoData : null,
      adItem,
      frontEndInterviewData,
    ] as const
  ).flatMap((item) => (item != null ? [item] : []));

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
      className="-mb-1.5 flex w-full flex-col gap-2.5"
      value={dataValue}
      onValueChange={(newValue) => {
        // Stop auto-advancing if user interacts with steppers.
        window.clearInterval(timer.current);
        setIndex(data.findIndex(({ value }) => value === newValue));
      }}>
      {data.map((item) => (
        <TabsPrimitive.Content key={item.value} value={item.value}>
          <div className={clsx('flex items-center xl:h-[150px]')}>
            {item.element}
          </div>
        </TabsPrimitive.Content>
      ))}
      {data.length > 1 && (
        <TabsPrimitive.List className="flex justify-center gap-2 pb-1">
          {data.map((item) => (
            <TabsPrimitive.Trigger
              key={item.value}
              asChild={true}
              value={item.value}>
              <button aria-label={item.value} className="py-1.5" type="button">
                <div
                  className={clsx(
                    'size-2 rounded',
                    item.value === dataValue
                      ? 'bg-neutral-900 dark:bg-neutral-100'
                      : clsx(
                          'bg-neutral-200/70 dark:bg-neutral-700',
                          'hover:bg-neutral-300/70 dark:hover:bg-neutral-600',
                        ),
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
