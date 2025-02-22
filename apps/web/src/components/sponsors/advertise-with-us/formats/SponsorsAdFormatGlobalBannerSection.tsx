import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeBorderElementColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';

import SponsorsAdFormatHeader from './SponsorsAdFormatHeader';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';

export default function SponsorsAdFormatGlobalBannerSection() {
  const { impressions, pages } = SponsorAdFormatConfigs.GLOBAL_BANNER;

  const impressionsItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Accounting for rotations with {bannerCount} other banners"
          description="Item 1 for global banner placement impressions info"
          id="dlRik2"
          values={{
            bannerCount: '2-3',
          }}
        />
      ),
    },
    {
      key: 'item2',
      label: (
        <FormattedMessage
          defaultMessage="Based on last {days} days data"
          description="Item 2 for global banner placement impressions info"
          id="AMx8j7"
          values={{
            days: 90,
          }}
        />
      ),
    },
  ];
  const pagesItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Global banner that appears on all pages"
          description="Item 1 for global banner placement pages info"
          id="5fF7Tn"
        />
      ),
    },
  ];

  // TODO(advertise): Replace hardcoded slot items
  const slotItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Monday 28 Jan - Sunday 01 Feb"
          description="Item 1 for global banner placement slot info"
          id="KbcuWF"
        />
      ),
    },
    {
      key: 'item2',
      label: (
        <FormattedMessage
          defaultMessage="Monday 14 Jan - Sunday 16 Feb"
          description="Item 2 for global banner placement slot info"
          id="TyhBEz"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdFormatHeader placement="GLOBAL_BANNER" />
      <div className="flex flex-col gap-10">
        <Asset />
        <div className="flex flex-col gap-x-6 gap-y-10 sm:flex-row">
          <SponsorsAdFormatInfo
            className="flex-1"
            items={impressionsItems}
            title={`${impressions}+`}
            type="impressions"
          />
          <SponsorsAdFormatInfo
            className="flex-1"
            items={pagesItems}
            title={`${pages}+`}
            type="pages"
          />
          <SponsorsAdFormatInfo
            addOnItem={
              <Anchor variant="flat">
                <Text size="body3" weight="medium">
                  <FormattedMessage
                    defaultMessage="See more available slots"
                    description="See more available slots"
                    id="PMbV3v"
                  />
                  {' ->'}
                </Text>
              </Anchor>
            }
            className="flex-1"
            items={slotItems}
            title="23 Feb 2025" // TODO(advertise) : Remove hardcoded date
            type="slot"
          />
        </div>
        <Accordion
          className={clsx('border-b border-t', themeBorderColor)}
          type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger className="w-full">
              <FormattedMessage
                defaultMessage="View placement constraints"
                description="Accordion trigger label"
                id="NLQRm+"
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-x-2">
                <RiCheckLine
                  aria-hidden="true"
                  className={clsx('size-4 shrink-0', themeTextSuccessColor)}
                />
                <Text color="subtitle" size="body2">
                  <FormattedMessage
                    defaultMessage="Body: {charactersLimit} characters max 1 line"
                    description="Placement constraints"
                    id="9L3fSb"
                    values={{
                      charactersLimit: 55,
                    }}
                  />
                </Text>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function Asset() {
  return (
    <div
      className={clsx(
        'relative',
        'h-[200px] w-full overflow-hidden sm:h-[155px] lg:h-[200px]',
        'rounded-[4px] sm:rounded-lg lg:rounded-xl',
      )}>
      <div
        className={clsx(
          'pointer-events-none absolute inset-0',
          'rounded-[inherit]',
          ['border', themeBorderElementColor],
        )}></div>
      {/* Light mode image */}
      <picture className={clsx('block dark:hidden')}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/sponsors/global-banner-mobile-light.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/sponsors/global-banner-light.png"
        />
        <img
          alt="Global banner placement preview"
          className="h-[200px] w-full object-cover object-top md:h-full lg:h-auto"
          decoding="async"
          loading="lazy"
          src="/img/sponsors/global-banner-light.png"
        />
      </picture>

      {/* Dark mode image */}
      <picture className={clsx('hidden dark:block')}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/sponsors/global-banner-mobile-dark.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/sponsors/global-banner-dark.png"
        />
        <img
          alt="Global banner placement preview"
          className="h-[200px] w-full object-cover object-top md:h-full lg:h-auto"
          decoding="async"
          loading="lazy"
          src="/img/sponsors/global-banner-dark.png"
        />
      </picture>
    </div>
  );
}
