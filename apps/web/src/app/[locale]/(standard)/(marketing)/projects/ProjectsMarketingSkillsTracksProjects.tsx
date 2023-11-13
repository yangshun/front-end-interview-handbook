import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import MarketingSectionHeader from '~/components/common/marketing/MarketingSectionHeader';
import MarketingSectionItemHeader from '~/components/common/marketing/MarketingSectionItemHeader';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogo from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import ProjectsSkillTree from '~/components/projects/skills/ProjectsSkillTree';
import type { ProjectSkillTree } from '~/components/projects/skills/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeRadialGlowBackground } from '~/components/ui/theme';

const foundationalSkillTree: ProjectSkillTree = [
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'semantic',
        label: 'Semantic',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'forms',
        label: 'Forms',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'a11y',
        label: 'A11y',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'html',
    label: 'HTML',
    totalProjectCount: 11,
    type: 'group',
  },

  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'layout',
        label: 'Layout',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'flex',
        label: 'Flex',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'grid',
        label: 'Grid',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'css',
    label: 'CSS',
    totalProjectCount: 11,
    type: 'group',
  },
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'dom',
        label: 'DOM',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'fetch',
        label: 'Fetch',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'storage',
        label: 'Storage',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'javascript',
    label: 'JavaScript',
    totalProjectCount: 11,
    type: 'group',
  },
];

const intermediateSkillTree: ProjectSkillTree = [
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'placeholder-item-1',
        label: 'Placeholder',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'placeholder-group-1',
    label: 'Placeholder',
    totalProjectCount: 11,
    type: 'group',
  },
];

const skills = [
  {
    icon: HTML5LogoMonochrome,
    key: 'html',
  },
  { icon: JavaScriptLogo, key: 'javascript' },
  { icon: ReactLogo, key: 'react' },
];

export default function ProjectsMarketingSkillsTree() {
  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-24 py-24 lg:gap-y-32 lg:py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            description={
              <FormattedMessage
                defaultMessage="We have a large bank of {projectCount}+ projects organized in 3 structured ways to help you achieve your objectives."
                description="Subtitle of the 'Build towards your goals' marketing section on Projects Homepage"
                id="/kX3pv"
                values={{
                  projectCount: 50,
                }}
              />
            }
            heading={
              <FormattedMessage
                defaultMessage="Build towards your goals"
                description="Heading of the 'Build towards your goals' marketing section on Projects Homepage"
                id="GncBti"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="Wide variety of projects"
                description="Title of the 'Build towards your goals' marketing section on Projects Homepage"
                id="QFZn7J"
              />
            }
          />
        </div>
        <Section>
          <MarketingSectionItemHeader
            description={
              <FormattedMessage
                defaultMessage="Find projects and curated resources to advance your skills all the way from beginner to senior engineer. Train a well-rounded skillset including full stack and AI skills."
                description="Subtitle of the 'Skill tree' marketing section on Projects Homepage"
                id="eBZAnY"
                values={{
                  projectCount: 50,
                }}
              />
            }
            heading={
              <FormattedMessage
                defaultMessage="Use our Skills Tree to train a holistic front end skill set"
                description="Heading of the 'Skill tree' marketing section on Projects Homepage"
                id="bzUPHh"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="You're here to learn skills"
                description="Title of the 'Skill tree' marketing section on Projects Homepage"
                id="uEmQR4"
              />
            }
          />
          <div className="flex justify-center">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-4">
                <Text weight="bold">Foundational skills</Text>
                <div className="px-4">
                  <ProjectsSkillTree tree={foundationalSkillTree} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Text weight="bold">Intermediate skills</Text>
                <div aria-hidden={true} className="px-4 blur">
                  <ProjectsSkillTree
                    disabled={true}
                    tree={intermediateSkillTree}
                  />
                </div>
              </div>
              <div className="-mt-16 flex flex-col items-center gap-2">
                <Button
                  icon={RiArrowRightLine}
                  label="Explore 20+ more skills"
                  size="md"
                  variant="tertiary"
                />
                <div className="flex gap-4">
                  {skills.map(({ icon: Icon, key }) => (
                    <Icon key={key} className="h-8 w-8" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
