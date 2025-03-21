import {
  RiAdvertisementLine,
  RiHome3Line,
  RiMailLine,
  RiQuestionLine,
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
        currentMatchRegex:
          /^\/admin\/sponsorships$|^\/admin\/sponsorships\/request/,
        href: '/admin/sponsorships',
        icon: RiAdvertisementLine,
        id: 'sponsorships-request',
        label: 'Requests',
        type: 'popover-link',
      },
      {
        href: '/admin/sponsorships/messages',
        icon: RiMailLine,
        id: 'sponsorships-feedback',
        label: 'Messages',
        type: 'popover-link',
      },
      {
        href: '/admin/sponsorships/inquiries',
        icon: RiQuestionLine,
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
