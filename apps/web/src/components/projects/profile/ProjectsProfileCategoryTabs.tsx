'use client';

import { useEffect, useMemo, useRef } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsProfileTabCategory } from './useProjectsProfileCategoryTabs';
import useProjectsProfileCategoryTabs from './useProjectsProfileCategoryTabs';

type Props = Readonly<{
  baseUrl: string;
  showStartNewProject?: boolean;
}>;

const DEFAULT_TAB: ProjectsProfileTabCategory = 'progress';

export default function ProjectsProfileCategoryTabs({
  baseUrl,
  showStartNewProject = false,
}: Props) {
  const { pathname } = useI18nPathname();
  const intl = useIntl();

  const categoryTabs = useProjectsProfileCategoryTabs();

  const tabs = categoryTabs.map((tab) => {
    const { relativePath: basePathname, ...tabWithoutHref } = tab;

    return {
      ...tabWithoutHref,
      href: baseUrl + basePathname,
    };
  });

  const value: ProjectsProfileTabCategory = useMemo(() => {
    const tab = tabs.find((t) => t.href === pathname);

    return tab?.value ?? DEFAULT_TAB;
  }, [pathname, tabs]);

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabs.find((t) => t.href === pathname)) {
      if (
        tabsRef?.current?.offsetTop &&
        // Only scroll if tab contents are not clearly in view.
        Math.abs(window.scrollY - tabsRef?.current?.offsetTop) < 200
      ) {
        return;
      }

      // TODO(projects): hack to let data load first and scroll only
      // when the page layout is not likely to be still loading.
      setTimeout(() => {
        tabsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 1000);
    }
  }, [pathname, tabs]);

  return (
    <Tabs
      ref={tabsRef}
      endAddOn={
        showStartNewProject ? (
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
        ) : undefined
      }
      label={intl.formatMessage({
        defaultMessage: 'Select dashboard category',
        description: 'Tab label to select another dashboard category',
        id: '1O3xR8',
      })}
      scroll={false}
      size="md"
      tabs={tabs}
      value={value}
    />
  );
}
