import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';

import type { QuestionsListingBreadcrumbsLinks } from './QuestionsListingBreadcrumbs';
import QuestionsListingBreadcrumbs from './QuestionsListingBreadcrumbs';
type Props = Readonly<{
  links?: QuestionsListingBreadcrumbsLinks;
  subtitle?: string;
  title: string;
}>;

export default function QuestionsListingPageHeader({
  links,
  title,
  subtitle,
}: Props) {
  return (
    <div className="space-y-2">
      {links && links.length > 0 && (
        <QuestionsListingBreadcrumbs links={links} />
      )}
      <Container>
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1 border-b border-slate-200 pt-12 pb-12">
            <Heading className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </Heading>
            {subtitle && (
              <p className="mt-4 text-base text-slate-500">{subtitle}</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
