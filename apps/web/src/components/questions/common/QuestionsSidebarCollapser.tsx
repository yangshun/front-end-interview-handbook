import clsx from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import {
  themeBackgroundEmphasizedHover,
  themeLineColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export default function QuestionsSidebarCollapser() {
  const intl = useIntl();
  const { showSidebar, setShowSidebar } = useUserPreferences();
  const title = showSidebar
    ? intl.formatMessage({
        defaultMessage: 'Collapse side menu',
        description:
          'Screenreader text for the button that collapses the side menu',
        id: 'TB8vuT',
      })
    : intl.formatMessage({
        defaultMessage: 'Show side menu',
        description:
          'Screenreader text for the button that expands the side menu',
        id: 'KlEAfS',
      });

  return (
    <button
      aria-label={title}
      className={clsx(
        'absolute top-[80px] right-0 z-10 hidden h-10 translate-x-full items-center justify-center rounded-r-lg border-y border-r p-1 lg:flex',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'focus:ring-brand-dark dark:focus:ring-brand',
        themeTextSecondaryColor,
        themeLineColor,
        themeBackgroundEmphasizedHover,
      )}
      title={title}
      type="button"
      onClick={() => setShowSidebar(!showSidebar)}>
      {showSidebar ? (
        <RiArrowLeftSLine className="h-4 w-4" />
      ) : (
        <RiArrowRightSLine className="h-4 w-4" />
      )}
    </button>
  );
}
