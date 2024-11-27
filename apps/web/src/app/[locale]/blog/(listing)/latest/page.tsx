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
  const title = intl.formatMessage({
    defaultMessage:
      "What's New - Latest Front End updates from around the world",
    description: "Title of GreatFrontEnd blog what's new page",
    id: '7EXFWh',
  });

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Discover the latest updates on new tools, resources and improvements for front end engineers.',
      description: "Description of GreatFrontEnd blog what's new page",
      id: 'VpUdT9',
    }),
    locale,
    ogImageCategory: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'OG blog category',
      id: 'QZDp3f',
    }),
    ogImageTitle: title,
    pathname: '/blog/latest',
    socialTitle: intl.formatMessage({
      defaultMessage: "What's New | GreatFrontEnd",
      description: "Title of GreatFrontEnd blog what's new page",
      id: 'd+1G/V',
    }),
    title,
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
