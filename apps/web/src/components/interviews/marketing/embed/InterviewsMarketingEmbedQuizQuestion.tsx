'use client';

import clsx from 'clsx';

import gtag from '~/lib/gtag';

import QuestionTopicLabel from '~/components/interviews/questions/metadata/QuestionTopicLabel';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBorderColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

export default function InterviewsMarketingEmbedQuizQuestion() {
  const intl = useIntl();

  return (
    <div className="size-full relative">
      <div className="h-full sm:overflow-y-scroll">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-y-4 pb-32 pt-4 lg:pt-10">
            <Text className="text-base font-semibold sm:text-lg" size="inherit">
              Describe the difference between{' '}
              <code
                className={clsx(
                  'rounded-lg px-2 py-0.5 font-thin before:content-none after:content-none',
                  themeBackgroundEmphasized,
                  ['border', themeBorderColor],
                  themeTextSubtitleColor,
                )}>
                &lt;script&gt;
              </code>
              ,{' '}
              <code
                className={clsx(
                  'rounded-lg px-2 py-0.5 font-thin before:content-none after:content-none',
                  themeBackgroundEmphasized,
                  ['border', themeBorderColor],
                  themeTextSubtitleColor,
                )}>
                &lt;script async&gt;
              </code>{' '}
              and{' '}
              <code
                className={clsx(
                  'rounded-lg px-2 py-0.5 font-thin before:content-none after:content-none',
                  themeBackgroundEmphasized,
                  ['border', themeBorderColor],
                  themeTextSubtitleColor,
                )}>
                &lt;script defer&gt;
              </code>
            </Text>
            <div className="flex gap-2">
              <QuestionTopicLabel value="html" />
              <QuestionTopicLabel value="performance" />
            </div>
            <Divider />
            <Prose textSize="sm">
              <p>
                For normal <code>&lt;script&gt;</code>s, when a{' '}
                <code>&lt;script&gt;</code> tag is encountered, HTML parsing is
                blocked, the script is fetched and executed immediately. HTML
                parsing resumes after the script is executed.
              </p>
              <div className="text-lg font-semibold sm:text-xl">
                <code>async</code>
              </div>
              <p>
                In <code>&lt;script async&gt;</code>, the script will be fetched
                in parallel to HTML parsing and executed as soon as it is
                available (potentially before HTML parsing completes). Use{' '}
                <code>async</code> when the script is independent of any other
                scripts on the page, for example, analytics.
              </p>
              <div className="text-lg font-semibold sm:text-xl">
                <code>defer</code>
              </div>
              <p>
                In <code>&lt;script defer&gt;</code>, the script will be fetched
                in parallel to HTML parsing and executed when the documented has
                been parsed. If there are multiple of them, each deferred script
                is executed in the order they were encountered in the document.
              </p>
              <p>
                If a script relies on a fully-parsed DOM, the <code>defer</code>{' '}
                attribute will be useful in ensuring that the HTML is fully
                parsed before executing. A deferred script must not contain{' '}
                <code>document.write()</code>.
              </p>
              <div className="text-lg font-semibold sm:text-xl">Notes</div>
              <p>
                The <code>async</code> and <code>defer</code> attributes are
                ignored for scripts that have no <code>src</code> attribute.
              </p>
            </Prose>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pb-8 pt-32 dark:from-neutral-950">
        <Button
          href="/questions/quiz/describe-the-difference-between-script-async-and-script-defer"
          label={intl.formatMessage({
            defaultMessage: 'Show full question',
            description: 'Show full question button label',
            id: 'zc3dbu',
          })}
          target="_blank"
          variant="primary"
          onClick={() => {
            gtag.event({
              action: `homepage.hero.embed.quiz.show_full_question.click`,
              category: 'engagement',
              label: 'Show full question',
            });
          }}
        />
      </div>
    </div>
  );
}
