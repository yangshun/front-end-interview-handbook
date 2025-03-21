'use client';

import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import {
  useQuestionFormatsData,
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import { FormattedMessage, useIntl } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import SponsorsAdFormatInfoAccordion from './SponsorsAdFormatInfoAccordion';
import SponsorsAdFormatPlacementInfo from './SponsorsAdFormatPlacementInfo';

export default function SponsorsAdFormatSpotlightSectionAccordionInfo() {
  const intl = useIntl();
  const questionListingPages = useSponsorsAdSpotlightQuestionListingPages();
  const placementConstraints = [
    {
      key: 'title',
      label: (
        <FormattedMessage
          defaultMessage="One-liner: {characterLimit} characters maximum, not more than 1 link"
          description="Title placement constraints"
          id="Z40/iW"
          values={{
            characterLimit:
              SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.text,
          }}
        />
      ),
    },
    {
      key: 'image',
      label: (
        <FormattedMessage
          defaultMessage="Image: {width}px x {height}px ({ratio}:1 ratio)"
          description="Image placement constraints"
          id="1qwgK6"
          values={{
            height:
              SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.height,
            ratio:
              (SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.width ?? 0) /
              (SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.height ?? 1),
            width:
              SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.width,
          }}
        />
      ),
    },
  ];
  const placementInfo = [
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{pagesCount}+ pages',
          description: 'Label for pages count',
          id: 'EVrvEF',
        },
        {
          pagesCount: 50, // Rounded number of pages where sidebar appears
        },
      ),
      img: {
        alt: 'Spotlight Ad Placement in app sidebar',
        srcDark: '/img/sponsors/spotlight-placement-sidebar-dark.png',
        srcLight: '/img/sponsors/spotlight-placement-sidebar-light.png',
      },
      key: 'sidebar',
      title: intl.formatMessage({
        defaultMessage: 'Application Sidebar',
        description: 'Label for spotlight ad placement in app sidebar',
        id: 'jNY7ys',
      }),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{pagesCount}+ pages',
          description: 'Label for pages count',
          id: 'EVrvEF',
        },
        {
          pagesCount: roundQuestionCountToNearestTen(
            questionListingPages.length,
          ),
        },
      ),
      img: {
        alt: 'Spotlight Ad Placement in question detail page',
        srcDark: '/img/sponsors/spotlight-placement-question-detail-dark.png',
        srcLight: '/img/sponsors/spotlight-placement-question-detail-light.png',
      },
      key: 'question-detail',
      title: intl.formatMessage({
        defaultMessage: 'All Question Detail pages',
        description:
          'Label Label for spotlight ad placement in question detail pages',
        id: 'rSr8Ph',
      }),
    },
  ];
  const accordionItems = [
    {
      content: (
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
      ),
      key: 'item1',
      title: (
        <FormattedMessage
          defaultMessage="View placement constraints"
          description="Accordion trigger label"
          id="NLQRm+"
        />
      ),
    },
    {
      content: (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:gap-10">
          {placementInfo.map((item) => (
            <SponsorsAdFormatPlacementInfo
              key={item.key}
              badgeLabel={item.badgeLabel}
              className="col-span-1"
              img={item.img}
              placementPages={
                item.key === 'question-detail'
                  ? questionListingPages
                  : undefined
              }
              title={item.title}
            />
          ))}
        </div>
      ),
      key: 'item2',
      title: (
        <FormattedMessage
          defaultMessage="Specific locations this ad will be shown"
          description="Label for specific locations this ad will be shown"
          id="z9d6Ys"
        />
      ),
    },
  ];

  return <SponsorsAdFormatInfoAccordion items={accordionItems} />;
}

function useSponsorsAdSpotlightQuestionListingPages() {
  const { data } = trpc.sponsors.spotlightPlacements.useQuery();
  const questionLanguagesData = useQuestionLanguagesData();
  const questionLanguagesPages = Object.keys(questionLanguagesData).map(
    (key) => {
      const { href, longName, value } =
        questionLanguagesData[key as keyof typeof questionLanguagesData];

      return { href, key: value, name: longName };
    },
  );
  const questionFrameworkData = useQuestionFrameworksData();
  const questionFrameworkPages = Object.keys(questionFrameworkData)
    .filter((key) => key !== 'vanilla')
    .map((key) => {
      const { href, longName, value } =
        questionFrameworkData[key as keyof typeof questionFrameworkData];

      return { href, key: value, name: longName };
    });
  const questionFormatsData = useQuestionFormatsData();
  const questionFormatsPages = Object.keys(questionFormatsData).map((key) => {
    const { href, listingName, value } =
      questionFormatsData[key as keyof typeof questionFormatsData];

    return { href, key: value, name: listingName };
  });

  return [
    ...questionLanguagesPages,
    ...questionFrameworkPages,
    ...questionFormatsPages,
    ...(data || []),
  ];
}
