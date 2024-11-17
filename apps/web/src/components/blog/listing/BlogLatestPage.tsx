'use client';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

export function BlogLatestPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="What's new"
            description="Latest blog articles page title"
            id="nv3dMg"
          />
        </Heading>
        <Text className="block max-w-3xl" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Here you'll find curated collection of our most insightful and engaging blog content, neatly organized into series for your convenience. Each series focuses on a unique theme or topic providing deep dive subject."
            description="Latest blog articles page subtitle"
            id="WelJgL"
          />
        </Text>
      </div>
      {children}
    </div>
  );
}
