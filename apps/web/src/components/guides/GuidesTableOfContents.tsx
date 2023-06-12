import clsx from 'clsx';
import type { Ref } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import useScrollIntoView from '~/hooks/useScrollIntoView';
import useScrollParent from '~/hooks/useScrollParent';

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
  activeLinkRef,
  items,
}: Readonly<{
  activeId: string | null;
  activeLinkRef: Ref<HTMLAnchorElement>;
  items: TableOfContents;
}>) {
  return (
    <ol className="mt-2 space-y-3 text-xs" role="list">
      {items.map((section) => (
        <li key={section.id}>
          <p>
            <Anchor
              ref={activeId === section.id ? activeLinkRef : undefined}
              className={clsx(
                'hover:text-brand-darker motion-safe:transition-all',
                activeId === section.id
                  ? 'text-brand-dark'
                  : 'font-normal text-neutral-500',
              )}
              href={`#${section.id}`}
              variant="unstyled">
              {section.value}
            </Anchor>
          </p>
          {section.children && section.children.length > 0 && (
            <div className="pl-4">
              <ListItems
                activeId={activeId}
                activeLinkRef={activeLinkRef}
                items={section.children}
              />
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

  const [activeLink, setActiveLink] = useState<HTMLAnchorElement | null>(null);
  const activeLinkRef: Ref<HTMLAnchorElement> = setActiveLink;

  const navRef = useRef<HTMLElement>(null);
  const scrollParent = useScrollParent(navRef.current);

  const scrollIntoView = useScrollIntoView(scrollParent, {
    behavior: 'smooth',
    inPadding: 128,
  });

  useEffect(() => {
    scrollIntoView(activeLink);
  }, [scrollIntoView, activeLink]);

  return (
    // TODO: Replace the labelledby
    <nav ref={navRef} aria-labelledby={titleId}>
      {tableOfContents.length > 0 && (
        <>
          <Heading className="text-sm font-medium" id={titleId} level="custom">
            <FormattedMessage
              defaultMessage="On This Page"
              description="Title of the table of contents for a guidebook page."
              id="A5oI/E"
            />
          </Heading>
          <Section>
            <div className="mt-4">
              <ListItems
                activeId={activeId}
                activeLinkRef={activeLinkRef}
                items={tableOfContents}
              />
            </div>
          </Section>
        </>
      )}
    </nav>
  );
}
