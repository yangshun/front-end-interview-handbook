import grayMatter from 'gray-matter';
import { getMDXExport } from 'mdx-bundler/client';
import type { Metadata } from 'next/types';
import path from 'path';

import SystemDesignGuidebookLayout from '~/components/guides/SystemDesignGuidebookLayout';
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
  '': 'introduction',
  cheatsheet: 'cheatsheet',
  'common-mistakes': 'common-mistakes',
  'evaluation-axes': 'evaluation-axes',
  framework: 'framework',
  'types-of-questions': 'types-of-questions',
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
    'submodules',
    'front-end-interview-handbook',
    'packages',
    'system-design',
    'contents',
    routeToFile[mdxPath],
  );
  const pathname = `/system-design/${mdxPath}`;

  return { directoryPath, pathname };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = props.params;
  const { directoryPath, pathname } = requestToPaths(props);

  const { data } = grayMatter(readGuidesContents(directoryPath, locale));
  const {
    description,
    title,
    seo_description: seoDescription,
    seo_title: seoTitle,
  } = data;

  return defaultMetadata({
    description: seoDescription ?? description,
    locale,
    pathname,
    title: seoTitle ?? title,
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
    <SystemDesignGuidebookLayout
      description={description}
      tableOfContents={tableOfContents}
      title={title}>
      <Markdown components={MDXComponents} />
    </SystemDesignGuidebookLayout>
  );
}
