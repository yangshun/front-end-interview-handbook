import clsx from 'clsx';
import {
  RiDeleteBinLine,
  RiErrorWarningLine,
  RiToolsLine,
  RiWindowLine,
} from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeDivideColor,
  themeLineColor,
  themeTextBrandColor,
} from '~/components/ui/theme';

const links = [
  {
    description: "Please check if there's a typo in the URL.",
    icon: RiErrorWarningLine,
    name: 'Invalid URL',
  },
  {
    description: 'The page does not exist or has been removed.',
    icon: RiDeleteBinLine,
    name: 'No such page',
  },
  {
    description:
      'Please update your browser to the latest version or try using another browser.',
    icon: RiWindowLine,
    name: 'Outdated browser',
  },
  {
    description:
      'You are using a browser extension that is incompatible with the page, e.g. extensions that modify code blocks.',
    icon: RiToolsLine,
    name: 'Incompatible extensions',
  },
];

export default function ErrorMessageBlock() {
  return (
    <Container className="flex flex-col gap-y-8 py-12">
      <div className="mx-auto flex max-w-prose flex-col gap-y-4 md:gap-y-8">
        <Heading className="text-center" level="heading4">
          Oops! An error has occurred
        </Heading>
        <div>
          <Text className="text-center" color="secondary" display="block">
            Some common reasons include:
          </Text>
          <ul
            className={clsx(
              'mt-6',
              ['border-y', themeLineColor],
              ['divide-y', themeDivideColor],
            )}
            role="list">
            {links.map((link) => (
              <li key={link.name} className="relative flex gap-x-6 py-6">
                <div
                  className={clsx(
                    'flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm',
                    ['border', themeLineColor],
                  )}>
                  <link.icon
                    aria-hidden="true"
                    className={clsx('h-6 w-6', themeTextBrandColor)}
                  />
                </div>
                <div className="flex flex-auto flex-col gap-1.5">
                  <Text display="block" weight="medium">
                    {link.name}
                  </Text>
                  <Text color="secondary" size="body2">
                    {link.description}
                  </Text>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center">
        <Button
          href="/prepare"
          label="Return to dashboard"
          size="lg"
          type="button"
          variant="primary"
        />
      </div>
    </Container>
  );
}
