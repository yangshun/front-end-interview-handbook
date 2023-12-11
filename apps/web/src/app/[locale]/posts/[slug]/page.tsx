import { allProjects } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { getMDXComponent } from 'next-contentlayer/hooks';

import Prose from '~/components/ui/Prose';

export const generateStaticParams = async () =>
  allProjects.map((project) => ({ slug: project._raw.flattenedPath }));

type Params = Readonly<{
  params: Readonly<{
    slug: string;
  }>;
}>;

export const generateMetadata = ({ params }: Params) => {
  const project = allProjects.find(
    (projectItem) =>
      projectItem._raw.flattenedPath === `projects/${params.slug}`,
  )!;

  return { title: project.title };
};

function ProjectLayout({ params }: Params) {
  const project = allProjects.find(
    (projectItem) =>
      projectItem._raw.flattenedPath === `projects/${params.slug}`,
  )!;

  const Content = getMDXComponent(project.body.code);

  return (
    <article className="py-8 mx-auto max-w-xl">
      <Prose>
        <div className="mb-8 text-center">
          <time className="mb-1 text-xs text-gray-600" dateTime={project.date}>
            {format(parseISO(project.date), 'LLLL d, yyyy')}
          </time>
          <h1>{project.title}</h1>
        </div>
        <Content />
      </Prose>
    </article>
  );
}

export default ProjectLayout;
