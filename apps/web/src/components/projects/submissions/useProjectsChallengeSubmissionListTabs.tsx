import {
  RiBookOpenLine,
  RiCodeSSlashLine,
  RiGraduationCapLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';

export type ProjectsChallengeSubmissionListTabCategory =
  | 'all-submissions'
  | 'learn'
  | 'mentor';

type TabItem = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: ProjectsChallengeSubmissionListTabCategory;
  label: string;
  type: 'link';
}>;

export default function useProjectsChallengeSubmissionListTabs(): ReadonlyArray<TabItem> {
  const intl = useIntl();

  return [
    {
      href: '/projects/submissions',
      icon: RiCodeSSlashLine,
      key: 'all-submissions',
      label: intl.formatMessage({
        defaultMessage: 'All submissions',
        description:
          'Label for All submissions sidebar item in Projects sidebar',
        id: 'ujBJq7',
      }),
      type: 'link',
    },
    {
      href: '/projects/submissions/learn',
      icon: RiBookOpenLine,
      key: 'learn',
      label: intl.formatMessage({
        defaultMessage: 'Learn from others',
        description:
          'Label for Learn from others sidebar item in Projects sidebar',
        id: 'e1ohyq',
      }),
      type: 'link',
    },
    {
      href: '/projects/submissions/mentor',
      icon: RiGraduationCapLine,
      key: 'mentor',
      label: intl.formatMessage({
        defaultMessage: 'Mentor others',
        description: 'Label for Mentor others sidebar item in Projects sidebar',
        id: 'HEV8y4',
      }),
      type: 'link',
    },
  ] as const;
}
