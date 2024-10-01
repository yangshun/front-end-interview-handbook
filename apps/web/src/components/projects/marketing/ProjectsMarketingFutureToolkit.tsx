'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Container from '~/components/ui/Container';
import {
  themeBackgroundCardAltColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

export default function ProjectsMarketingFutureToolkit() {
  return (
    <Container className="py-16 lg:py-32">
      <div
        className={clsx(
          'text-balance rounded-[48px] border px-6 py-12 lg:px-[72px] lg:py-20',
          themeBackgroundCardAltColor,
          themeGlassyBorder,
        )}>
        <MarketingSectionHeader
          description={
            <div>
              <FormattedMessage
                defaultMessage="Our projects are never one-off - they always fit into some component library or design system with other projects. Any projects you build can be composed to build future projects, forming an ever-growing toolkit for your future."
                description="Part 1 of subtitle of the 'Permanent toolkit' marketing section on Projects home page"
                id="w+HZnz"
              />
              <br />
              <br />
              <FormattedMessage
                defaultMessage="Never waste your time building one-off projects again!"
                description="Part 2 of subtitle of the 'Permanent toolkit' marketing section on Projects home page"
                id="LFxhgC"
              />
            </div>
          }
          heading={
            <FormattedMessage
              defaultMessage="Each project you build adds to your permanent toolkit"
              description="Heading of the 'Permanent toolkit' marketing section on Projects home page"
              id="j1T8lc"
            />
          }
          title={
            <FormattedMessage
              defaultMessage="Useful into the future"
              description="Title of the 'Permanent toolkit' marketing section on Projects home page"
              id="p17SP8"
            />
          }
        />
      </div>
    </Container>
  );
}
