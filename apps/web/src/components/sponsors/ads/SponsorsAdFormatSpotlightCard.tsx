import clsx from 'clsx';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';
import SponsorsAdFormatSpotlight from './SponsorsAdFormatSpotlight';
import React from 'react';

export default function SponsorsAdFormatSpotlightCard(
  props: Omit<
    React.ComponentProps<typeof SponsorsAdFormatSpotlight>,
    'textWeight'
  >,
) {
  return (
    <div
      className={clsx(
        'w-full',
        'p-5',
        themeBackgroundCardColor,
        themeGlassyBorder,
        'rounded-lg',
      )}>
      <SponsorsAdFormatSpotlight {...props} textWeight="medium" />
    </div>
  );
}
