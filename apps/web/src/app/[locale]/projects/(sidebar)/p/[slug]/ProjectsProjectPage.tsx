'use client';

import clsx from 'clsx';
import { RiArrowLeftLine, RiInformationLine, RiLockLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { ProjectBreakdownTabItem } from '~/components/projects/layout/ProjectsProjectBreakdownTabs';
import ProjectsProjectBreakdownTabs from '~/components/projects/layout/ProjectsProjectBreakdownTabs';
import ProjectsAssetProvidedHtml from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedHtml';
import ProjectsAssetProvidedImageAssets from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedImageAssets';
import ProjectsAssetProvidedJpeg from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedJpeg';
import ProjectsAssetProvidedReadme from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedReadme';
import ProjectsAssetProvidedStyleGuide from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedStyleGuide';
import type { ProjectsProject } from '~/components/projects/projects/types';
import ProjectsNestedSkillChip from '~/components/projects/skills/ProjectsNestedSkillChip';
import ProjectsCompletedUsersTag from '~/components/projects/stats/ProjectsCompletedUsersTag';
import ProjectsComponentTrackTag from '~/components/projects/stats/ProjectsComponentTrackTag';
import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import ProjectsStarterTag from '~/components/projects/stats/ProjectsStarterTag';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

export type Props = Readonly<{
  project: ProjectsProject;
}>;

type TabType =
  | 'assets'
  | 'project-brief'
  | 'project-deployment-completion'
  | 'tips-resources-discussions';

function useTabs(slug: string) {
  const intl = useIntl();

  const tabs: Array<ProjectBreakdownTabItem<TabType>> = [
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description:
          'Hint for "Project Brief" and "Assets" tab on Projects project page',
        id: '01jNoZ',
      }),
      href: `/projects/p/${slug}/project-brief`,
      subtitle: intl.formatMessage({
        defaultMessage: 'Project Brief',
        description:
          'Subtitle for "Project Brief" tab on Projects project page',
        id: 'vdhmX1',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 1',
        description: 'Title for "Step 1" tab on Projects project page',
        id: 'Ty7LFA',
      }),
      value: 'project-brief',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description:
          'Hint for "Project Brief" and "Assets" tab on Projects project page',
        id: '01jNoZ',
      }),
      href: `/projects/p/${slug}/assets`,
      subtitle: intl.formatMessage({
        defaultMessage: 'Assets',
        description: 'Subtitle for "Assets" tab on Projects project page',
        id: 'qR0ILp',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 2',
        description: 'Title for "Step 2" tab on Projects project page',
        id: 'mjEvFf',
      }),
      value: 'assets',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'While working on project',
        description:
          'Hint for "Tips, Resources and Discussions" tab on Projects project page',
        id: 'KBBRmA',
      }),
      href: `/projects/p/${slug}/tips-resources-discussions`,
      subtitle: intl.formatMessage({
        defaultMessage: 'Tips, Resources and Discussions',
        description:
          'Subtitle for "Tips, Resources and Discussions" tab on Projects project page',
        id: 'U10C4D',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 3',
        description: 'Title for "Step 3" tab on Projects project page',
        id: '+Yk101',
      }),
      value: 'tips-resources-discussions',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'After completion',
        description:
          'Hint for "Project Deployment & Completion" tab on Projects project page',
        id: 'QkImfr',
      }),
      href: `/projects/p/${slug}/project-deployment-completion`,
      subtitle: intl.formatMessage({
        defaultMessage: 'Project Deployment & Completion',
        description:
          'Subtitle for "Project Deployment & Completion" tab on Projects project page',
        id: '/dWN/a',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 4',
        description: 'Title for "Step 4" tab on Projects project page',
        id: 'G5tU8P',
      }),
      value: 'project-deployment-completion',
    },
  ];

  return tabs;
}

type SupportItem = Readonly<{
  description: string;
  key: string;
  title: string;
}>;

function useSupportItems() {
  const intl = useIntl();

  const supportItems: Array<SupportItem> = [
    {
      description: intl.formatMessage({
        defaultMessage:
          'Development guides written & curated by Sr engineers at Big tech, such as:',
        description:
          'Description for "Official guides & resources" item in Expected Support section on Projects project page',
        id: 'abJ+kd',
      }),
      key: 'official-guides',
      title: intl.formatMessage({
        defaultMessage: 'Official guides & resources',
        description:
          'Label for "Official guides & resources" item in Expected Support section on Projects project page',
        id: 'uKEj2Z',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'We recommend well-rated submissions using the same stack for your reference',
        description:
          'Description for "Learn from good code" item in Expected Support section on Projects project page',
        id: 'CCiMOz',
      }),
      key: 'learn-from-good-code',
      title: intl.formatMessage({
        defaultMessage: 'Learn from good code',
        description:
          'Label for "Learn from good code" item in Expected Support section on Projects project page',
        id: 'jz6W//',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Have any doubts or need help? Ask in the community and discuss with others.',
        description:
          'Description for "Ask any questions in community" item in Expected Support section on Projects project page',
        id: 'Lwa7+3',
      }),
      key: 'ask-any-questions-in-community',
      title: intl.formatMessage({
        defaultMessage: 'Ask any questions in community',
        description:
          'Label for "Ask any questions in community" item in Expected Support section on Projects project page',
        id: 'rH3Vfz',
      }),
    },
  ];

  return supportItems;
}

