import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ButtonVariant } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';

type CardVariant = 'anonymous' | 'free' | 'premium';

type Props =
  | Readonly<{
      unlocksRemaining: number;
      unlocksTotal: number;
      variant: 'premium';
    }>
  | Readonly<{
      unlocksRemaining?: number;
      unlocksTotal?: number;
      variant: 'free';
    }>
  | Readonly<{
      variant: 'anonymous';
    }>;

function useVariantConfigs() {
  const intl = useIntl();

  const variantConfigs: Record<
    CardVariant,
    Readonly<{
      cta: {
        href: string;
        icon?: (props_: React.ComponentProps<'svg'>) => JSX.Element;
        label: string;
        variant: ButtonVariant;
      };
      subtitle: string;
      title: string;
    }>
  > = {
    anonymous: {
      cta: {
        href: '/projects/challenges',
        icon: RiArrowRightLine,
        label: intl.formatMessage({
          defaultMessage: 'Start a project',
          description: 'Start a new practice project',
          id: 'XJJ/hU',
        }),
        variant: 'secondary',
      },
      subtitle: intl.formatMessage({
        defaultMessage: 'Learning by building has never been easier',
        description: 'Card title for projects',
        id: 'lUWoS/',
      }),
      title: intl.formatMessage({
        defaultMessage: "Let's start",
        description: 'Projects sidebar card CTA title',
        id: 'g2dFxo',
      }),
    },
    free: {
      cta: {
        href: '/projects/pricing',
        label: intl.formatMessage({
          defaultMessage: 'Get full access',
          description: 'Button CTA to encourage upgrading',
          id: 'GPFB6p',
        }),
        variant: 'primary',
      },
      subtitle: intl.formatMessage(
        {
          defaultMessage:
            'Access to {freeChallengeCount}+ free challenges. No access to Figma & guides',
          description: 'Subtitle of Free Plan CTA card in Projects sidebar',
          id: 'QzHPOD',
        },
        {
          freeChallengeCount: 50,
        },
      ),
      title: intl.formatMessage({
        defaultMessage: 'Free plan',
        description: 'Title of projects CTA card',
        id: '81/cnt',
      }),
    },
    premium: {
      cta: {
        href: '/projects/pricing',
        label: intl.formatMessage({
          defaultMessage: 'Upgrade access',
          description: 'CTA label',
          id: 'ZMFqeK',
        }),
        variant: 'primary',
      },
      subtitle: intl.formatMessage(
        {
          defaultMessage: 'Access to premium tracks and skills',
          description: 'Subtitle projects CTA card',
          id: '7OnamK',
        },
        {
          freeChallengeCount: 50,
        },
      ),
      title: intl.formatMessage(
        {
          defaultMessage: '{planType} plan',
          description: 'Title of projects CTA card',
          id: 'rliXIi',
        },
        {
          planType: 'TODO(projects):',
        },
      ),
    },
  };

  return variantConfigs;
}

export function ProjectsSidebarCTACard(props: Props) {
  const variantConfigs = useVariantConfigs();
  const { variant } = props;
  const config = variantConfigs[variant];

  return (
    <Card disableSpotlight={true} padding={false} pattern={true}>
      <div className="flex flex-col items-stretch gap-3 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Text size="body3" weight="bold">
              {config.title}
            </Text>
            {/* TODO(projects): add tooltip for card */}
            {/* <Tooltip
              label={
                <FormattedMessage
                  defaultMessage="Free Plan CTA card tooltip"
                  description="Tooltip label for Free Plan CTA card in Projects sidebar"
                  id="WX+cIg"
                />
              }>
              <RiInformationLine
                className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
              />
            </Tooltip> */}
          </div>
          <Text size="body3">{config.subtitle}</Text>
        </div>
        <Button {...config.cta} size="xs" />
      </div>
    </Card>
  );
}
