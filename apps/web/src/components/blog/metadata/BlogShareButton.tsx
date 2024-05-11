import {
  RiFacebookFill,
  RiLinkedinBoxFill,
  RiShareLine,
  RiTwitterXFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';
import url from 'url';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { getSiteOrigin } from '~/seo/siteUrl';

export default function BlogShareButton({
  metadata,
}: {
  metadata: BlogMetadata;
}) {
  const intl = useIntl();
  const shareOptions: ReadonlyArray<{
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: string;
  }> = [
    {
      href: new URL(
        url.format({
          pathname: '/shareArticle',
          query: {
            mini: true,
            summary: metadata.description,
            title: metadata.title,
            url: new URL(metadata.href, getSiteOrigin()).toString(),
          },
        }),
        'https://linkedin.com',
      ).toString(),
      icon: RiLinkedinBoxFill,
      label: 'LinkedIn',
      value: 'linkedin',
    },
    {
      href: new URL(
        url.format({
          pathname: '/intent/tweet',
          query: {
            text: metadata.title,
            u: new URL(metadata.href, getSiteOrigin()).toString(),
            via: 'greatfrontend',
          },
        }),
        'https://twitter.com',
      ).toString(),
      icon: RiTwitterXFill,
      label: 'Twitter',
      value: 'twitter',
    },
    {
      href: new URL(
        url.format({
          pathname: '/sharer.php',
          query: {
            u: new URL(metadata.href, getSiteOrigin()).toString(),
          },
        }),
        'https://facebook.com',
      ).toString(),
      icon: RiFacebookFill,
      label: 'Facebook',
      value: 'facebook',
    },
  ];

  return (
    <DropdownMenu
      align="end"
      icon={RiShareLine}
      label={intl.formatMessage({
        defaultMessage: 'Share',
        description: 'Blog share button label',
        id: 'OSrT+C',
      })}
      showChevron={false}
      size="sm">
      {shareOptions.map(({ label, value, icon: Icon, href }) => (
        <DropdownMenu.Item key={value} href={href} icon={Icon} label={label} />
      ))}
    </DropdownMenu>
  );
}
