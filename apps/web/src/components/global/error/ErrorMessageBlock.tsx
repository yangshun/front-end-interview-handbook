'use client';

import clsx from 'clsx';
import {
  RiDeleteBinLine,
  RiErrorWarningLine,
  RiToolsLine,
  RiWindowLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  returnHref: string;
}>;

export default function ErrorMessageBlock({ returnHref }: Props) {
  const intl = useIntl();
  const links = useLinks();

  return (
    <Container className="flex flex-col gap-y-8 py-12">
      <div className="mx-auto flex max-w-prose flex-col gap-y-4 md:gap-y-8">
        <Heading className="text-center" level="heading4">
          {intl.formatMessage({
            defaultMessage: 'Oops! An error has occurred',
            description: 'Error message title',
            id: 'lFbX7p',
          })}
        </Heading>
        <div>
          <Text className="block text-center" color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage: 'Some common reasons include:',
              description: 'Error message description',
              id: 'fxZ0zk',
            })}
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
          {intl.formatMessage({
            defaultMessage:
              'The error has been logged and we will be looking into it.',
            description: 'Error message log description',
            id: '+I+Xtv',
          })}
        </Text>
        <Button
          href={returnHref}
          label={intl.formatMessage({
            defaultMessage: 'Return',
            description: 'Return label',
            id: 'D+Qa8G',
          })}
          size="lg"
          type="button"
          variant="primary"
        />
      </div>
    </Container>
  );
}

function useLinks() {
  const intl = useIntl();

  return [
    {
      description: intl.formatMessage({
        defaultMessage:
          "Please check if there's a typo in the URL, such as extra or missing characters.",
        description: 'Invalid URL error message',
        id: 'LjTVFe',
      }),

      icon: RiErrorWarningLine,

      name: intl.formatMessage({
        defaultMessage: 'Invalid URL',
        description: 'Invalid URL error',
        id: 'YeWPOG',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'The page does not exist or has been removed.',
        description: 'No such page error message',
        id: 'v8kErk',
      }),

      icon: RiDeleteBinLine,

      name: intl.formatMessage({
        defaultMessage: 'No such page',
        description: 'No such page error',
        id: 'Nvn+wO',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Please update your browser to the latest version or try using another browser.',
        description: 'Outdated browser error message',
        id: 'GTUCVC',
      }),

      icon: RiWindowLine,

      name: intl.formatMessage({
        defaultMessage: 'Outdated browser',
        description: 'Outdated browser error',
        id: '4d1N0P',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'You are using a browser extension that is incompatible with the page, e.g. extensions that modify code blocks.',
        description: 'Incompatible extensions error message',
        id: 'oPauc5',
      }),

      icon: RiToolsLine,

      name: intl.formatMessage({
        defaultMessage: 'Incompatible extensions',
        description: 'Incompatible extensions error',
        id: 'aaJtz1',
      }),
    },
  ];
}
