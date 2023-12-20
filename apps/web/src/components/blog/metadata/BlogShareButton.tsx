import clsx from 'clsx';
import {
  RiFacebookFill,
  RiLinkedinBoxFill,
  RiShareLine,
  RiTwitterFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import Anchor from '~/components/ui/Anchor';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';

import { getSiteUrl } from '~/seo/siteUrl';

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
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${getSiteUrl()}${
        metadata.href
      }&title=${metadata.title}&summary=${metadata.description}`,
      icon: RiLinkedinBoxFill,
      label: 'LinkedIn',
      value: 'linkedin',
    },
    {
      href: `https://twitter.com/intent/tweet?text=${
        metadata.title
      }&url=${getSiteUrl()}${metadata.href}&via=greatfrontend`,
      icon: RiTwitterFill,
      label: 'Twitter',
      value: 'twitter',
    },
    {
      href: `https://facebook.com/sharer.php?u=${getSiteUrl()}${metadata.href}`,
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
        <Anchor
          key={value}
          className={clsx(
            'block px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900',
            'w-full text-left',
            'rounded',
          )}
          href={href}
          variant="unstyled">
          <Text className="items-center gap-x-2" display="flex" size="body2">
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Text>
        </Anchor>
      ))}
    </DropdownMenu>
  );
}
