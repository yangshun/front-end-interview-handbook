import ProjectsProfileInfoSectionLayout from '~/components/projects/profile/info/ProjectsProfileInfoSectionLayout';
import ProjectsTechStackChip from '~/components/projects/skills/ProjectsTechStackChip';

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
          <ProjectsTechStackChip key={value} value={value} />
        ))}
      </div>
    </ProjectsProfileInfoSectionLayout>
  );
}
