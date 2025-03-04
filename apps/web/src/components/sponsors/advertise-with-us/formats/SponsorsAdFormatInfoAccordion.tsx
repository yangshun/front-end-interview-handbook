import clsx from 'clsx';
import type { ReactNode } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import { themeBorderEmphasizeColor } from '~/components/ui/theme';

type Props = Readonly<{
  items: ReadonlyArray<{
    content: ReactNode;
    key: string;
    title: ReactNode;
  }>;
}>;

export default function SponsorsAdFormatInfoAccordion({ items }: Props) {
  return (
    <Accordion
      className={clsx('border-y', themeBorderEmphasizeColor)}
      type="multiple">
      {items.map((item) => (
        <AccordionItem key={item.key} value={item.key}>
          <AccordionTrigger className="py-6">{item.title}</AccordionTrigger>
          <AccordionContent className="!pb-10 pt-4">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
