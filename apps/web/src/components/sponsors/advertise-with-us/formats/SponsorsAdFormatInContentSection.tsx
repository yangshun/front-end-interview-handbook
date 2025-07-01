'use client';

import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';

import { GuidesCount } from '~/components/interviews/guides/stats/GuidesCount';
import {
  QuestionCountCoding,
  QuestionCountQuiz,
  QuestionCountSystemDesign,
} from '~/components/interviews/questions/listings/stats/QuestionCount';
import { FormattedMessage, useIntl } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import SponsorsAdFormatAvailableSlotInfo from './SponsorsAdFormatAvailableSlotInfo';
import SponsorsAdFormatHeader from './SponsorsAdFormatHeader';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';
import SponsorsAdFormatInfoAccordion from './SponsorsAdFormatInfoAccordion';
import SponsorsAdFormatPlacementInfo from './SponsorsAdFormatPlacementInfo';

export default function SponsorsAdFormatInContentSection() {
  const FORMAT = 'IN_CONTENT';
  const intl = useIntl();
  const { impressions, pages } = SponsorAdFormatConfigs[FORMAT];

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
          defaultMessage="Based on weekly averages over last {days} days"
          description="Item 2 for placement impressions info"
          id="4JGMxB"
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
          defaultMessage="Includes all our questions and guides pages"
          description="Item 1 for placement pages info"
          id="YQ5lLr"
        />
      ),
    },
  ];

  const placementConstraints = [
    {
      key: 'title',
      label: (
        <FormattedMessage
          defaultMessage="Title: {characterLimit} characters maximum"
          description="Title placement constraints"
          id="pJy0c+"
          values={{
            characterLimit:
              SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.text,
          }}
        />
      ),
    },
    {
      key: 'body',
      label: (
        <FormattedMessage
          defaultMessage="Body: {characterLimit} characters maximum, not more than {maxLinkCount} links"
          description="Body placement constraints"
          id="XB1qXx"
          values={{
            characterLimit:
              SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.body
                ?.length,
            maxLinkCount:
              SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.body
                ?.links,
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
              SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.image
                ?.height,
            ratio:
              (SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.image
                ?.width ?? 0) /
              (SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.image
                ?.height ?? 1),
            width:
              SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.image
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
          defaultMessage: '{questionCount}+ questions',
          description: 'Label for questions count',
          id: 'O9HLcY',
        },
        { questionCount: roundQuestionCountToNearestTen(QuestionCountCoding) },
      ),
      img: {
        alt: intl.formatMessage({
          defaultMessage: 'In Content Ad Placement in coding workspace',
          description: 'Alt text for ads in content placement preview',
          id: 'ovidiq',
        }),
        srcDark: '/img/sponsors/in-content-placement-workspace-dark.png',
        srcLight: '/img/sponsors/in-content-placement-workspace-light.png',
      },
      key: 'workspace',
      title: intl.formatMessage({
        defaultMessage: 'Coding workspace',
        description: 'Label for in content placement in workspace',
        id: '8yb0/o',
      }),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ quizzes',
          description: 'Label for quizzes count',
          id: 'M++J8U',
        },
        { questionCount: roundQuestionCountToNearestTen(QuestionCountQuiz) },
      ),
      img: {
        alt: intl.formatMessage({
          defaultMessage: 'In Content Ad Placement in quiz questions',
          description: 'Alt text for ads in content placement preview',
          id: 'BcCcsC',
        }),
        srcDark: '/img/sponsors/in-content-placement-quiz-dark.png',
        srcLight: '/img/sponsors/in-content-placement-quiz-light.png',
      },
      key: 'quiz',
      title: intl.formatMessage({
        defaultMessage: 'Quiz questions',
        description: 'Label for in content placement in quiz questions',
        id: 'Kshski',
      }),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{guidesCount}+ guides pages',
          description: 'Label for guides count',
          id: 'KgLyGJ',
        },
        { guidesCount: roundQuestionCountToNearestTen(GuidesCount) },
      ),
      img: {
        alt: intl.formatMessage({
          defaultMessage: 'In Content Ad Placement in guides',
          description: 'Alt text for ads in content placement preview',
          id: 'mLTQN6',
        }),
        srcDark: '/img/sponsors/in-content-placement-guides-dark.png',
        srcLight: '/img/sponsors/in-content-placement-guides-light.png',
      },
      key: 'guides',
      title: intl.formatMessage({
        defaultMessage: 'Interview Guides',
        description: 'Label for in content placement in guides',
        id: '1p5F3G',
      }),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ questions',
          description: 'Label for questions count',
          id: 'O9HLcY',
        },
        {
          questionCount: roundQuestionCountToNearestTen(
            QuestionCountSystemDesign,
          ),
        },
      ),
      img: {
        alt: intl.formatMessage({
          defaultMessage: 'In Content Ad Placement in system design',
          description: 'Alt text for ads in content placement preview',
          id: 'imokHr',
        }),
        srcDark: '/img/sponsors/in-content-placement-system-design-dark.png',
        srcLight: '/img/sponsors/in-content-placement-system-design-light.png',
      },
      key: 'guides',
      title: intl.formatMessage({
        defaultMessage: 'System Design',
        description: 'Label for in content placement in system design',
        id: 'y1IBOv',
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
      key: 'item-1',
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

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdFormatHeader format={FORMAT} />
      <div className="flex flex-col gap-10">
        <Asset />
        <div
          className={clsx(
            'flex flex-col min-[820px]:flex-row', // Custom breakpoint so that columns don't look squeeze
            'gap-x-6 gap-y-10 sm:gap-y-8',
          )}>
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
        <SponsorsAdFormatInfoAccordion items={accordionItems} />
      </div>
    </div>
  );
}

function Asset() {
  const intl = useIntl();

  return (
    <>
      {/* Light mode image */}
      <Img
        alt={intl.formatMessage({
          defaultMessage: 'In content ad placement preview',
          description: 'Alt text for ads in content placement preview',
          id: '1ovS6Y',
        })}
        className={clsx('h-auto w-full object-cover', 'block dark:hidden')}
        src="/img/sponsors/in-content-ad-placement-light.png"
      />
      {/* Dark mode image */}
      <Img
        alt={intl.formatMessage({
          defaultMessage: 'In content ad placement preview',
          description: 'Alt text for ads in content placement preview',
          id: '1ovS6Y',
        })}
        className={clsx('h-auto w-full object-cover', 'hidden dark:block')}
        src="/img/sponsors/in-content-ad-placement-dark.png"
      />
    </>
  );
}
