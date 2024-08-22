import { RiCheckLine, RiLinksLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import Button from '~/components/ui/Button';

export type CopyLinkTriggerVariant = 'secondary' | 'tertiary';
export type CopyLinkTriggerSize = 'md' | 'sm' | 'xs';

type Props = Readonly<{
  href: string;
  size?: CopyLinkTriggerSize;
  variant?: CopyLinkTriggerVariant;
}>;

export default function CopyLinkButton({ href, size, variant }: Props) {
  const intl = useIntl();

  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  return (
    <Button
      addonPosition="start"
      icon={isCopied ? RiCheckLine : RiLinksLine}
      label={
        isCopied
          ? intl.formatMessage({
              defaultMessage: 'Copied',
              description: 'Copied state button label',
              id: '+gYfrY',
            })
          : intl.formatMessage({
              defaultMessage: 'Copy link',
              description: 'Copy button label',
              id: 'dFjMzR',
            })
      }
      size={size ?? 'sm'}
      variant={variant ?? 'secondary'}
      onClick={() => onCopy(new URL(href, window.location.href).toString())}
    />
  );
}
