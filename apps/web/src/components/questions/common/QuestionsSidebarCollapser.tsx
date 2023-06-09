import { useIntl } from 'react-intl';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
      className="focus:ring-brand-500 absolute top-[80px] right-0 z-10 hidden h-10 translate-x-full items-center justify-center rounded-r-lg border-y border-r p-1 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 lg:flex"
      title={title}
      type="button"
      onClick={() => setShowSidebar(!showSidebar)}>
      {showSidebar ? (
        <ChevronLeftIcon className="h-4 w-4" />
      ) : (
        <ChevronRightIcon className="h-4 w-4" />
      )}
    </button>
  );
}
