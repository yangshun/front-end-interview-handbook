import grayMatter from 'gray-matter';
import { getMDXExport } from 'mdx-bundler/client';
import type { Metadata } from 'next/types';
import path from 'path';

import FrontEndInterviewGuidebookLayout from '~/components/guides/FrontEndInterviewGuidebookLayout';
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
  algorithms: 'algorithms',
  coding: 'coding',
  javascript: 'javascript',
  quiz: 'quiz',
  resume: 'resume',
  'system-design': 'system-design',
  'user-interface': 'user-interface',
  'user-interface-components-api-design-principles':
    'user-interface-components-api-design-principles',
  'user-interface-questions-cheatsheet': 'user-interface-questions-cheatsheet',
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
  const { slug } = params;
  const mdxPath = (slug ?? []).join('/').replace(/\/$/g, '');

  const directoryPath = path.join(
    process.cwd(),
    '..',
    '..',
    'submodules',
    'front-end-interview-handbook',
    'packages',
    'front-end-interview-guidebook',
    'contents',
    routeToFile[mdxPath],
  );
  const pathname = `/front-end-interview-guidebook/${mdxPath}`;

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
  const { locale } = props.params;
  const { directoryPath } = requestToPaths(props);

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
    <FrontEndInterviewGuidebookLayout
      description={description}
      tableOfContents={tableOfContents}
      title={title}>
      <Markdown components={MDXComponents} />
    </FrontEndInterviewGuidebookLayout>
  );
}