export default function ProjectsProjectPage({
  project: {
    completedCount,
    completedUsers,
    description,
    isStarter,
    slug,
    repCount,
    skills,
    title,
    trackName,
  },
}: Props) {
  const intl = useIntl();
  const tabs = useTabs(slug);
  const supportItems = useSupportItems();

  const projectBrief =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.';

  return (
    <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16">
      <div className="flex flex-col gap-y-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col">
          <Button
            addonPosition="start"
            className="-ms-4 -mt-2 self-start"
            href="/projects/all"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to all projects',
              description:
                'Label for "Back to all projects" button on Projects project page',
              id: 'ggSPoc',
            })}
            variant="tertiary"
          />
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Heading level="heading5">{title}</Heading>
              <Badge
                icon={RiLockLine}
                label={intl.formatMessage({
                  defaultMessage: 'Premium',
                  description: 'Premium content',
                  id: 'gIeLON',
                })}
                size="sm"
                variant="special"
              />
            </div>
            <Text color="secondary" size="body2">
              {description}
            </Text>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {isStarter && <ProjectsStarterTag />}
              <ProjectsComponentTrackTag trackName={trackName} />
              <ProjectsReputationCountIncreaseTag repCount={repCount} />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <ProjectsNestedSkillChip
                    key={skill.key}
                    isEditable={true}
                    skill={skill}
                    // TODO: Replace below with actual subSkills
                    subSkills={[
                      {
                        difficulty: 'easy',
                        key: 'dom-manipulation',
                        label: 'DOM Manipulation',
                      },
                      {
                        difficulty: 'medium',
                        key: 'flex',
                        label: 'Flex',
                      },
                      {
                        difficulty: 'hard',
                        key: 'typescript',
                        label: 'TypeScript',
                      },
                    ]}
                  />
                ))}
              </div>
              <div
                className={clsx(
                  'mt-2 flex items-center gap-1',
                  themeTextSubtleColor,
                )}>
                <RiInformationLine className="h-4 w-4" />
                <Text color="inherit" size="body3">
                  <FormattedMessage
                    defaultMessage="You can add more skills e.g. UI frameworks used after starting the project"
                    description="Additional information for skills section on Projects project page"
                    id="j63zLB"
                  />
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-2 lg:items-end lg:gap-6">
          <Text size="body3">
            <FormattedMessage
              defaultMessage="New here? <link>How it works</link>"
              description="Link to 'How it works' page on Projects project page"
              id="OYgvni"
              values={{
                link: (chunks) => (
                  <Anchor {...chunks} href="#">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </Text>
          <div className="flex items-center gap-x-4 gap-y-4 lg:flex-col lg:items-end">
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Start project',
                description:
                  'Label for "Start project" button on Projects project page',
                id: '6/Qdew',
              })}
              size="md"
              variant="primary"
            />
            <ProjectsCompletedUsersTag
              count={completedCount}
              users={completedUsers}
            />
          </div>
        </div>
      </div>
      <ProjectsProjectBreakdownTabs
        className="mt-16"
        label={intl.formatMessage({
          defaultMessage: 'Project Breakdown',
          description:
            'Label for Project Breakdown tabs on Projects project page',
          id: 'H5GY66',
        })}
        tabs={tabs}
        value="project-brief"
      />
      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Project Brief"
              description="Title for Project Brief section on Projects project page"
              id="B4Jykm"
            />
          </Heading>
          <Section>
            <div className="bg-red h-[372px] w-full rounded-lg" />
            <Text color="secondary" size="body2">
              {projectBrief}
            </Text>
          </Section>
        </div>
        <div className="flex flex-col gap-6">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Assets provided"
              description="Title for Assets Provided section on Projects project page"
              id="Zcjig8"
            />
          </Heading>
          <Section>
            <div className="flex flex-col items-stretch gap-4">
              <ProjectsAssetProvidedJpeg />
              <ProjectsAssetProvidedStyleGuide />
              <ProjectsAssetProvidedImageAssets />
              <ProjectsAssetProvidedReadme />
              <ProjectsAssetProvidedHtml />
            </div>
          </Section>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-6">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Support you can expect"
            description="Title for Expected Support section on Projects project page"
            id="+y/iOY"
          />
        </Heading>
        <Section>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3">
            {supportItems.map(
              ({ key, title: itemTitle, description: itemDescription }) => (
                <div key={key} className="flex flex-col">
                  <Text weight="bold">{itemTitle}</Text>
                  <div className="mt-4 flex flex-col-reverse gap-y-4 lg:mt-3 lg:flex-col lg:gap-y-6">
                    <Text color="secondary" size="body2">
                      {itemDescription}
                    </Text>
                    <div className="bg-red h-[200px] w-full rounded-lg" />
                  </div>
                </div>
              ),
            )}
          </div>
        </Section>
      </div>
      <div className="mt-16">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="FAQ"
            description="Title for FAQ section on Projects project page"
            id="6U52IB"
          />
        </Heading>
        {/* TODO: Replace below with FAQ accordion */}
        <div className="bg-red mt-6 h-[200px] w-full rounded-lg" />
      </div>
    </Container>
  );
}
