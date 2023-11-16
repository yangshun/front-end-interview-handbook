type Props = Readonly<{
  skill: string;
}>;

export default function ProjectsSkillChip({ skill }: Props) {
  return <span className="px-2 py-0.5 text-xs bg-orange-700 text-white rounded-[4px]">{skill}</span>;
}
