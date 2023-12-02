'use client';

import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiBrush2Fill,
  RiCodeSSlashLine,
  RiComputerLine,
  RiDownload2Line,
  RiDragMove2Fill,
  RiLock2Line,
  RiSmartphoneLine,
  RiTabletLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsProjectBreakdownTabsImpl from '~/components/projects/layout/ProjectsProjectBreakdownTabsImpl';
import ProjectsProjectHeader from '~/components/projects/projects/ProjectsProjectHeader';
import type { ProjectsProject } from '~/components/projects/projects/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';
import Text from '~/components/ui/Text';
import { themeElementBorderColor } from '~/components/ui/theme';

type OnlineAssetsTabType =
  | 'api'
  | 'basic-style-guide'
  | 'responsive-breakpoints';

function useOnlineAssetsTabs() {
  const tabs: Array<TabItem<OnlineAssetsTabType>> = [
    {
      icon: RiDragMove2Fill,
      label: 'Responsive breakpoints',
      value: 'responsive-breakpoints',
    },
    {
      icon: RiBrush2Fill,
      label: 'Basic style guide',
      value: 'basic-style-guide',
    },
    {
      icon: RiCodeSSlashLine,
      label: 'API',
      value: 'api',
    },
  ];

  return tabs;
}

type Props = Readonly<{
  project: ProjectsProject;
}>;

export default function ProjectsProjectAssetsPage({ project }: Props) {
  const intl = useIntl();
  const { slug } = project;
  const onlineAssetsTabs = useOnlineAssetsTabs();
  const [onlineAssetsTab, setOnlineAssetsTab] = useState<OnlineAssetsTabType>(
    'responsive-breakpoints',
  );

  // TODO: Replace below with actual logic
  const isUserPremium = false;

  return (
    <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16">
      <ProjectsProjectHeader project={project} />
      <ProjectsProjectBreakdownTabsImpl
        className="mt-16"
        slug={slug}
        value="assets"
      />
      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="To download"
              description="Title for To Download section on Projects project assets page"
              id="Ju61WC"
            />
          </Heading>
          <Section>
            <div className="flex flex-col gap-4">
              <Button
                icon={RiDownload2Line}
                label={intl.formatMessage({
                  defaultMessage: 'Starter code',
                  description:
                    'Label for Starter Code button on Projects project assets page',
                  id: 'J7Pskc',
                })}
                size="lg"
                variant="secondary"
              />
              <Button
                icon={RiDownload2Line}
                label={intl.formatMessage({
                  defaultMessage: 'Image assets',
                  description:
                    'Label for Image Assets button on Projects project assets page',
                  id: 'hk/IIT',
                })}
                size="lg"
                variant="secondary"
              />
              <Button
                icon={isUserPremium ? RiDownload2Line : RiLock2Line}
                label={intl.formatMessage({
                  defaultMessage: 'Figma design file',
                  description:
                    'Label for Figma Design File button on Projects project assets page',
                  id: 'GUmfcW',
                })}
                size="lg"
                variant={isUserPremium ? 'secondary' : 'special'}
              />
              {!isUserPremium && (
                <>
                  <Text color="subtle" size="body3">
                    <FormattedMessage
                      defaultMessage="Purchase Premium to unlock access to the design file. Build accurately and learn to work with production-level specifications."
                      description="CTA for Figma Design File button on Projects project assets page"
                      id="qmU2/H"
                    />
                  </Text>
                  <Button
                    className="-ms-3 self-start"
                    icon={RiArrowRightLine}
                    label={intl.formatMessage({
                      defaultMessage: 'View plans',
                      description:
                        'Label for View Plans button on Projects project assets page',
                      id: 'BHvjJJ',
                    })}
                    size="sm"
                    variant="tertiary"
                  />
                </>
              )}
            </div>
          </Section>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:col-span-3">
          <Heading className="lg:sr-only" level="heading6">
            <FormattedMessage
              defaultMessage="Online assets"
              description="Title for Online Assets section on Projects project assets page"
              id="2gImEH"
            />
          </Heading>
          <Section>
            <Tabs
              label={intl.formatMessage({
                defaultMessage: 'Select online asset type',
                description: 'Label for tabs to select online asset type',
                id: 'ZsOMcv',
              })}
              size="sm"
              tabs={onlineAssetsTabs}
              value={onlineAssetsTab}
              onSelect={setOnlineAssetsTab}
            />
            <div className="flex flex-col items-stretch gap-6">
              <div className="flex gap-6 self-end">
                <div className="flex gap-4">
                  <Button
                    icon={RiComputerLine}
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Desktop',
                      description:
                        'Label for Desktop button in Projects project assets page',
                      id: 'eHUX9g',
                    })}
                    variant="tertiary"
                  />
                  <Button
                    icon={RiTabletLine}
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Tablet',
                      description:
                        'Label for Tablet button in Projects project assets page',
                      id: 'dIwJQA',
                    })}
                    variant="tertiary"
                  />
                  <Button
                    icon={RiSmartphoneLine}
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Mobile',
                      description:
                        'Label for Mobile button in Projects project assets page',
                      id: 'ZJbXJQ',
                    })}
                    variant="tertiary"
                  />
                </div>
                <div
                  className={clsx(
                    'flex items-center justify-center rounded-md border p-2',
                    themeElementBorderColor,
                  )}>
                  <Text color="secondary" size="body3" weight="bold">
                    1024px
                  </Text>
                </div>
              </div>
              <div className="bg-red h-[300px] w-full rounded-lg" />
            </div>
          </Section>
        </div>
      </div>
    </Container>
  );
}
