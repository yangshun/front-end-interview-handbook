import type { Metadata } from 'next';

import BlogWhatsNewListing from '~/components/blog/BlogWhatsNewListing';

import { getAllPosts } from '~/contentlayer/utils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import { BlogLatestPage } from './BlogLatestPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        "Here you'll find curated collection of our most insightful and engaging blog content, neatly organized into series for your convenience. Each series focuses on a unique theme or topic providing deep dive subject.",
      description: "Description of GreatFrontEnd blog what's new page",
      id: 'y5OP5O',
    }),
    locale,
    pathname: '/blog/latest',
    title: intl.formatMessage({
      defaultMessage: "What's New",
      description: "Title of GreatFrontEnd blog what's new page",
      id: 'KFBmPx',
    }),
  });
}

export default async function Page() {
  const blogs = getAllPosts({ sort: true });

  return (
    <BlogLatestPage>
      <BlogWhatsNewListing blogs={blogs} />
    </BlogLatestPage>
  );
}
