import type { Metadata } from 'next';

import { readBlogPostsAll } from '~/components/blog/data/BlogReader';
import { BlogLatestPage } from '~/components/blog/listing/BlogLatestPage';
import BlogWhatsNewListing from '~/components/blog/listing/BlogWhatsNewListing';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
      defaultMessage: "What's new | Blog",
      description: "Title of GreatFrontEnd blog what's new page",
      id: 'Rbapby',
    }),
  });
}

export default async function Page() {
  const posts = readBlogPostsAll();

  return (
    <BlogLatestPage>
      <BlogWhatsNewListing posts={posts} />
    </BlogLatestPage>
  );
}
