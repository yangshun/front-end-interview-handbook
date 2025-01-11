import clsx from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { useIntl } from '~/components/intl';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderColor,
  themeOutlineElementBrandColor_FocusVisible,
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
        'hidden items-center justify-center p-1 xl:flex',
        'absolute top-[80px] -ml-px h-10 translate-x-full',
        showSidebar ? 'right-px' : 'right-0',
        themeTextSecondaryColor,
        themeBackgroundElementColor,
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementPressedStateColor_Active,
        'rounded-r-lg',
        ['border-y border-r', themeBorderColor],
        themeOutlineElementBrandColor_FocusVisible,
      )}
      title={title}
      type="button"
      onClick={() => setShowSidebar(!showSidebar)}>
      {showSidebar ? (
        <RiArrowLeftSLine className="size-4" />
      ) : (
        <RiArrowRightSLine className="size-4" />
      )}
    </button>
  );
}
