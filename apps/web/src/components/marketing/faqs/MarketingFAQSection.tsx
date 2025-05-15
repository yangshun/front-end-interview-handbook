'use client';

import clsx from 'clsx';

import type { FAQItems } from '~/data/faqs/FAQs';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

type Props = Readonly<{
  accordionTriggerClassName?: string;
  faqs: FAQItems;
  hideTitle?: boolean;
  title: string;
}>;

export default function MarketingFAQSection({
  accordionTriggerClassName,
  faqs,
  hideTitle = false,
  title,
}: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      <Heading
        className={clsx(hideTitle && 'sr-only')}
        level="heading3"
        weight="medium">
        {title}
      </Heading>
      <Section>
        <Accordion type="multiple">
          {faqs.map((faq) => (
            <AccordionItem key={faq.key} value={faq.key}>
              <AccordionTrigger className={accordionTriggerClassName}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <Prose className="prose-sm sm:prose-base">{faq.answer}</Prose>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </div>
  );
}
