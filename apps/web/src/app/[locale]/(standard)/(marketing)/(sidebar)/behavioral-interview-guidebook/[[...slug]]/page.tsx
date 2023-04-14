import grayMatter from 'gray-matter';
import { getMDXExport } from 'mdx-bundler/client';
import type { Metadata } from 'next/types';
import path from 'path';

import BehavioralInterviewGuidebookLayout from '~/components/guides/BehavioralInterviewGuidebookLayout';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';

import { readGuidesContents } from '~/db/guides/GuidesReader';
import { readMDXFileWithLocaleFallback } from '~/db/questions-bundlers/QuestionsBundler';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug?: ReadonlyArray<string>;
  };
}>;

const routeToFile: Record<string, string> = {
  '': 'overview',
  collaboration: 'collaboration',
  'growth-mindset': 'growth-mindset',
  'problem-solving': 'problem-solving',
  questions: 'questions',
  'questions-to-ask': 'questions-to-ask',
  'self-introduction': 'self-introduction',
  'why-work-here': 'why-work-here',
};

export async function generateStaticParams() {
  return generateStaticParamsWithLocale(
    Object.keys(routeToFile).map((slug) => ({
      slug: slug ? slug.split('/') : [],
    })),
  );
}

function requestToPaths({ params }: Props): Readonly<{
  directoryPath: string;
  pathname: string;
}> {
  const mdxPath = (params.slug ?? []).join('/').replace(/\/$/g, '');

  const directoryPath = path.join(
    process.cwd(),
    '..',
    '..',
    'packages',
    'guides',
    'behavioral-interview-guidebook',
    routeToFile[mdxPath],
  );
  const pathname = `/behavioral-interview-guidebook/${mdxPath}`;

  return { directoryPath, pathname };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = props.params;
  const { directoryPath, pathname } = requestToPaths(props);

  const { data } = grayMatter(readGuidesContents(directoryPath, locale));
  const { description, title } = data;

  return defaultMetadata({
    description,
    locale,
    pathname,
    title,
  });
}

export default async function Page(props: Props) {
  const { directoryPath } = requestToPaths(props);
  const { locale } = props.params;

  const code = await readMDXFileWithLocaleFallback(directoryPath, locale, {
    extractFrontmatter: true,
    extractHeadings: true,
    loadJSFilesAsText: false,
  });
  const {
    title,
    description,
    tableOfContents,
    default: Markdown,
  } = getMDXExport(code ?? '', {
    MDXCodeBlock,
  });

  return (
    <BehavioralInterviewGuidebookLayout
      description={description}
      tableOfContents={tableOfContents}
      title={title}>
      <Markdown components={MDXComponents} />
    </BehavioralInterviewGuidebookLayout>
  );
}
