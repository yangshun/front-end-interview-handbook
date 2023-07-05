import clsx from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import {
  themeBackgroundColor,
  themeBackgroundEmphasizedHover,
  themeLineColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export default function SidebarCollapser() {
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
        'hidden items-center justify-center p-1 lg:flex',
        'absolute top-[80px] z-10 -ml-px h-10 translate-x-full',
        showSidebar ? 'right-px' : 'right-0',
        'rounded-r-lg border-y border-r',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'focus:ring-brand-dark dark:focus:ring-brand',
        themeTextSecondaryColor,
        themeLineColor,
        themeBackgroundColor,
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
