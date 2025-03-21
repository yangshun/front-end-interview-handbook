import {
  RiAdvertisementLine,
  RiHome3Line,
  RiMessageLine,
  RiSurveyLine,
} from 'react-icons/ri';

export type AdminNavPlacement = 'nav' | 'sidebar';

export default function useAdminNavItems() {
  const sponsorshipsRequest = {
    currentMatchRegex: /\/admin\/sponsorships/,
    href: '/admin/sponsorships',
    icon: RiHome3Line,
    id: 'sponsorships-request',
    label: 'Sponsorships',
    position: 'start',
    type: 'link',
  } as const;
  const sponsorships = {
    align: 'center',
    icon: RiHome3Line,
    id: 'sponsorships',
    items: [
      {
        currentMatchRegex: /\/admin\/sponsorships/,
        href: '/admin/sponsorships',
        icon: RiAdvertisementLine,
        id: 'sponsorships-request',
        label: 'Requests',
        type: 'popover-link',
      },
      {
        currentMatchRegex: /\/admin\/sponsorships\/feedback$/,
        href: '/admin/sponsorships/feedback',
        icon: RiMessageLine,
        id: 'sponsorships-feedback',
        label: 'Feedbacks',
        type: 'popover-link',
      },
      {
        currentMatchRegex: /\/admin\/sponsorships\/inquiry$/,
        href: '/admin/sponsorships/inquiry',
        icon: RiSurveyLine,
        id: 'sponsorships-inquiry',
        label: 'Inquiries',
        type: 'popover-link',
      },
    ],
    label: 'Sponsorships',
    position: 'start',
    type: 'popover-list',
  } as const;

  return {
    sponsorships,
    sponsorshipsRequest,
  };
}
