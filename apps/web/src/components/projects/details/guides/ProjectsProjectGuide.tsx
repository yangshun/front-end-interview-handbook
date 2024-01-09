import type { ProjectGuide } from 'contentlayer/generated';

import ProjectsProjectMdxContent from '~/components/projects/common/ProjectsProjectMdxContent';
import Heading from '~/components/ui/Heading';

type Props = Readonly<{
  projectGuides: Array<ProjectGuide>;
}>;

export default function ProjectsProjectGuide({ projectGuides }: Props) {
  const projectGuide = projectGuides[0];

  return (
    <div className="flex flex-col md:gap-12 gap-6">
      <Heading level="heading4">{projectGuide.title}</Heading>
      {projectGuide != null && (
        <div className="pt-2">
          <ProjectsProjectMdxContent mdxCode={projectGuide.body.code} />
        </div>
      )}
    </div>
  );
}
