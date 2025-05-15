import UIExamplesGroup from '../misc/UIExamplesGroup';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';

export function AccordionDemo({
  type,
}: Readonly<{
  type: 'multiple' | 'single';
}>) {
  return (
    <Accordion collapsible={true} type={type}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function AccordionExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Accordion">
      <AccordionDemo type="single" />
      <AccordionDemo type="multiple" />
    </UIExamplesGroup>
  );
}
