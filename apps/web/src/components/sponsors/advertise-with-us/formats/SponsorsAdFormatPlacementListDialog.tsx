import clsx from 'clsx';
import { RiArrowRightUpLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  title: string;
}>;

// TODO(sponsors): Replace with real data
const pages = [
  {
    href: '/',
    title: 'Browser and language polyfills',
  },
  {
    href: '/',
    title: 'Async operations',
  },
  {
    href: '/',
    title: 'Accessibility',
  },
  {
    href: '/',
    title: 'Higher order functions',
  },
  {
    href: '/',
    title: 'DOM APIs',
  },
];

export default function SponsorsAdFormatPlacementListDialog({
  isShown,
  title,
  onClose,
}: Props) {
  return (
    <Dialog
      className="max-h-[50vh]"
      isShown={isShown}
      scrollable={true}
      title={title}
      width="sm"
      onClose={onClose}>
      <div
        className={clsx('flex flex-col', [
          'divide-y',
          'divide-neutral-300 dark:divide-neutral-700',
          'max-',
        ])}>
        {pages.map((page) => (
          <div
            key={page.title}
            className={clsx(
              'flex items-center justify-between gap-2',
              'py-3 first:pt-0 last:pb-0',
            )}>
            <Text color="subtitle" size="body2">
              {page.title}
            </Text>
            <Button
              href={page.href}
              icon={RiArrowRightUpLine}
              isLabelHidden={true}
              label="View page"
              size="xs"
              variant="secondary"
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
}
