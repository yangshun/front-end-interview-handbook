'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeDivideColor } from '~/components/ui/theme';

type Props = Readonly<{
  hasEntered: boolean;
}>;

export default function RewardsTaskList({ hasEntered }: Props) {
  // TODO: pull out tasks to a RewardsTask component with hasEntered
  // Then there check if it has been completed
  return (
    <Container
      className="max-lg:theme-bg-radial-glow relative isolate flex flex-col gap-y-4 py-6 lg:py-8"
      variant="2xl">
      <Text className="text-neutral-600 dark:text-neutral-400" display="block" size="body2">
        <FormattedMessage
          defaultMessage="Here are the tasks for this campaign:"
          description="Description for campaign tasks"
          id="oiMKy3"
        />
      </Text>
      <Section>
        <div className="flex flex-col gap-y-6">
          <dl className={clsx(['divide-y', themeDivideColor])}>
            <div className="py-2 md:py-3">
              <dt className="text-base sm:text-lg md:text-xl">
                <Text display="block" size="body3">
                  <FormattedMessage
                    defaultMessage="I am Task 1"
                    description="Title for Task 1"
                    id="0UO/Ju"
                  />
                </Text>
                { hasEntered && (
                    <Text
                      className="text-neutral-600 dark:text-neutral-400"
                      display="block"
                      size="body2">
                      "i am a button"
                    </Text>
                  )
                }
              </dt>
            </div>
            <div className="py-2 md:py-3">
              <dt className="text-base sm:text-lg md:text-xl">
                <Text display="block" size="body3">
                  <FormattedMessage
                    defaultMessage="I am Task 2"
                    description="Title for Task 2"
                    id="0qd9FM"
                  />
                </Text>
              </dt>
            </div>
          </dl>
        </div>
      </Section>
    </Container>
  );
}
