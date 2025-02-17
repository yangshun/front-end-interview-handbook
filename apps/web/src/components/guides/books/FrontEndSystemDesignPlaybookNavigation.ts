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

import type {
  BaseGuideNavigationLink,
  GuideNavigation,
} from '~/components/guides/types';
import {
  allSystemDesignQuestions,
  readySystemDesignQuestions,
} from '~/components/interviews/questions/content/system-design/InterviewsSystemDesignQuestions';
import { ReadyQuestions } from '~/components/interviews/questions/content/system-design/SystemDesignConfig';
import { useIntl } from '~/components/intl';

export const basePath = '/front-end-system-design-playbook';

export const FrontEndSystemDesignPlaybookPaths = [
  'introduction',
  'types-of-questions',
  'framework',
  'evaluation-axes',
  'common-mistakes',
  'cheatsheet',
] as const;

export type FrontEndSystemDesignPlaybookPathType =
  (typeof FrontEndSystemDesignPlaybookPaths)[number];

export const FrontEndSystemDesignPlaybookPathToFile: Record<
  FrontEndSystemDesignPlaybookPathType,
  string
> = {
  cheatsheet: 'cheatsheet',
  'common-mistakes': 'common-mistakes',
  'evaluation-axes': 'evaluation-axes',
  framework: 'framework',
  introduction: 'introduction',
  'types-of-questions': 'types-of-questions',
};

export type FrontEndSystemDesignPlaybookNavigationLink =
  BaseGuideNavigationLink<{
    kind: 'guide' | 'question';
    premium: boolean;
  }>;

type NavigationLinks =
  ReadonlyArray<FrontEndSystemDesignPlaybookNavigationLink>;

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
      href: `${basePath}/introduction`,
      icon: RiPlayFill,
      id: 'introduction',
      kind: 'guide',
      label: intl.formatMessage({
        defaultMessage: 'Introduction',
        description: 'Introduction to front end system design',
        id: '83GIBc',
      }),
      premium: false,
      type: 'link',
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
      id: 'types-of-questions',
      kind: 'guide',
      label: intl.formatMessage({
        defaultMessage: 'Types of questions',
        description: 'Types of front end system design interview questions',
        id: '6r6UcH',
      }),
      premium: false,
      type: 'link',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'A structured way to approach system design questions',
        description: 'Sidebar link for front end system design interview',
        id: 'BhmpD2',
      }),
      href: `${basePath}/framework`,
      icon: RiSettingsFill,
      id: 'framework',
      kind: 'guide',
      label: intl.formatMessage({
        defaultMessage: 'RADIO framework',
        description:
          "RADIO (acroynm) framework name for front end system design interviews. Don't translate RADIO",
        id: 'aVhVoX',
      }),
      premium: false,
      type: 'link',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'What interviewers are looking for',
        description: 'What front end system design interviewer are looking for',
        id: 'twAHPt',
      }),
      href: `${basePath}/evaluation-axes`,
      icon: RiPieChart2Fill,
      id: 'evaluation-axes',
      kind: 'guide',
      label: intl.formatMessage({
        defaultMessage: 'Evaluation axes',
        description: 'Evaluation axes in front end system design interviews',
        id: '7UE9o1',
      }),
      premium: false,
      type: 'link',
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Common mistakes you should avoid.',
        description: 'Comon mistakes to avoid during system design interviews',
        id: '6kLEK7',
      }),
      href: `${basePath}/common-mistakes`,
      icon: RiErrorWarningFill,
      id: 'common-mistakes',
      kind: 'guide',
      label: intl.formatMessage({
        defaultMessage: 'Common mistakes',
        description:
          'Common mistakes made during front end system design interviews',
        id: '61X1bs',
      }),
      premium: false,
      type: 'link',
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
      id: 'cheatsheet',
      kind: 'guide',
      label: intl.formatMessage({
        defaultMessage: 'Cheatsheet',
        description:
          'One-page summary sheet for front end system design interviews',
        id: '3WHiQS',
      }),
      premium: false,
      type: 'link',
    },
  ];

  return systemDesignGuides;
}

export function useFrontEndSystemDesignPlaybookNavigation() {
  const intl = useIntl();
  const systemDesignGuides = useSystemDesignGuides();
  const navigation: GuideNavigation<FrontEndSystemDesignPlaybookNavigationLink> =
    {
      initialOpenSections: ['guidebook', 'questions'],
      navigation: {
        items: [
          {
            id: 'guidebook',
            items: systemDesignGuides,
            label: intl.formatMessage({
              defaultMessage: 'Guidebook',
              description:
                'How to prepare for front end system design interviews',
              id: 'pgK6Eb',
            }),
            type: 'list',
          },
          {
            id: 'questions',
            items: readySystemDesignQuestions.map((questionMetadata) => ({
              href: questionMetadata.href,
              icon: SystemDesignIcons[questionMetadata.slug],
              id: questionMetadata.slug,
              kind: 'question',
              label: questionMetadata.title,
              premium: questionMetadata.access === 'premium',
              type: 'link',
            })),
            label: intl.formatMessage({
              defaultMessage: 'Questions',
              description: 'Front end system design interviews questions',
              id: 'WDJgWl',
            }),
            type: 'list',
          },
          {
            id: 'coming-soon',
            items: allSystemDesignQuestions
              .slice()
              .sort((a, b) => a.ranking - b.ranking)
              .filter(
                (questionMetadata) =>
                  !ReadyQuestions.includes(questionMetadata.slug),
              )
              .map((questionMetadata) => ({
                href: questionMetadata.href,
                icon: SystemDesignIcons[questionMetadata.slug],
                id: questionMetadata.slug,
                kind: 'question',
                label: questionMetadata.title,
                premium: questionMetadata.access === 'premium',
                type: 'link',
              })),
            label: intl.formatMessage({
              defaultMessage: 'Coming soon',
              description:
                'Front end system design questions that are coming soon',
              id: '0krNBp',
            }),
            type: 'list',
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Front End System Design Playbook',
          description: 'Front end system design playbook title',
          id: 'p0TEPs',
        }),
      },
    };

  return navigation;
}
