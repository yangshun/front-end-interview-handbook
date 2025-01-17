import type { ReactNode } from 'react';
import {
  RiFacebookFill,
  RiLinkedinBoxFill,
  RiShareLine,
  RiTwitterXFill,
} from 'react-icons/ri';
import url from 'url';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import type {
  DropdownMenuTriggerSize,
  DropdownMenuTriggerVariant,
} from '~/components/ui/DropdownMenu';
import DropdownMenu from '~/components/ui/DropdownMenu';
import type {
  TooltipContentAlignment,
  TooltipContentSide,
} from '~/components/ui/Tooltip';

import { getSiteOrigin } from '~/seo/siteUrl';

type Props = Readonly<{
  iconOnly?: boolean;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
  size?: DropdownMenuTriggerSize;
  tooltip?: ReactNode;
  tooltipAlign?: TooltipContentAlignment;
  tooltipSide?: TooltipContentSide;
  variant?: DropdownMenuTriggerVariant;
}>;

export default function ShareButton({
  metadata,
  size = 'sm',
  variant,
  iconOnly,
  ...props
}: Props) {
  const intl = useIntl();
  const shareOptions: ReadonlyArray<{
    href: string;
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
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
            url: new URL(metadata.href, getSiteOrigin()).toString(),
            via: 'greatfrontend',
          },
        }),
        'https://x.com',
      ).toString(),
      icon: RiTwitterXFill,
      label: 'X / Twitter',
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
      trigger={
        <Button
          addonPosition="start"
          icon={RiShareLine}
          isLabelHidden={iconOnly}
          label={intl.formatMessage({
            defaultMessage: 'Share',
            description: 'Share button label',
            id: '7J8+8B',
          })}
          size={size ?? 'sm'}
          variant={variant ?? 'secondary'}
          {...props}
        />
      }>
      {shareOptions.map(({ label, value, icon: Icon, href }) => (
        <DropdownMenu.Item key={value} href={href} icon={Icon} label={label} />
      ))}
    </DropdownMenu>
  );
}
