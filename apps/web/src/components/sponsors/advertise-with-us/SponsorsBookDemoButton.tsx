'use client';

import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { ButtonSize } from '~/components/ui/Button';
import Button from '~/components/ui/Button';

import SponsorsBookDemoDialog from './SponsorsBookDemoDialog';

type Props = Readonly<{
  className?: string;
  size?: ButtonSize;
}>;

export default function SponsorsBookDemoButton({ className, size }: Props) {
  const intl = useIntl();
  const [showDemoDialog, setShowDemoDialog] = useState(false);

  return (
    <>
      <Button
        className={className}
        icon={RiArrowRightLine}
        label={intl.formatMessage({
          defaultMessage: 'Book a demo',
          description: 'Book a demo button label',
          id: 'NuPL6v',
        })}
        size={size}
        variant="primary"
        onClick={() => {
          setShowDemoDialog(true);
        }}
      />
      <SponsorsBookDemoDialog
        isShown={showDemoDialog}
        onClose={() => setShowDemoDialog(false)}
      />
    </>
  );
}
