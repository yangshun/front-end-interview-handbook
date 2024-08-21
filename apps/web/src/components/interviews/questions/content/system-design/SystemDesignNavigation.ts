import {
  RiAmazonFill,
  RiArticleFill,
  RiBarChartBoxLine,
  RiDropdownList,
  RiErrorWarningFill,
  RiFacebookCircleFill,
  RiFileList3Fill,
  RiFontSize,
  RiGalleryFill,
  RiImageFill,
  RiInstagramLine,
  RiMailFill,
  RiMenuSearchLine,
  RiMessengerFill,
  RiNetflixFill,
  RiPencilRulerLine,
  RiPieChart2Fill,
  RiPinterestFill,
  RiPlayFill,
  RiSettingsFill,
  RiShapesFill,
  RiSpotifyFill,
  RiTableFill,
  RiVideoChatFill,
  RiWindowFill,
} from 'react-icons/ri';
import { TbBrandAirbnb } from 'react-icons/tb';
import { useIntl } from 'react-intl';

import type {
  BaseGuideNavigationLink,
  GuideNavigation,
} from '~/components/guides/types';

import SystemDesignQuestionList from '~/__generated__/questions/system-design/list.en-US.json';

import { ReadyQuestions } from './SystemDesignConfig';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

export const basePath = '/system-design';

export type SystemDesignNavigationLink = BaseGuideNavigationLink<{
  premium: boolean;
  type: 'guide' | 'question';
}>;

type NavigationLinks = ReadonlyArray<SystemDesignNavigationLink>;

export const allSystemDesignQuestions = (
  SystemDesignQuestionList as ReadonlyArray<QuestionMetadata>
)
  .slice()
  .sort((a, b) => a.ranking - b.ranking);
export const readySystemDesignQuestions = allSystemDesignQuestions.filter(
  (question) => ReadyQuestions.includes(question.slug),
);

const SystemDesignIcons: Record<
  string,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  autocomplete: RiMenuSearchLine,
  'chat-application-messenger': RiMessengerFill,
  'collaborative-editor-google-docs': RiArticleFill,
  'collaborative-spreadsheet-google-sheets': RiTableFill,
  'diagram-tool-lucidchart': RiPencilRulerLine,
  'dropdown-menu': RiDropdownList,
  'e-commerce-amazon': RiAmazonFill,
  'email-client-outlook': RiMailFill,
  'image-carousel': RiGalleryFill,
  'modal-dialog': RiWindowFill,
  'music-streaming-spotify': RiSpotifyFill,
  'news-feed-facebook': RiFacebookCircleFill,
  'photo-gallery-google-photos': RiImageFill,
  'photo-sharing-instagram': RiInstagramLine,
  pinterest: RiPinterestFill,
  'poll-widget': RiBarChartBoxLine,
  'rich-text-editor': RiFontSize,
  'travel-booking-airbnb': TbBrandAirbnb,
  'video-conferencing-zoom': RiVideoChatFill,
  'video-streaming-netflix': RiNetflixFill,
};

export function useSystemDesignGuides() {
  const intl = useIntl();

  const systemDesignGuides: NavigationLinks = [
    {
      description: intl.formatMessage({
        defaultMessage: 'What to expect for Front End System Design interviews',
        description:
          'Sidebar link title for front end system design interviews',
        id: 'H39M2g',
      }),
      href: basePath,
      icon: RiPlayFill,
      premium: false,
      slug: 'introduction',
      title: intl.formatMessage({
        defaultMessage: 'Introduction',
        description: 'Introduction to front end system design',
        id: '83GIBc',
      }),
      type: 'guide',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Overview of various question formats',
        description:
          'Overview of front end system design interview question formats',
        id: 'P99cBr',
      }),
      href: `${basePath}/types-of-questions`,
      icon: RiShapesFill,
      premium: false,
      slug: 'types-of-questions',
      title: intl.formatMessage({
        defaultMessage: 'Types of Questions',
        description: 'Types of front end system design interview questions',
        id: 'sGF5oQ',
      }),
      type: 'guide',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'A structured way to approach system design questions',
        description: 'Sidebar link for front end system design interview',
        id: 'BhmpD2',
      }),
      href: `${basePath}/framework`,
      icon: RiSettingsFill,
      premium: false,
      slug: 'framework',
      title: intl.formatMessage({
        defaultMessage: 'RADIO Framework',
        description:
          "RADIO (acroynm) framework name for front end system design interviews. Don't translate RADIO",
        id: '434fyX',
      }),
      type: 'guide',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'What interviewers are looking for',
        description: 'What front end system design interviewer are looking for',
        id: 'twAHPt',
      }),
      href: `${basePath}/evaluation-axes`,
      icon: RiPieChart2Fill,
      premium: false,
      slug: 'evaluation-axes',
      title: intl.formatMessage({
        defaultMessage: 'Evaluation Axes',
        description: 'Evaluation axes in front end system design interviews',
        id: 'E6yHUQ',
      }),
      type: 'guide',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Common mistakes you should avoid.',
        description: 'Comon mistakes to avoid during system design interviews',
        id: '6kLEK7',
      }),
      href: `${basePath}/common-mistakes`,
      icon: RiErrorWarningFill,
      premium: false,
      slug: 'common-mistakes',
      title: intl.formatMessage({
        defaultMessage: 'Common Mistakes',
        description:
          'Common mistakes made during front end system design interviews',
        id: 'VJf77h',
      }),
      type: 'guide',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Summary of all the important things in a one-pager',
        description:
          'Summary of important things in front end system design interviews',
        id: 'KdzvRx',
      }),
      href: `${basePath}/cheatsheet`,
      icon: RiFileList3Fill,
      premium: false,
      slug: 'cheatsheet',
      title: intl.formatMessage({
        defaultMessage: 'Cheatsheet',
        description:
          'One-page summary sheet for front end system design interviews',
        id: '3WHiQS',
      }),
      type: 'guide',
    },
  ];

  return systemDesignGuides;
}

export function useSystemDesignNavigation() {
  const intl = useIntl();
  const systemDesignGuides = useSystemDesignGuides();
  const navigation: GuideNavigation<SystemDesignNavigationLink> = {
    items: [
      {
        links: systemDesignGuides,
        title: intl.formatMessage({
          defaultMessage: 'Guidebook',
          description: 'How to prepare for front end system design interviews',
          id: 'pgK6Eb',
        }),
      },
      {
        links: readySystemDesignQuestions.map((question) => ({
          href: question.href,
          icon: SystemDesignIcons[question.slug],
          premium: question.premium,
          slug: question.slug,
          title: question.title,
          type: 'question',
        })),
        title: intl.formatMessage({
          defaultMessage: 'Questions',
          description: 'Front end system design interviews questions',
          id: 'WDJgWl',
        }),
      },
      {
        links: allSystemDesignQuestions
          .slice()
          .sort((a, b) => a.ranking - b.ranking)
          .filter((question) => !ReadyQuestions.includes(question.slug))
          .map((question) => ({
            href: question.href,
            icon: SystemDesignIcons[question.slug],
            premium: question.premium,
            slug: question.slug,
            title: question.title,
            type: 'question',
          })),
        title: intl.formatMessage({
          defaultMessage: 'Coming Soon',
          description: 'Front end system design questions that are coming soon',
          id: 'p97ubP',
        }),
      },
    ],
    title: intl.formatMessage({
      defaultMessage: 'Front End System Design Guidebook',
      description: 'Front end system design guidebook title',
      id: 'NdDD5W',
    }),
  };

  return navigation;
}
