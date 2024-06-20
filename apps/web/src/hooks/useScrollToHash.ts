import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const SCROLL_HASH_INTERVIEWS_FEATURES = 'interviews-features';
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

// Somehow the default browser behavior doesn't work, maybe due to Next.js messing w the page? :/
export default function useScrollToHash() {
  // Listening for `hashchange` event doesn't work too,
  // best alternative now is to listen for path changes. :/
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    document
      .getElementById(window.location.hash.replace('#', ''))
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  }, [pathname]);
}
