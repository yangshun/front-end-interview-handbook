import { RiCheckLine, RiLinksLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import Button from '~/components/ui/Button';

import { getSiteUrl } from '~/seo/siteUrl';

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
              description: 'Blog link copied button label',
              id: 'vC8ERT',
            })
          : intl.formatMessage({
              defaultMessage: 'Copy Link',
              description: 'Blog copy Link button label',
              id: '9+dL62',
            })
      }
      size="sm"
      variant="secondary"
      onClick={() => onCopy(`${getSiteUrl()}${href}`)}
    />
  );
}
