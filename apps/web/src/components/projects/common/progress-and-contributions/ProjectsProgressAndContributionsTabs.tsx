'use client';

import { useMemo } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsProfileTabCategory } from './useProjectsProfileCategoryTabs';
import useProjectsProfileCategoryTabs from './useProjectsProfileCategoryTabs';

type Props = Readonly<{
  baseUrl: string;
}>;

export default function ProjectsProgressAndContributionsTabs({
  baseUrl,
}: Props) {
  const { pathname } = useI18nPathname();
  const intl = useIntl();

  const categoryTabs = useProjectsProfileCategoryTabs();

  const tabs = categoryTabs.map((tab) => {
    const { href: relativeHref, ...tabWithoutHref } = tab;

    return {
      ...tabWithoutHref,
      href: baseUrl + relativeHref,
    };
  });

  const value: ProjectsProfileTabCategory = useMemo(() => {
    const tab = tabs.find((t) => t.href === pathname);

    return tab?.value ?? 'progress';
  }, [pathname, tabs]);

  return (
    <Tabs
      endAddOn={
        <Button
          href="/projects/challenges"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Start new project',
            description: 'Link to start new project',
            id: 'buBLGx',
          })}
          size="md"
          variant="tertiary"
        />
      }
      label={intl.formatMessage({
        defaultMessage: 'Select dashboard category',
        description: 'Tab label to select another dashboard category',
        id: '1O3xR8',
      })}
      scrollToTop={false}
      size="md"
      tabs={tabs}
      value={value}
    />
  );
}
