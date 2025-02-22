'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeDivideColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';

import SponsorsAdFormatHeader from './SponsorsAdFormatHeader';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';

export default function SponsorsAdFormatInContentSection() {
  const intl = useIntl();
  const { impressions, pages } = SponsorAdFormatConfigs.IN_CONTENT;

  const impressionsItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Will be rotated with an ad unit from 1 other sponsor"
          description="Item 1 for in content ad placement impressions info"
          id="9I1J4a"
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
          defaultMessage="Based on averages derived from last {days}d data"
          description="Item 2 for in content ad placement impressions info"
          id="YaVS4f"
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
          defaultMessage="Included in all our questions and guides pages"
          description="Item 1 for in content ad placement pages info"
          id="F4tK8l"
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

  const placementConstraints = [
    {
      key: 'title',
      label: (
        <FormattedMessage
          defaultMessage="Title: {charactersLimit} characters max {maxLinkCount} link"
          description="Title placement constraints"
          id="FDIoJ9"
          values={{
            charactersLimit: 55,
            maxLinkCount: 1,
          }}
        />
      ),
    },
    {
      key: 'body',
      label: (
        <FormattedMessage
          defaultMessage="Body: {charactersLimit} characters max {maxLinkCount} links"
          description="Body placement constraints"
          id="vMEMKV"
          values={{
            charactersLimit: 800,
            maxLinkCount: 3,
          }}
        />
      ),
    },
    {
      key: 'image',
      label: (
        <FormattedMessage
          defaultMessage="Image: Ideally {width}px x {height}px"
          description="Image placement constraints"
          id="OwNRRU"
          values={{
            height: 190,
            width: 380,
          }}
        />
      ),
    },
  ];

  const placementInfo = [
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ questions',
          description: 'Label for questions count',
          id: 'O9HLcY',
        },
        { questionCount: 500 },
      ),
      img: {
        alt: 'In Content Ad Placement in coding workspace',
        srcDark: '/img/sponsors/in-content-placement-workspace-dark.png',
        srcLight: '/img/sponsors/in-content-placement-workspace-light.png',
      },
      key: 'workspace',
      title: (
        <FormattedMessage
          defaultMessage="Coding workspace"
          description="Label for in content placement in workspace"
          id="8yb0/o"
        />
      ),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ quizzes',
          description: 'Label for quizzes count',
          id: 'M++J8U',
        },
        { questionCount: 300 },
      ),
      img: {
        alt: 'In Content Ad Placement in quiz questions',
        srcDark: '/img/sponsors/in-content-placement-quiz-dark.png',
        srcLight: '/img/sponsors/in-content-placement-quiz-light.png',
      },
      key: 'quiz',
      title: (
        <FormattedMessage
          defaultMessage="Quiz questions"
          description="Label for in content placement in quiz questions"
          id="Kshski"
        />
      ),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{guidesCount}+ guides pages',
          description: 'Label for guides count',
          id: 'KgLyGJ',
        },
        { guidesCount: 50 },
      ),
      img: {
        alt: 'In Content Ad Placement in guides',
        srcDark: '/img/sponsors/in-content-placement-guides-dark.png',
        srcLight: '/img/sponsors/in-content-placement-guides-light.png',
      },
      key: 'guides',
      title: (
        <FormattedMessage
          defaultMessage="Interview Guides"
          description="Label for in content placement in guides"
          id="1p5F3G"
        />
      ),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{questionCount} questions',
          description: 'Label for questions count',
          id: 'bryw70',
        },
        { questionCount: 10 },
      ),
      img: {
        alt: 'In Content Ad Placement in system design',
        srcDark: '/img/sponsors/in-content-placement-system-design-dark.png',
        srcLight: '/img/sponsors/in-content-placement-system-design-light.png',
      },
      key: 'guides',
      title: (
        <FormattedMessage
          defaultMessage="System Design"
          description="Label for in content placement in system design"
          id="y1IBOv"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdFormatHeader placement="IN_CONTENT" />
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
          className={clsx(
            'border-b border-t',
            themeBorderColor,
            themeDivideColor,
          )}
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
              <ul className="flex flex-col gap-4" role="list">
                {placementConstraints.map((item) => (
                  <li key={item.key} className="flex gap-x-2">
                    <RiCheckLine
                      aria-hidden="true"
                      className={clsx('size-4 shrink-0', themeTextSuccessColor)}
                    />
                    <Text color="subtitle" size="body2">
                      {item.label}
                    </Text>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="w-full">
              <FormattedMessage
                defaultMessage="Specific locations this ad will be shown"
                description="Label for specific locations this ad will be shown"
                id="z9d6Ys"
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:gap-10">
                {placementInfo.map((item) => (
                  <PlacementInfo
                    key={item.key}
                    badgeLabel={item.badgeLabel}
                    className="col-span-1"
                    img={item.img}
                    title={item.title}
                  />
                ))}
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
    <>
      {/* Light mode image */}
      <img
        alt="In content ad placement preview"
        className={clsx('h-auto w-full object-cover', 'block dark:hidden')}
        src="/img/sponsors/in-content-ad-placement-light.png"
      />

      {/* Dark mode image */}
      <img
        alt="In content ad placement preview"
        className={clsx('h-auto w-full object-cover', 'hidden dark:block')}
        src="/img/sponsors/in-content-ad-placement-dark.png"
      />
    </>
  );
}

type PlacementInfoProps = Readonly<{
  badgeLabel: string;
  className?: string;
  img: {
    alt: string;
    srcDark: string;
    srcLight: string;
  };
  title: ReactNode;
}>;

function PlacementInfo({
  className,
  img,
  badgeLabel,
  title,
}: PlacementInfoProps) {
  return (
    <div
      className={clsx('relative', 'w-full', 'flex flex-col gap-5', className)}>
      <div className="flex items-center gap-3">
        <Text className="text-base lg:text-sm" color="subtitle" size="inherit">
          {title}
        </Text>
        <Badge label={badgeLabel} size="sm" variant="neutral-active" />
      </div>
      {/* Light mode image */}
      <img
        alt={img.alt}
        className={clsx('h-auto w-full object-cover', 'block dark:hidden')}
        decoding="async"
        loading="lazy"
        src={img.srcLight}
      />

      {/* Dark mode image */}
      <img
        alt={img.alt}
        className={clsx('h-auto w-full object-cover', 'hidden dark:block')}
        decoding="async"
        loading="lazy"
        src={img.srcDark}
      />
    </div>
  );
}
