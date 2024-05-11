import {
  RiFacebookFill,
  RiLinkedinBoxFill,
  RiShareLine,
  RiTwitterFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

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
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${getSiteOrigin()}${
        metadata.href
      }&title=${metadata.title}&summary=${metadata.description}`,
      icon: RiLinkedinBoxFill,
      label: 'LinkedIn',
      value: 'linkedin',
    },
    {
      href: `https://twitter.com/intent/tweet?text=${
        metadata.title
      }&url=${getSiteOrigin()}${metadata.href}&via=greatfrontend`,
      icon: RiTwitterFill,
      label: 'Twitter',
      value: 'twitter',
    },
    {
      href: `https://facebook.com/sharer.php?u=${getSiteOrigin()}${
        metadata.href
      }`,
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
