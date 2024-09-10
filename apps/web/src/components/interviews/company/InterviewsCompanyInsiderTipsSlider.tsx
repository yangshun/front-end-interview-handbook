import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

type Props = Readonly<{
  data: ReadonlyArray<{
    content: string;
    id: string;
  }>;
}>;

export default function InterviewsCompanyInsiderTipsSlider({ data }: Props) {
  const intl = useIntl();
  const timer = useRef<NodeJS.Timeout>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (data.length > 1) {
      timer.current = setInterval(() => {
        setIndex((preIndex) => (preIndex + 1) % data.length);
      }, 6000);
    }

    return () => {
      window.clearInterval(timer.current);
    };
  }, [data.length]);

  const dataValue = data[index].id;

  return (
    <div className="flex w-full flex-col gap-3">
      <Heading level="heading6">
        {intl.formatMessage({
          defaultMessage: 'Insider tips',
          description: 'Title for inside tips',
          id: 'hnbgcq',
        })}
      </Heading>
      <TabsPrimitive.Root
        className="flex flex-col gap-8"
        value={dataValue}
        onValueChange={(newValue) => {
          // Stop auto-advancing if user interacts with steppers.
          window.clearInterval(timer.current);
          setIndex(data.findIndex(({ id }) => id === newValue));
        }}>
        <div>
          {data.map((item) => (
            <TabsPrimitive.Content key={item.id} value={item.id}>
              <Text size="body2" weight="medium">
                <span className="italic">"{item.content}"</span>
                <Text color="secondary" weight="normal">
                  {' - '}
                  {intl.formatMessage({
                    defaultMessage: 'Interviewers',
                    description: 'Label for interviewers',
                    id: 'XwYAwS',
                  })}
                </Text>
              </Text>
            </TabsPrimitive.Content>
          ))}
        </div>
        {data.length > 1 && (
          <TabsPrimitive.List className="flex justify-start gap-4">
            {data.map((item) => (
              <TabsPrimitive.Trigger
                key={item.id}
                asChild={true}
                value={item.id}>
                <button
                  aria-label={item.id}
                  className={clsx(
                    'h-[4px] w-12 rounded',
                    item.id === dataValue
                      ? themeBackgroundBrandColor
                      : 'bg-neutral-200/70 dark:bg-neutral-700',
                    themeOutlineElement_FocusVisible,
                    themeOutlineElementBrandColor_FocusVisible,
                  )}
                  type="button"
                />
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
        )}
      </TabsPrimitive.Root>
    </div>
  );
}
