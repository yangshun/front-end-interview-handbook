'use client';

import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import type { FAQItems } from '~/data/faqs/FAQs';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import {
  themeDivideColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import { Disclosure } from '@headlessui/react';

type Props = Readonly<{
  faqs: FAQItems;
  hideTitle?: boolean;
  title: string;
}>;

export default function FAQSection({ faqs, title, hideTitle = false }: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      <Heading className={clsx(hideTitle && 'sr-only')} level="heading4">
        {title}
      </Heading>
      <Section>
        <dl className={clsx(['divide-y', themeDivideColor])}>
          {faqs.map((faq) => (
            <Disclosure key={faq.key} as="div" className="py-4 md:py-6">
              {({ open }) => (
                <>
                  <dt className="text-base sm:text-lg md:text-xl">
                    <Disclosure.Button
                      className={clsx(
                        'flex w-full items-start justify-between text-left',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
                        'focus-visible:ring-brand-dark dark:focus-visible:ring-brand',
                      )}>
                      <Text
                        className="text-sm sm:text-lg"
                        color="subtitle"
                        display="block"
                        size="custom"
                        weight="medium">
                        {faq.question}
                      </Text>
                      <span
                        className={clsx(
                          'ml-6 flex h-6 items-center',
                          themeTextSubtitleColor,
                        )}>
                        <RiArrowDownSLine
                          aria-hidden="true"
                          className={clsx(
                            open ? '-rotate-180' : 'rotate-0',
                            'h-6 w-6 transform',
                          )}
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-4 pr-12">
                    <Prose className="prose-sm sm:prose-base">
                      {faq.answer}
                    </Prose>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </Section>
    </div>
  );
}
