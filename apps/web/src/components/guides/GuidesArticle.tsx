import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import Prose from '../ui/Prose';
import Abstract from '../ui/Prose/Abstract';

type Props = PropsWithChildren<
  Readonly<{
    description: string;
    title: string;
  }>
>;

const GuidesArticle = forwardRef<HTMLDivElement, Props>(
  ({ title, description, children }: Props, ref) => {
    return (
      <Prose ref={ref}>
        <h1>{title}</h1>
        <Abstract>{description}</Abstract>
        <hr />
        {children}
      </Prose>
    );
  },
);

export default GuidesArticle;
