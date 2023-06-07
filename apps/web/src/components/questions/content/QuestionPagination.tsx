import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';

type PaginationItem = Readonly<{
  href: string;
  title: string;
}>;
type Props = Readonly<{
  currentHref: string;
  items: ReadonlyArray<PaginationItem>;
}>;

export default function QuestionPagination({ currentHref, items }: Props) {
  let prevQuestion = null;
  let nextQuestion = null;

  for (let i = 0; i < items.length; i++) {
    if (items[i].href !== currentHref) {
      continue;
    }
    // We have found the active item.
    if (i > 0) {
      prevQuestion = items[i - 1];
    }
    if (i + 1 < items.length) {
      nextQuestion = items[i + 1];
    }
    break;
  }

  return (
    <dl className="sm:text-1.5xl flex flex-col gap-6 border-t border-slate-200 py-6 lg:flex-row">
      <div className={clsx('grow basis-1', !prevQuestion && 'hidden')}>
        {prevQuestion && (
          <div className="focus-within:ring-brand-500 relative rounded-lg border border-slate-200 p-4 focus-within:ring-2 focus-within:ring-inset hover:bg-slate-50">
            <dt>
              <Text color="secondary" variant="body2" weight="bold">
                <span aria-hidden="true">←</span>{' '}
                <FormattedMessage
                  defaultMessage="Previous"
                  description="Button to go back to the previous page"
                  id="MYi0uz"
                />
              </Text>
            </dt>
            <dd className="mt-1">
              <Anchor
                className="line-clamp-1 text-base font-semibold text-zinc-900 hover:text-zinc-600 focus:outline-none"
                href={prevQuestion.href}
                variant="unstyled">
                {/* Extend touch target to entire panel */}
                <span aria-hidden="true" className="absolute inset-0" />
                {prevQuestion.title}
              </Anchor>
            </dd>
          </div>
        )}
      </div>
      <div className="grow basis-1 text-right">
        {nextQuestion && (
          <div className="focus-within:ring-brand-500 relative rounded-lg border border-slate-200 p-4 focus-within:ring-2 focus-within:ring-inset hover:bg-slate-50">
            <dt>
              <Text color="secondary" variant="body2" weight="bold">
                <FormattedMessage
                  defaultMessage="Next"
                  description="Button to go to the next page"
                  id="zDt/bH"
                />{' '}
                <span aria-hidden="true">→</span>
              </Text>
            </dt>
            <dd className="mt-1">
              <Anchor
                className="line-clamp-1 text-base font-semibold text-zinc-900 hover:text-zinc-600 focus:outline-none"
                href={nextQuestion.href}
                variant="unstyled">
                {/* Extend touch target to entire panel */}
                <span aria-hidden="true" className="absolute inset-0" />
                {nextQuestion.title}
              </Anchor>
            </dd>
          </div>
        )}
      </div>
    </dl>
  );
}
