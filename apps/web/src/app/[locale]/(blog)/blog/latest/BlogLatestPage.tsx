'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

export function BlogLatestPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="What's New"
            description="What's New page title"
            id="DNFfNt"
          />
        </Heading>
        <Text
          className={clsx('max-w-3xl')}
          color="secondary"
          display="block"
          size="body2">
          <FormattedMessage
            defaultMessage="Here you'll find curated collection of our most insightful and engaging blog content, neatly organized into series for your convenience. Each series focuses on a unique theme or topic providing deep dive subject."
            description="what's new page description"
            id="THb7DH"
          />
        </Text>
      </div>
      {children}
    </div>
  );
}
