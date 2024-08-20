import clsx from 'clsx';
import { flatMapDeep } from 'lodash-es';
import type { Ref } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiListCheck,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import useScrollIntoView from '~/hooks/useScrollIntoView';
import useScrollParent from '~/hooks/useScrollParent';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { textVariants } from '~/components/ui/Text';
import {
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useActiveHeadingId } from './GuidesHeadingObserver';

type TableOfContentsItem = Readonly<{
  children?: ReadonlyArray<TableOfContentsItem>;
  depth: number;
  id: string;
  value: string;
}>;

export type TableOfContents = ReadonlyArray<TableOfContentsItem>;

type Props = Readonly<{
  collapsed?: boolean;
  tableOfContents: TableOfContents;
}>;

function ListItem({
  activeId,
  activeLinkRef,
  level,
  section,
}: Readonly<{
  activeId: string | null;
  activeLinkRef: Ref<HTMLAnchorElement>;
  level: number;
  section: TableOfContentsItem;
}>) {
  const isActive = activeId === section.id;

  const hasChildren = section.children && section.children.length > 0;

  return (
    <li key={section.id} className="relative text-sm leading-6">
      <div className={clsx('flex', hasChildren && 'mb-2')}>
        <Anchor
          ref={isActive ? activeLinkRef : undefined}
          className={clsx(
            '-ml-0.5 flex w-full items-center gap-x-2 pl-[19px]',
            'motion-safe:transition-all',
            'text-[0.8125rem] leading-5',
            themeTextSecondaryColor,
            'hover:text-neutral-900 dark:hover:text-white',
          )}
          href={`#${section.id}`}
          variant="unstyled">
          <span className="line-clamp-1" style={{ paddingLeft: 12 * level }}>
            {section.value}
          </span>
        </Anchor>
      </div>
      {hasChildren && (
        <ListItems
          activeId={activeId}
          activeLinkRef={activeLinkRef}
          items={section.children}
          level={level + 1}
        />
      )}
    </li>
  );
}

function ListItems({
  activeId,
  activeLinkRef,
  items,
  level = 0,
}: Readonly<{
  activeId: string | null;
  activeLinkRef: Ref<HTMLAnchorElement>;
  items: TableOfContents;
  level: number;
}>) {
  return (
    <ul
      className={clsx(
        'flex flex-col gap-y-2',
        level === 0 && ['border-l-2', themeBorderColor],
      )}
      role="list">
      {items.map((section) => (
        <ListItem
          key={section.id}
          activeId={activeId}
          activeLinkRef={activeLinkRef}
          level={level}
          section={section}
        />
      ))}
    </ul>
  );
}

function ParentList({
  activeId,
  activeLinkRef,
  items,
}: Readonly<{
  activeId: string | null;
  activeLinkRef: Ref<HTMLAnchorElement>;
  items: TableOfContents;
}>) {
  const flatItems = flatMapDeep(items, (item) => {
    return item.children ? [item, ...item.children] : item;
  });
  const ITEM_HEIGHT_AND_GAP = 28;
  const activeItemIndex = flatItems.findIndex((item) => item.id === activeId);
  const activeIndicatorTopPosition = activeItemIndex * ITEM_HEIGHT_AND_GAP;

  return (
    <div className="relative">
      <div
        className={clsx(
          'absolute h-5 w-0.5 rounded-full bg-current',
          'transition-all duration-300 ease-in-out',
          activeItemIndex < 0 && 'hidden',
        )}
        style={{
          top: `${activeIndicatorTopPosition}px`,
        }}
      />
      <ListItems
        activeId={activeId}
        activeLinkRef={activeLinkRef}
        items={items}
        level={0}
      />
    </div>
  );
}

export default function GuidesTableOfContents({
  tableOfContents,
  collapsed,
}: Props) {
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
    <nav ref={navRef} aria-labelledby={titleId} className="w-full">
      {tableOfContents.length > 0 &&
        (collapsed ? (
          <div
            aria-label="Collapsed table of contents"
            className="float-end flex items-center gap-2">
            <RiListCheck
              aria-hidden={true}
              className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
            />
            <RiArrowLeftSLine
              aria-hidden={true}
              className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <RiListCheck
                aria-hidden={true}
                className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
              />
              <Heading
                className={clsx(
                  'flex-1',
                  'text-[0.8125rem] leading-5',
                  textVariants({ color: 'secondary' }),
                )}
                color="custom"
                id={titleId}
                level="custom">
                <FormattedMessage
                  defaultMessage="On this page"
                  description="Title of the table of contents for a guidebook page."
                  id="Cl4Ghp"
                />
              </Heading>
              <RiArrowRightSLine
                aria-hidden={true}
                className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
              />
            </div>
            <Section>
              <div className="py-4 pl-2">
                <ParentList
                  activeId={activeId}
                  activeLinkRef={activeLinkRef}
                  items={tableOfContents}
                />
              </div>
            </Section>
          </>
        ))}
    </nav>
  );
}
