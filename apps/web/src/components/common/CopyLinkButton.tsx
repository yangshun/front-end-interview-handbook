import type { ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { RiLinksLine } from 'react-icons/ri';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import type {
  TooltipContentAlignment,
  TooltipContentSide,
} from '~/components/ui/Tooltip';

export type CopyLinkTriggerVariant = 'secondary' | 'tertiary';
export type CopyLinkTriggerSize = 'md' | 'sm' | 'xs';

type Props = Readonly<{
  href?: string;
  iconOnly?: boolean;
  size?: CopyLinkTriggerSize;
  tooltip?: ReactNode;
  tooltipAlign?: TooltipContentAlignment;
  tooltipSide?: TooltipContentSide;
  variant?: CopyLinkTriggerVariant;
}>;

export default function CopyLinkButton({
  href,
  iconOnly,
  size,
  variant,
  ...props
}: Props) {
  const intl = useIntl();

  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  return (
    <Button
      addonPosition="start"
      icon={isCopied ? FaCheck : RiLinksLine}
      isLabelHidden={iconOnly}
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
      onClick={() =>
        onCopy(
          href
            ? new URL(href, window.location.href).toString()
            : new URL(window.location.href).toString(),
        )
      }
      {...props}
    />
  );
}
