import grayMatter from 'gray-matter';
import { getMDXExport } from 'mdx-bundler/client';
import type { Metadata } from 'next/types';
import path from 'path';

import SystemDesignGuidebookLayout from '~/components/guides/SystemDesignGuidebookLayout';
import type { FrontEndSystemDesignRouteType } from '~/components/guides/types';
import { basePath } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';

import { readGuidesContents } from '~/db/guides/GuidesReader';
import { frontendSystemDesignRouteToFile } from '~/db/guides/GuidesUtils';
import { readMDXFileWithLocaleFallback } from '~/db/questions-bundlers/QuestionsBundler';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug: ReadonlyArray<string>;
  };
}>;

export async function generateStaticParams() {
  return generateStaticParamsWithLocale(
    Object.keys(frontendSystemDesignRouteToFile).map((slug) => ({
      slug: slug ? slug.split('/') : [],
    })),
  );
}

// TODO(interviews): consolidate
function requestToPaths({ params }: Props): Readonly<{
  directoryPath: string;
  pathname: string;
}> {
  const mdxPath = (params.slug ?? [])
    .join('/')
    .replace(/\/$/g, '') as FrontEndSystemDesignRouteType;

  const directoryPath = path.join(
    process.cwd(),
    '..',
    '..',
    'submodules',
    'front-end-interview-handbook',
    'packages',
    'system-design',
    'contents',
    frontendSystemDesignRouteToFile[mdxPath],
  );
  const pathname = `${basePath}/${mdxPath}`;

  return { directoryPath, pathname };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = props.params;
  const { directoryPath, pathname } = requestToPaths(props);

  const { data } = grayMatter(readGuidesContents(directoryPath, locale));
  const { description, title, seo_title, seo_description, social_title } = data;

  return defaultMetadata({
    description: seo_description || description,
    locale,
    ogImageTitle: title,
    pathname,
    socialTitle: social_title,
    title: seo_title || title,
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
