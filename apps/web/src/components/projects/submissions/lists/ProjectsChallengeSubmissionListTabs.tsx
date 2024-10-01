import { useMemo } from 'react';

import { useIntl } from '~/components/intl';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsChallengeSubmissionListTabCategory } from '../useProjectsChallengeSubmissionListTabs';
import useProjectsChallengeSubmissionListTabs from '../useProjectsChallengeSubmissionListTabs';

export default function ProjectsChallengeSubmissionListTabs() {
  const { pathname } = useI18nPathname();
  const intl = useIntl();
  const tabs_ = useProjectsChallengeSubmissionListTabs();
  const tabs: ReadonlyArray<
    TabItem<ProjectsChallengeSubmissionListTabCategory>
  > = tabs_.map((tab) => ({
    ...tab,
    value: tab.key,
  }));

  const value: ProjectsChallengeSubmissionListTabCategory = useMemo(() => {
    const tab = tabs.find((t) => t.href === pathname);

    return tab?.value ?? 'all-submissions';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Tabs
      label={intl.formatMessage({
        defaultMessage: 'Select submission list category',
        description: 'Tab label to select another submission page',
        id: 'DfuYnf',
      })}
      size="sm"
      tabs={tabs}
      value={value}
    />
  );
}
