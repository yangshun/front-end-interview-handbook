import clsx from 'clsx';
import { RiHome2Line } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import {
  themeBackgroundColor,
  themeLineColor,
  themeLineTextColor,
} from '~/components/ui/theme';

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
      className={clsx('flex border-b', themeLineColor, themeBackgroundColor)}>
      <ol
        className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
        role="list">
        <li className="flex">
          <div className="flex items-center">
            <Button
              href="/prepare"
              icon={RiHome2Line}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Home',
                description: 'Home button on breadcrumb component',
                id: 's3LMhK',
              })}
              size="sm"
              variant="tertiary"
            />
          </div>
        </li>
        {links.map((item) => (
          <li key={item.label} className="flex">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className={clsx(
                  'mr-2 h-full w-5 flex-shrink-0',
                  themeLineTextColor,
                )}
                fill="currentColor"
                preserveAspectRatio="none"
                viewBox="0 0 24 44"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Button
                href={item.href}
                label={item.label}
                size="xs"
                variant="tertiary"
              />
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
