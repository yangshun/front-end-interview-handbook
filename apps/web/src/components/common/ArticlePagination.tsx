import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

type PaginationItem = Readonly<{
  href?: string;
  slug?: string;
  title: string;
}>;

type Props = Readonly<{
  activeItem: string;
  items: ReadonlyArray<PaginationItem>;
  onNext?: () => void;
  onPrev?: () => void;
  onSelect?: (value: string) => void;
}>;

export default function ArticlePagination({
  activeItem,
  items,
  onSelect,
  onNext,
  onPrev,
}: Props) {
  let prevArticle: PaginationItem | null = null;
  let nextArticle: PaginationItem | null = null;

  for (let i = 0; i < items.length; i++) {
    if (items[i]?.href !== activeItem && items[i].slug !== activeItem) {
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

  const prevButtonCommonProps = {
    children: (
      <>
        <span aria-hidden={true}>←</span>
        <FormattedMessage
          defaultMessage="Previous"
          description="Button to go back to the previous page"
          id="MYi0uz"
        />
      </>
    ),
    className:
      'dark:bg-neutral-800/40 inline-flex justify-center gap-1 overflow-hidden rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 dark:text-neutral-400 dark:ring-1 dark:ring-inset dark:ring-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-300',
    onClick: onPrev,
  };

  const nextButtonCommonProps = {
    children: (
      <>
        <FormattedMessage
          defaultMessage="Next"
          description="Button to go to the next page"
          id="zDt/bH"
        />
        <span aria-hidden={true}>→</span>
      </>
    ),
    className:
      'dark:bg-neutral-800/40 inline-flex justify-center gap-1 overflow-hidden rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 dark:text-neutral-400 dark:ring-1 dark:ring-inset dark:ring-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-300',
    onClick: onNext,
  };

  const prevLabelProps = {
    children: prevArticle?.title,
    className:
      'line-clamp-2 text-base font-semibold text-neutral-900 transition hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300',
  };

  const nextLabelProps = {
    children: nextArticle?.title,
    className:
      'line-clamp-2 text-right text-base font-semibold text-neutral-900 transition hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300',
  };

  return (
    <div className="flex gap-8">
      {prevArticle && (
        <div className="flex basis-1/2 flex-col items-start gap-3">
          {prevArticle.href ? (
            <>
              <Anchor
                href={prevArticle.href}
                variant="unstyled"
                {...prevButtonCommonProps}
              />
              <Anchor
                aria-hidden={true}
                href={prevArticle.href}
                variant="unstyled"
                {...prevLabelProps}
              />
            </>
          ) : (
            <button
              type="button"
              {...prevButtonCommonProps}
              onClick={() => {
                onSelect?.(prevArticle?.slug ?? '');
                prevButtonCommonProps.onClick?.();
              }}
            />
          )}
        </div>
      )}
      {nextArticle && (
        <div className="ml-auto flex basis-1/2 flex-col items-end gap-3">
          {nextArticle.href ? (
            <>
              <Anchor
                href={nextArticle.href}
                variant="unstyled"
                {...nextButtonCommonProps}
              />
              <Anchor
                aria-hidden={true}
                href={nextArticle.href}
                variant="unstyled"
                {...nextLabelProps}
              />
            </>
          ) : (
            <button
              type="button"
              {...nextButtonCommonProps}
              onClick={() => {
                onSelect?.(nextArticle?.slug ?? '');
                nextButtonCommonProps.onClick?.();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
