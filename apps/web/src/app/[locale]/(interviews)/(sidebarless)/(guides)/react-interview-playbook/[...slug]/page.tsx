import grayMatter from 'gray-matter';
import { getMDXExport } from 'mdx-bundler/client';
import type { Metadata } from 'next/types';

import ReactInterviewPlaybookLayout from '~/components/guides/books/react-interview-playbook/ReactInterviewPlaybookLayout';
import type { ReactInterviewPlaybookPathType } from '~/components/guides/books/react-interview-playbook/ReactInterviewPlaybookNavigation';
import {
  basePath,
  ReactInterviewPlaybookPathToFile,
} from '~/components/guides/books/react-interview-playbook/ReactInterviewPlaybookNavigation';
import GuidesMarkdown from '~/components/guides/GuidesMarkdown';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';

import {
  guidesRequestToFilePath,
  readGuidesContents,
} from '~/db/guides/GuidesReader';
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
    Object.keys(ReactInterviewPlaybookPathToFile).map((slug) => ({
      slug: slug ? slug.split('/') : [],
    })),
  );
}

function requestToPaths({ params }: Props): Readonly<{
  directoryPath: string;
  pathname: string;
}> {
  const mdxPath = (params.slug ?? [])
    .join('/')
    .replace(/\/$/g, '') as ReactInterviewPlaybookPathType;

  const directoryPath = guidesRequestToFilePath(
    'REACT_INTERVIEW_PLAYBOOK',
    mdxPath,
  );
  const pathname = `${basePath}/${mdxPath}`;

  return { directoryPath, pathname };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = props.params;
  const { directoryPath, pathname } = requestToPaths(props);

  const { data } = grayMatter(readGuidesContents(directoryPath, locale));
  const { description, seo_description, seo_title, social_title, title } = data;

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
  const {
    params: { locale },
  } = props;
  const { directoryPath } = requestToPaths(props);

  const { code, frontmatter } = await readMDXFileWithLocaleFallback(
    directoryPath,
    locale,
    {
      extractHeadings: true,
      loadJSFilesAsText: false,
    },
  );
  const { default: Markdown, tableOfContents } = getMDXExport(code ?? '', {
    MDXCodeBlock,
  });

  return (
    <ReactInterviewPlaybookLayout
      description={frontmatter.description}
      tableOfContents={tableOfContents}
      title={frontmatter.title}>
      <GuidesMarkdown markdown={Markdown} />
    </ReactInterviewPlaybookLayout>
  );
}
