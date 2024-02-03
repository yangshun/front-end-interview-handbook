import clsx from 'clsx';
import { useIntl } from 'react-intl';

import ProjectsChallengeBriefSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefSupportCard';
import ProjectsSkillRow from '~/components/projects/skills/ProjectsSkillRow';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

export default function ProjectsChallengeBriefSubmissionSupportCard() {
  const intl = useIntl();

  return (
    <ProjectsChallengeBriefSupportCard
      className={clsx(
        '!p-4 !pt-6',
        themeBackgroundCardColor,
        themeGlassyBorder,
      )}>
      <div className="flex flex-col gap-3 min-w-[330px]">
        <Text weight="bold">Responsive solution build with React</Text>
        <ProjectsSkillRow
          label={intl.formatMessage({
            defaultMessage: 'Stack used',
            description: 'Label for tech stack used in project',
            id: 'aiI8c6',
          })}
          skills={['html', 'css', 'js']}
        />
        {/* TODO(projects): Use appropriate image */}
        <img
          alt="Submission support card image"
          className="h-[190px] w-full rounded-md"
          src="https://images.unsplash.com/photo-1682687219800-bba120d709c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </ProjectsChallengeBriefSupportCard>
  );
}
