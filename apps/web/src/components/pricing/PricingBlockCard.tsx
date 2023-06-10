import React, { useId } from 'react';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { CheckIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  features: ReadonlyArray<React.ReactNode>;
  featuresSectionTitle: React.ReactNode;
  footer?: React.ReactNode;
  rightSectionContents: React.ReactNode;
  subtitle: React.ReactNode;
  title: React.ReactNode;
}>;

export default function PricingBlockCard({
  footer,
  title,
  subtitle,
  featuresSectionTitle,
  features,
  rightSectionContents,
}: Props) {
  const id = useId();

  return (
    <div className="mx-auto max-w-lg overflow-hidden rounded-lg border border-neutral-200 lg:flex lg:max-w-none">
      <div className="flex-1 bg-white px-6 py-8 lg:p-12">
        <Heading className="text-2xl" id={id} level="heading4">
          {title}
        </Heading>
        <Section>
          <p className="mt-6 text-base text-neutral-500">{subtitle}</p>
          <div className="mt-8">
            <div className="flex items-center">
              <h4 className="text-brand-600 flex-shrink-0 bg-white pr-4 text-base font-semibold">
                {featuresSectionTitle}
              </h4>
              <div className="flex-1 border-t-2 border-neutral-200" />
            </div>
            <ul
              className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
              role="list">
              {features.map((feature, idx) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <CheckIcon
                      aria-hidden="true"
                      className="text-success-light h-5 w-5"
                    />
                  </div>
                  <p className="ml-3 text-sm text-neutral-700">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          {footer && <div className="pt-8">{footer}</div>}
        </Section>
      </div>
      <Section>
        <div className="min-w-[300px] bg-neutral-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
          {rightSectionContents}
        </div>
      </Section>
    </div>
  );
}
