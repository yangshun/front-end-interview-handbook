import { RiHome2Line } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';

export type QuestionsListingBreadcrumbsLinks = ReadonlyArray<{
  href: string;
  isCurrent?: boolean;
  label: string;
}>;
type Props = Readonly<{
  links: QuestionsListingBreadcrumbsLinks;
}>;

export default function QuestionsListingBreadcrumbs({ links }: Props) {
  const intl = useIntl();

  return (
    <nav
      aria-label={intl.formatMessage({
        defaultMessage: 'Breadcrumb',
        description: 'Screenreader text to indicate breadcrumb component',
        id: 'c12AhV',
      })}
      className="flex border-b border-neutral-200 bg-neutral-50">
      <ol
        className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
        role="list">
        <li className="flex">
          <div className="flex items-center">
            <Anchor
              className="text-neutral-400 hover:text-neutral-500"
              href="/prepare"
              variant="unstyled">
              <RiHome2Line
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0"
              />
              <span className="sr-only">
                <FormattedMessage
                  defaultMessage="Home"
                  description="Home button on breadcrumb component"
                  id="s3LMhK"
                />
              </span>
            </Anchor>
          </div>
        </li>
        {links.map((item) => (
          <li key={item.label} className="flex">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="h-full w-5 flex-shrink-0 text-neutral-200"
                fill="currentColor"
                preserveAspectRatio="none"
                viewBox="0 0 24 44"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Anchor
                aria-current={item.isCurrent ? 'page' : undefined}
                className="ml-4 text-xs font-medium text-neutral-500 hover:text-neutral-700"
                href={item.href}
                variant="unstyled">
                {item.label}
              </Anchor>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
