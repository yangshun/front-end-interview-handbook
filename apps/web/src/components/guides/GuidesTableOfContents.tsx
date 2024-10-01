import clsx from 'clsx';
import type { Ref } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiListCheck,
} from 'react-icons/ri';

import useScrollIntoView from '~/hooks/useScrollIntoView';
import useScrollParent from '~/hooks/useScrollParent';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import { textVariants } from '~/components/ui/Text';
import {
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useActiveHeadingId } from './GuidesHeadingObserver';

function flattenTOC(
  items: ReadonlyArray<TableOfContentsItem>,
): ReadonlyArray<TableOfContentsItem> {
  return items.reduce<Array<TableOfContentsItem>>((acc, item) => {
    acc.push(item);
    if (item.children) {
      acc = acc.concat(flattenTOC(item.children));
    }

    return acc;
  }, []);
}

type TableOfContentsItem = Readonly<{
  children?: ReadonlyArray<TableOfContentsItem>;
  depth: number;
  id: string;
  value: string;
}>;

export type TableOfContents = ReadonlyArray<TableOfContentsItem>;

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
    <li key={section.id} className="text-sm leading-6">
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
  const flatItems = flattenTOC(items);
  const ITEM_HEIGHT_AND_GAP = 28;
  const TOC_HEADING_HEIGHT_AND_PADDING = 44;
  const activeItemIndex = flatItems.findIndex((item) => item.id === activeId);
  const activeIndicatorTopPosition = activeItemIndex * ITEM_HEIGHT_AND_GAP;

  return (
    <>
      <div
        className={clsx(
          'absolute h-5 w-0.5 rounded-full bg-current',
          'transition-all duration-300 ease-in-out',
          activeItemIndex < 0 && 'hidden',
        )}
        style={{
          top: `${activeIndicatorTopPosition + TOC_HEADING_HEIGHT_AND_PADDING}px`,
        }}
      />
      <ListItems
        activeId={activeId}
        activeLinkRef={activeLinkRef}
        items={items}
        level={0}
      />
    </>
  );
}

type Props = Readonly<{
  collapsed?: boolean;
  isCollapsible?: boolean;
  setCollapsedToC?: (value: boolean) => void;
  tableOfContents: TableOfContents;
}>;

export default function GuidesTableOfContents({
  tableOfContents,
  collapsed,
  isCollapsible,
  setCollapsedToC,
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
    <ScrollArea>
      <nav ref={navRef} aria-labelledby={titleId} className="relative w-full">
        {tableOfContents.length > 0 &&
          (isCollapsible && collapsed ? (
            <Button
              className="float-end"
              icon={RiListCheck}
              iconClassName={themeTextSecondaryColor}
              iconSecondary_USE_SPARINGLY={RiArrowLeftSLine}
              isLabelHidden={true}
              label="Show table of contents"
              size="xs"
              tooltip="Show table of contents"
              variant="tertiary"
              onClick={() => setCollapsedToC?.(false)}
            />
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
                {isCollapsible ? (
                  <Button
                    className="z-[1]"
                    icon={RiArrowRightSLine}
                    iconClassName={themeTextSecondaryColor}
                    isLabelHidden={true}
                    label="Hide table of contents"
                    size="xs"
                    tooltip="Hide table of contents"
                    variant="tertiary"
                    onClick={() => setCollapsedToC?.(true)}
                  />
                ) : (
                  <RiArrowRightSLine
                    aria-hidden={true}
                    className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
                  />
                )}
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
    </ScrollArea>
  );
}
