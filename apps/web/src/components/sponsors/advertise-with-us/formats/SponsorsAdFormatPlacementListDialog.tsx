'use client';

import clsx from 'clsx';
import { RiArrowRightUpLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import { themeDivideEmphasizeColor } from '~/components/ui/theme';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  placementPages: ReadonlyArray<{
    href: string;
    key: string;
    name: string;
  }>;
  title: string;
}>;

export default function SponsorsAdFormatPlacementListDialog({
  isShown,
  title,
  onClose,
  placementPages,
}: Props) {
  const intl = useIntl();

  return (
    <Dialog
      isShown={isShown}
      scrollable={true}
      title={title}
      width="sm"
      onClose={onClose}>
      <ScrollArea viewportClass="max-h-[50vh] pr-3">
        <div
          className={clsx('flex flex-col', [
            'divide-y',
            themeDivideEmphasizeColor,
          ])}>
          {placementPages.map(({ key, name, href }) => (
            <div
              key={key}
              className={clsx(
                'flex items-center justify-between gap-2',
                'py-3 first:pt-0 last:pb-0',
              )}>
              <Text color="subtitle" size="body2">
                {name}
              </Text>
              <Button
                href={href}
                icon={RiArrowRightUpLine}
                isLabelHidden={true}
                label={intl.formatMessage({
                  defaultMessage: 'View page',
                  description: 'View page button label',
                  id: 'L515WN',
                })}
                size="xs"
                variant="secondary"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Dialog>
  );
}
