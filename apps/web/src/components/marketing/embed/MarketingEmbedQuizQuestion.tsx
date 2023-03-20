import * as gtag from '~/lib/gtag';

import QuestionQuizTopicLabel from '~/components/questions/common/QuestionQuizTopicLabel';
import Button from '~/components/ui/Button';
import Prose from '~/components/ui/Prose';

export default function MarketingEmbedQuizQuestion() {
  return (
    <div className="relative h-full w-full">
      <div className="h-full sm:overflow-y-scroll">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 pt-4 pb-32 sm:pt-10">
            <div className="text-xl font-semibold sm:text-2xl">
              Describe the difference between{' '}
              <code className="rounded-lg bg-slate-100 px-2 py-0.5 font-thin text-neutral-700 before:content-none after:content-none">
                &lt;script&gt;
              </code>
              ,{' '}
              <code className="rounded-lg bg-slate-100 px-2 py-0.5 font-thin text-neutral-700 before:content-none after:content-none">
                &lt;script async&gt;
              </code>{' '}
              and{' '}
              <code className="rounded-lg bg-slate-100 px-2 py-0.5 font-thin text-neutral-700 before:content-none after:content-none">
                &lt;script defer&gt;
              </code>
            </div>
            <div className="flex gap-2">
              <QuestionQuizTopicLabel value="html" />
              <QuestionQuizTopicLabel value="performance" />
            </div>
            <hr />
            <Prose>
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
      <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8">
        <Button
          href="/questions/quiz/describe-the-difference-between-script-async-and-script-defer"
          label="Show full question"
          target="_blank"
          variant="special"
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
