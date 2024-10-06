import clsx from 'clsx';

import CopyLinkButton from '~/components/common/CopyLinkButton';
import ShareButton from '~/components/common/ShareButton';

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
  return (
    <>
      <div className={clsx('hidden items-center gap-3 md:flex', className)}>
        <CopyLinkButton size="xs" variant="tertiary" />
        <ShareButton metadata={metadata} size="xs" variant="tertiary" />
      </div>
      <div className={clsx('flex items-center gap-3 md:hidden', className)}>
        <CopyLinkButton iconOnly={true} size="xs" variant="tertiary" />
        <ShareButton
          iconOnly={true}
          metadata={metadata}
          size="xs"
          variant="tertiary"
        />
      </div>
    </>
  );
}
