import clsx from 'clsx';

import CopyLinkButton from '~/components/common/CopyLinkButton';
import ShareButton from '~/components/common/ShareButton';
import { FormattedMessage } from '~/components/intl';

type Props = Readonly<{
  className?: string;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
}>;

export default function InterviewsPageHeaderActions({
  metadata,
  className,
}: Props) {
  const copyLinkTooltip = (
    <FormattedMessage
      defaultMessage="Copy the link to this page"
      description="Tooltip for copy link"
      id="vsgUOt"
    />
  );
  const shareTooltip = (
    <FormattedMessage
      defaultMessage="Share this page"
      description="Tooltip for share button"
      id="lNb6DV"
    />
  );

  return (
    <>
      <div className={clsx('hidden items-center gap-3 md:flex', className)}>
        <CopyLinkButton
          size="xs"
          tooltip={copyLinkTooltip}
          variant="tertiary"
        />
        <ShareButton
          metadata={metadata}
          size="xs"
          tooltip={shareTooltip}
          variant="tertiary"
        />
      </div>
      <div className={clsx('flex items-center gap-3 md:hidden', className)}>
        <CopyLinkButton
          iconOnly={true}
          size="xs"
          tooltip={copyLinkTooltip}
          variant="tertiary"
        />
        <ShareButton
          iconOnly={true}
          metadata={metadata}
          size="xs"
          tooltip={shareTooltip}
          variant="tertiary"
        />
      </div>
    </>
  );
}
