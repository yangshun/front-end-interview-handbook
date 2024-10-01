import { useMemo } from 'react';
import { RiMoreLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

function getVisiblePageNumbers({
  currentPageNumber,
  lastPageNumber,
  adjacentPageCount,
  terminalPageDisplayCount,
}: {
  adjacentPageCount: number;
  currentPageNumber: number;
  lastPageNumber: number;
  terminalPageDisplayCount: number;
}) {
  const startRange = Array.from(
    { length: terminalPageDisplayCount },
    (_, i) => i + 1,
  );

  const endRange = Array.from(
    { length: terminalPageDisplayCount },
    (_, i) => lastPageNumber - i,
  ).reverse();

  let firstPage = currentPageNumber - adjacentPageCount;
  let lastPage = currentPageNumber + adjacentPageCount;

  // Adjust startPage if it is less than 1, then adjust endPage accordingly
  if (firstPage <= 0) {
    lastPage -= firstPage - 1;
    firstPage = 1;

    // If endPage is greater than lastPageNumber, then limit it
    if (lastPage > lastPageNumber) {
      lastPage = lastPageNumber;
    }
  } else if (lastPage > lastPageNumber) {
    // Adjust endPage if it is greater than lastPageNumber, then adjust startPage accordingly
    firstPage -= lastPage - lastPageNumber;
    lastPage = lastPageNumber;

    // If startPage is less than 1, then limit it
    if (firstPage <= 0) {
      firstPage = 1;
    }
  }

  const centerRange = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, i) => firstPage + i,
  );

  const rawPageNumbers = [...startRange, ...centerRange, ...endRange];

  // Remove duplicates
  const pageNumbers = Array.from(new Set(rawPageNumbers));
  const visiblePageNumbers: Array<{
    key: string;
    value: number | null;
  }> = [];

  // Add ellipses
  for (let i = 0; i < pageNumbers.length; i++) {
    const pageNumber = pageNumbers[i];
    const previousPageNumber = pageNumbers[i - 1];

    if (i > 0 && previousPageNumber !== pageNumber - 1) {
      visiblePageNumbers.push({
        key: `ellipsis-${pageNumber}`,
        value: null,
      });
    }

    visiblePageNumbers.push({
      key: pageNumber.toString(),
      value: pageNumber,
    });
  }

  return visiblePageNumbers;
}

// The number of pages to display before and after the current page
const ADJACENT_PAGE_COUNT = 1;
// The number of pages to display at the start and end of the pagination
const TERMINAL_PAGE_DISPLAY_COUNT = 2;

type Props = Readonly<{
  count: number;
  onPageChange?: (pageNumber: number) => void;
  page: number;
}>;

export default function Pagination({ page, count, onPageChange }: Props) {
  const intl = useIntl();
  const visiblePageNumbers = useMemo(
    () =>
      getVisiblePageNumbers({
        adjacentPageCount: ADJACENT_PAGE_COUNT,
        currentPageNumber: page,
        lastPageNumber: count,
        terminalPageDisplayCount: TERMINAL_PAGE_DISPLAY_COUNT,
      }),
    [page, count],
  );

  return (
    <nav
      aria-label={intl.formatMessage({
        defaultMessage: 'Pagination',
        description: 'Pagination label',
        id: 'DTIb2e',
      })}
      className="flex gap-2">
      {visiblePageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber.key}
          aria-current={pageNumber.value === page ? 'page' : undefined}
          icon={pageNumber.value == null ? RiMoreLine : undefined}
          isDisabled={pageNumber.value == null}
          isLabelHidden={pageNumber.value == null}
          label={
            pageNumber.value?.toString() ??
            intl.formatMessage({
              defaultMessage: 'More',
              description: 'Label for "More" button in pagination',
              id: 'XD52zM',
            })
          }
          variant={pageNumber.value === page ? 'secondary' : 'tertiary'}
          onClick={() => {
            if (onPageChange && pageNumber.value != null) {
              onPageChange(pageNumber.value);
            }
          }}
        />
      ))}
    </nav>
  );
}
