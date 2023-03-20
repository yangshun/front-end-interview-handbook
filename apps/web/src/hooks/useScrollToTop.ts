import { useEffect } from 'react';

/** Scroll to the top when the dependencies change, e.g. pathname. */
export default function useScrollToTop(deps: React.DependencyList): void {
  useEffect(() => {
    // Scroll to top if deps change.
    window.scrollTo({
      left: 0,
      top: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
