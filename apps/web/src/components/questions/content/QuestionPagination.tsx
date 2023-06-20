import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';

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
    <div className="flex gap-8">
      {prevQuestion && (
        <div className="flex basis-1/2 flex-col items-start gap-3">
          <Anchor
            className="inline-flex justify-center gap-1 overflow-hidden rounded-full bg-zinc-100 py-1 px-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            href={prevQuestion.href}
            variant="unstyled">
            <span aria-hidden={true}>←</span>
            <FormattedMessage
              defaultMessage="Previous"
              description="Button to go back to the previous page"
              id="MYi0uz"
            />
          </Anchor>
          <Anchor
            aria-hidden={true}
            className="line-clamp-2 text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            href="/webhooks"
            variant="unstyled">
            {prevQuestion.title}
          </Anchor>
        </div>
      )}
      {nextQuestion && (
        <div className="ml-auto flex basis-1/2 flex-col items-end gap-3">
          <Anchor
            className="inline-flex justify-center gap-1 overflow-hidden rounded-full bg-zinc-100 py-1 px-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            href={nextQuestion.href}
            variant="unstyled">
            <FormattedMessage
              defaultMessage="Next"
              description="Button to go to the next page"
              id="zDt/bH"
            />
            <span aria-hidden={true}>→</span>
          </Anchor>
          <Anchor
            aria-hidden={true}
            className="line-clamp-2 text-right text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            href={nextQuestion.href}
            variant="unstyled">
            {nextQuestion.title}
          </Anchor>
        </div>
      )}
    </div>
  );
}
