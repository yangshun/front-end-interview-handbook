import clsx from 'clsx';
import { useId } from 'react';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useActiveHeadingId } from './GuidesHeadingObserver';

type TableOfContentsItem = Readonly<{
  children?: ReadonlyArray<TableOfContentsItem>;
  depth: number;
  id: string;
  value: string;
}>;

export type TableOfContents = ReadonlyArray<TableOfContentsItem>;

type Props = Readonly<{
  tableOfContents: TableOfContents;
}>;

function ListItems({
  activeId,
  items,
}: Readonly<{
  activeId: string | null;
  items: TableOfContents;
}>) {
  return (
    <ol className="mt-2 space-y-3 text-xs" role="list">
      {items.map((section) => (
        <li key={section.id}>
          <p>
            <Anchor
              className={clsx(
                'hover:text-brand-700 motion-safe:transition-all',
                activeId === section.id
                  ? 'text-brand-500 font-semibold'
                  : 'font-normal text-slate-500',
              )}
              href={`#${section.id}`}
              variant="unstyled">
              {section.value}
            </Anchor>
          </p>
          {section.children && section.children.length > 0 && (
            <div className="pl-4">
              <ListItems activeId={activeId} items={section.children} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function GuidesTableOfContents({ tableOfContents }: Props) {
  const titleId = useId();
  const activeId = useActiveHeadingId();

  return (
    // TODO: Replace the labelledby
    <nav aria-labelledby={titleId} className="w-56">
      {tableOfContents.length > 0 && (
        <>
          <Heading
            className="font-display text-sm font-medium text-slate-900"
            id={titleId}>
            On This Page
          </Heading>
          <Section>
            <div className="mt-4">
              <ListItems activeId={activeId} items={tableOfContents} />
            </div>
          </Section>
        </>
      )}
    </nav>
  );
}
