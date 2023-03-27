import { useCallback, useMemo } from 'react';

type ScrollIntoViewOptions = Readonly<{
  behavior: ScrollBehavior;
  // The number of pixels inwards from the top/bottom of the screen to the element scroll to.
  inPadding: number;
  // The number of pixels inwards from the top/bottom of the screen the element has to be
  // to be considered out of view.
  outPadding: number;
}>;

const defaultScrollIntoViewOptions: ScrollIntoViewOptions = {
  behavior: 'auto',
  inPadding: 64,
  outPadding: 0,
};

export default function useScrollIntoView(
  scrollParent: HTMLElement | null,
  partialOptions?: Partial<ScrollIntoViewOptions>,
) {
  const options = useMemo<ScrollIntoViewOptions>(
    () => ({
      ...defaultScrollIntoViewOptions,
      ...partialOptions,
    }),
    [partialOptions],
  );

  return useCallback(
    (elementToScroll: HTMLElement | null) => {
      if (elementToScroll && scrollParent) {
        if (
          elementToScroll.offsetTop + elementToScroll.scrollHeight <
          scrollParent.scrollTop + options.outPadding
        ) {
          // Scroll until the top of the link is at the top of the screen

          scrollParent.scrollTo({
            behavior: options.behavior,
            top: elementToScroll.offsetTop - options.inPadding,
          });
        } else if (
          elementToScroll.offsetTop >
          scrollParent.scrollTop +
            scrollParent.clientHeight -
            options.outPadding
        ) {
          // Scroll until the bottom of the link is at the bottom of the screen
          scrollParent.scrollTo({
            behavior: options.behavior,
            top:
              elementToScroll.offsetTop -
              window.innerHeight +
              elementToScroll.clientHeight +
              options.inPadding,
          });
        }
      }
    },
    [scrollParent, options],
  );
}
