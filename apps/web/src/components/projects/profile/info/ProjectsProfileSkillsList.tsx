import ProjectsProfileInfoSectionLayout from '~/components/projects/profile/info/ProjectsProfileInfoSectionLayout';
import ProjectsSkillChip from '~/components/projects/skills/metadata/ProjectsSkillChip';

type Props = Readonly<{
  heading: string;
  skills: ReadonlyArray<string>;
  tooltipMessage: string;
}>;

export default function ProjectsProfileSkillsList({
  heading,
  skills,
  tooltipMessage,
}: Props) {
  return (
    <ProjectsProfileInfoSectionLayout
      heading={heading}
      showTooltip={true}
      tooltipMessage={tooltipMessage}>
      <div className="flex flex-wrap gap-3">
        {skills.map((value) => (
          <ProjectsSkillChip key={value} readonly={true} value={value} />
        ))}
      </div>
    </ProjectsProfileInfoSectionLayout>
  );
}
