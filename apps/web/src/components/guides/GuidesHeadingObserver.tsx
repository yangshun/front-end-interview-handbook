'use client';

import { isEqual } from 'lodash-es';
import type { PropsWithChildren, RefObject } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props = PropsWithChildren<
  Readonly<{
    /**
     * The ref to the container containing the headings to observe.
     */
    articleContainerRef: RefObject<Element>;
    /**
     * The CSS selectors of headings to observe.
     */
    headingSelectors: ReadonlyArray<keyof HTMLElementTagNameMap>;
  }>
>;

function useIntersectionObserverCallback(
  observerCallback: IntersectionObserverCallback,
  elementsToObserve: ReadonlyArray<Element>,
) {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback, {
      root: null, // Calculate intersection with browser viewport
      // Only consider a heading visible
      // if it is in the top half of the screen
      rootMargin: '0px 0px -50% 0px', // Top right bottom left
      threshold: 0,
    });

    elementsToObserve.forEach((element) => {
      observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, [elementsToObserve, observerCallback]);
}

function useMutationObserverCallback(
  callback: MutationCallback,
  target: Node | null,
) {
  const observer = useRef<MutationObserver>();

  useEffect(() => {
    observer.current = new MutationObserver(callback);

    if (target) {
      observer.current.observe(target, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.current?.disconnect();
  }, [target, callback]);
}

/**
 * Returns the ids of the headings visible in the viewport from the given list of headings.
 * @param headings The headings to observe the viewport visibility of.
 * @returns the ids of the visible headings.
 */
function useVisibleHeadingIds(headings: ReadonlyArray<HTMLElement>) {
  const [visibleHeadingIds, setVisibleHeadingIds] = useState<Set<string>>(
    new Set(),
  );

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const newVisibleHeadingIds = new Set(visibleHeadingIds);

      entries.forEach((entry) => {
        const heading = entry.target as HTMLElement;
        const headingId = heading.id;

        if (entry.isIntersecting) {
          newVisibleHeadingIds.add(headingId);
        } else {
          newVisibleHeadingIds.delete(headingId);
        }
      });

      if (!isEqual(visibleHeadingIds, newVisibleHeadingIds)) {
        setVisibleHeadingIds(newVisibleHeadingIds);
      }
    },
    [visibleHeadingIds],
  );

  useIntersectionObserverCallback(observerCallback, headings);

  return visibleHeadingIds;
}

function useFirstVisibleHeadingId(headings: ReadonlyArray<HTMLElement>) {
  const [firstVisibleHeadingId, setFirstVisibleHeadingId] = useState<
    string | null
  >(null);
  const visibleHeadingIds = useVisibleHeadingIds(headings);

  useEffect(() => {
    if (visibleHeadingIds.size > 0) {
      // Map each id to its height from the top
      // and find the minimum height
      const headingTopOffsets = Array.from(visibleHeadingIds).map((id) => {
        const heading = document.getElementById(id);

        if (heading) {
          return heading.offsetTop;
        }

        return Infinity;
      });

      const firstVisibleHeadingIndex = headingTopOffsets.indexOf(
        Math.min(...headingTopOffsets),
      );
      const newFirstVisibleHeadingId =
        Array.from(visibleHeadingIds)[firstVisibleHeadingIndex];

      setFirstVisibleHeadingId(newFirstVisibleHeadingId);
    }
  }, [visibleHeadingIds, firstVisibleHeadingId]);

  return firstVisibleHeadingId;
}

type GuideActiveHeadingContextType = Readonly<{
  id: string | null;
}>;

/**
 * A context that contains the active heading of a document, as determined by a {@link GuidesHeadingObserver}.
 */
const GuideActiveHeadingContext = createContext<GuideActiveHeadingContextType>({
  id: null,
});

/**
 * Returns the id of the active heading in the document, as defined in the
 * enclosing {@link GuideActiveHeadingContext}.
 * @returns the id of the active heading
 */
export function useActiveHeadingId() {
  const activeHeadingContext = useContext(GuideActiveHeadingContext);

  return activeHeadingContext.id;
}

export default function GuidesHeadingObserver({
  articleContainerRef,
  children,
  headingSelectors,
}: Props) {
  const [headings, setHeadings] = useState<ReadonlyArray<HTMLElement>>([]);
  const firstVisibleHeadingId = useFirstVisibleHeadingId(headings);

  const updateHeadings = useCallback(() => {
    const containerAnchors =
      articleContainerRef.current?.querySelectorAll<HTMLElement>(
        headingSelectors.map((selector) => `${selector} > a`).join(','),
      );

    if (containerAnchors) {
      setHeadings(Array.from(containerAnchors));
    }
  }, [articleContainerRef, headingSelectors]);

  // Initialise headings
  useEffect(() => {
    updateHeadings();
  }, [updateHeadings]);

  useMutationObserverCallback(updateHeadings, articleContainerRef.current);

  return (
    <GuideActiveHeadingContext.Provider value={{ id: firstVisibleHeadingId }}>
      {children}
    </GuideActiveHeadingContext.Provider>
  );
}
