import grayMatter from 'gray-matter';
import { getMDXExport } from 'mdx-bundler/client';
import type { Metadata } from 'next/types';

import FrontEndSystemDesignPlaybookLayout from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookLayout';
import type { FrontEndSystemDesignPlaybookPathType } from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookNavigation';
import {
  basePath,
  FrontEndSystemDesignPlaybookPathToFile,
} from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookNavigation';
import GuidesMarkdown from '~/components/guides/GuidesMarkdown';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';

import {
  guidesRequestToFilePath,
  readGuidesContents,
} from '~/db/guides/GuidesReader';
import { readMDXFileWithLocaleFallback } from '~/db/questions-bundlers/QuestionsBundler';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
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
    Object.keys(FrontEndSystemDesignPlaybookPathToFile).map((slug) => ({
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
    .replace(/\/$/g, '') as FrontEndSystemDesignPlaybookPathType;

  const directoryPath = guidesRequestToFilePath(
    'FRONT_END_SYSTEM_DESIGN_PLAYBOOK',
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
  const { directoryPath } = requestToPaths(props);
  const {
    params: { locale },
  } = props;

  const code = await readMDXFileWithLocaleFallback(directoryPath, locale, {
    extractFrontmatter: true,
    extractHeadings: true,
    loadJSFilesAsText: false,
  });
  const {
    default: Markdown,
    description,
    tableOfContents,
    title,
  } = getMDXExport(code ?? '', {
    MDXCodeBlock,
  });

  const { questions } = await fetchQuestionsList(
    { type: 'format', value: 'system-design' },
    locale,
  );

  return (
    <FrontEndSystemDesignPlaybookLayout
      description={description}
      questions={questions}
      tableOfContents={tableOfContents}
      title={title}>
      <GuidesMarkdown markdown={Markdown} />
    </FrontEndSystemDesignPlaybookLayout>
  );
}
