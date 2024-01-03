import ProjectsProfileInfoSectionLayout from '~/components/projects/profile/info/ProjectsProfileInfoSectionLayout';
import TechStackChip from '~/components/projects/TechStackChip';

import { getUniqueId } from '~/react-tiling';

type Props = Readonly<{
  heading: string;
  skills: Array<string>;
  tooltipMessage: string;
}>;

export default function ProjectsProfileTechList({
  heading,
  tooltipMessage,
  skills,
}: Props) {
  return (
    <ProjectsProfileInfoSectionLayout
      heading={heading}
      showTooltip={true}
      tooltipMessage={tooltipMessage}>
      <div className="flex flex-wrap gap-3">
        {skills.map((value) => (
          <TechStackChip key={getUniqueId()} value={value} />
        ))}
      </div>
    </ProjectsProfileInfoSectionLayout>
  );
}
