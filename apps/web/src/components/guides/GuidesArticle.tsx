import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import Heading from '~/components/ui/Heading';

import Prose from '../ui/Prose';
import Abstract from '../ui/Prose/Abstract';
import { themeBorderColor } from '../ui/theme';

type Props = PropsWithChildren<
  Readonly<{
    description: string;
    title: string;
  }>
>;

const GuidesArticle = forwardRef<HTMLDivElement, Props>(
  ({ title, description, children }: Props, ref) => {
    return (
      <div className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-2">
          <Heading level="heading4" tag="h1">
            {title}
          </Heading>
          <Abstract>{description}</Abstract>
        </div>
        <hr className={themeBorderColor} />
        <Prose ref={ref}>{children}</Prose>
      </div>
    );
  },
);

export default GuidesArticle;
