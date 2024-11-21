import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const SCROLL_HASH_INTERVIEWS_FEATURES = 'interviews-features';
export const SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION =
  'recommended-preparation';
export const SCROLL_HASH_PROJECTS_DASHBOARD = 'projects-dashboard';
export const SCROLL_HASH_PROJECTS_FEATURES = 'projects-features';
export const SCROLL_HASH_PROJECTS_IMAGE_COMPARISON =
  'projects-submission-image-comparison-container';

export const SCROLL_HASH_PROJECTS_PROFILE = {
  BIO: 'projects-profile-bio',
  GITHUB: 'projects-profile-githubUsername',
  LINKEDIN: 'projects-profile-linkedInUsername',
  SKILLS_PROFICIENT: 'projects-profile-skillsProficient',
  SKILLS_TOGROW: 'projects-profile-skillsToGrow',
  WEBSITE: 'projects-profile-website',
};

const DEFAULT_SCROLL_DELAY = 800;

type Props = Readonly<{
  delay?: number;
  onScrolledToItem?: () => void;
  topOffset?: number;
}>;

// Somehow the default browser behavior doesn't work, maybe due to Next.js messing w the page? :/
export default function useScrollToHash(props?: Props) {
  const {
    onScrolledToItem,
    topOffset = 80, // Rough value to counter the navbar height and banner height
    delay = DEFAULT_SCROLL_DELAY,
  } = props || {};
  // Listening for `hashchange` event doesn't work too,
  // best alternative now is to listen for path changes. :/
  const pathname = usePathname();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    if (!window.location.hash) {
      return;
    }

    const element = document.getElementById(
      window.location.hash.replace('#', ''),
    );

    if (element) {
      timer = setTimeout(() => {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - topOffset;

        window.scrollTo({ behavior: 'smooth', top: offsetPosition });
        onScrolledToItem?.();
      }, delay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [onScrolledToItem, pathname, topOffset, delay]);
}
