import { RiCheckLine, RiLinksLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import Button from '~/components/ui/Button';

import { getSiteOrigin } from '~/seo/siteUrl';

export default function BlogCopyLinkButton({ href }: { href: string }) {
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
      size="sm"
      variant="secondary"
      onClick={() => onCopy(`${getSiteOrigin()}${href}`)}
    />
  );
}
