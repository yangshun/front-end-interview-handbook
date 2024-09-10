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
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor,
} from '~/components/ui/theme';

const links = [
  {
    description:
      "Please check if there's a typo in the URL, such as extra or missing characters.",
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

type Props = Readonly<{
  returnHref: string;
}>;

export default function ErrorMessageBlock({ returnHref }: Props) {
  return (
    <Container className="flex flex-col gap-y-8 py-12">
      <div className="mx-auto flex max-w-prose flex-col gap-y-4 md:gap-y-8">
        <Heading className="text-center" level="heading4">
          Oops! An error has occurred
        </Heading>
        <div>
          <Text className="block text-center" color="secondary" size="body1">
            Some common reasons include:
          </Text>
          <ul
            className={clsx(
              'mt-6',
              ['border-y', themeBorderColor],
              ['divide-y', themeDivideColor],
            )}
            role="list">
            {links.map((link) => (
              <li key={link.name} className="relative flex gap-x-6 py-6">
                <div
                  className={clsx(
                    'size-10 flex flex-none items-center justify-center rounded-lg shadow-sm',
                    ['border', themeBorderColor],
                  )}>
                  <link.icon
                    aria-hidden="true"
                    className={clsx('size-6', themeTextBrandColor)}
                  />
                </div>
                <div className="flex flex-auto flex-col gap-1.5">
                  <Text className="block" size="body1" weight="medium">
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
      <div className="flex flex-col items-center gap-6">
        <Text size="body2">
          The error has been logged and we will be looking into it.
        </Text>
        <Button
          href={returnHref}
          label="Return"
          size="lg"
          type="button"
          variant="primary"
        />
      </div>
    </Container>
  );
}
