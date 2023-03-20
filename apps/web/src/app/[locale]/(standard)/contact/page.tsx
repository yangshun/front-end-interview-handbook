import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import ContactPage from './ContactPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Have questions, feedback, or anything to say? Let us know and we will get back as soon as possible.',
    pathname: '/contact',
    title: 'Contact Us',
  });
}

export default ContactPage;
