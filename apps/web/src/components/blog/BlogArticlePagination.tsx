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

export default function BlogArticlePagination({ currentHref, items }: Props) {
  let prevArticle = null;
  let nextArticle = null;

  for (let i = 0; i < items.length; i++) {
    if (items[i].href !== currentHref) {
      continue;
    }
    // We have found the active item.
    if (i > 0) {
      prevArticle = items[i - 1];
    }
    if (i + 1 < items.length) {
      nextArticle = items[i + 1];
    }
    break;
  }

  return (
    <div className="flex gap-8">
      {prevArticle && (
        <div className="flex basis-1/2 flex-col items-start gap-3">
          <Anchor
            className="inline-flex justify-center gap-1 overflow-hidden rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 dark:bg-neutral-800/40 dark:text-neutral-400 dark:ring-1 dark:ring-inset dark:ring-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            href={prevArticle.href}
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
            className="line-clamp-2 text-sm font-normal text-neutral-900 transition hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            href={prevArticle.href}
            variant="unstyled">
            {prevArticle.title}
          </Anchor>
        </div>
      )}
      {nextArticle && (
        <div className="ml-auto flex basis-1/2 flex-col items-end gap-3">
          <Anchor
            className="inline-flex justify-center gap-1 overflow-hidden rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 dark:bg-neutral-800/40 dark:text-neutral-400 dark:ring-1 dark:ring-inset dark:ring-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            href={nextArticle.href}
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
            className="line-clamp-2 text-right text-sm font-normal text-neutral-900 transition hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            href={nextArticle.href}
            variant="unstyled">
            {nextArticle.title}
          </Anchor>
        </div>
      )}
    </div>
  );
}