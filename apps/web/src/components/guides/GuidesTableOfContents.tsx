import clsx from 'clsx';
import { debounce } from 'lodash-es';
import type { Ref } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiListCheck,
} from 'react-icons/ri';

import useScrollIntoView from '~/hooks/useScrollIntoView';
import useScrollParent from '~/hooks/useScrollParent';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import { textVariants } from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import { useActiveHeadingId } from './GuidesHeadingObserver';
import type { SideNavigationItems } from '../common/SideNavigation';
import SideNavigation from '../common/SideNavigation';

type TableOfContentsItem = Readonly<{
  children?: ReadonlyArray<TableOfContentsItem>;
  depth: number;
  id: string;
  value: string;
}>;

export type TableOfContents = ReadonlyArray<TableOfContentsItem>;

function convertToSideNavigationItem(
  tocItems: TableOfContents,
): SideNavigationItems<string> {
  return tocItems.map((item) => ({
    children: convertToSideNavigationItem(item.children ?? []),
    label: item.value,
    value: item.id,
  }));
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
  const intl = useIntl();
  const titleId = useId();
  const activeId = useActiveHeadingId();

  const [activeLink, setActiveLink] = useState<HTMLAnchorElement | null>(null);
  const activeLinkRef: Ref<HTMLAnchorElement> = setActiveLink;

  const navRef = useRef<HTMLElement>(null);
  const scrollParent = useScrollParent(navRef.current);

  const scrollIntoView = useScrollIntoView(scrollParent, {
    behavior: 'smooth',
    inPadding: 170,
  });

  const debouncedScrollIntoView = debounce((element) => {
    scrollIntoView(element);
  }, 100);

  useEffect(() => {
    if (activeLink) {
      debouncedScrollIntoView(activeLink);
    }

    return () => debouncedScrollIntoView.cancel(); // Cancel on cleanup
  }, [scrollIntoView, activeLink, debouncedScrollIntoView]);

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
              label={intl.formatMessage({
                defaultMessage: 'Show table of contents',
                description: 'Expand table of contents',
                id: 'H1JxYU',
              })}
              size="xs"
              tooltip={intl.formatMessage({
                defaultMessage: 'Expand',
                description: 'Expand label',
                id: 'LhuPX+',
              })}
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
                    label={intl.formatMessage({
                      defaultMessage: 'Collapse',
                      description: 'Collapse label',
                      id: 'LlNbSg',
                    })}
                    size="xs"
                    tooltip={intl.formatMessage({
                      defaultMessage: 'Hide table of contents',
                      description: 'Hide table of contents',
                      id: 'iKGGvM',
                    })}
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
                  <SideNavigation
                    activeLinkRef={activeLinkRef}
                    activeValue={activeId}
                    items={convertToSideNavigationItem(tableOfContents)}
                  />
                </div>
              </Section>
            </>
          ))}
      </nav>
    </ScrollArea>
  );
}
