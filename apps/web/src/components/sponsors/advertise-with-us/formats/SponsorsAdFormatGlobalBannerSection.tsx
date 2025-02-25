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
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeBorderElementColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';

import SponsorsAdFormatAvailableSlotInfo from './SponsorsAdFormatAvailableSlotInfo';
import SponsorsAdFormatHeader from './SponsorsAdFormatHeader';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';

export default function SponsorsAdFormatGlobalBannerSection() {
  const FORMAT = 'GLOBAL_BANNER';
  const { impressions, pages } = SponsorAdFormatConfigs[FORMAT];

  const impressionsItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Accounting for rotations with {bannerCount} other banners"
          description="Item 1 for global banner placement impressions info"
          id="dlRik2"
          values={{
            bannerCount: '2–3',
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

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdFormatHeader format={FORMAT} />
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
          <SponsorsAdFormatAvailableSlotInfo format={FORMAT} />
        </div>
        <Accordion
          className={clsx('border-y', themeBorderColor)}
          type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>
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
                    defaultMessage="Body: {characterLimit} characters in {maxLine} line"
                    description="Placement constraints"
                    id="iD2LlI"
                    values={{
                      characterLimit:
                        SponsorAdFormatConfigs.GLOBAL_BANNER
                          .placementConstraints.text,
                      maxLine: 1,
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
        )}
      />
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
