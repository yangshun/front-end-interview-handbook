import clsx from 'clsx';
import type { Ref } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import useScrollIntoView from '~/hooks/useScrollIntoView';
import useScrollParent from '~/hooks/useScrollParent';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeTextFaintColor,
  themeTextSecondaryColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import { useActiveHeadingId } from './GuidesHeadingObserver';
import { themeTextBrandColor } from '../ui/theme';

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
  level,
}: Readonly<{
  activeId: string | null;
  activeLinkRef: Ref<HTMLAnchorElement>;
  items: TableOfContents;
  level: number;
}>) {
  return (
    <ol className="flex flex-col gap-y-3 pt-3 text-sm sm:text-xs" role="list">
      {items.map((section) => {
        const isActive = activeId === section.id;
        const firstLevelHeadingClass = clsx(
          'font-medium',
          isActive ? themeTextBrandColor : themeTextSubtitleColor,
        );
        const innerLevelHeadingClass = isActive
          ? themeTextBrandColor
          : clsx(
              themeTextSecondaryColor,
              'hover:text-neutral-500 dark:hover:text-white',
            );

        return (
          <li key={section.id}>
            <div className="flex items-center">
              {level > 1 && (
                <RiArrowRightSLine
                  className={clsx('mr-1 size-3 shrink-0', themeTextFaintColor)}
                />
              )}
              <Anchor
                ref={isActive ? activeLinkRef : undefined}
                className={clsx(
                  'motion-safe:transition-all',
                  level === 1 ? firstLevelHeadingClass : innerLevelHeadingClass,
                )}
                href={`#${section.id}`}
                variant="unstyled">
                {section.value}
              </Anchor>
            </div>
            {section.children && section.children.length > 0 && (
              <div className="pl-3">
                <ListItems
                  activeId={activeId}
                  activeLinkRef={activeLinkRef}
                  items={section.children}
                  level={level + 1}
                />
              </div>
            )}
          </li>
        );
      })}
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
    <nav ref={navRef} aria-labelledby={titleId}>
      {tableOfContents.length > 0 && (
        <>
          <Heading className="text-sm font-medium" id={titleId} level="custom">
            <FormattedMessage
              defaultMessage="On this page"
              description="Title of the table of contents for a guidebook page."
              id="Cl4Ghp"
            />
          </Heading>
          <Section>
            <div className="pb-4">
              <ListItems
                activeId={activeId}
                activeLinkRef={activeLinkRef}
                items={tableOfContents}
                level={1}
              />
            </div>
          </Section>
        </>
      )}
    </nav>
  );
}
