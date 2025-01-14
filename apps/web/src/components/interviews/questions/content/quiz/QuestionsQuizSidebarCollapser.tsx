import clsx from 'clsx';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

export default function QuestionsQuizSidebarCollapser() {
  const intl = useIntl();
  const { showSecondarySidebar, setShowSecondarySidebar } =
    useUserPreferences();
  const label = showSecondarySidebar
    ? intl.formatMessage({
        defaultMessage: 'Collapse questions list',
        description: 'Collapse sidebar containing questions list',
        id: '2u88E/',
      })
    : intl.formatMessage({
        defaultMessage: 'Show questions list',
        description: 'Show sidebar containing questions list',
        id: 'TbN6Yv',
      });

  return (
    <Button
      className={clsx(
        'max-xl:hidden',
        'absolute top-[67px] translate-x-1/2',
        showSecondarySidebar ? '-right-0.5' : 'right-0',
      )}
      icon={showSecondarySidebar ? RiArrowLeftLine : RiArrowRightLine}
      isLabelHidden={true}
      label={label}
      tooltip={label}
      tooltipSide="right"
      type="button"
      variant="secondary"
      onClick={() => setShowSecondarySidebar(!showSecondarySidebar)}
    />
  );
}
