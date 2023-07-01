export type FAQItem = Readonly<{
  answer: JSX.Element;
  key: string;
  question: JSX.Element;
}>;

export type FAQItems = ReadonlyArray<FAQItem>;
