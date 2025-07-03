'use client';

import type { SponsorsAdFormat } from '@prisma/client';
import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import { useSponsorsAdFormatData } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSubtitleColor } from '~/components/ui/theme';

import SponsorsBookDemoButton from '../SponsorsBookDemoButton';

type Props = Readonly<{
  format: SponsorsAdFormat;
}>;

export default function SponsorsAdFormatHeader({ format }: Props) {
  const placementData = useSponsorsAdFormatData();
  const { description, name } = placementData[format];

  return (
    <div className="flex flex-col gap-x-4 gap-y-6 sm:flex-row sm:items-center">
      <div className="w-full space-y-3">
        <Heading
          className={clsx(
            'md:-tracking-1 md:text-3xl',
            'text-2xl',
            themeTextSubtitleColor,
          )}
          color="custom"
          level="custom"
          weight="medium">
          {name}
        </Heading>
        <Text
          className={clsx('text-base lg:text-lg lg:font-medium', 'block')}
          color="secondary"
          size="inherit"
          weight="inherit">
          {description}
        </Text>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-3 sm:items-end">
        <SponsorsBookDemoButton className="w-full sm:w-auto" size="md" />
        <Text color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="Get all questions answered"
            description="Get all questions answered text"
            id="KAl4xt"
          />
        </Text>
      </div>
    </div>
  );
}
